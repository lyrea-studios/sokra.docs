# Public docs roadmap

## Now

- Maintain the Astro Starlight guides for School, Enterprise, Higher Education, and personal Workspace modes.
- Keep all 18 pages complete in English, German, and Spanish with translated titles, navigation, alt text, captions, and language-stable relative links.
- Keep the public topic map, app copy, redirects, heading anchors, Pagefind search, and Lyrea branding aligned.
- Use only public or demo-only screenshots and keep internal Lyrea documentation outside the build.

## Next

- Run `npm run check` and `npm run build` before shipping; verify links, assets, metadata, locale parity, image parity, language switches, and source exclusion.
- After topic-map changes, copy the map to the app and run `node scripts/check-app-links.mjs` from the Lyrea workspace.

## Later

- Enable Pages publishing only after its repository setting and `DOCS_PAGES_ENABLED=true` gate are approved.
- Configure a custom domain only after DNS is verified; do not add a CNAME before that gate.

## Done

- Public guides, help topics, product screenshots, localized navigation, and static search are served from this docs-only repository.
- Page moves retain old paths through Astro redirects, and title-only changes preserve existing paths.
