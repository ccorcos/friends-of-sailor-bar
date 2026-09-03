# Markdown content architecture plan

Date: September 3, 2026

## Implementation status

The runtime Markdown foundation and initial content conversion are implemented in the working tree:

- [x] Server-only file discovery, modification-time caching, frontmatter schemas, Markdown compilation, and loader tests.
- [x] Event, project, update, and promoted About/wildlife/history Markdown files, with collection templates.
- [x] `npm run content:validate` for schemas, malformed Markdown, relationships, templates, and local assets.
- [x] Promoted-page coverage verification in `migration:verify`.
- [x] Route-by-route Markdown cutover for the homepage, collections, and promoted About/wildlife/history pages, with request-time rendering.
- [x] Removal of superseded SQLite/TypeScript editorial sources after migration checks.

The faithful `/archive` snapshot remains independent and is still the required source record during the remaining cutover.

Move the editorial content to Markdown with validated frontmatter. Keep SQLite only for mutable form submissions (`subscribers` and `volunteers`). This is a good fit for the site and is technically straightforward.

The important implementation detail is to treat Markdown as **runtime content**, not as imported source code. A request-time loader should read files from disk, validate frontmatter, compile Markdown, and cache the compiled result by file modification time. Routes that consume this content must remain dynamic so Next.js does not freeze their output during `next build`.

I recommend a `content/` namespace rather than adding content directories directly beside `app/`, `lib/`, and `public/`:

```text
content/
  events/
    __template.md
    real-wildlife-encounters.md
  projects/
    __template.md
    butterfly-sanctuary.md
  updates/
    __template.md
    welcoming-path-turtle-pond.md
  pages/
    about/
      index.md
      boat-launch.md
      turtle-pond.md
    wildlife/
      index.md
      birding.md
      plant-life.md
      salmon-and-steelhead.md
    history/
      index.md
      nisenan-history.md
      mining-and-dredging.md
```

The same loader would work with top-level `events/`, `projects/`, and similar directories if that layout is preferred. The extra `content/` level simply makes the boundary between application code and editable material clearer.

## Why this improves the current site

Content currently comes from four different mechanisms:

- Event metadata is in SQLite, while event article copy is separately stored in `lib/event-content.ts`.
- Projects are TypeScript objects in `lib/projects.ts`.
- Updates are SQLite rows, with some detail pages replaced at render time by legacy HTML mappings.
- About, wildlife, and history pages are route-specific React wrappers around `data/archive.json`.

Markdown would give these content types one editing model, one renderer, and one validation path. It also removes editorial content from database migrations and TypeScript bundles.

The faithful `/archive` snapshot should remain independent during this migration. It is the permanent source record required by the migration policy. Verification scripts keep promoted-page source mappings outside the author-facing Markdown frontmatter.

## Proposed content contracts

The filename is the canonical slug. A frontmatter `slug` field should not be allowed because two sources of truth eventually drift.

### Event

```md
---
title: "New Year River Clean-up"
date: "2027-01-16"
time: "9:30 AM–12:00 PM"
location: "Sailor Bar · Illinois Avenue entrance"
---

Event description and [supporting links](/files/example.pdf) go here.
```

Upcoming versus past remains computed from the ISO date in the `America/Los_Angeles` time zone. Event files publish immediately. Templates and files with names beginning with `_` are excluded from public queries, so authors can use an underscore-prefixed filename while drafting.

### Project

```md
---
title: "Butterfly Sanctuary"
image: "/images/projects/butterfly-sanctuary.jpg"
order: 20
---

Full project detail goes here.
```

### Update

```md
---
title: "A more welcoming path to Turtle Pond"
image: "/images/updates/welcoming-path-turtle-pond.jpg"
publishedAt: "2026-08-24"
---

Full update goes here.
```

The content directory can be named `updates` while the existing public route remains `/stories`. Alternatively, `/updates` can become canonical with permanent redirects from `/stories` and `/stories/[slug]`. That URL decision is independent of the storage migration.

### About, wildlife, history, and partner pages

```md
---
title: "Boat Launch"
image: ""
order: 50
---

Page body goes here.
```

`index.md` maps to the section root. Other filenames map to child routes. The about-directory navigation is assembled from each page's `title` and `order`.

## Runtime loading and caching

Create a server-only content module, for example:

```text
lib/content/
  files.ts       path resolution, directory scans, cache
  schemas.ts     frontmatter types and validation
  markdown.ts    Markdown compilation
  events.ts
  projects.ts
  updates.ts
  pages.ts
```

Recommended behavior:

1. Resolve every requested path beneath a fixed content root and reject traversal.
2. `stat` the file and calculate a fingerprint such as `mtimeMs:size`.
3. Return the cached parsed document when the fingerprint is unchanged.
4. Otherwise read, parse, validate, compile, and replace that cache entry.
5. For collection indexes, scan the directory on each request and use the per-file cache. At this site's scale, a directory scan and file stats are negligible; unchanged Markdown is not reparsed.
6. Remove deleted files from collection results immediately. A new file appears on the next request without rebuilding or restarting.

Use a normal in-process `Map`, not Next's persistent route/data cache, for this layer. Next's cache does not know that somebody edited a file outside the request lifecycle, whereas the modification-time check provides deterministic invalidation.

All pages that depend on Markdown—including the homepage and collection indexes—must explicitly render at request time. The present production build already demonstrates why: `/projects`, `/about`, `/wildlife`, and `/history` are prerendered with year-long cache headers, while `/events` and `/stories` are dynamic. Without changing that behavior, edits to Markdown-backed static pages would remain invisible until another build.

The Node runtime is required. This approach is appropriate for the current systemd deployment, where `next start` runs from the working tree. A future container or serverless deployment would need `content/` mounted as persistent runtime storage.

## Markdown renderer

Use standard Markdown rather than MDX. MDX would allow executable components in editorial files and would make runtime compilation and security more complicated than this site needs.

A small server-side pipeline can use:

- `gray-matter` for frontmatter
- `zod` for collection-specific validation
- Unified/Remark with GitHub-flavored Markdown support
- a controlled HTML renderer with raw HTML disabled by default

The renderer should support headings, paragraphs, lists, emphasis, links, blockquotes, images, and tables. The page title comes from frontmatter, so the validator should reject a second level-one heading in the body. Local links and media references should be checked by the validation command.

Add commands such as:

```json
{
  "content:validate": "node scripts/validate-content.mjs",
  "content:new-event": "node scripts/new-content.mjs event"
}
```

The first command validates all files, duplicate routes, dates, references, and media. The second is optional convenience around copying `__template.md`; manual copying remains fully supported.

## Public assets

Store site images under `public/images/` and downloadable documents under `public/files/`. Reference them from Markdown with root-relative paths such as `/images/projects/butterfly-sanctuary.jpg` or `/files/event-flyer.pdf`.

The content validator checks these local references against `public/`. Adding or replacing public assets may require rebuilding and restarting the production Next.js service before they are available.

## Route design

Keep specialized layouts for each collection, but make their data source uniform:

- `/events` and `/events/past` query Markdown event metadata.
- `/events/[slug]` renders one Markdown event.
- `/projects` and `/projects/[slug]` do the same for projects.
- `/stories` and `/stories/[slug]` do the same for updates.
- `/about`, `/wildlife`, and `/history` render their `index.md` files.
- Child routes can use small shared catch-all adapters, such as `app/about/[...slug]/page.tsx`, backed by `content/pages/about/...`.

Do not call `generateStaticParams` for editable content. Unknown dynamic slugs must remain eligible for request-time resolution so a newly created file works immediately.

## Migration sequence

### Phase 1: Foundation

- Add the parser, schemas, renderer, modification-time cache, and validation command.
- Add one temporary fixture collection and automated tests for create, edit, delete, malformed frontmatter, hidden drafts, and traversal attempts.
- Ensure every Markdown-dependent route and metadata function is request-time rendered.

### Phase 2: Events

Events provide the highest-value first migration because their data is currently split between SQLite and TypeScript.

- Generate one file per event by combining the SQLite row with `lib/event-content.ts`.
- Preserve source material while moving event links, flyers, venue details, and related records into the Markdown body.
- Switch event list, detail, past archive, and homepage queries to the new loader.
- Run existing migration verification and add Markdown/source coverage checks.

### Phase 3: Projects

- Convert `lib/projects.ts` to project files.
- Switch project indexes, detail pages, and homepage selection to collection queries.
- Render the first five projects by `order` on the homepage.

### Phase 4: Updates

- Convert native SQLite posts first.
- Convert promoted legacy updates carefully, retaining complete source content and verification mappings outside frontmatter.
- Keep `/archive/[slug]` untouched and verify promoted-page coverage against it.

### Phase 5: About, wildlife, and history

- Create Markdown for the promoted articles and child pages.
- Generate the about-directory navigation from metadata.
- Preserve legacy redirects and permanent archive copies.

### Phase 6: Cleanup

- Remove the obsolete event/post seed migrations and read APIs from `lib/db.ts`; retain form tables and handlers.
- Remove `lib/projects.ts`, `lib/event-content.ts`, and superseded legacy mapping code after verification.
- Update contributor documentation with the authoring workflow.

Migrating `data/archive.json` itself should be a separate, optional project. The archive's faithful HTML, hashes, and importer are valuable safeguards; converting that record to Markdown has more fidelity risk and is not necessary to gain the editorial workflow described here.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Next.js prerenders a content route | Explicitly make every dependent route dynamic and verify response cache headers after production build. |
| New public assets are invisible without restart | Rebuild and restart the production service after adding or replacing files under `public`. |
| Invalid YAML takes down a page | Strict schemas, actionable errors, `content:validate`, and template/underscore-prefixed file exclusion. |
| An edit is read halfway through a write | Encourage atomic saves/renames; retain the last valid cached document if a transient parse fails and log the error. |
| Legacy details are lost during conversion | Keep `/archive` and external source mappings, and extend migration verification before removing old sources. |
| Route and filename disagree | Derive slug exclusively from the relative filename. |
| Runtime deployment cannot see the files | Keep the current working-tree deployment or mount `content/` in future immutable deployments. |
| Links point nowhere | Validate local links and media paths across all collections. |

## Scope assessment

The architecture is straightforward. The loader, cache, renderer, and schemas are a contained piece of work. Most effort is not technical infrastructure; it is careful content conversion and verification, especially for legacy updates and the informational pages.

The foundation, content conversion, route cutover, and obsolete-source cleanup are now in place. Future work can expand the same Markdown model to additional promoted pages while `/archive` remains the permanent faithful source record.
