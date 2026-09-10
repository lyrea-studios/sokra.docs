# Lyrea public docs

Public guides built with Astro Starlight. This project reads only
`src/content/docs/` and its own public assets. Internal Lyrea docs are never
part of the build.

## Work on guides

Use Node 22.12+, then `npm ci`. The package scripts are the command source of truth:

- `npm run dev` — local server at `/sokra.docs/` under the default Pages URL.
- `npm run check` — Astro/type checks.
- `npm run build` — builds `dist/`, then checks internal links, heading anchors,
  asset URLs, public help topics, metadata, source-file exclusion, all three
  languages, guide/image parity, language switches, and Lyrea branding. Search
  is built by Starlight/Pagefind for each language.
- `npm run preview` — preview the built site.
- `npm run check:app-links` — check app links after updating the topic map.

Run `npm run check` and `npm run build` before shipping. The Pages workflow runs
the checks on pull requests and pushes. After enabling Pages, set
`DOCS_PAGES_ENABLED=true`; pushes to `main` and manual runs publish the checked
`dist/` artifact. Until then, CI only checks. In repository Settings → Pages,
choose **GitHub Actions**. With owner approval, this docs-only repository is
public; the app and internal Lyrea repositories remain private. The public site
is https://lyrea-studios.github.io/sokra.docs/.

`actions/configure-pages` supplies the URL and adjusts the base path for a later
custom domain. For a local custom-domain build, use
`DOCS_SITE_URL=https://docs.example.com/ npm run build`. Verify DNS before
assigning the domain, then set `NEXT_PUBLIC_DOCS_URL` in the app and rebuild.
Do not add a CNAME before domain configuration.

## Keep links stable

`public/help-topics.json` is the public topic map. Keep its keys and paths
stable, copy changes to the app's `lib/docs/help-topics.json`, then run
`npm run check:app-links` from this project in the Lyrea workspace. When moving
a page, add its old path as an Astro redirect, keep it in the build, and check
linked heading IDs. If only the title changes, preserve the current path.

## Write for users

- Give each page one real task: outcome, access, steps, recovery, and next task.
- Check shipped UI and behavior; internal plans are not proof.
- Keep all 18 pages complete in English, German (`de/`), and Spanish (`es`).
  Translate titles, navigation, alt text, and captions. Relative guide links
  keep the reader's language; the language menu opens the same guide.
- Use only public or demo-only screenshots with no private organization or
  personal data.
- Product & Learning owns guide clarity; Engineering owns site and link health.
  Feature changes include guide updates and review of access, saving,
  publishing, and learner-progress claims.

Guides cover School, Enterprise, Higher Education, and personal Workspace modes
plus shared tasks. Check mode and use-case wording against workspace settings
and mode profiles. Personal guidance is for an existing Workspace, not
subscription or general-availability claims. Validate wording against the
target app release when deploying an older release.

## Product images

Use real product captures from a local demo workspace beside the steps they
explain, with alt text and a short caption. Use
`src/components/ProductScreenshot.astro` for optimized images and full-size
links; see `src/assets/screenshots/README.md` for capture sources and rules.

The product name is Lyrea. Keep the repository, Pages path, and app hostname's
existing identifiers so links remain stable during the rename.
