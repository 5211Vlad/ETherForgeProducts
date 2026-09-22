import Stripe from "stripe";

// Test-only endpoint: never accepts browser-provided prices or amounts.
export default async (request: Request) => {
  if (request.method !== "POST") return new Response("Method not allowed", {status: 405});
  if (Netlify.env.get("STRIPE_CHECKOUT_ENABLED") !== "true") {
    return Response.json({error: "Checkout staging is not enabled."}, {status: 503});
  }
  const secret = Netlify.env.get("STRIPE_SECRET_KEY") || "";
  const publishable = Netlify.env.get("STRIPE_PUBLISHABLE_KEY") || "";
  if (!secret.startsWith("sk_test_") || !publishable.startsWith("pk_test_")) {
    return Response.json({error: "Test-mode Stripe keys are required."}, {status: 503});
  }
  let sku: string;
  try {
    const payload = await request.json();
    sku = typeof payload?.sku === "string" ? payload.sku : "";
  } catch {
    return Response.json({error: "Expected JSON with a product SKU."}, {status: 400});
  }
  const prices: Record<string, string | undefined> = {
    "project-defibrillator": Netlify.env.get("STRIPE_PRICE_PROJECT_DEFIBRILLATOR"),
    "thread-junk-remover": Netlify.env.get("STRIPE_PRICE_THREAD_JUNK_REMOVER")
  };
  if (!Object.prototype.hasOwnProperty.call(prices, sku)) {
    return Response.json({error: "Unknown product."}, {status: 400});
  }
  const price = prices[sku];
  if (!price || !/^price_[A-Za-z0-9]+$/.test(price)) {
    return Response.json({error: "Product test price is not configured."}, {status: 503});
  }
  try {
    const stripe = new Stripe(secret, {
      apiVersion: "2026-03-25.dahlia; custom_checkout_payment_form_preview=v1" as Stripe.LatestApiVersion
    });
    const session = await stripe.checkout.sessions.create({
      ui_mode: "form", mode: "payment", line_items: [{price, quantity: 1}],
      billing_address_collection: "auto",
      phone_number_collection: {enabled: false},
      automatic_tax: {enabled: false}, submit_type: "auto",
      customer_creation: "always", // Required by Stripe to offer saved payment methods.
      saved_payment_method_options: {payment_method_save: "enabled"},
      integration_identifier: "custom_embedded_web_0001",
      return_url: `${new URL(request.url).origin}/stripe-checkout-result.html?session_id={CHECKOUT_SESSION_ID}`
    });
    if (!session.client_secret) throw new Error("Missing Checkout client secret");
    return Response.json({client_secret: session.client_secret, publishable_key: publishable},
      {headers: {"Cache-Control": "no-store"}});
  } catch (error) {
    console.error("Stripe sandbox session setup failed", error instanceof Error ? error.message : "unknown");
    return Response.json({error: "Unable to initialize the test checkout."}, {status: 502});
  }
};
export const config = {path: "/api/create-checkout-session"};
