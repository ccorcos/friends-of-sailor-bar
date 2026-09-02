# Legacy website migration tracker

**Audit date:** September 2, 2026  
**Legacy source:** `https://friendsofsailorbar.org/`  
**Inventory source:** the live Yoast `page-sitemap.xml` and `tribe_events-sitemap.xml`

## What the checkboxes mean

- `[x]` — complete: the useful legacy body is publicly preserved, or the page was fully replaced by an equivalent new page.
- `[ ]` **Partial** — a destination exists, but the legacy body was condensed, rewritten, merged, or otherwise not faithfully preserved there.
- `[ ]` **Not migrated** — no public destination currently preserves the page.
- `[ ]` **Intentionally omitted** — reviewed but excluded for the reason shown.

A page in `/archive` preserves the captured legacy article body, not the old WordPress theme, navigation, or exact visual layout. Local links and media paths were adjusted so the capture works on the new site.

## Coverage summary

All **71 public URLs** in the two live legacy sitemaps are listed below:

- **40 complete/accounted-for migrations:** 24 faithful body archives, 9 replacements, 6 direct migrations, and 1 corrected replacement.
- **24 partial migrations:** a destination exists, but the source was summarized, rewritten, or split.
- **7 intentional omissions:** empty, placeholder, or duplicate pages with no useful unique body.

## Important finding

The promoted articles were **not imported word-for-word**. They were editorially rewritten and, in several cases, substantially summarized. The original `Native American History` page was migrated to `/history/nisenan-history`, but the new page is a shorter rewrite. Its captured 721-word legacy body remains in `data/archive.json`, is filtered out of the public archive by `lib/archive.ts`, and therefore is not currently available to visitors as a faithful copy.

## Organization, participation, and media

- [x] `/` → `/archive/home` — **Archived.** The legacy homepage body is preserved; the new `/` is a separate redesign.
- [ ] `/friends-of-sailor-bar/` → `/about#friends` — **Partial.** Reduced to a short organization description; acknowledgements and other legacy detail were not retained there.
- [ ] `/our-aspiration/` → `/about#friends` and `/projects` — **Partial.** The 425-word aspiration article was converted into short project and priority language.
- [ ] `/mission-vision-values/` — **Intentionally omitted.** The legacy page only said “page in progress.”
- [ ] `/friends-of-sailor-bar-leaders/` — **Intentionally omitted.** The legacy page contained no substantive body, and no verified leadership roster was available to publish.
- [ ] `/friends-of-sailor-bar-stewardship/` — **Intentionally omitted.** The legacy page contained no substantive body.
- [ ] `/accomplishments/` — **Intentionally omitted.** The page was a promise of future content rather than an accomplishments record.
- [x] `/contact/` → `/contact` — **Replaced.** The contact email and response message were retained; only closing filler was removed.
- [x] `/get-involved/` → `/volunteer` — **Replaced.** The email-based invitation became a working volunteer-interest form.
- [x] `/volunteer-sign-up/` → `/volunteer` — **Replaced.** The legacy page only said “page in progress”; the new route supplies the missing function.
- [x] `/donate/` → `/donate` — **Replaced.** The legacy route was only a placeholder; the new route uses the substantive donation instructions from the related legacy donation page.
- [x] `/your-donations-support-sailor-bar-activities/` → `/donate` — **Migrated.** Online and check donation methods, payee, mailing address, and nonprofit status were retained in a cleaner form.
- [x] `/photo-gallery/` → `/archive/photo-gallery` — **Archived.** The old page was only a photo-submission invitation; it did not contain a gallery.
- [x] `/blog-posts/` → `/stories` — **Replaced.** The old page only said “Blog Main Page”; the new route is the functioning stories index.
- [ ] `/partners/` — **Intentionally omitted.** This was an empty, incorrectly titled duplicate. The substantive partner directory remains at `/archive/partners-affiliates`.

## Park overview, recreation, and nature

- [ ] `/about-sailor-bar/` → `/about` — **Partial.** Directions and a park overview were retained, but the article was reorganized and condensed.
- [x] `/activities-amenities/` → `/about#activities` — **Replaced.** The legacy page contained only a one-line introduction; the new section supplies the actual activity list.
- [ ] `/amenities/` → `/about#visiting` and `/about#activities` — **Partial.** The legacy count and references to a drinking fountain and bathrooms are absent from the new visitor guide.
- [ ] `/recreation/` → `/about#activities` — **Partial.** The 240-word recreation article was condensed into a short activity list.
- [x] `/scenic-river-views/` → `/about` — **Replaced.** The old page was a placeholder promising future scenic-view content.
- [ ] `/wildlife/` → `/wildlife` — **Partial.** Species and habitat material was rewritten and reduced rather than imported faithfully.
- [ ] `/plant-life/` → `/wildlife/plant-life` — **Partial.** Major topics and species remain, but the article is a rewrite rather than a full import.
- [x] `/interactive-birding-at-sailor-bar/` → `/events/interactive-birding-2026` — **Replaced.** The old page only asked visitors to return for event photos and contained no photos.
- [ ] `/interactive-birding-at-sailor-bar/birding-at-sailor-bar/` → `/wildlife/birding` — **Partial.** The 1,022-word legacy guide was condensed into a shorter guide.
- [ ] `/nature-study/` → `/wildlife/salmon-and-steelhead` — **Partial.** The salmon and steelhead article was reorganized and summarized.
- [x] `/health-wellness-day/` → `/events/family-health-and-wellness-day-2026` — **Replaced.** The old page was only a note to add photos and a description later.
- [x] `/real-wildlife-encounters/` → `/events/real-wildlife-encounters` — **Replaced/corrected.** The five-word page conflicted with the published flyer; the new record follows the flyer title, “Sailor Bar Has Gone to the Birds!”
- [x] `/the-wild-and-scenic-american-river/` → `/events/wild-and-scenic-american-river-2026` — **Migrated.** The minimal event listing became a dated event record.

## History, culture, restoration, and places

- [ ] `/sailor-bar-history/` → `/history` — **Partial.** The Gold Rush overview was incorporated into a broader rewritten history.
- [ ] `/a-detailed-history-of-sailor-bar/` → `/history` and `/history/mining-and-dredging` — **Partial.** The 1,977-word legacy article was substantially condensed and split between two routes.
- [ ] `/sailor-bar-history-2/` — **Intentionally omitted.** Empty duplicate of the other history pages.
- [ ] `/native-american-history/` → `/history/nisenan-history` — **Partial.** The 721-word source was rewritten into a shorter introduction; this is not a faithful import.
- [ ] `/gold-dredging-industrial-mining-on-a-massive-scale/` → `/history/mining-and-dredging` — **Partial.** The 1,479-word legacy article was substantially condensed and combined with other history material.
- [x] `/859-2/` → `/archive/859-2` — **Archived.** Full captured article: “How the American River has Changed over Time.”
- [x] `/the-ghost-of-sailor-bar/` → `/archive/the-ghost-of-sailor-bar` — **Archived.** The historical article is preserved separately from the 2026 event.
- [x] `/the-ghost-of-sailor-bar-how-sailor-bar-got-its-name-legends-and-historical-facts/` → `/events/ghost-of-sailor-bar` — **Migrated.** The minimal event announcement became a dated event record.
- [x] `/chinese-diggings-across-from-sailor-bar/` → `/archive/chinese-diggings-across-from-sailor-bar` — **Archived.** Full captured article remains public pending editorial review.
- [x] `/remembering-camp-sabadaca/` → `/archive/remembering-camp-sabadaca` — **Archived.** Full captured article remains public.
- [x] `/the-elderberry/` → `/archive/the-elderberry` — **Archived.** Full captured article remains public pending scientific and cultural review.
- [x] `/grinding-rocks/` → `/archive/grinding-rocks` — **Archived.** Full captured article remains public pending cultural review.
- [ ] `/side-channel/` → `/wildlife/salmon-and-steelhead`, `/events/friends-of-sailor-bar-rock-off`, and `/stories/restoring-room-young-salmon` — **Partial.** The source article was divided into shorter ecology and stewardship summaries.
- [x] `/aerojet-groundwater-pumps/` → `/archive/aerojet-groundwater-pumps` — **Archived.** Full captured article remains public pending technical review.
- [ ] `/key-points-of-interest/` — **Intentionally omitted.** Empty directory page; its useful child destinations are tracked individually below.
- [ ] `/turtle-pond/` → `/about#places`, `/projects/accessible-turtle-pond-walk`, and `/stories/welcoming-path-turtle-pond` — **Partial.** Only short place and project summaries remain; the 513-word legacy article is not publicly preserved.
- [ ] `/boat-launch/` → `/about#activities` and `/about#places` — **Partial.** The 211-word source was reduced to visitor-guide entries.
- [x] `/heron-rookeries/` → `/archive/heron-rookeries` — **Archived.** Full captured article remains public, with sensitive-location review still advisable.
- [x] `/flag-pole/` → `/archive/flag-pole` — **Archived.** Full captured article remains public.
- [ ] `/olive-avenue-river-overlook/` → `/about#places` — **Partial.** The 464-word source was reduced to a short place description.
- [x] `/friends-of-sailor-bar-brochure-and-map/` → `/about#map` and `/files/Sailor-Bar-Brochure-v12a.pdf` — **Migrated.** The brochure/map file is preserved and linked from the visitor guide.
- [x] `/great-horned-owl-nest-east-of-sailor-bar/` → `/archive/great-horned-owl-nest-east-of-sailor-bar` — **Archived.** Full captured article remains public; precise nesting information should be reviewed.

## Partners and affiliates

- [x] `/partners-affiliates/` → `/archive/partners-affiliates` — **Archived.** Full captured partner directory remains public.
- [x] `/save-the-american-river-association-sara/` → `/archive/save-the-american-river-association-sara` — **Archived.** Full captured profile remains public.
- [x] `/sacramento-county-regional-parks/` → `/archive/sacramento-county-regional-parks` — **Archived.** Full captured profile remains public.
- [x] `/friends-of-lakes-folsom-and-natoma-folfan/` → `/archive/friends-of-lakes-folsom-and-natoma-folfan` — **Archived.** Full captured profile remains public.
- [x] `/sacramento-bird-alliance/` → `/archive/sacramento-bird-alliance` — **Archived.** Full captured profile remains public.
- [x] `/sacramento-water-forum/` → `/archive/sacramento-water-forum` — **Archived.** Full captured profile remains public.
- [x] `/waterbird-habitat/` → `/archive/waterbird-habitat` — **Archived.** Full captured project article remains public.
- [x] `/project-pick-up-fishing-line/` → `/archive/project-pick-up-fishing-line` — **Archived.** Full captured stewardship article remains public.
- [x] `/american-river-parway-bike-patrol/` → `/archive/american-river-parway-bike-patrol` — **Archived.** Full captured profile remains public; the legacy slug typo is retained for traceability.
- [x] `/american-river-parkway-equestrian-patrol/` → `/archive/american-river-parkway-equestrian-patrol` — **Archived.** Full captured profile remains public.
- [x] `/river-city-waterway-alliance/` → `/archive/river-city-waterway-alliance` — **Archived.** Full captured profile remains public.
- [x] `/fair-oaks-historical-society/` → `/archive/fair-oaks-historical-society` — **Archived.** Full captured profile remains public.

## Events and activity records

- [ ] `/events/` → `/events` and `/events/past` — **Partial.** The event system was rebuilt from structured records rather than faithfully imported as a page.
- [x] `/event/bald-eagles-and-birdhouses/` → `/events/real-wildlife-encounters` and `/files/sb-sep-19-event-flyer.pdf` — **Migrated.** Date, time, venue, and flyer are retained under the flyer’s event title.
- [ ] `/event-calendar/` → `/events` and `/events/past` — **Partial.** Events were separated into dated records, but conflicting names, dates, and links were editorially resolved rather than copied.
- [ ] `/sailor-bar-bench-dedication/` → `/events/bench-and-table-dedication` and `/stories/seventeen-places-to-pause` — **Partial.** The legacy count conflicts with other pages, and the source body was reduced to a record and short story.
- [ ] `/earth-day-april-2026/` → `/events/earth-day-at-sailor-bar-2026` — **Partial.** The event record retains the date and broad program, but condenses the recorded crafts and opossum visit into generic nature activities and a wildlife encounter.
- [ ] `/celebrating-american-river-parkway-heroes/` → `/events/american-river-parkway-heroes-2026` and `/stories/celebrating-parkway-heroes` — **Partial.** The source was summarized across an event record and short story.
- [ ] `/sailor-bar-bench-and-table-dedication-ceremony/` → `/events/bench-and-table-dedication` and `/stories/seventeen-places-to-pause` — **Partial.** The source was summarized, and the legacy pages disagree about totals and ceremony dates.
- [ ] `/friends-of-sailor-bar-rock-off-on-october-3rd-2025/` → `/events/friends-of-sailor-bar-rock-off` and `/stories/restoring-room-young-salmon` — **Partial.** The source was condensed into an event record and short update.
- [x] `/something-fishy-is-going-on-here-the-remarkable-spawning-journey/` → `/events/salmon-spawning-journey` — **Migrated.** The minimal announcement became a dated event record.

## Imported files and media

These are not additional HTML pages, but they were part of the legacy content inventory and are preserved under `/files`:

- [x] `Ghost-of-Sailor-Bar.pdf`
- [x] `Sailor-Bar-Brochure-v12.pdf`
- [x] `Sailor-Bar-Brochure-v12a.pdf`
- [x] `Sailor-Bar-Brochure-v14.pdf`
- [x] `Sailor_Bar_Gold_Dredge_Article.pdf`
- [x] `sb-sep-19-event-flyer.pdf`
- [x] Legacy photographs and supporting images listed in `data/archive-assets.json`

The old WordPress media-library admin URL (`/wp-admin/upload.php`) is not counted among the 71 public pages. Its discovered public assets were copied into `/files`; WordPress administration itself was intentionally not migrated.

## Next migration work

The unchecked **Partial** articles should not be treated as completed migrations. For each one, choose one of these outcomes:

1. restore a clearly labeled faithful legacy copy in `/archive` while keeping the edited modern page;
2. expand the modern page until all verified source material is represented; or
3. explicitly retire unsupported, unsafe, duplicated, or inaccurate claims and record that decision here.

Highest-priority fidelity reviews:

1. `/native-american-history/`
2. `/a-detailed-history-of-sailor-bar/`
3. `/gold-dredging-industrial-mining-on-a-massive-scale/`
4. `/interactive-birding-at-sailor-bar/birding-at-sailor-bar/`
5. `/the-elderberry/`
6. `/turtle-pond/`
7. `/olive-avenue-river-overlook/`
