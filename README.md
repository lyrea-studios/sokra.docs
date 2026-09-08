# Lyrea public docs

Public guides built with Astro Starlight. This project reads only
`src/content/docs/` and its own public assets. Internal Lyrea docs are never
part of the build.

## Work on guides

Use Node 22.12 or newer. Run `npm ci`, then `npm run dev`. The preview path is
`/sokra.docs/` with the default Pages URL. Run `npm run check` and
`npm run build` before shipping. The build checks every internal link, heading
anchor, asset URL, public help topic, and page metadata, then checks that source
files did not enter the output. It also checks all three languages, guide and
image parity, language switches, and visible Lyrea branding. Search is built
by Starlight/Pagefind for each language.

## Publish

The Pages workflow builds and checks pull requests and pushes. After Pages is
enabled, set the repository variable `DOCS_PAGES_ENABLED=true`. A push to `main`
or a manual workflow run then publishes the checked `dist/` artifact. Until
that variable is set, CI only builds and checks. In repository Settings → Pages,
use **GitHub Actions** as the source. This docs-only repository is public with
the owner's approval because the current plan requires it for Pages. The app
and internal Lyrea repositories remain private. The public site is served at
https://lyrea-studios.github.io/sokra.docs/.

The workflow gets the real URL from `actions/configure-pages`, so a later
custom domain also changes the base path correctly. For a local custom-domain
build use `DOCS_SITE_URL=https://docs.example.com/ npm run build`.

Set up and verify DNS before assigning a custom domain in Pages settings.
Then set the app's `NEXT_PUBLIC_DOCS_URL` to the verified docs URL and rebuild
the app. Do not add a CNAME file until the domain is configured.

## Keep links stable

`public/help-topics.json` is the public topic map. Keep its keys and paths
stable. The app imports a copy at `lib/docs/help-topics.json` so links work
without a network lookup. After a map change, copy it to the app and run
`node scripts/check-app-links.mjs` from this project in the Lyrea workspace.

When a page must move, add its old path as an Astro redirect and keep it in the
build. Check any linked heading IDs too. Prefer preserving the current path
when only a page's title changes.

## Write for users

- One real task per page: outcome, access needed, steps, recovery, next task.
- Check the shipped UI and behavior. Internal plans alone are not proof.
- Keep all 18 pages complete in English, German (`de/`), and Spanish (`es/`).
  Translate titles, navigation, alt text, and captions too. Relative guide links
  keep the reader's language; the language menu opens the same guide.
- Use public or demo-only screenshots with no private organization or personal data.
- Product & Learning owns guide clarity; Engineering owns site and link health.
  A feature change includes its guide update and review of claims about access,
  saving, publishing, and learner progress.

The guides cover School, Enterprise, Higher Education, and personal Workspace
modes, plus their shared tasks. Mode and use-case wording is checked against the
workspace settings and mode profiles. Personal guidance covers use of an existing
Workspace, not subscription or general availability claims. Validate guide
wording against the target app release when deploying an older release.

## Product images

Use real product captures from a local demo workspace. Place each image beside
the steps it explains, with alt text and a short caption. Use
`src/components/ProductScreenshot.astro` for optimized images and full-size
links; see `src/assets/screenshots/README.md` for capture sources and rules.

The product name is Lyrea. The current repository, Pages path, and app hostname
still use their existing identifiers so links keep working during the rename.
