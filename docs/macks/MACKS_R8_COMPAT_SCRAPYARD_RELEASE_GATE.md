# Mack's R8: recovered RowGlass source and compatibility repair

**2026-09-21 | RESEARCH HOLD | DO NOT MERGE, DEPLOY, OR SELL**

Full executable, reproducible package is in the existing Scrapyard workbench, not committed as a full source tree here: https://drive.google.com/file/d/16wgejO8bJUiVw9HASJ6V09Bctd-5vV-W/view . ZIP SHA256: `b0a55ddbd9cc69e44b8b18c8a804d3b11bebfc4befcf676a1e45a64586f23d70`; downloaded Drive copy matched local byte for byte.

Proof receipt: https://drive.google.com/file/d/1aMZIrzed4etGLeWYPYZdLC-1ea569cGO/view . Organized source map: https://drive.google.com/file/d/13JiP8dftvWrzWN82CoFSWhigBCCbjAkR/view . Machine-readable status and source hash registry: https://drive.google.com/file/d/1sUnitY8g9WxPpOP6Tvpe3vJvp0Ws1Vi_/view .

- Original RowGlass customer-ready ZIP **not recovered**. Three owned HTML Library artifacts located; (6) and (8) identical byte hashes. Original HTML frozen. Real source-level and browser replay performed on (6), NOT proof of missing release ZIP.
- Original MM-DAT-005 silently drops `__proto__` CSV column content. R7 null-prototype candidate preserved; R8 v0.1.2-rc2 uses `Object.defineProperty` on ordinary objects, retaining own special fields and more normal-prototype compatibility. Repaired LAB HTML also fixes exact-row reconstruction field loss. Both fixes remain versioned candidates, no canonical overwrite.
- Existing R6 MM-DAT-002 v0.1.1-rc1 hardening retained; original MM-DAT-003 remains pinned. No invented identity, no CRM writes.
- Fresh R8 source 23/23 Node tests and 15/15 local Chromium tests; R5 30/30, R6 22/22 and R7 specific 20/20 archive regressions; 36/36 package manifest and fresh-extraction check. Seven original VOX/VID/LAZ/WLD/NPC lab archives match previous hashes, ZIP integrity PASS, isolated tests 52/52, and copied byte for byte into family folders in R8 ZIP. None are independently host-tested or sellable.

Remaining gates: locate exact RowGlass release, original golden fixtures, test real owned host adapters and permissioned vendor exports, Windows QA, privacy and rights/security review, clean-room reconstruction, rollback, owner signoff. No master inventory rows, site, canonical modules, or original Drive files modified. Keep PR draft.