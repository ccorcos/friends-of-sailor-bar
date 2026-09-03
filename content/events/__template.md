---
title: "Event title"
date: "2027-01-16"
time: "9:30 AM–12:00 PM"
location: "Sailor Bar · Oak gathering area"
---

The complete event description goes here as plain paragraphs. Do not use Markdown
headings; the page title comes from the frontmatter `title` field.

Notes for authors:

- The filename is the canonical slug, so there is no `slug` field.
- Copy this file to `<slug>.md` and fill in the frontmatter. Event files are
  published immediately; use an underscore-prefixed filename while drafting.
- `date` must be a quoted `YYYY-MM-DD` value; upcoming versus past is computed
  from it in the `America/Los_Angeles` time zone.
- Use `time: "Time not recorded"` when the source did not publish a time.
- Put links, PDFs, venue details, and other event information directly in the
  Markdown body.
- Files named `__template.md` or beginning with `_` are excluded from public
  event queries.
