import Stripe from "stripe";
import {createHash} from "node:crypto";

function ticketId(sessionId: string) {
  return "MACK-" + createHash("sha256").update(sessionId).digest("hex").slice(0, 12).toUpperCase();
}

function receiptFromSession(session: Stripe.Checkout.Session) {
  const paid = session.payment_status === "paid";
  return {
    receipt_type: "MACK_BENCH_PAYMENT_RECEIPT",
    checkout_session_id: session.id,
    ticket_id: ticketId(session.id),
    service_sku: session.metadata?.sku || "unknown",
    customer_email: session.customer_details?.email || null,
    amount_total: session.amount_total,
    currency: session.currency,
    payment_status: session.payment_status,
    intake_status: paid ? "PAYMENT_VERIFIED_AWAITING_INTAKE" : "PAYMENT_NOT_FINAL",
    fulfillment_status: "NOT_CONFIGURED"
  };
}

export default async (request: Request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {status: 405});
  }
  if (Netlify.env.get("STRIPE_WEBHOOK_ENABLED") !== "true") {
    return Response.json({error: "Stripe webhook staging is disabled."}, {status: 503});
  }
  const secret = Netlify.env.get("STRIPE_SECRET_KEY") || "";
  const webhookSecret = Netlify.env.get("STRIPE_WEBHOOK_SECRET") || "";
  if (!secret.startsWith("sk_test_") || !webhookSecret.startsWith("whsec_")) {
    return Response.json({error: "Sandbox Stripe webhook configuration is incomplete."}, {status: 503});
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json({error: "Missing Stripe signature."}, {status: 400});
  }

  const rawBody = await request.text();
  const stripe = new Stripe(secret);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return Response.json({error: "Invalid Stripe webhook signature."}, {status: 400});
  }

  if (event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as Stripe.Checkout.Session;
    const receipt = receiptFromSession(session);
    console.log("MACK_STRIPE_RECEIPT", JSON.stringify(receipt));
  } else if (event.type === "checkout.session.async_payment_failed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.warn("MACK_STRIPE_PAYMENT_FAILED", session.id);
  }

  return Response.json({received: true});
};

export const config = {path: "/api/stripe-webhook"};
