# R13 RowGlass asynchronous file-selection integrity gate

**RESEARCH HOLD | DOCS ONLY | DO NOT MERGE, DEPLOY, UPLOAD TO GUMROAD OR PUBLISH PAID SOURCE**

## Observed defect
In the actual preserved R11 lab UI, a delayed `slow_after.csv` parse can complete after replacement `fast_after.csv` is chosen. The displayed filename says `fast_after.csv`, while the downloaded change receipt contains the old `slow` value. This was reproduced using synthetic files in local Chromium. No claim of a real customer incident.

## Isolated repair candidate
RowGlass 0.4.1-rc3 R13 LAB uses a generation/epoch token per selection; disables comparison and revokes prior results/downloads immediately; commits pair previews, parsed values and key schema only when the currently selected pair finishes loading; discards stale successes AND stale failures; rejects oversized replacement by clearing its selected input and comparison eligibility. The existing R11 conservative spreadsheet-formula export guard remains. Original customer and R11 archives remain immutable.

## Evidence (owner-only archive, NOT for PUBLIC repo)
- Original UI mismatch reproduced; R13 targeted local Chromium checks **58/58 PASS**, including 12 deterministic rapid replacement cases, stale parse errors, oversized selection, original bundled sample 1 added / 1 removed / 2 modified / 0 issues, original R11 formula guard, and no observed outgoing requests.
- Unchanged R11 regression **92/92 PASS**, both candidate inline JavaScript blocks pass Node syntax checks.
- Fresh extracted R13 handoff 10/10 SHA-256 manifest checks, R13 tests 58/58, archive integrity PASS.
- R13 candidate ZIP SHA256 `efd935562d77fcd40127ce0c67b304b1b1bd559375b662cfca32f58587452445`; full private handoff ZIP SHA256 `b3d635072c4586fc18202196b5efbd3dc34f179fb75662bff132212ecb7bb1ba`.
- **LIMITATION:** host Chromium blocks direct `file://` navigation (`ERR_BLOCKED_BY_ADMINISTRATOR`). The tests fall back to `set_content` with the exact candidate HTML bytes. No Windows default-browser, native file picker, download-folder or real Windows product acceptance is established.

## Public repository safety
This repository is PUBLIC. Do not commit RowGlass.html, paid ZIPs, private Playwright test code or Gumroad attached files. The R12 public synthetic harness succeeded on Ubuntu and Windows, but its green CI status is not R13 product acceptance. R13 code, original release, tests, Windows owner-run preflight PowerShell without execution-policy bypass, proof receipt and release-manifest belong only in the owner-controlled private Scrapyard.

## Mandatory unresolved gates
1. Confirm exact ZIP hash currently downloadable to Gumroad purchasers via owner-side authorized download.
2. Real Windows file:// launch via Explorer, actual native picker, download locations and receipt verification; R13 owner's Windows manual checklist remains unperformed.
3. Full product source tests in controlled private runner; broader privacy, CSV spreadsheet safety, and security review.
4. Explicit product-owner signoff before modifying any customer-facing artifact.

Project Defibrillator is a separate Windows/PowerShell product and remains on its own research-hold track. No main/catalog/site/customer data/retail changes.