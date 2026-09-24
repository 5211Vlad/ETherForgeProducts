# Mack's R10 | Customer archive recovered | RESEARCH HOLD

Date: 2026-09-21. **Do not merge, deploy, change Gumroad content, or promote SKU.** This document is a source/verification pointer, not the full executable tree.

## Actual release recovered
- User-supplied `ROWGLASS_CUSTOMER_READY(2).zip` SHA-256 `7f164bbb6599cb10dc75568c202e8c84a836f2fb371e5e76f30e7b0e45c62602`; ZIP integrity and all seven internal SHA256SUMS entries PASS.
- `RowGlass.html` SHA-256 `1102a34062a9f739408a91c5415e93135d8a750b2362b7ce747cb718cd431123` **exactly matches** recovered `RowGlass(6).html` used in R8/R9. Source-identity uncertainty resolved for this uploaded archive, but independently verifying the ZIP actually served to Gumroad purchasers is still open.
- Original bundled BEFORE/AFTER samples give 1 added, 1 removed, 2 modified and 0 key issues through a real local Chromium file-input flow.
- Defect 1 reproduced in supplied release: `__proto__` CSV field silently disappears in parsing, exact-row reconstruction, keyed modified-field reporting and exports. Defect 2 reproduced: mode/key changes leave stale results and download links. Label drift: UI/docs 0.4.0, internal engine/receipts 0.2.0, PRIVACY.txt 0.3.0.

## Isolated R10 RowGlass candidate
- New candidate `ROWGLASS_R10_REPAIR_CANDIDATE__NOT_FOR_SALE.zip` SHA-256 `dd57ff24f4a7e7ccabadf9b09c785e0a6aee1fc0e45f93e6fa3394bf9374e55d`. Preserves ordinary JS object prototype with own data properties for reserved headers; repairs exact-row restoration; clears stale results and download URLs upon mode/key changes; consistent candidate label `0.4.1-rc1` and visible NOT CUSTOMER RELEASE banner. Preserves original license and bundled samples byte-for-byte. Never overwrite original.
- 61/61 scoped R10 browser+static checks PASS. Unchanged R9 clean-extraction regression 24/24 PASS. R10 handoff ZIP 34/34 SHA256 manifest entries PASS, ZIP integrity PASS; downloaded Drive copy confirmed byte-identical. Full runnable candidate, untouched originals, tests, results, receipts, manifest reside in Drive, **not fully committed into this GitHub branch**.

## Project Defibrillator (separate)
- User-supplied `Project_Defibrillator_0.2.1_Client_Ready(1).zip` SHA-256 `bec14f7df72d7c6dd474ae7f9425737486efc3ac3db870524f9cc33dfea972b6`; ZIP integrity PASS. Static source inspection only, NOT executed on Windows. Launcher calls `powershell.exe -NoProfile -ExecutionPolicy Bypass -File`; review execution-policy and warning copy, suppressed scan errors and capsule privacy before changing customer product. No original ZIP modification.

## Organized Drive provenance
- Original customer ZIPs: https://drive.google.com/drive/folders/1xcPoWKrTjezlVBwDISo0Y4xQ_FSoO8TV
- R10 candidate and full reproducible handoff: https://drive.google.com/drive/folders/1hF3hREZAF2OSyoeD3OlNsqSTCDIrrz_a
- Full handoff: https://drive.google.com/file/d/1VCa0l6oPpHcsCL3ZURewBW04htgCRTGA/view
- Individual candidate: https://drive.google.com/file/d/1t0YEMDdXxxeHjTOgRpu5310xRLmEnV6_/view
- Detailed proof receipt: https://drive.google.com/file/d/1dDfQe-wjiYu15td8Y0MYOOzBIfToU_IU/view

## Still required
Verify actual current Gumroad downloadable attachment digest, test Windows native browser/downloads and Defibrillator PowerShell/WinForms independently, review CSV-to-spreadsheet formula hazards and privacy, commit full source and tests into reviewed repo/CI, obtain owner signoff. Do not assert external production readiness from Linux Chromium and static script checks.