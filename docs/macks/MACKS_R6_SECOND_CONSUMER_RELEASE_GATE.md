# Mack's R6: independent quote export consumer and versioned identity repair candidate

**September 21, 2026. Research hold. Do not merge or deploy.** This is a source index and verification report. The complete executable source package is in Drive; GitHub does not yet carry its entire R6 source tree.

## Source-of-truth files

- Complete runnable Node.js ZIP and SHA256 manifest (03_WORKBENCH_UNTESTED_ZIPS): https://drive.google.com/file/d/1689CZGEsBMLHmQe_r51oJn7Pvg49ZzrN/view
- Proof receipt (04_PROOF_BENCH_AND_RECEIPTS): https://drive.google.com/file/d/1fC2CZ0ZVR2XFC482tWycdRKSS3EoQW5L/view
- Reproduction README/source map (00_INDEX_AND_SOURCE_MAP): https://drive.google.com/file/d/10dNacn5sdZ5tD_qgY4LyMCRJ3syFiHCd/view
- MM-DAT-002 candidate release notes (02_NEW_MODULE_BLUEPRINTS): https://drive.google.com/file/d/14uNvkh53G8HqJ9rpgxoeUXBkIPis_ku6/view

## New findings

1. In original owned MM-DAT-005 v0.1.0, CSV parsing of a column named `__proto__` reports the header but loses the row's property. Reproduced using synthetic CSV; not a claim of real customer harm. Consumer checks `Object.hasOwn` for every declared header and rejects silent field loss. Canonical CSV module unchanged; versioned hardening still required.
2. Original MM-DAT-002 v0.1.0 bug documented in R5. MM-DAT-002 `v0.1.1-rc1` is an isolated VERSIONED CANDIDATE using R5 hardening: null-prototype maps and explicit string key validation. Original canonical file unchanged. May change behavior for numeric IDs; never silently auto-upgrade.
3. Independent executable Quote Export Integrity Bench is a separate CLI application, not RowGlass or the R5 contact fixture. It consumes owned MM-DAT-005 original, MM-DAT-003 original and candidate MM-DAT-002; accepts fictional CSV with required `quote_id`, `quote_status` and optional `followup_due`. Aggregate JSON only. It makes no CRM/API calls, merges, network calls or file writes.

## Scoped proof

- Local Node test suite: 22/22 pass, including independent child-process CLI execution, donor regression, special-key ID retention, duplicate/blank holds, unexpected schema, redaction, SHA256, input immutability and 300 seeded reorders within one test.
- Clean ZIP extraction: 15/15 manifest hashes, 22/22 tests, JavaScript syntax checks and sample CLI PASS. ZIP integrity PASS.
- Drive round-trip downloaded ZIP matches local SHA256 `bcd0a27450801060e4437b1fb3434373e2967c59239d77bea37c00c67de87814` exactly.
- Fictional example: 3 rows before and after; one added, one removed, two modified records. No actual provider export, user lead data or customer consent involved.

## Gates still closed

Original RowGlass golden fixture retest with rc1, independently maintained second-user environment, actual authorized vendor CSV schema, client privacy/storage and support policy, dedicated MM-DAT-005 fix plus edge-case tests, Windows QA, rights/release review, actual website/browser/checkout and customer comprehension. Do not alter the master MODULES inventory, canonical packages, production website or archived originals. No new SKU earned.

Council review is a framework, not an independent multi-agent execution: Mercury (source limits), Vera (executable proof), Seren (reuse), Yin (fail-closed privacy), Yang (coherent system boundary), Arbiter (laboratory go only).