# Mack's R5 | Identity Ambiguity Laboratory

**INTERNAL RESEARCH HOLD.** Not a customer product, provider integration, or authorized automated merge. Main and canonical Google Drive originals remain unchanged.

## Provenance

The original `identity.js` and `diff.js` are source snapshots from the SOURCE sections of two EtherForge-owned Google Drive packages, not third-party software. The Drive files are the original authority; this directory is a disposable lab fork.

- MM-DAT-002 Row Identity Resolver R1 original: https://drive.google.com/file/d/1DBHq_4jZlLNjcS6HQv0eevBER7QCz-ku/view . Raw text-file SHA256: `95a4f55ca221ff62795856c474f5d46872a547fb22b9586169983d019104adce`.
- MM-DAT-003 Diff Engine R1 original: https://drive.google.com/file/d/1jGVmt4Xsb0Mmdw3g3LEEanVcvh0fX0A7/view . Raw text-file SHA256: `a0734a4ad1b137c8bd33ab67157ae29b640a8a6beb9a4fcdff0e672d7530c125`.

## Observed donor defects

When tested using the extracted original JavaScript in Node 22, `id='__proto__'` returned `status='OK'` but silently omitted a record. A numeric ID `1` next to textual ID `'1'` also returned `OK` and silently collapsed them. These inputs are synthetic. There is no evidence of an exploited deployed product or lost customer data.

## The lab fork

`identity_hardened.js` is a proposed MM-DAT-002 v0.1.1-lab fork. It uses a null-prototype dictionary and requires string IDs. It fails closed on duplicate, missing, whitespace-only, inherited or invalid-type identifiers, duplicate headers and invalid row shapes. `diff.js` remains a separate unchanged module and refuses non-OK identity resolution.

`contact_preflight.js` compares fictional contacts and emits review/hold decisions with row indexes and match-signal booleans. It returns neither raw phone/email fields nor write/merge authorization. Its heuristic is explicitly **not Jobber's internal matching algorithm**; phone and email normalization are insufficient for production identity assurance. `compareStableIds()` produces a summary-only descriptive diff for unique explicit string IDs.

## Reproduction

```sh
node --test macks/identity_lab/test_stage.js
node --check macks/identity_lab/identity_hardened.js
node --check macks/identity_lab/contact_preflight.js
```

The staging tests deliberately EXPECT the original defects in two baseline cases: a green result does not certify the donor as safe. In the associated sandbox ZIP a broader 30-test suite runs `node --test tests/test_r5.js`. That suite includes a 300-trial seeded reordering test and a synthetic inventory-domain comparison, **not** independent second-host integration.

## Release constraints

No live CRM API, real customer information, RowGlass UI, client deployment, external security assessment, or genuine second-host integration was tested. Runtime is O(existing records × incoming records) for the candidate comparison, so limit workload size and privacy retention before any pilot. No retail SKU, canonical replacement or website deployment is authorized by these results.

Before promotion: independent actual consumer integration, explicit permission for disposable test leads, threat/privacy review, versioned donor repair and rollback receipt, owner/licensing/support signoff. Null results and no-action decisions are acceptable.
