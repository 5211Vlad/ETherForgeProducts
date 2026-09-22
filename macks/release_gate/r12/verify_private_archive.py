"""R12 public verification *harness*, not a copy of the paid RowGlass source.

Public CI may run --contract. An owner with a local, authorized R11 ZIP
may run --archive privately, then opt into --browser. No network, install,
source upload, customer data export, or deployment is performed by this script.
"""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import stat
import subprocess
import sys
import tempfile
import zipfile

CONTRACT = Path(__file__).with_name('release_contract.json')
MAX_ARCHIVE = 20 * 1024 * 1024
MAX_PAYLOAD = 5 * 1024 * 1024


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def validated_name(name: str) -> PurePosixPath:
    if (not name or '\\' in name or ':' in name or '\x00' in name or
            name.startswith('/') or name.startswith('//')):
        raise ValueError('unsafe archive member name')
    path = PurePosixPath(name)
    if any(part in ('', '.', '..') for part in name.rstrip('/').split('/')):
        raise ValueError('traversal/empty archive component')
    if any(part.rstrip(' .').upper().split('.')[0] in
           {'CON','PRN','AUX','NUL','COM1','LPT1'} for part in path.parts):
        raise ValueError('Windows reserved archive member')
    return path


def members_checked(z: zipfile.ZipFile) -> dict[str, zipfile.ZipInfo]:
    result = {}
    seen = set()
    total = 0
    for member in z.infolist():
        path = validated_name(member.filename)
        folded = str(path).rstrip('/').casefold()
        if folded in seen:
            raise ValueError('duplicate or case-colliding archive member')
        seen.add(folded)
        if (member.external_attr >> 16) & 0o170000 == stat.S_IFLNK:
            raise ValueError('symlink in release archive')
        if member.is_dir():
            continue
        if member.file_size > MAX_PAYLOAD:
            raise ValueError('oversize archive member')
        total += member.file_size
        if total > MAX_ARCHIVE:
            raise ValueError('archive expanded size exceeded')
        result[str(path)] = member
    return result


def contract_read() -> dict:
    c = json.loads(CONTRACT.read_text(encoding='utf-8'))
    required = ('private_archive_sha256', 'expected_candidate_sha256', 'expected_original_sha256')
    if (c['status'] != 'RESEARCH_HOLD' or
        c['public_ci_scope'] != 'HARNESS_AND_METADATA_ONLY_NOT_ROWGLASS_PRODUCT_QA' or
        c['github_public_branch_contains_paid_product'] is not False or
        c['windows_native_double_click'] != 'NOT_TESTED' or
        c['gumroad_live_attachment'] != 'NOT_VERIFIED' or
        c['expected_manifest_payload_count'] != 22 or
        any(not re.fullmatch(r'[0-9a-f]{64}', c[k]) for k in required)):
        raise ValueError('invalid or overstated public release contract')
    print('PUBLIC CONTRACT PASS; R11 PRODUCT RELEASE STATUS: RESEARCH_HOLD')
    return c


def verify_archive(source: Path, c: dict, destination: Path) -> int:
    if source.stat().st_size > MAX_ARCHIVE or digest(source.read_bytes()) != c['private_archive_sha256']:
        raise ValueError('R11 archive size/hash mismatch; no extraction')
    with zipfile.ZipFile(source) as z:
        members = members_checked(z)
        mpath = c['manifest_path']
        if mpath not in members:
            raise ValueError('missing signed-by-hash manifest')
        manifest = json.loads(z.read(mpath))
        if manifest['stage'] != 'R11' or manifest['status'] != 'RESEARCH_HOLD':
            raise ValueError('R11 status mismatch')
        hashes = manifest['files']
        if len(hashes) != c['expected_manifest_payload_count']:
            raise ValueError('payload count mismatch')
        prefixed = {'macks_r11/' + p for p in hashes}
        if set(members) != prefixed | {mpath}:
            raise ValueError('missing, unexpected, or duplicate archive payload')
        for rel, expected in hashes.items():
            member = 'macks_r11/' + rel
            validated_name(member)
            if not re.fullmatch(r'[0-9a-f]{64}', expected) or digest(z.read(member)) != expected:
                raise ValueError('payload digest mismatch: ' + rel)
        if hashes['BASELINE/ROWGLASS_CUSTOMER_READY(2)__ORIGINAL.zip'] != c['expected_original_sha256']:
            raise ValueError('original archive identity mismatch')
        if hashes['CANDIDATE/ROWGLASS_R11_FORMULA_GUARD_CANDIDATE__NOT_FOR_SALE.zip'] != c['expected_candidate_sha256']:
            raise ValueError('candidate archive identity mismatch')
        for name, info in members.items():
            target = destination.joinpath(*PurePosixPath(name).parts)
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(z.read(info))
    print(f'PRIVATE ARCHIVE PASS: {len(hashes)}/{len(hashes)} hashes; no source uploaded')
    return len(hashes)


def run_browser(root: Path, c: dict) -> None:
    test = root / c['local_browser_test']
    try:
        result = subprocess.run([sys.executable, str(test)], cwd=str(root),
                                capture_output=True, text=True, timeout=300)
    except subprocess.TimeoutExpired as exc:
        raise ValueError('browser tests exceeded 300-second limit') from exc
    tail = '\n'.join(result.stdout.splitlines()[-6:])
    print(tail)
    if result.returncode or c['expected_browser_receipt'] not in result.stdout:
        print(result.stderr[-1500:], file=sys.stderr)
        raise ValueError('browser suite did not return the required 92/92 receipt')
    print('PRIVATE SCOPED BROWSER REPLAY PASS; native Windows double-click NOT TESTED')


def main() -> None:
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument('--contract', action='store_true', help='public metadata contract only')
    cli.add_argument('--archive', type=Path, help='owner-provided private R11 ZIP; never uploaded')
    cli.add_argument('--browser', action='store_true', help='requires --archive and local Playwright/Chromium')
    opts = cli.parse_args()
    if opts.browser and opts.archive is None:
        cli.error('--browser requires --archive')
    if opts.archive is None and not opts.contract:
        cli.error('choose --contract or --archive')
    c = contract_read()
    if opts.archive is not None:
        with tempfile.TemporaryDirectory(prefix='r12-owner-verify-') as tmp:
            root = Path(tmp)
            verify_archive(opts.archive, c, root)
            if opts.browser:
                run_browser(root, c)
    print('RELEASE HOLD: Gumroad attachment, native Windows test and owner signoff pending')


if __name__ == '__main__':
    main()
