"""Only synthetic fixtures and archive-validation logic; no RowGlass product bytes."""
import importlib.util
from pathlib import Path
import stat
import unittest
import zipfile
import tempfile

MODULE = Path(__file__).resolve().parents[1] / 'verify_private_archive.py'
spec = importlib.util.spec_from_file_location('r12_gate', MODULE)
gate = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gate)


class PublicHarnessTests(unittest.TestCase):
    def test_contract_is_explicit_hold(self):
        data = gate.contract_read()
        self.assertFalse(data['github_public_branch_contains_paid_product'])
        self.assertEqual(data['status'], 'RESEARCH_HOLD')

    def test_sha_vector(self):
        self.assertEqual(gate.digest(b'abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')

    def test_reject_parent_traversal(self):
        for path in ('../stolen', 'x/../stolen', 'x/./stolen', 'x//stolen'):
            with self.subTest(path=path), self.assertRaises(ValueError):
                gate.validated_name(path)

    def test_reject_absolute_windows_and_nul(self):
        for path in ('/tmp/file', 'C:/file', 'x\\file', 'x\x00file', 'a/CON.txt'):
            with self.subTest(path=path), self.assertRaises(ValueError):
                gate.validated_name(path)

    def test_normal_path(self):
        self.assertEqual(str(gate.validated_name('macks_r11/tests/test_r11.py')), 'macks_r11/tests/test_r11.py')

    def test_case_collision_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'synthetic.zip'
            with zipfile.ZipFile(path, 'w') as z:
                z.writestr('a/file.txt', 'first')
                z.writestr('A/FILE.txt', 'second')
            with zipfile.ZipFile(path) as z, self.assertRaisesRegex(ValueError, 'case-colliding'):
                gate.members_checked(z)

    def test_symlink_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'synthetic.zip'
            with zipfile.ZipFile(path, 'w') as z:
                info = zipfile.ZipInfo('synthetic-link')
                info.create_system = 3
                info.external_attr = (stat.S_IFLNK | 0o777) << 16
                z.writestr(info, '../outside')
            with zipfile.ZipFile(path) as z, self.assertRaisesRegex(ValueError, 'symlink'):
                gate.members_checked(z)

    def test_wrong_archive_digest_fails_before_extraction(self):
        with tempfile.TemporaryDirectory() as tmp:
            source, dest = Path(tmp) / 'fake.zip', Path(tmp) / 'out'
            with zipfile.ZipFile(source, 'w') as z:
                z.writestr('fake.txt', 'synthetic only')
            with self.assertRaisesRegex(ValueError, 'size/hash mismatch'):
                gate.verify_archive(source, gate.contract_read(), dest)
            self.assertFalse(dest.exists())


if __name__ == '__main__':
    unittest.main()
