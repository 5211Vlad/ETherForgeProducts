# Mack's R4: compatibility verification receipt

Status: LOCAL DOM REGRESSION PASS / DRAFT PR / DEPLOYMENT AND COMMERCIAL HOLD. Research and engineering pass, not an independent Council run or live-account test.

## Exact artifact
- Candidate: `macks/compatibility/index.html` on branch `macks-salvage-r3-20260920`.
- Git blob SHA: `641757bc10a90785860a480ce81817674767f801`.
- Reproduction: install Python `playwright`, install or provide Chromium, run `python macks/compatibility/test_browser.py` from repo checkout. Tests use `page.set_content` because navigation to file:// and localhost was blocked in the execution environment; test harness does not exercise live server navigation, production hosting, real credentials, external links or integrations.
- Local browser: Debian Chromium 144.0.7559.96 in headless Playwright. Browser and device matrix beyond this environment is not complete.
- First baseline (unchanged R3 Git blob `5f76cc696904b968bcd4e07c1657f4228d4e15b1`): 18 PASS / 2 FAIL out of 20. Defects: a result stayed visible when the user changed the plan or requested operation after checking.
- Patched R4: 22 PASS / 0 FAIL in a scoped behavior matrix. Verified documented decision branches, clear-on-change, no network requests during browser-local interactions, source-link presentation, keyboard focus progression, one 375px touch layout, and explicit clipboard outcome feedback. JavaScript parsed successfully. Neither a security audit nor independent deployment validation.

## Corrections
1. Hide stale verdict whenever plan or operation changes; vendor change already did so.
2. Unknown provider now hides the inapplicable provider-source hyperlink, instead of citing Jobber for unrelated products.
3. Use Jobber's GA4 guidance as the source for analytics warning and explicitly acknowledge the provider's different documented event names.
4. Retain source-based outcomes and no credentials/data collection. No API connection or lead transmission added.

## Provider documentation recheck (research, not real-account proof)
- Housecall Pro API Overview dated July 8, 2026: https://help.housecallpro.com/en/articles/8505035-api-overview ; API Leads dated July 13, 2026: https://help.housecallpro.com/en/articles/12062219-api-leads-in-job-inbox . Public API / inbox lead availability Max-only; exact endpoint and configuration remain unknown.
- Jobber request forms dated September 10, 2026: https://help.getjobber.com/en/articles/add-your-request-and-booking-forms-to-your-website-and-social-media/ . Requests on current plans; actual account, visibility and permissions unverified.
- Jobber Angi dated May 8, 2026: https://help.getjobber.com/en/articles/jobber-and-angi-leads-integration/ . US paid Core/Connect/Grow documented; account geography, authorization and matching outcome unverified.
- Jobber GA4 guidance updated September 9, 2026: https://help.getjobber.com/en/articles/google-analytics-tracking-for-requests-and-bookings/ . Warns iframe third-party cookie limitation, calls request key event `generate_lead`. Another provider settings page https://help.getjobber.com/en/articles/requests-and-bookings-settings/ calls tracked forms `form_submit`. Do not invent reconciliation or claim either is guaranteed for a customer; require observed test data.

## Gate still open
- No live URL or external browser navigation proof, no complete cross-browser/assistive technology test, no real account consent or disposable test lead, no actual import reconciliation, no quote/retail license/support approval, and no independent execution by LEVIATHAN/MAGI agents.
- Verify the published relative `../../contact.html` against actual deployment routing before launch; repository main has `contact.html`, but Netlify Forms behavior cannot be proven from repository existence alone.
- Keep PR draft; no deployment, no merge, no SKU promotion, no alterations to older Scrapyard files. Next proof: run a copied, authorized RowGlass donor through synthetic identity ambiguity fixture and a second consumer, then record acceptance and rollback outcomes.
