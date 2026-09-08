import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';

const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'dist');
const base = new URL(process.env.DOCS_SITE_URL || 'https://lyrea-studios.github.io/sokra.docs/');
base.pathname = base.pathname.replace(/\/+$/, '') + '/';
const files = await readdir(output, { recursive: true });
const pages = new Map();
const links = [];

for (const file of files) {
  // Only the built public site may ship. Source/config/private docs must stay out.
  assert(!/(^|\/)(?:\.git|\.env[^/]*|company|tasks|node_modules)(\/|$)|\.(?:mdx?|tsx?|map)$/.test(file), `Private/source file in output: ${file}`);
  if (!file.endsWith('.html')) continue;
  const html = await readFile(path.join(output, file), 'utf8');
  const ids = new Set();
  const route = file === 'index.html' ? '' : file.replace(/index\.html$/, '');
  const url = new URL(route, base);
  let title = false;
  let description = false;
  let redirect = false;
  function visit(node) {
    const attrs = Object.fromEntries((node.attrs || []).map(({ name, value }) => [name, value]));
    if (attrs.id) ids.add(attrs.id);
    if (node.tagName === 'title') title = node.childNodes?.some(child => child.value?.trim());
    if (node.tagName === 'meta' && attrs.name === 'description' && attrs.content) description = true;
    if (node.tagName === 'meta' && attrs['http-equiv']?.toLowerCase() === 'refresh') redirect = true;
    for (const attr of ['href', 'src']) {
      // The host serves 404.html at any missing URL; its synthetic canonical
      // is not a navigable guide. Still check every real link on that page.
      if (file === '404.html' && node.tagName === 'link' && attrs.rel === 'canonical') continue;
      if (attrs[attr]) links.push({ from: file, url: new URL(attrs[attr], url) });
    }
    for (const child of node.childNodes || []) visit(child);
  }
  visit(parse(html));
  assert(title, `Missing title: ${file}`);
  // Starlight's error page intentionally has different metadata.
  if (file !== '404.html' && !redirect) assert(description, `Missing description: ${file}`);
  pages.set(file, ids);
}

const errors = [];
for (const { from, url } of links) {
  if (url.origin !== base.origin) continue;
  if (!url.pathname.startsWith(base.pathname)) {
    errors.push(`${from}: link escaped site base: ${url.pathname}`);
    continue;
  }
  let file = decodeURIComponent(url.pathname.slice(base.pathname.length));
  if (!file || file.endsWith('/')) file += 'index.html';
  else if (!path.extname(file)) file += '/index.html';
  try {
    assert((await stat(path.join(output, file))).isFile());
    if (url.hash && pages.has(file)) assert(pages.get(file).has(decodeURIComponent(url.hash.slice(1))));
  } catch {
    errors.push(`${from}: missing ${url.pathname}${url.hash}`);
  }
}

const topics = JSON.parse(await readFile(path.join(output, 'help-topics.json'), 'utf8'));
for (const [topic, route] of Object.entries(topics)) {
  assert(typeof route === 'string' && !route.startsWith('/') && !route.includes('..') && !route.includes('?'), `Unsafe help topic: ${topic}`);
  assert(pages.has(route + 'index.html'), `Help topic has no page: ${topic}`);
}
assert(pages.size >= 12, 'Expected home and eleven guides');
assert(files.some(file => file.includes('pagefind') && file.endsWith('.js')), 'Search was not built');
assert.equal(errors.length, 0, errors.join('\n'));
console.log(`PASS: ${pages.size} pages, ${links.length} links/assets, ${Object.keys(topics).length} app topics, search, metadata, and public output boundary.`);
