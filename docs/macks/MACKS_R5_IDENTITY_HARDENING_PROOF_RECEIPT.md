# R5 | Identity Ambiguity Lab Proof Receipt

**Authority:** EtherForge-owned MM-DAT-002 R1 and MM-DAT-003 R1 Google Drive source records; internal synthetic local tests only. **Decision:** research fork retained; original donor unsafe for the tested special/mixed-type keys; no canonical replacement, website deployment, or retail promotion.

## Donor source records
- MM-DAT-002 Drive: https://drive.google.com/file/d/1DBHq_4jZlLNjcS6HQv0eevBER7QCz-ku/view (raw text SHA256 `95a4f55ca221ff62795856c474f5d46872a547fb22b9586169983d019104adce`).
- MM-DAT-003 Drive: https://drive.google.com/file/d/1jGVmt4Xsb0Mmdw3g3LEEanVcvh0fX0A7/view (raw text SHA256 `a0734a4ad1b137c8bd33ab67157ae29b640a8a6beb9a4fcdff0e672d7530c125`).
- Exact source sections extracted into original snapshots, kept unchanged in the working package. Canonical Drive files were not edited.

## Reproduced failures in original MM-DAT-002
1. String ID `__proto__`: `status=OK`, `matched_keys=[]`, no diff even when field changed. Cause is a prototype-sensitive plain-object dictionary.
2. Two distinct IDs, numeric `1` and string `"1"`, in one dataset: `status=OK`, dictionary key collision, one record silently overwritten.

These are deterministic synthetic local findings, **not** claims of lost real customer data, exploited network behavior, or a defect in a vendor CRM.

## Lab remediation
- `macks/identity_lab/identity_hardened.js` is a new v0.1.1-lab fork, no official version promotion.
- Null-prototype key dictionaries preserve special string IDs; only explicit string keys accepted; blank/whitespace keys, mixed types, duplicates, missing/inherited keys, invalid rows and duplicate headers fail closed.
- `diff.js` is unchanged; only successful identity resolution reaches it.
- `contact_preflight.js` processes fictional contact similarity as **review suggestions only**, not actual Jobber matching, and emits no raw phone/email or automatic writes.

## Test receipts
- Local full suite: 30/30 passing `node --test tests/test_r5.js`, including 3 expected original-bug/ordinary baseline tests, 300 seeded permutations inside one test, and fictional inventory SKU as second *domain fixture*.
- Compact on-branch suite: 16/16 passing `node --test macks/identity_lab/test_stage.js` in local source tree.
- Test pass on the baseline reproduction means its defect was correctly observed; it does not mean the baseline is safe.
- Tested Node.js v22.16.0 in local environment; no independent external runner, actual second-host integration, CRM UI, real client, or live vendor test.

## Null-fire and limitations
Candidate matching relies on basic first/last-name, phone-digit and email-string heuristics. This is not sufficient for identity proof or autonomous upsert. No account was accessed, no lead was sent, no passwords/tokens collected, no client data imported, no outside source code copied. Avoid unbounded O(n×m) operation and output/retention of sensitive data in future work.

## Hold until
Clean extracted ZIP verification, independently integrated owned consumer, explicit data/rights/security and rollback review, versioned canonical-fix procedure, and owner approval. Original donor and GitHub main remain unchanged. No new SKU.
