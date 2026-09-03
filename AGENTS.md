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
- Do not use `<hr>` elements or horizontal divider rules. Separate content with whitespace, grouping, and typography.
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
- `/projects` and `/projects/[slug]` — Project index and details
- `/events`, `/events/past`, and `/events/[slug]` — Upcoming events, past events, and event details
- `/stories` and `/stories/[slug]` — Field notes and updates
- `/friends-of-sailor-bar` — Organization information
- `/friends-of-sailor-bar/contact` — Contact information
- `/about` and `/about/[slug]` — Sailor Bar visitor information and points of interest
- `/wildlife` and `/wildlife/[slug]` — Wildlife, birding, plants, salmon, elderberry, and owl articles
- `/history` and `/history/[slug]` — Sailor Bar history articles
- `/partners` and `/partners/[slug]` — Partner directory and profiles
- `/donate` — Donation information
- `/volunteer` — Volunteer interest form

### Compatibility routes

- `/contact` — Redirects to `/friends-of-sailor-bar/contact`
- `/voluneer` — Redirects to `/volunteer` to accommodate the earlier misspelling
- `next.config.ts` — Permanent redirects from superseded public URLs to their current destinations

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
- `components/markdown-content.tsx` — Server-rendered Markdown content view
- `components/content-page.tsx` — Shared request-time About, Wildlife, History, and Partners page renderer
- `lib/db.ts` — SQLite setup for subscriber and volunteer form submissions
- `lib/content/` — Server-only Markdown discovery, caching, schemas, loading, and compilation
- `lib/site.ts` — Shared navigation links
- `content/` — Runtime-editable events, projects, updates, and section pages
- `public/images` — Primary site photography
- `public/files` — Documents and supporting images served under `/files`
- `scripts/validate-content.mjs` — Validates Markdown schemas, relationships, links, and local assets
- `tests/content-loader.test.ts` — Markdown loader and renderer tests
- `data/sailorbar.db` — Runtime SQLite database; intentionally ignored by Git
- `sailorbar.service` — Production systemd service

## Data model

The application uses SQLite for mutable form submissions only:

- `subscribers`
- `volunteers`

Editorial content lives in Markdown under `content/`. Events are classified as upcoming or past by comparing their ISO date in the `America/Los_Angeles` time zone, so they move into the past event collection at local midnight. Do not hardcode today's date into event queries.

## Content conventions

- Slugs must be lowercase, stable, and hyphen-separated.
- Link cards directly to their detail route.
- Keep index cards concise and detail pages complete.
- Verify dates, times, locations, spelling, and project details before publishing.
- Do not invent confirmed partners, funding, schedules, or project approvals.
- Identify contradictions or uncertain claims in a visibly separate editorial note rather than silently choosing one version.
- Current project themes are accessibility, butterfly habitat, visitor water/native planting, oak planting, and a riverside native meadow.

## Markdown authoring workflow

- Store events, projects, and updates in `content/events`, `content/projects`, and `content/updates`; store section pages in `content/pages/<section>`.
- The filename is the canonical lowercase, hyphen-separated slug. Do not add a frontmatter `slug` field.
- Copy the collection's `__template.md` and fill in the schema-required frontmatter. Content files publish immediately, so keep work-in-progress filenames underscore-prefixed until ready. Templates and underscore-prefixed notes are ignored by public loaders.
- Put the page title in frontmatter; Markdown bodies must not contain a level-one heading. Use standard Markdown; raw HTML is not part of the supported content contract.
- To embed a YouTube video, put a normal Markdown link to its `youtube.com/watch`, `youtu.be`, `youtube.com/embed`, Shorts, or Live URL in its own paragraph. Use descriptive link text because it becomes the iframe title. The renderer converts only standalone YouTube links into responsive, privacy-enhanced embeds; YouTube links within a sentence remain ordinary links. Do not paste raw `<iframe>` HTML into Markdown.
- Put event links, PDFs, venue details, and related records directly in the Markdown body. Run `npm run content:validate` after content, frontmatter, or media changes.
- Put images in `public/images` and downloadable documents in `public/files`; reference them with root-relative `/images/...` and `/files/...` paths.

The Markdown loader reads files at request time and caches each parsed file by modification metadata. Content-dependent routes must stay dynamic and must not use `generateStaticParams`. The current systemd deployment runs from the working tree; future immutable deployments must mount `content/` as runtime storage.

## Local commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run content:validate
npm run test:content
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
4. Run `npm run test:content` when changing the Markdown loader or renderer.
5. Confirm relevant routes return HTTP 200.
6. Test desktop and mobile layouts for visual changes.
7. Verify cards lead to the selected event, story, or project—not merely the index page.
8. Test form submission when modifying forms, APIs, or the database.
9. Restart `sailorbar` after rebuilding production.

## Current status

As of September 3, 2026, the site has working project, event, update, volunteer, subscription, partner, About, Wildlife, and History routes; persistent SQLite form storage; responsive layouts; a systemd-managed production server; and runtime Markdown content with modification-aware caching and validation.
