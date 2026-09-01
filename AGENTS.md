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
- `/events/[slug]` — Individual event detail
- `/stories` — Field notes and newsletter index
- `/stories/[slug]` — Individual story detail
- `/volunteer` — Volunteer interest form
- `/subscribe` — Email subscription form

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
- `lib/db.ts` — SQLite setup, schema, seed content, and event/story queries
- `lib/projects.ts` — Project content and project lookup by slug
- `public/images` — Locally stored site photography
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

Event listings use SQLite `date('now')` so past events automatically leave the upcoming list. Do not hardcode today's date into event queries.

## Content conventions

- Slugs must be lowercase, stable, and hyphen-separated.
- Link cards directly to their detail route.
- Use concise summaries on indexes and complete copy on detail pages.
- Verify dates, times, locations, spelling, and project status before publishing.
- Do not invent confirmed partners, funding, schedules, or project approvals.
- Current project themes are accessibility, butterfly habitat, visitor water/native planting, oak planting, and a riverside native meadow.

## Local commands

```bash
npm install
npm run dev
npm run lint
npm run build
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
3. Confirm relevant routes return HTTP 200.
4. Test desktop and mobile layouts for visual changes.
5. Verify cards lead to the selected event, story, or project—not merely the index page.
6. Test form submission when modifying forms, APIs, or the database.
7. Restart `sailorbar` after rebuilding production.

## Current status

As of September 1, 2026, the site has working project, event, story, volunteer, and subscription routes; persistent SQLite form storage; responsive layouts; and a systemd-managed production server.
