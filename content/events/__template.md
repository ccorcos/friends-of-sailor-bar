---
title: "Event title"
date: "2027-01-16"
time: "9:30 AM–12:00 PM"
location: "Sailor Bar · Oak gathering area"
summary: "One sentence describing the event for the event index."
category: "Nature program"
featured: false
storySlug: ""
flyer: ""
legacySources: []
relatedLinks: []
organizer: ""
address: ""
mapHref: ""
editorialNote: ""
draft: true
---

The complete event description goes here as plain paragraphs. Do not use Markdown
headings; the page title comes from the frontmatter `title` field.

Notes for authors:

- The filename is the canonical slug, so there is no `slug` field.
- Copy this file to `<slug>.md`, fill in the frontmatter, and set `draft: false`
  when the event is ready to publish.
- `date` must be a quoted `YYYY-MM-DD` value; upcoming versus past is computed
  from it in the `America/Los_Angeles` time zone.
- Use `time: "Time not recorded"` when the legacy source did not publish a time.
- `storySlug` points at a related update under `/stories/<slug>`; leave it empty
  when there is none.
- `flyer` is a site-relative path to a PDF, for example
  `/files/sb-sep-19-event-flyer.pdf`.
- `legacySources` lists the `/archive/<slug>` pages this event was promoted from.
  Keep every source that contributed a fact, and keep the promoted body complete
  rather than summarizing it.
- `relatedLinks` keeps videos, PDFs, and other links that carry information from
  the legacy source. Each entry needs a `label` and an `href`.
- `organizer`, `address`, and `mapHref` are optional venue details from the
  legacy event record.
- `editorialNote` records contradictions between legacy sources instead of
  silently choosing one version. Omit it or leave it empty when there is none.
- Files named `__template.md` or beginning with `_` are excluded from public
  event queries.
