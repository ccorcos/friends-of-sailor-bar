# Friends of Sailor Bar

Public website for Friends of Sailor Bar in Fair Oaks, California.

- **Website:** https://sailorbar.exe.xyz/
- **Repository:** https://github.com/ccorcos/friends-of-sailor-bar
- **Hosting:** an exe.dev VM, served by Next.js on port 8000
- **Production service:** `sailorbar.service` under systemd

## Creating and editing content

Most editorial content is Markdown in the `content/` directory. Changes to these files are read at request time, so content does not need to be copied into application code.

| Content | Directory | Public route |
| --- | --- | --- |
| Events | `content/events/` | `/events/<slug>` |
| Projects | `content/projects/` | `/projects/<slug>` |
| Stories and updates | `content/updates/` | `/stories/<slug>` |
| About pages | `content/about/about/` | `/about/<slug>` |
| Sailor Bar visitor pages | `content/about/sailor-bar/` | `/sailor-bar/<slug>` |
| Wildlife pages | `content/about/wildlife/` | `/wildlife/<slug>` |
| History pages | `content/about/history/` | `/history/<slug>` |
| Partner pages | `content/about/partners/` | `/partners/<slug>` |

Each directory has a `__template.md` file showing the required fields. To add an item:

1. Copy the appropriate `__template.md`.
2. Name the new file with a lowercase, hyphen-separated slug, such as `river-cleanup-2027.md`.
3. Fill in every frontmatter field between the `---` markers.
4. Write the page content below the frontmatter.
5. Run `npm run content:validate` before committing.

The filename is the URL slug. Do not add a `slug` field to the frontmatter and do not put a level-one (`#`) heading in the body—the `title` field supplies the page heading.

Files publish as soon as they are deployed. While drafting, prefix the filename with `_`, for example `_river-cleanup-2027.md`; underscore-prefixed files and `__template.md` are not published.

### Events

```md
---
title: "River Cleanup"
date: "2027-01-16"
time: "9:30 AM–12:00 PM"
location: "Oak gathering area"
---

Bring gloves, water, and sturdy shoes. All ages are welcome.
```

Event dates must be quoted and use `YYYY-MM-DD`. The site automatically separates upcoming and past events at local midnight in the `America/Los_Angeles` time zone.

### Projects

```md
---
title: "Project title"
image: "/images/project-photo.jpg"
order: 10
---

Project details go here.
```

`order` controls the order on the project index. Use `image: ""` if there is no image.

### Stories and updates

```md
---
title: "Update title"
image: "/images/update-photo.jpg"
publishedAt: "2026-09-03"
---

Update text goes here.
```

`publishedAt` must be quoted and use `YYYY-MM-DD`.

### About, Sailor Bar, Wildlife, History, and Partners

```md
---
title: "Page title"
image: ""
order: 10
---

Page text goes here.
```

Use `index.md` for a section's landing page. Other filenames become child routes. `order` controls the page's position in directory listings.

### Markdown, images, files, and video

Standard Markdown is supported, including paragraphs, headings starting at `##`, lists, emphasis, links, and images. Raw HTML is not supported.

- Put website photography in `public/images/` and reference it as `/images/filename.jpg`.
- Put PDFs and supporting media in `public/files/` and reference them as `/files/filename.pdf`.
- Use descriptive image alt text: `![A great blue heron in a tree](/images/heron.jpg)`.
- Put a YouTube link in its own paragraph to turn it into an embedded video.
- YouTube links inside a sentence remain normal links.

Example download link:

```md
[Download the event flyer](/files/event-flyer.pdf)
```

Example embedded video:

```md
[Watch the cleanup recap](https://www.youtube.com/watch?v=VIDEO_ID)
```

### Collection landing pages

The files `content/events/index.md`, `content/projects/index.md`, and `content/updates/index.md` control their collection headings and introductory text. They accept a `title` and an optional `description`.

## Local development

Requires Node.js 24.

```bash
npm install
npm run dev
```

The development server listens on `http://localhost:8000`.

Useful checks:

```bash
npm run content:validate
npm run test:content
npm run lint
npm run build
```

Run `content:validate` whenever Markdown or referenced media changes. It checks frontmatter, dates, filenames, links between records, and local asset paths.

## Publishing to production

There is no automatic GitHub deployment. Production currently runs directly from this repository at:

```text
/home/exedev/friends-of-sailor-bar
```

After updating the production checkout:

```bash
git pull --ff-only
npm install
npm run content:validate
npm run lint
npm run build
sudo systemctl restart sailorbar
systemctl status sailorbar
```

The service definition is stored in `sailorbar.service`. Production logs are available with:

```bash
journalctl -u sailorbar -f
```

Markdown-only changes are loaded at request time, but running the complete deployment sequence keeps code, dependencies, validation, and the production build synchronized.

## Forms and stored data

Email subscriptions and volunteer submissions are stored in SQLite at `data/sailorbar.db` on the production VM. Database files and `.env` files are intentionally excluded from Git. Back up the database separately before replacing or rebuilding the VM.

The relevant endpoints are:

- `POST /api/subscribe`
- `POST /api/volunteer`

## Code overview

- `app/` — Next.js routes, layouts, API handlers, and global CSS
- `components/` — shared React components and forms
- `content/` — runtime Markdown content
- `lib/content/` — content loading, schemas, caching, and Markdown compilation
- `public/images/` — website photography
- `public/files/` — PDFs and supporting media
- `scripts/validate-content.mjs` — content validation
- `data/` — runtime SQLite data
