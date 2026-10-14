# sokra.docs

Public user guides (Astro Starlight). This repository is public. Rules, review tiers and human gates: [root AGENTS.md](../AGENTS.md).

- Install (Node 22.12+): `npm ci`. Run: `npm run dev`.
- Inner loop: `npm run check`.
- Pre-merge: `npm run check`, `npm run build` (link, locale and branding checks).
- Pitfall: only `src/content/docs/` and public assets ship; never add internal docs.
- Pitfall: keep `public/help-topics.json` keys and paths stable; add a redirect when a page moves.
