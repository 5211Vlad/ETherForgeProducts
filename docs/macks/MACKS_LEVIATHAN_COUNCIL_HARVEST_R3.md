# Mack's Modules / LEVIATHAN + Council harvest R3

Date: 2026-09-20. Authority: RESEARCH ONLY / STAGING BRANCH. No production deployment, retail promotion, new SKU, code transplantation, or catalog count change is implied. This is a structured application of existing LEVIATHAN and Council review methods; no independent agents were run.

## Canon and preservation
- Mack's source of truth: https://docs.google.com/document/d/1hjVpnEHU8vAcOt879D9XnsOi_XDy5oQDpQkL4bglKXI/edit
- Existing inventory: https://docs.google.com/spreadsheets/d/1UM4-U-SK2h5fdju7lBr7323Ns5qt7RdH7GxuZegEM4w/edit
- Scrapyard R2: https://drive.google.com/file/d/14H5zWlJ458rdZwWwaEzBN7fSFNAM9pOi/view
- September 20 routing and no-delete rule: https://docs.google.com/document/d/1XzWGySyf6zJYmJks13rdghpm52dJOHAFF3lbQ7Q3YfE/edit
- LEVIATHAN method: https://docs.google.com/document/d/1OeuLpWTFQ9jZSW_N2Z17Ckcqsq70AEYi-NY_a1Mbtpc/edit
- Council method: https://docs.google.com/document/d/1pgAQvRDl_eNMT-X7VuKQtn_fAHQfu9kuoGIwr0fPx3I/edit
- Scrapyard remains original-IDs intact. R2 index reports 307 items PENDING FINAL READBACK and seven laboratory parts, 52 isolated tests only, no retail readiness. No older builds moved, deleted, or modified in R3.

## LEVIATHAN L0-L10 digests; verified public behavior versus engineering hypotheses

### R3-F01 | Plan and route capability preflight | SEAM_CANDIDATE + PROOF_METHOD
Observed: Housecall Pro Public API and its Job Inbox API Leads are MAX-plan only, dated July 8 and July 13, 2026. The provider also warns not all functions exist in its API. Sources: https://help.housecallpro.com/en/articles/8505035-api-overview and https://help.housecallpro.com/en/articles/12062219-api-leads-in-job-inbox . Jobber says request forms are available on all CURRENT plans and supports sharing/embedding; updated September 10, 2026. https://help.getjobber.com/en/articles/add-your-request-and-booking-forms-to-your-website-and-social-media/ .
Problem: a customer may request a route their present plan or connection cannot support. These documentation facts are NOT observations of any particular customer account.
Existing overlap: Mack's SB-00 Bench Check, API Automation Tune-Up, MM-CAP-003 Provider Fallback Router (SPEC, NOT BUILT), and compatibility patterns. Do not duplicate as a new module SKU.
Smallest cut: a static decision card with vendor, declared plan, requested operation, dated documentation source, and states DOCUMENTED_FEATURE, PLAN_BLOCKED, VERIFY_IN_ACCOUNT, UNKNOWN. NEVER call an integration operational from a price-tier lookup.
Proof: tests for HCP Basic/Essentials API Leads blocked; HCP Max documented eligibility but auth and account-level feature unknown; Jobber current plan native request form documented; unknown plan/vendor unknown. Require official source recheck, admin consent before bounded real-account test, no password collection, no network access in public self-check.
Site: staged static self-check under /macks/compatibility. Kill if verified account coverage is too narrow or official capability disappears.

### R3-F02 | Lead identity ambiguity preflight | PROOF_METHOD, not new module
Observed: Jobber's Angi integration (updated May 8, 2026) creates requests and matches an existing client only if first and last name AND phone or email match; matching may update the client. https://help.getjobber.com/en/articles/jobber-and-angi-leads-integration/ . This is documented behavior, NOT evidence of a defect.
Existing overlap: MM-DAT-002 Row Identity Resolver, MM-DAT-003 Diff Engine, MM-DAT-006 receipt. Retail HOLD remains.
Smallest proof: seeded read-only fixture tests same name/different phone, same phone/different name, absent/duplicate keys, ambiguous records, contact field changes, and no live mutation. Unknown/ambiguous identities fail closed. Kill if a native customer workflow already provides adequate assurance.
Site: factual troubleshooting page ONLY after fixture and real redacted proof. No claims that Jobber routinely corrupts leads.

### R3-F03 | LSA historical reporting continuity | PREVIOUSLY IDENTIFIED / RECOMBINATION
Google announced the U.S. Local Services Ads migration to specialized pay-per-lead Performance Max beginning August 2026; historic performance reporting does not transfer. This opportunity was previously surfaced in conversation and is NOT novel R3 inventory. Official source: https://support.google.com/localservices/answer/16364330 . Verify destination and document date again before publishing.
Existing overlap: MM-DAT-005 CSV Intake/Fingerprint + MM-DAT-001 Schema Graph + MM-DAT-003 Diff Engine + MM-DAT-006 Receipt.
Smallest proof: owner-exported old/new reports, untouched input hashes, explicit column/unit matching, INCOMPARABLE when definitions differ, no credentials or automatic ads edits. Kill if exporters are inaccessible or matching is untrustworthy.

### R3-F04 | Site diagnosis -> verified breakdown -> Studio | SEAM_CANDIDATE
Observed internally: Mack's has a prepared but unverified/deployment-pending static website and a separately prepared Lead Leak Simulator. Studio AD_FORGE has a current-claims -> one semantic timeline -> 6/15/30/60s creative family -> metrics receipt contract: https://docs.google.com/document/d/1JHOud3eB-9_SNnkkxZPPnXKwDshOUUWtJu72Q7AU0z0/edit .
Seam: only publish a breakdown from a reproducible fix and redacted proof receipt. Avoid bulk synthetic SEO pages, unsupported claims, private customer data, fabricated testimonials, or branded product mockups presented as authentic.
Proof: one clean demo, accessible mobile page, verified live CTA, 3 aspect ratios preserving wording, 1 campaign/result ID, customer-permission check. Site /macks/compatibility is a staged illustration, not a deployed service.

### R3-F05 | Software dependencies as references, not stolen stock | RIGHTS / WATCH
Papa Parse MIT: https://github.com/mholt/PapaParse/blob/master/LICENSE . Tabulator MIT: https://github.com/tabulator-tables/tabulator/blob/master/LICENSE . Both may be commercially reused under stated notice terms; exact releases, transitive licenses, security, payload size and notices still require review. No dependency copied, bundled, or installed in R3.
n8n Sustainable Use License: https://github.com/n8n-io/n8n-docs/blob/main/docs/privacy-and-security/sustainable-use-license.md . Do NOT classify its source as ordinary permissive open-source resale inventory. Its publicly described behavior can inspire independent contracts; distributing/monetizing code requires license-specific approval.
Existing overlap: MM-SC-007 License & Policy Compatibility Screener is SPEC/NOT BUILT. Rights matrix stays authoritative; no auto-clearance.

## Council seats / objections and accepted controls
Mercury: do not infer an account's entitlements from documentation; mark unknown and date every public claim.
Vera: self-check must yield one reproducible action and a scoped work order, not a decorative dashboard.
Seren: prefer a compatibility SEAM assembling existing checks over another atom-sized module.
Yin: no credentials, data scraping, protected code, owner-unauthorized writes, or client-identifiable specimens; n8n distribution hold.
Yang: connect intake -> capability finding -> receipt -> verified webpage -> Studio -> customer feedback; outcomes cannot silently promote proof status.
Arbiter: R3 is RESEARCH/STAGING only. No retail checkout or merge without actual browser QA, official-doc recheck, data-handling review, cross-host proof where a module is involved, and owner's deployment approval.

## Intake directions, source of truth stays unchanged
ACTIVE SITE: staging only, branch macks-salvage-r3-20260920, no production merge or deploy. SCRAPYARD 02_NEW_MODULE_BLUEPRINTS: reference this receipt and F01/F02/F04 as candidate contracts, do not copy originals. SCRAPYARD 05_RIGHTS_LICENSE_PROVENANCE: F05 license/watch record. SCRAPYARD 99_HOLD_DUPLICATES_UNSAFE: unchanged. MASTER MODULES sheet: unchanged, no assigned IDs. MASTER FOUNDRY_QUEUE: unchanged pending owner approval and dedupe check.

## Acceptance next gates
1. Test static self-check matrix and keyboard/mobile rendering; verify no network or storage of user responses.
2. Build isolated six-case identity test using a CLONE of approved MM-DAT-002; do not modify donor.
3. Reconcile Scrapyard reported 307 count with current inventory without assuming new rows prove readiness.
4. After real customer need confirmed, construct one proof receipt and only then an accurate Studio campaign.

Kill/NO-OP is a valid result. Preserve source IDs, hashes where verified, licenses, versioned test receipts, and explicit rollback throughout.