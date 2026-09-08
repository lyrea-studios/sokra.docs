import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Run in the Sokra workspace after changing either copy of the public map.
const source = JSON.parse(await readFile(new URL('../public/help-topics.json', import.meta.url), 'utf8'));
const app = JSON.parse(await readFile(new URL('../../sokra.webapp/lib/docs/help-topics.json', import.meta.url), 'utf8'));
assert.deepEqual(app, source, 'App help topics drifted. Sync the public topic map before shipping.');
console.log(`PASS: all ${Object.keys(source).length} app topics match the published map.`);
