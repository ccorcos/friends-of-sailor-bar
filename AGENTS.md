# AGENTS.md

Guidance for contributors working on the Friends of Sailor Bar website.

## Project overview

This is the public website for Friends of Sailor Bar in Fair Oaks, California. Its primary goals are to:

1. Help visitors understand current stewardship projects.
2. Promote upcoming events.
3. Publish field notes, newsletters, and project updates.
4. Collect email subscriptions.
5. Collect volunteer interest.

The site should feel calm, grounded, welcoming, and nature-focused. Favor clear visual hierarchy and editorial layout over decorative effects or unnecessary interaction.

## Legacy migration policy

The site is in an active, page-by-page migration from the former WordPress website at `friendsofsailorbar.org`.

- Treat `migration.md` as the authoritative checklist and route map for every legacy public page.
- Faithful migration means preserving the complete published title, body text, headings, lists, captions, links, images, and downloadable files. Do not paraphrase, condense, modernize, silently correct, or replace source copy with a summary.
- Index cards may use short excerpts for navigation, but every promoted detail page must expose the complete legacy source content.
- Keep the complete faithful source snapshot in `data/archive.json` while migration verification is needed. The public `/archive` is only a temporary queue for unresolved records: remove a page from the public archive after it has been fully promoted, judged empty/useless, or otherwise resolved by the owner. The owner's goal is to retire `/archive` entirely.
- The `friends-of-sailor-bar` source remains in `data/archive.json`, but it must not appear in the public archive index or resolve at `/archive/friends-of-sailor-bar`.
- Promoted pages may clean up legacy formatting, remove duplicated facts, and omit obsolete interface instructions such as “click for flyer,” but they must retain every unique factual detail and remain complete rather than becoming summaries. Keep links to source flyers, videos, PDFs, and related records when they carry information.
- Preserve empty pages, placeholders, duplicates, contradictions, misspellings, and outdated claims in the internal faithful snapshot. On promoted pages, identify contradictions in a visibly separate editorial note rather than silently choosing one version.
- Copy legacy images and files into `public/files` rather than hotlinking them. Preserve every media item referenced by imported content.
- Do not mark a migration complete until its full text and referenced local media have been checked against the legacy source.
- Newly authored summaries or reorganized guides are supplemental editorial content, not substitutes for a faithful migration. Cleaned promoted pages must be checked for information coverage against the internal source snapshot.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- SQLite via `better-sqlite3`
- Plain CSS in `app/globals.css`
- Lucide React icons
- Node.js 24

## Design principles

- Mobile-friendly by default.
- Keep the interface quiet and visually restrained.
- Do not add taglines, descriptive subtitles, introductory filler, or other marketing copy unless the user explicitly requests it. Page headings should normally stand alone, using the established single-column title layout.
- Do not use `<hr>` elements or horizontal divider rules. Separate content with whitespace, grouping, and typography instead.
- Interaction is a last resort; prefer strong typography, photography, spacing, and layout.
- Avoid flashy animation, carousels, parallax, and excessive hover effects.
- Do not enable smooth scrolling. Route changes and in-page navigation should be immediate and predictable.
- Use dedicated routes rather than homepage hash links for important destinations.
- Every event, story, and project should link to its specific detail page.
- Preserve accessible labels, semantic headings, keyboard navigation, and adequate contrast.
- Use authentic Sailor Bar photography from `public/images` where possible.

## Route map

### Public pages

- `/` — Homepage overview and calls to action
- `/projects` — Current project index
- `/projects/[slug]` — Individual project detail
- `/events` — Upcoming event calendar
- `/events/past` — Past event archive
- `/events/[slug]` — Individual event detail
- `/friends-of-sailor-bar` — Faithful legacy Our Aspiration article, promoted under the Friends of Sailor Bar title
- `/friends-of-sailor-bar/contact` — Faithful legacy contact page
- `/about` — Faithful About Sailor Bar article with links to imported visitor guides and points of interest
- `/about/aerojet-groundwater-pumps` — Legacy explanation of the groundwater extraction and treatment infrastructure
- `/wildlife` — Faithful legacy wildlife article
- `/wildlife/birding` — Faithful legacy birding guide
- `/wildlife/plant-life` — Faithful legacy plant guide
- `/wildlife/salmon-and-steelhead` — Faithful legacy salmon and steelhead guide
- `/wildlife/elderberry` — Faithful legacy elderberry article
- `/wildlife/great-horned-owls` — Faithful legacy owl-nesting article with an editorial disturbance warning
- `/history` — Faithful detailed Sailor Bar history article
- `/history/nisenan-history` — Faithful legacy Native American History article
- `/history/mining-and-dredging` — Faithful legacy gold-dredging article
- `/history/chinese-diggings` — Faithful legacy Chinese Diggings article
- `/history/river-changes` — Faithful legacy river-channel-change article
- `/history/camp-sabadaca` — Faithful legacy Camp Sabadaca article
- `/stories` — Field notes and newsletter index with email subscription form
- `/stories/[slug]` — Individual story detail
- `/partners` — Partner directory
- `/partners/[slug]` — Individual partner profile
- `/archive` — Temporary index of unresolved legacy records pending placement or removal
- `/archive/[slug]` — Complete unresolved legacy page body; resolved records return 404
- `/volunteer` — Volunteer interest form

### Compatibility routes

- `/contact` — Redirects to `/friends-of-sailor-bar/contact`
- `/voluneer` — Redirects to `/volunteer` to accommodate the earlier misspelling

### Form endpoints

- `POST /api/subscribe` — Creates or updates an email subscriber
- `POST /api/volunteer` — Records a volunteer offer

Do not replace dedicated routes with `/#volunteer`, `/#updates`, or generic links that lose the selected content context.

## Code map

- `app/layout.tsx` — Shared header, navigation, metadata, and footer
- `app/page.tsx` — Homepage composition
- `app/globals.css` — Global design system and responsive styles
- `app/**/page.tsx` — Route pages
- `app/api/**/route.ts` — Form handlers
- `app/media/[...path]/route.ts` — Runtime media handler for `content/media`
- `components/forms.tsx` — Subscription and volunteer client forms
- `components/markdown-content.tsx` — Server-rendered Markdown content view
- `components/content-page.tsx` — Shared request-time About, Wildlife, History, and Partners page renderer
- `lib/db.ts` — SQLite setup for subscriber and volunteer form submissions
- `lib/content/` — Server-only Markdown file discovery, caching, schemas, loading, and compilation
- `public/images` — Primary site photography
- `public/files` — Imported documents, historical images, and other supporting files served under `/files`
- `content/` — Runtime-editable events, projects, updates, and promoted section pages
- `content/media` — Runtime-editable Markdown-referenced media served through `/media`
- `data/archive.json` — Complete internal legacy page bodies with local URLs; public `/archive` exposes only unresolved allowlisted records
- `data/archive-assets.json` — Legacy media source-to-local-file mappings
- `data/archive-manifest.json` — Per-page word counts, media references, and text hashes
- `data/public-archive-slugs.json` — Temporary allowlist of unresolved records still exposed under `/archive`
- `migration.md` — Authoritative legacy page checklist and destination map
- `scripts/import-legacy-content.mjs` — Rebuilds the faithful snapshot from the legacy APIs
- `scripts/validate-content.mjs` — Validates Markdown schemas, relationships, and local assets
- `scripts/verify-legacy-content.mjs` — Checks archive page coverage, hashes, and local media
- `scripts/verify-event-content.mjs` — Checks complete event Markdown, source mappings, links, and structured details
- `scripts/verify-promoted-markdown.mjs` — Checks promoted page coverage against the faithful archive
- `scripts/verify-update-content.mjs` — Checks complete update Markdown, external source mappings, media, links, and published title/date/image choices
- `data/sailorbar.db` — Runtime SQLite database; intentionally ignored by Git
- `sailorbar.service` — Production systemd service

## Data model

The application uses SQLite for mutable form submissions only:

- `subscribers`
- `volunteers`

Editorial content lives in Markdown under `content/`. Events are classified as upcoming or past by comparing their ISO date in the `America/Los_Angeles` time zone, so they move into the past archive at local midnight. Do not hardcode today's date into event queries.

## Content conventions

- Slugs must be lowercase, stable, and hyphen-separated.
- Link cards directly to their detail route.
- Keep index cards concise and preserve complete, faithful legacy copy on migrated detail pages.
- Verify dates, times, locations, spelling, and project details before publishing.
- Do not invent confirmed partners, funding, schedules, or project approvals.
- Current project themes are accessibility, butterfly habitat, visitor water/native planting, oak planting, and a riverside native meadow.

## Markdown authoring workflow

- Store events, projects, and updates in `content/events`, `content/projects`, and `content/updates`; store promoted section pages in `content/pages/<section>`.
- The filename is the canonical lowercase, hyphen-separated slug. Do not add a frontmatter `slug` field.
- Copy the collection's `__template.md` and fill in the schema-required frontmatter. Event, project, update, and promoted page files publish immediately, so keep work-in-progress filenames underscore-prefixed until ready. Templates and underscore-prefixed notes are ignored by public loaders.
- Put the page title in frontmatter; Markdown bodies must not contain a level-one heading. Use standard Markdown; raw HTML is not part of the supported content contract.
- To embed a YouTube video, put a normal Markdown link to its `youtube.com/watch`, `youtu.be`, `youtube.com/embed`, Shorts, or Live URL in its own paragraph. Use descriptive link text because it becomes the iframe title. The renderer converts only standalone YouTube links into responsive, privacy-enhanced embeds; YouTube links within a sentence remain ordinary links. Do not paste raw `<iframe>` HTML into Markdown.
- Put event links, PDFs, venue details, and related records directly in the Markdown body. Run `npm run content:validate` after content, frontmatter, or media changes.
- Keep immutable existing assets in `public/images` and `public/files`. New editable assets belong in `content/media` and are referenced as `/media/...`; the runtime media route serves them without exposing Markdown or directory listings.

The Markdown loader reads files at request time and caches each parsed file by modification metadata. Content-dependent routes must stay dynamic and must not use `generateStaticParams`. The current systemd deployment runs from the working tree; future immutable deployments must mount `content/` as runtime storage.

## Local commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run content:validate
npm run test:content
npm run migration:verify
```

The development server runs on port 8000 and is available through the exe.dev proxy.

## Production

The production site runs as the `sailorbar` systemd service on port 8000.

After production code changes:

```bash
npm run lint
npm run build
sudo systemctl restart sailorbar
systemctl status sailorbar
```

Public preview URL:

```text
https://sailorbar.exe.xyz/
```

## Required checks

Before considering a change complete:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Run `npm run content:validate` when changing Markdown, content schemas/loaders, relationships, or referenced media.
4. Run `npm run test:content` when changing the Markdown loader, renderer, or runtime media behavior.
5. Run `npm run migration:verify` when changing legacy content, mappings, promoted pages, or media.
6. Confirm relevant routes return HTTP 200.
7. Test desktop and mobile layouts for visual changes.
8. Verify cards lead to the selected event, story, or project—not merely the index page.
9. Test form submission when modifying forms, APIs, or the database.
10. Restart `sailorbar` after rebuilding production.

## Current status

As of September 3, 2026, the site has working project, event, update, volunteer, subscription, partner, and promoted About/Wildlife/History routes; persistent SQLite form storage; responsive layouts; a systemd-managed production server; and faithful internal copies of all 71 public legacy pages and their referenced media. Events, projects, updates, and promoted section pages are runtime Markdown with modification-aware caching, dynamic media, validation, and source-coverage checks. The public `/archive` is being reduced to unresolved records and will be retired after the remaining fragments, organizational copy, and media assets are resolved.
