import {readdir, mkdir, copyFile, cp, rm} from 'node:fs/promises';
import {join} from 'node:path';
const root = process.cwd();
const output = join(root, 'dist');
await rm(output, {recursive: true, force: true});
await mkdir(output, {recursive: true});
const publicFile = /(?:\.html|\.js|\.css|\.png|\.svg|\.ico|\.webp|\.jpg|\.jpeg)$|^(?:robots\.txt|sitemap\.xml|_headers)$/i;
let count = 0;
for (const name of await readdir(root)) {
  if (!publicFile.test(name)) continue;
  await copyFile(join(root, name), join(output, name));
  count++;
}
await cp(join(root, 'assets'), join(output, 'assets'), {recursive: true});
console.log(`Built ${count} static website files and assets into dist/; no source, keys, or dependencies copied.`);
