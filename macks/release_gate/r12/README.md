# R12 safe public/private RowGlass release gate

**RESEARCH HOLD. Public CI green does NOT mean the RowGlass product passed CI.**

`ETherForgeProducts` is public. The R11 private handoff contains the paid customer ZIP and complete browser app and must NOT be committed into that repository. The prior R11 workflow template assumed private release bytes were checked into GitHub. Do not use it in this public repository.

Public files here include only metadata, provenance SHA-256, a generic validator, synthetic tests and a non-deployment CI workflow. `macks-r12-public-harness.yml` verifies this generic harness across Ubuntu and Windows, **NOT** RowGlass, its checkout attachment or native Windows double-click. It has no paid source, browser install, tokens, secret downloads or deployments.

Owner-only, local validation of an authorized copy of the exact R11 package (Python 3.12 recommended):

```
python macks/release_gate/r12/verify_private_archive.py --archive "PATH/TO/macks_r11_rowglass_release_guard_handoff.zip"
```

For local Chromium tests, first provide Playwright 1.57.0 and its Chromium browser in your own controlled environment, then append `--browser`. This replays the existing 92 scoped R11 browser tests locally but does not simulate Windows double-click or Gumroad delivery. The script extracts only to a temporary location, checks SHA-256 and refuses path traversal, case collisions, symlinks and unexpected payloads; it does not upload files or edit Gumroad.

No binary release, full paid application, customer data or private download links are stored in this public branch. R11 complete handoff remains in the owner's Drive research folder. A **private** authorized repository or controlled encrypted build runner is required before genuine cross-platform full-product CI. Nothing here approves merging/deploying or replacing the product attachment.
