import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';

const root = path.resolve(import.meta.dirname, '..');
const source = path.join(root, 'src/content/docs');
const output = path.join(root, 'dist');
const base = new URL(process.env.DOCS_SITE_URL || 'https://lyrea-studios.github.io/sokra.docs/');
base.pathname = base.pathname.replace(/\/+$/, '') + '/';
const localePrefixes = { en: '', de: 'de/', es: 'es/' };
const sourceFiles = (await readdir(source, { recursive: true })).filter(file => /\.mdx?$/.test(file));
const slugs = sourceFiles.filter(file => !/^(de|es)\//.test(file)).map(file => file.replace(/\.mdx?$/, '')).sort();
const attrsOf = node => Object.fromEntries((node.attrs || []).map(({ name, value }) => [name, value]));
const routeOf = slug => slug === 'index' ? '' : slug + '/';
let figures = 0;
let checked = 0;
const imageCounts = new Map();

for (const [locale, prefix] of Object.entries(localePrefixes)) {
  const actual = sourceFiles.filter(file => prefix ? file.startsWith(prefix) : !/^(de|es)\//.test(file))
    .map(file => file.slice(prefix.length).replace(/\.mdx?$/, '')).sort();
  assert.deepEqual(actual, slugs, `Missing or extra source translations: ${locale}`);
  for (const slug of slugs) {
    const route = prefix + routeOf(slug);
    const file = path.join(output, route, 'index.html');
    const document = parse(await readFile(file, 'utf8'));
    const pageUrl = new URL(route, base);
    const languageOptions = new Set();
    let htmlLang;
    let count = 0;
    let selectedLanguage;
    const visibleText = [];
    const accessibleText = [];
    const assetUrls = [];
    function walk(node, inContent = false, inFigure = false) {
      if (['script', 'style'].includes(node.tagName)) return;
      const attrs = attrsOf(node);
      if (node.tagName === 'html') htmlLang = attrs.lang;
      if (node.nodeName === '#text') visibleText.push(node.value);
      for (const key of ['alt', 'aria-label', 'title']) if (attrs[key]) accessibleText.push(attrs[key]);
      inContent ||= (attrs.class || '').split(' ').includes('sl-markdown-content');
      inFigure ||= node.tagName === 'figure' && (attrs.class || '').includes('product-screenshot');
      if (node.tagName === 'figure' && inFigure) count++;
      if (node.tagName === 'option' && attrs.value?.startsWith('/')) {
        languageOptions.add(attrs.value);
        if ('selected' in attrs) selectedLanguage = attrs.value;
      }
      if (inFigure && node.tagName === 'img') {
        assert(attrs.alt?.length > 15, `Missing screenshot alt text: ${route}`);
        assert(Number(attrs.width) > 0 && Number(attrs.height) > 0, `Missing image size: ${route}`);
        assetUrls.push(new URL(attrs.src, pageUrl));
      }
      if (inFigure && node.tagName === 'a') assetUrls.push(new URL(attrs.href, pageUrl));
      if (inContent && node.tagName === 'a' && attrs.href) {
        const url = new URL(attrs.href, pageUrl);
        if (url.origin === base.origin) {
          assert(!url.pathname.includes('//'), `Double slash: ${route} → ${url.pathname}`);
          const target = url.pathname.slice(base.pathname.length);
          if (!target.startsWith('_astro/')) {
            const targetLocale = /^(de|es)\//.exec(target)?.[1] || 'en';
            assert.equal(targetLocale, locale, `Guide link changes language: ${route} → ${target}`);
          }
        }
      }
      for (const child of node.childNodes || []) walk(child, inContent, inFigure);
    }
    walk(document);
    assert.equal(htmlLang, locale, `Wrong page language: ${route}`);
    const expectedOptions = Object.values(localePrefixes).map(p => new URL(p + routeOf(slug), base).pathname);
    assert.deepEqual([...languageOptions].sort(), expectedOptions.sort(), `Wrong language links: ${route}`);
    // HTML selects the first option when none has an explicit selected attribute.
    assert.equal(selectedLanguage ?? [...languageOptions][0], pageUrl.pathname, `Wrong selected language: ${route}`);
    assert(!/\bsokra(?:s|'s)?\b/i.test([...visibleText, ...accessibleText].join(' ')), `Old visible brand: ${route}`);
    const text = visibleText.join(' ');
    assert(!/This content is not available in your language yet|Dieser Inhalt ist noch nicht|Este contenido aún no/.test(text), `Translation fallback: ${route}`);
    if (locale === 'en') imageCounts.set(slug, count);
    else assert.equal(count, imageCounts.get(slug), `Missing translated image: ${route}`);
    for (const url of assetUrls) {
      assert.equal(url.origin, base.origin, `External screenshot: ${route}`);
      assert(url.pathname.startsWith(base.pathname), `Image escaped base: ${url}`);
      assert((await stat(path.join(output, decodeURIComponent(url.pathname.slice(base.pathname.length))))).isFile());
    }
    figures += count;
    checked++;
  }
}
assert.equal(slugs.length, 18, 'Expected home and all seventeen guides in each language');
assert(figures >= 27, 'Expected nine screenshots per language');
console.log(`PASS: ${checked} translated pages, ${figures} screenshot figures, language switches, local links, source parity, and Lyrea branding.`);
