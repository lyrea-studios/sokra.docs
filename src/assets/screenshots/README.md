# Product screenshots

These JPEGs are direct browser captures from the local Lyrea demo app on
2026-09-08. They show synthetic demo content in German and dark mode. Captures
exclude browser chrome, development badges, and unrelated workspace content. No
image generation, mock UI, or private customer data is used.

| File | Product view | Notes |
| --- | --- | --- |
| `materials-library.jpg` | Workspace → Materials → Organization | New collection and upload buttons, plus material search |
| `new-collection.jpg` | Materials → New collection | Unsaved sample name “Einführung in SAP”; dialog was cancelled |
| `activities-library.jpg` | Workspace → Activities | Three synthetic SAP activities; Katrin Weber is a seeded demo user |
| `activity-studio.jpg` | Published activity → Studio → Overview | Read-only Enterprise example, no draft created or edited |
| `activity-preview.jpg` | Published activity → Author preview | Start card only; no learner attempt started |
| `workspace-mode.jpg` | Settings → General → Use cases | Existing use-case choices; no settings changed |
| `organization-mode.jpg` | Settings → General → Organization mode | Enterprise selector only; no settings changed |
| `space-activities.jpg` | Team space → Activities | Space tabs and three synthetic SAP activities; seeded demo names only |
| `space-review.jpg` | Team space → Review | Navigation and review heading only; the queue failed to load and is excluded. This capture does not show or validate assessment data |

Use `ProductScreenshot.astro` for descriptive alt text, a short caption, and a
full-size link. Astro builds a WebP for the guide and retains the source JPEG
for the full-size view. Public builds do not include this README.

The nine captures appear across seven guides in each of English, German, and
Spanish. Alt text, captions, and full-size link labels match the guide language;
the captured product UI remains German.

When replacing a shot, use a local demo account, wait for the page to load,
inspect every visible field, and capture only the relevant panel. Keep the
image true to the product. Update its caption when labels or layout change.
