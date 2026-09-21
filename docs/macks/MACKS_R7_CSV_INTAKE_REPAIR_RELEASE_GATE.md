# Mack's R7 | MM-DAT-005 CSV Intake candidate | RESEARCH HOLD

Date: 2026-09-21. **Do not merge, deploy, or create a commercial SKU.** R7 runnable source is in the complete immutable package below, not committed as a full GitHub source tree. Existing canonical modules and website remain unchanged.

## Complete source, tests, and verified provenance

- Drive runnable R7 ZIP in Scrapyard `03_WORKBENCH_UNTESTED_ZIPS`: https://drive.google.com/file/d/1RaRExh1o6oT7WleTX13V4A3MnOWgZ9bH/view
- Full package SHA-256: `7e1064d4af561be89bcf56a8c6aabc53641e57ae7351f7ea564a2e2470af90a5`. Drive download was compared byte-for-byte against local ZIP and matched.
- Proof receipt `04_PROOF_BENCH_AND_RECEIPTS`: https://drive.google.com/file/d/188q7txlYxOo-nMRyzLxF_ZHL2latCzDV/view
- README/source map `00_INDEX_AND_SOURCE_MAP`: https://drive.google.com/file/d/1ukCqvkjBPkdESVC0SrIImv98e9Vc9msw/view
- Versioned MM-DAT-005 candidate release notes `02_NEW_MODULE_BLUEPRINTS`: https://drive.google.com/file/d/1XMJrIHvw4ju1HdPjMpFYFjKWDVvbmRkz/view

## Actual change

Original EtherForge-owned MM-DAT-005 `0.1.0` creates parsed row using `{}`. A synthetic CSV with header `__proto__` reports the header but silently loses the column value. R7 candidate `0.1.1-rc1` uses `Object.create(null)` per parsed row. Original source remains included separately and unchanged; candidate changes row prototype semantics, so promotion requires explicit consumer-contract review. R7 quote consumer imports new CSV candidate alongside MM-DAT-002 `0.1.1-rc1` candidate and unchanged MM-DAT-003 `0.2.0`, returning a redacted, read-only R7 aggregate receipt.

## Verification and limitations

Preserved original R5 suite: 30/30; preserved original R6 suite: 22/22; R7 combined suites: 42/42 in fresh extraction, with 400 seeded cases inside a test. ZIP manifest: 22/22 SHA-256. Local syntax: PASS. R7 candidate did not rewrite source CSV bytes in scoped tests. These are scoped local results, not evidence of customer outcomes.

**Still HOLD:** literal RowGlass 0.4.0 customer-ready ZIP/golden browser test was not accessible in this R7 pass; cannot claim complete donor-product regression. Full R7 source tree is packaged in Drive, not replicated in GitHub. No Windows/macOS or real vendor export, independent security/privacy audit, license/support review, public marketing, or website deployment. No changes to master inventory. If adoption proceeds, test all actual consumers for null-prototype compatibility, restore exact donor golden artifact, and obtain owner approval before separately versioned canonical promotion.