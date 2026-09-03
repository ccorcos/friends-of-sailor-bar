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
- Index cards may use short excerpts for navigation, but every migrated detail page must expose the complete legacy source content.
- Keep a permanent faithful copy under `/archive` even when the content is also promoted into `/about`, `/history`, `/wildlife`, `/events`, `/stories`, or another primary section.
- Promoted pages may clean up legacy formatting, remove duplicated facts, and omit obsolete interface instructions such as “click for flyer,” but they must retain every unique factual detail and remain complete rather than becoming summaries. Keep links to source flyers, videos, PDFs, and related records when they carry information.
- Preserve empty pages, placeholders, duplicates, contradictions, misspellings, and outdated claims in the faithful archive. On promoted pages, identify contradictions in a visibly separate editorial note rather than silently choosing one version.
- Copy legacy images and files into `public/files` rather than hotlinking them. Preserve every media item referenced by imported content.
- Do not mark a migration complete until its full text and referenced local media have been checked against the legacy source.
- Newly authored summaries or reorganized guides are supplemental editorial content, not substitutes for a faithful migration. Cleaned promoted pages must be checked for information coverage against their archived sources.

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
- `/about` — Faithful About Sailor Bar article with links to imported visitor guides and points of interest
- `/wildlife` — Faithful legacy wildlife article
- `/wildlife/birding` — Faithful legacy birding guide
- `/wildlife/plant-life` — Faithful legacy plant guide
- `/wildlife/salmon-and-steelhead` — Faithful legacy salmon and steelhead guide
- `/history` — Faithful detailed Sailor Bar history article
- `/history/nisenan-history` — Faithful legacy Native American History article
- `/history/mining-and-dredging` — Faithful legacy gold-dredging article
- `/stories` — Field notes and newsletter index with email subscription form
- `/stories/[slug]` — Individual story detail
- `/archive` — Permanent index of faithfully imported legacy pages
- `/archive/[slug]` — Complete legacy page title, body, and media
- `/volunteer` — Volunteer interest form

### Compatibility route

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
- `components/forms.tsx` — Subscription and volunteer client forms
- `components/simple-markdown.tsx` — Heading-free Markdown subset used by cleaned event pages
- `lib/db.ts` — SQLite setup, schema, seed content, and event/story queries
- `lib/event-content.ts` — Complete, nonredundant event-page copy and source mapping
- `lib/projects.ts` — Project content and project lookup by slug
- `public/images` — Primary site photography
- `public/files` — Imported documents, historical images, and other supporting files served under `/files`
- `data/archive.json` — Complete imported legacy page bodies with local URLs
- `data/archive-assets.json` — Legacy media source-to-local-file mappings
- `data/archive-manifest.json` — Per-page word counts, media references, and text hashes
- `migration.md` — Authoritative legacy page checklist and destination map
- `scripts/import-legacy-content.mjs` — Rebuilds the faithful snapshot from the legacy APIs
- `scripts/verify-legacy-content.mjs` — Checks page coverage, hashes, local media, and complete heading-free event content
- `data/sailorbar.db` — Runtime SQLite database; intentionally ignored by Git
- `sailorbar.service` — Production systemd service

## Data model

SQLite stores:

- `events`
- `posts`
- `subscribers`
- `volunteers`

Important query functions in `lib/db.ts`:

- `getUpcomingEvents(limit?)`
- `getEventBySlug(slug)`
- `getPosts(limit?)`
- `getPostBySlug(slug)`

Project content currently lives in `lib/projects.ts`:

- `projects`
- `getProjectBySlug(slug)`

Event listings compare dates in the `America/Los_Angeles` time zone so events move into the past archive at local midnight. Do not hardcode today's date into event queries.

## Content conventions

- Slugs must be lowercase, stable, and hyphen-separated.
- Link cards directly to their detail route.
- Use concise excerpts on indexes for navigation and complete, faithful legacy copy on migrated detail pages.
- Verify dates, times, locations, spelling, and project status before publishing.
- Do not invent confirmed partners, funding, schedules, or project approvals.
- Current project themes are accessibility, butterfly habitat, visitor water/native planting, oak planting, and a riverside native meadow.

## Local commands

```bash
npm install
npm run dev
npm run lint
npm run build
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
3. Run `npm run migration:verify` when changing legacy content, mappings, or media.
4. Confirm relevant routes return HTTP 200.
5. Test desktop and mobile layouts for visual changes.
6. Verify cards lead to the selected event, story, or project—not merely the index page.
7. Test form submission when modifying forms, APIs, or the database.
8. Restart `sailorbar` after rebuilding production.

## Current status

As of September 2, 2026, the site has working project, event, story, volunteer, and subscription routes; persistent SQLite form storage; responsive layouts; a systemd-managed production server; and faithful local copies of all 71 public legacy pages and their referenced media.
