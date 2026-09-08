# Sokra public docs

Public guides built with Astro Starlight. This project reads only
`src/content/docs/` and its own public assets. Internal Sokra docs are never
part of the build.

## Work on guides

Use Node 22.12 or newer. Run `npm ci`, then `npm run dev`. The preview path is
`/sokra.docs/` with the default Pages URL. Run `npm run check` and
`npm run build` before shipping. The build checks every internal link, heading
anchor, asset URL, public help topic, and page metadata, then checks that source
files did not enter the output. Search is built by Starlight/Pagefind.

## Publish

The Pages workflow builds and checks pull requests and pushes. After Pages is
enabled, set the repository variable `DOCS_PAGES_ENABLED=true`. A push to `main`
or a manual workflow run then publishes the checked `dist/` artifact. Until
that variable is set, CI only builds and checks. In repository Settings → Pages,
use **GitHub Actions** as the source. The current organization's
plan rejects Pages for this private source repo. Publication is pending the
owner's choice: make only this docs repo public, or keep it private and choose
another host. No visibility change is automatic. Never make the internal Sokra
repository public to enable Pages.

The workflow gets the real URL from `actions/configure-pages`, so a later
custom domain also changes the base path correctly. For a local custom-domain
build use `DOCS_SITE_URL=https://docs.sokra.io/ npm run build`.

Set up and verify DNS before assigning `docs.sokra.io` in Pages settings.
Then set the app's `NEXT_PUBLIC_DOCS_URL` to the verified docs URL and rebuild
the app. Do not add a CNAME file until the domain is configured.

## Keep links stable

`public/help-topics.json` is the public topic map. Keep its keys and paths
stable. The app imports a copy at `lib/docs/help-topics.json` so links work
without a network lookup. After a map change, copy it to the app and run
`node scripts/check-app-links.mjs` from this project in the Sokra workspace.

When a page must move, add its old path as an Astro redirect and keep it in the
build. Check any linked heading IDs too. Prefer preserving the current path
when only a page's title changes.

## Write for users

- One real task per page: outcome, access needed, steps, recovery, next task.
- Check the shipped UI and behavior. Internal plans alone are not proof.
- Use English for this first set. App links label the guide language; add full
  locale sections when translations are ready, without changing English paths.
- Use public or demo-only screenshots with no real student or school data.
- Product & Learning owns guide clarity; Engineering owns site and link health.
  A feature change includes its guide update and review of claims about access,
  saving, publishing, and learner progress.

The guides cover School, Enterprise, Higher Education, and personal Workspace
modes, plus their shared tasks. Mode and use-case wording is checked against the
workspace settings and mode profiles. Personal guidance covers use of an existing
Workspace, not subscription or general availability claims. Validate guide
wording against the target app release when deploying an older release.
