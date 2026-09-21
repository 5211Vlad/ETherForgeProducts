# Mack's R9 | MM-DAT-003 exact-row repair [RESEARCH HOLD]

Date: 2026-09-21. This record is additive. Do not merge, deploy, promote existing modules, or modify master inventory from these laboratory findings alone.

## Reproducible original defect
Original MM-DAT-003 v0.2.0 exact-row reconstruction assigns `row[h] = value`. The reserved CSV column `__proto__` survives repaired MM-DAT-005 input but is omitted from exact-row comparison output. Original MM-DAT-003 and MM-DAT-005 are preserved unchanged.

## R9 isolated candidate
MM-DAT-003 v0.2.1-rc1 uses `Object.defineProperty` to reconstruct all own fields; rejects missing declared columns and incomplete resolved-key mappings. R8 CSV v0.1.2-rc2 and R6 identity v0.1.1-rc1 are referenced but not promoted. Two executable synthetic consumers use the repaired chain: `inventory_bench/` invokes exact-row comparison without claiming modified identities; `quote_bench_r9/` invokes explicit keyed comparison and produces redacted summaries. No provider APIs, CRM writes, real customer data or network calls.

## Source of truth and reproducibility
Full executable source, fictional fixtures, original donor modules, recovered RowGlass HTML baseline/lab, test suites, 29-file SHA256 manifest and proof: https://drive.google.com/file/d/1tCPdNI4vtyguFRc6m7ulV2gZ5FO1VpYF/view
ZIP SHA256: `c8885ce57c20f499b01de7adb23248c0f5c9be316ebf4932ca501e92e7e943c0`; Drive copy downloaded and byte-for-byte verified. R9 24/24 Node tests, Chromium 15/15, unchanged R8 23/23; clean extraction manifest 29/29 and R9 24/24. These overlap and are not claims of security certification or production readiness.
Proof: https://drive.google.com/file/d/1sR1xqnbvcCfxZjWaTmtwz_2SlzFW0NxF/view
Index: https://drive.google.com/file/d/12AwhA3UYggzhJNvJxbvDvHemftWg8gb9/view
Machine registry: https://drive.google.com/file/d/1lkW408qyID54WzJ-ydpqWpnAgzioL3KM/view
R8 seven-family archive (original specimen ZIPs not recopied into R9): https://drive.google.com/file/d/16wgejO8bJUiVw9HASJ6V09Bctd-5vV-W/view

## Limitations and release block
The exact `ROWGLASS_CUSTOMER_READY(1).zip` and its golden fixtures are still missing; recovered original HTML is not a replacement. Need genuine release three-way compatibility; Windows-native and deployed browser QA; actual authorized host data and privacy review; full source code review/CI, licensing, rollback, support and owner signoff. **The full R9 executable source is in Drive, not yet fully committed as a GitHub source tree.** No production website or original source was changed.