# Product screenshots

These JPEGs are direct browser captures from the local Sokra demo app on
2026-09-08. They show synthetic demo content in German and dark mode. Captures
exclude browser chrome, development badges, and unrelated workspace content. No
image generation, mock UI, or private customer data is used.

| File | Product view | Notes |
| --- | --- | --- |
| `materials-library.jpg` | Workspace → Materials → Organization | Collection, upload, tabs, and search controls |
| `new-collection.jpg` | Materials → New collection | Unsaved sample name “Einführung in SAP”; dialog was cancelled |
| `activities-library.jpg` | Workspace → Activities | Three synthetic SAP activities; Katrin Weber is a seeded demo user |
| `activity-studio.jpg` | Published activity → Studio → Overview | Read-only Enterprise example, no draft created or edited |
| `activity-preview.jpg` | Published activity → Author preview | Start card only; no learner attempt started |
| `workspace-mode.jpg` | Settings → Workspace profile | Enterprise and existing use cases; no settings changed |

Use `ProductScreenshot.astro` for descriptive alt text, a short caption, and a
full-size link. Astro builds a WebP for the guide and retains the source JPEG
for the full-size view. Public builds do not include this README.

When replacing a shot, use a local demo account, wait for the page to load,
inspect every visible field, and capture only the relevant panel. Keep the
image true to the product. Update its caption when labels or layout change.
