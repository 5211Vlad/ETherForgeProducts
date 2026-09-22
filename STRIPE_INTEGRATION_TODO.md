# EtherForge Stripe embedded checkout integration TODO

Status: CODE STAGED / SANDBOX ONLY / NOT CUSTOMER READY. Single source of truth for this checkout integration. Do not merge or deploy a public Buy button yet. Current live Gumroad Buy buttons remain unchanged.

## Values to Replace

Files containing placeholder values: [.env.example](.env.example). No live or test secret was committed.

| Field | Current state | What to set securely |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | `sk_test_REPLACE_IN_NETLIFY_ONLY` example | Actual test secret, stored only in Netlify environment variables scoped to Functions; NEVER paste into source or chat. |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_REPLACE_WITH_YOUR_TEST_KEY` example | Test publishable key from the same sandbox/account. |
| `STRIPE_CHECKOUT_ENABLED` | `false` | `true` only in an isolated sandbox preview after all test keys and prices are configured. |
| `STRIPE_PRICE_PROJECT_DEFIBRILLATOR` | Verified test Price ID in example | `price_1UIb86J1WVzwfYnZQB4viYcB`, 699 USD cents, test only. |
| `STRIPE_PRICE_THREAD_JUNK_REMOVER` | Verified test Price ID in example | `price_1UIb8cJ1WVzwfYnZBChBw8Wj`, 900 USD cents, test only. |
| Live account, production prices, and fulfillment | Unavailable/not configured | Resolve separately. Test-only code rejects `sk_live_` and `pk_live_` intentionally. |

`mode` is deliberately `payment`: these two digital downloads are one-time purchases, not subscriptions. Test `line_items` use real verified Stripe sandbox Price IDs via Netlify environment variables, not client-provided amounts. The Stripe connector currently exposes only a sandbox. A production build needs a separate reviewed change, not just swapping keys.

## Configured Parameters

Server-side configured in [netlify/functions/create-checkout-session.mts](netlify/functions/create-checkout-session.mts):

| Parameter | Value |
| --- | --- |
| API version | `2026-03-25.dahlia; custom_checkout_payment_form_preview=v1` per Checkout Studio export |
| `ui_mode` | `form` (Stripe Node SDK 22.6.2, at least 21) |
| `mode` | `payment` |
| `billing_address_collection` | `auto` |
| `phone_number_collection.enabled` | `false` |
| `automatic_tax.enabled` | `false` |
| `submit_type` | `auto` |
| `saved_payment_method_options.payment_method_save` | `enabled` |
| `integration_identifier` | `custom_embedded_web_0001` |
| `payment_method_collection` | Omitted because the mode is `payment`; Stripe only accepts this field in `subscription` mode. |
| `customer_creation` | `always`, additionally required to make the UI-configured saved-payment-method option valid. First API attempt without it failed; second Stripe sandbox API attempt passed. |
| `return_url` | Same-origin `/stripe-checkout-result.html` (test-only, does not claim successful payment) |

Client implementation in [stripe-checkout.html](stripe-checkout.html) and [stripe-checkout.js](stripe-checkout.js): Stripe-hosted Dahlia JS, beta `custom_checkout_payment_form_1`, fetch POST to `/api/create-checkout-session`, full user-supplied appearance, expanded iframe, `loadActions` and confirm handler. The publishable key and client secret come from server response. No secret Stripe key is exposed.

## Setup and next steps

1. Run `npm ci` and `npm run check` in this repository; `npm run check` typechecks the Netlify function. Run `node --check stripe-checkout.js` for browser JS syntax. Keep `.netlify/`, `.env` and `node_modules/` ignored.
2. In the existing Netlify project `etherforge-works`, set the five variables above under environment variables. Scope secrets to Functions if supported. Use sandbox test keys ONLY, and do not enable checkout in the production context. Netlify Functions use `Netlify.env.get()`.
3. Start locally with `npx netlify dev` after configuring a private, ignored local environment. Alternatively build a password-protected staging branch deploy. Open `/stripe-checkout.html?sku=project-defibrillator` and `/stripe-checkout.html?sku=thread-junk-remover` on the staging origin only. These pages are not linked from the public product catalog.
4. Use Stripe TEST cards: `4242 4242 4242 4242` for an approved test, `4000 0025 0000 3155` for 3-D Secure, `4000 0000 0000 9995` for a declined test. Use future expiration and arbitrary CVC; never real card data in sandbox. Verify the transaction in Stripe's test Dashboard. No test card was charged by this coding pass.
5. Verify the `2026-03-25.dahlia` preview API version and beta flag are enabled in your Stripe account. The connector's API uses a different preview version, so its API-level success does not prove this exact deployed SDK flow works.
6. Before taking real money, build signed Stripe webhooks with raw-body signature verification, idempotent fulfillment/recordkeeping, secure private ZIP delivery via expiring link or approved fulfillment partner, refund/support policy, and verified pricing/tax obligations. Test browser closed, duplicate event, delayed payment, refund and download expiration cases. NEVER grant a download based solely on a `return_url` or client message.
7. Complete production business verification and obtain live Stripe access, real live Price IDs, live publishing keys, production domain registration, and production environment review. Replace the test-only guard via explicit audited code changes when fulfillment has passed, not by editing an environment switch alone.

Project files added: `netlify/functions/create-checkout-session.mts`, `netlify/functions/netlify-globals.d.ts`, `stripe-checkout.html`, `stripe-checkout.js`, `stripe-checkout-result.html`, `package.json`, `package-lock.json`, `tsconfig.json`, `.env.example`, `.gitignore`, and this TODO. No webhook/fulfillment files were created because none existed and their implementation needs a secure storage and delivery decision.

Flow: buyer visits isolated sandbox page → browser posts an allowlisted SKU → Netlify function selects the sandbox Price ID and creates a Checkout Session → responds with test publishable key + session client secret → Stripe iframe receives payment details → confirmation returns to test-only status page. Production checkout is intentionally disabled.

References: https://docs.stripe.com/checkout/form/quickstart ; https://docs.stripe.com/checkout/fulfillment ; https://docs.stripe.com/mcp ; https://support.stripe.com .

## Static publish security change

Because the site formerly published the repository root (`publish = "."`), adding npm dependencies or environment files would risk publishing source/configuration. [netlify.toml](netlify.toml) now runs `npm run build` and publishes only `dist/`; [scripts/build-site.mjs](scripts/build-site.mjs) copies an explicit allowlist of public static site files and assets. The build audit confirmed all 28 HTML pages' local linked assets resolve and source, `.env`, dependencies, serverless files, and TODO do not appear in `dist/`. The Netlify Functions source is independently bundled by Netlify and is never a client download.

**Verification receipts:** `npm run build` PASS, `npm run check` PASS, `node --check stripe-checkout.js` PASS, mocked endpoint tests PASS (method, default-off, environment guards, SKU and price validation), static publish audit PASS. Stripe's sandbox API accepted the configured session parameters only after adding `customer_creation: "always"`; it created an unpaid test session. No completed checkout, rendered iframe browser test, webhook fulfillment, live access, or production deploy is verified. Do not present static/API tests as buyer delivery proof.
