# Product screenshots

Direct browser captures from the Klarisma staging app, taken on 2026-11-19 in a
demo organization, "Nordwerk Logistik GmbH". Every person in it is invented
(Clara Brandt, Malte Berger, Ines Kramer, Jan Fischer, Lea Sommer, Paul
Winter). The accounts are username accounts without email addresses. The
activity "Wareneingangsprüfung und Abweichungsdokumentation", its tasks and
the uploaded materials are synthetic training content written for this demo.
No customer data, real names, real email addresses or SAP content appear.

Each folder holds the same views in one app language: `de/`, `en/`, `es/`.
Each guide uses the folder of its own language. The app runs in Business mode
(organization type Business), light theme, at 1440 × 900 (desktop) or
390 × 844 (phone, files ending in `-mobile`). The activity content stays
German in all three languages, because the activity language is German.

| File | Product view | Used in |
| --- | --- | --- |
| `activities-library.jpg` | Activities › My activities (trainer) | Quick start |
| `studio-frame.jpg` | Activity Studio, step Setup & material | Create an activity |
| `activity-publish.jpg` | Activity Studio, Review & publish after publishing | Preview and publish |
| `assign-audience.jpg` | Assign activity, step 1 | Assign an activity |
| `activity-review.jpg` | Activity review with learner list | Review learner progress |
| `review-decision.jpg` | Review of one learner's work: AI suggestion and decision (note typed, not sent) | Review and confirm learner work |
| `part-grades.jpg` | Grades of the parts, one AI grade changed by the trainer | Review and confirm learner work |
| `completion-settings.jpg` | Studio step Competencies & completion with details open | Set feedback and completion |
| `materials-library.jpg` | Materials › collection with two files | Add and find materials |
| `new-collection.jpg` | Materials › New collection (dialog cancelled) | Add and find materials |
| `workspace-mode.jpg` | Settings › General › Usage | Workspace modes |
| `space-activities.jpg` | Space › Activities | Workspaces and spaces |
| `space-members.jpg` | Space › Members dialog | Roles and access |
| `invite-members.jpg` | People with the Invite members menu | Invite and manage people |
| `member-accounts.jpg` | People › Create member accounts (dialog empty) | Invite and manage people |
| `my-learning.jpg` | My learning › Learning record (learner) | Understand My learning |
| `review-requests.jpg` | My learning › Review requests with one sent request | Understand My learning |
| `learner-home.jpg` | Learner home with Next up | Start and continue learning |
| `learner-activity-mobile.jpg` | Activity overview on a phone | Start and continue learning |

Use `ProductScreenshot.astro` for alt text, a short caption, and a full-size
link; add `narrow` for phone captures. Astro builds a WebP for the guide and
keeps the JPEG for the full-size view. Public builds do not include this
README.

To replace a shot, use the same demo organization on staging, never a real
workspace. The capture steps and the accounts are described in the Klarisma
root repository (`company/docs/qa/playbooks/docs-demo-organization.md`).
Check every visible field before you commit: no real names, emails, invite
links or setup codes.
