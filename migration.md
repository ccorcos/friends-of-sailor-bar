# Legacy website migration tracker

**Audit date:** September 2, 2026  
**Legacy source:** `https://friendsofsailorbar.org/`  
**Inventory source:** the live Yoast `page-sitemap.xml`, `tribe_events-sitemap.xml`, WordPress REST API, and Tribe Events API

## Fidelity and retirement standard

Every public legacy page remains preserved internally in `data/archive.json` with the same published title, body words, headings, lists, links, captions, images, and downloads. Internal URLs and media paths are rewritten only so they work on the new site. The WordPress theme, navigation chrome, administration screens, and plugin controls are not part of the article copy.

The public `/archive` is now a temporary migration queue rather than a permanent duplicate site. Once a legacy record is fully promoted, judged empty/useless, or otherwise resolved by the owner, its `/archive/[slug]` route is removed while the internal source snapshot remains available for verification. The owner's goal is to retire `/archive` entirely after the remaining fragments and media files are resolved.

## Verification summary

- **71 of 71 public legacy URLs faithfully imported and checked off in the internal source snapshot.**
- All **69 WordPress page bodies** match the imported source word-for-word after HTML is reduced to normalized visible text.
- Both Tribe Events sitemap URLs are preserved internally, including the single-event record and the generated event listing visible on September 2, 2026.
- The public archive now exposes only the **4 unresolved records** listed in `archive-audit.md`; resolved records no longer index or resolve under `/archive`.
- All **59 discovered WordPress media URL variants** and **2 externally linked source PDFs** are mapped to local files; every imported `/files/...` reference exists.
- `data/archive-manifest.json` records the title, word count, local media, and SHA-256 text hash for each public legacy page.

## Cleaned event presentation

As of September 3, 2026, all eleven current event detail pages use the complete event information without rendering the raw WordPress formatting:

- the complete source records remain verbatim in `data/archive.json`;
- dates, times, and meeting places appear once in the structured facts;
- event bodies render as heading-free Markdown-style paragraphs;
- “(Click for flyer),” WordPress plugin labels, and duplicated facts are omitted;
- conflicting source details are retained in separate editorial notes;
- source flyers, videos, PDFs, and related updates remain linked;
- `scripts/verify-event-content.mjs` checks every event, its source mapping, full rich source bodies, videos, and required structured details.

## Organization

- [x] `/accomplishments/` — **Accomplishments** → `data/archive.json`. Full source title and body preserved.
- [x] `/contact/` — **Contact Us** → `data/archive.json`, `/friends-of-sailor-bar/contact`; `/contact` permanently redirects to the promoted page. Full source title and body preserved.
- [x] `/donate/` — **Donate** → `data/archive.json`. Full source title and body preserved. The original “page in progress” copy is preserved; the substantive donation page is separately promoted at `/donate`.
- [x] `/friends-of-sailor-bar/` — **Friends of Sailor Bar** → Its original source remains in `data/archive.json` and excluded from the public archive. The current `/friends-of-sailor-bar` page instead promotes the complete `our-aspiration` source under the requested title.
- [x] `/friends-of-sailor-bar-leaders/` — **Friends of Sailor Bar Leadership** → `data/archive.json`. Full source title and body preserved. The source body is empty; that empty state is preserved rather than filled with invented copy.
- [x] `/friends-of-sailor-bar-stewardship/` — **Friends of Sailor Bar Stewardship** → `data/archive.json`. Full source title and body preserved. The source body is empty; that empty state is preserved.
- [x] `/get-involved/` — **Get Involved** → `data/archive.json`, `/volunteer`. Removed from the public archive at the site owner’s request on September 3, 2026.
- [x] `/` — **Home** → `data/archive.json`, `/`. The useful introduction, river/greenbelt facts, photograph, and Janice Kelley credit are promoted on the current homepage; all 9 source media files remain local.
- [x] `/mission-vision-values/` — **Mission, Vision & Values** → `data/archive.json`. Full source title and body preserved. The original “page in progress” copy is preserved.
- [x] `/our-aspiration/` — **Our Aspiration** → `data/archive.json`, `/friends-of-sailor-bar`. Promoted as the top “Friends of Sailor Bar” information section with complete source body text; removed from the public archive on September 3, 2026.
- [x] `/volunteer-sign-up/` — **Volunteer Sign Up** → `data/archive.json`. Full source title and body preserved. The original “page in progress” copy is preserved; the working form remains at `/volunteer`.
- [x] `/your-donations-support-sailor-bar-activities/` — **Your Donations Support Sailor Bar Activities** → `data/archive.json`, `/donate`. Full source title and body preserved.

## Park guide

- [x] `/about-sailor-bar/` — **About Sailor Bar** → `data/archive.json`, `/about`. Full source title and body preserved.
- [x] `/activities-amenities/` — **Activities & Amenities** → `data/archive.json`. Full source title and body preserved.
- [x] `/amenities/` — **Amenities** → `data/archive.json`, consolidated into `/about`. Full source title and body preserved; `/about/amenities` redirects to `/about`.
- [x] `/friends-of-sailor-bar-brochure-and-map/` — **Friends of Sailor Bar Brochure and Map** → `data/archive.json`, consolidated into `/about`. Full source title and body preserved with 1 local media file; `/about/brochure-and-map` redirects to `/about`.
- [x] `/recreation/` — **Recreation** → `data/archive.json`, consolidated into `/about`. Full source title and body preserved; `/about/recreation` redirects to `/about`.
- [x] `/scenic-river-views/` — **Scenic River Views** → `data/archive.json`. Full source title and body preserved.

## Nature

- [x] `/interactive-birding-at-sailor-bar/birding-at-sailor-bar/` — **Birding at Sailor Bar** → `data/archive.json`, `/wildlife/birding`. Full source title and body preserved with 1 local media file.
- [x] `/interactive-birding-at-sailor-bar/` — **Interactive Birding at Sailor Bar** → `data/archive.json`, `/events/interactive-birding-2026`. Full source title and body preserved.
- [x] `/plant-life/` — **Plant Life** → `data/archive.json`, `/wildlife/plant-life`. Full source title and body preserved.
- [x] `/nature-study/` — **Salmon and Steelhead Runs at Sailor Bar** → `data/archive.json`, `/wildlife/salmon-and-steelhead`. Full source title and body preserved.
- [x] `/the-elderberry/` — **The Elderberry: An Ancient Plant with an Important Story** → `data/archive.json`, `/wildlife/elderberry`. Full source title and body preserved with 3 local media files.
- [x] `/wildlife/` — **Wildlife** → `data/archive.json`, `/wildlife`. Full source title and body preserved.

## History

- [x] `/a-detailed-history-of-sailor-bar/` — **A Detailed History of Sailor Bar** → `data/archive.json`, `/history`. Full source title and body preserved.
- [x] `/chinese-diggings-across-from-sailor-bar/` — **Chinese Diggings Across from Sailor Bar** → `data/archive.json`, `/history/chinese-diggings`. Full source title and body preserved with 1 local media file.
- [x] `/gold-dredging-industrial-mining-on-a-massive-scale/` — **Gold Dredging along the Lower American River** → `data/archive.json`, `/history/mining-and-dredging`. Full source title and body preserved with 3 local media files.
- [x] `/sailor-bar-history/` — **Gold Rush Legacy** → `data/archive.json`, `/history/gold-rush-legacy`. Full source title and body preserved.
- [x] `/859-2/` — **How the American River has Changed over Time** → `data/archive.json`, `/history/river-changes`. Full source title and body preserved.
- [x] `/native-american-history/` — **Native American History** → `data/archive.json`, `/history/nisenan-history`. Full source title and body preserved with 1 local media file.
- [x] `/remembering-camp-sabadaca/` — **Remembering Camp Sabadaca** → `data/archive.json`, `/history/camp-sabadaca`. Full source title and body preserved with 1 local media file.
- [x] `/sailor-bar-history-2/` — **Sailor Bar History** → `data/archive.json`. Full source title and body preserved. The source body is empty; the duplicate page is still preserved.
- [x] `/the-ghost-of-sailor-bar/` — **The Ghost of Sailor Bar** → `data/archive.json`, `/history/the-ghost-of-sailor-bar`. Full source title and body preserved with 1 local media file.

## Places

- [x] `/aerojet-groundwater-pumps/` — **Aerojet Groundwater Pumps** → `data/archive.json`, `/about/aerojet-groundwater-pumps`. Full source title and body preserved with 1 local source document.
- [x] `/boat-launch/` — **Boat Launch** → `data/archive.json`, `/about/boat-launch`. Full source title and body preserved with 1 local media file.
- [x] `/great-horned-owl-nest-east-of-sailor-bar/` — **Great Horned Owl Nest East of Sailor Bar** → `data/archive.json`, `/wildlife/great-horned-owls`. Full source title and body preserved with 1 local media file and a separate disturbance warning.
- [x] `/grinding-rocks/` — **Grinding Rocks** → `data/archive.json`, `/about/grinding-rocks`. Full source title and body preserved with 1 local media file.
- [x] `/heron-rookeries/` — **Heron Rookeries** → `data/archive.json`, `/about/heron-rookeries`. Full source title and body preserved.
- [x] `/key-points-of-interest/` — **Key Points of Interest** → `data/archive.json`. Full source title and body preserved. The source body is empty; the directory placeholder is still preserved.
- [x] `/flag-pole/` — **Lt. Stephen D. Moore Flag Pole** → `data/archive.json`, `/about/flag-pole`. Full source title and body preserved.
- [x] `/olive-avenue-river-overlook/` — **Olive Avenue River Overlook** → `data/archive.json`, `/about/olive-avenue-overlook`. Full source title and body preserved.
- [x] `/side-channel/` — **Side Channel East of the Boat Launch** → `data/archive.json`, `/stories/restoring-room-young-salmon`. Full source title and body preserved.
- [x] `/turtle-pond/` — **Turtle Pond** → `data/archive.json`, `/about/turtle-pond`, `/stories/welcoming-path-turtle-pond`. Full source title and body preserved.

## Partners

- [x] `/american-river-parkway-equestrian-patrol/` — **American River Parkway Equestrian Trail Patrol** → `data/archive.json`, `/partners/american-river-parkway-equestrian-patrol`. Full source title and body preserved with 1 local media file.
- [x] `/american-river-parway-bike-patrol/` — **American River Parway Bike Patrol** → `data/archive.json`, `/partners/american-river-bike-patrol`. Full source title and body preserved.
- [x] `/partners/` — **Events & Activities** → `data/archive.json`. Full source title and body preserved. The source body is empty and the legacy title is “Events & Activities”; both are preserved.
- [x] `/fair-oaks-historical-society/` — **Fair Oaks Historical Society** → `data/archive.json`, `/partners/fair-oaks-historical-society`. Full source title and body preserved.
- [x] `/friends-of-lakes-folsom-and-natoma-folfan/` — **Friends of Lakes Folsom and Natoma (FOLFAN)** → `data/archive.json`, `/partners/friends-of-lakes-folsom-and-natoma-folfan`. Full source title and body preserved.
- [x] `/partners-affiliates/` — **Our Partners** → `data/archive.json`, `/partners`. Full source title and body preserved with 1 local source document.
- [x] `/project-pick-up-fishing-line/` — **Project Pick-up Fishing Line** → `data/archive.json`, `/partners/project-pick-up-fishing-line`. Full source title and body preserved.
- [x] `/river-city-waterway-alliance/` — **River City Waterway Alliance** → `data/archive.json`, `/partners/river-city-waterway-alliance`. Full source title and body preserved.
- [x] `/sacramento-bird-alliance/` — **Sacramento Bird Alliance** → `data/archive.json`, `/partners/sacramento-bird-alliance`. Full source title and body preserved with 1 local media file.
- [x] `/sacramento-county-regional-parks/` — **Sacramento County Regional Parks** → `data/archive.json`, `/partners/sacramento-county-regional-parks`. Full source title and body preserved.
- [x] `/sacramento-water-forum/` — **Sacramento Water Forum** → `data/archive.json`, `/stories/water-forum-2050-agreement`. Full source title and body preserved.
- [x] `/save-the-american-river-association-sara/` — **Save the American River Association (SARA)** → `data/archive.json`, `/partners/save-the-american-river-association`. Full source title and body preserved.
- [x] `/waterbird-habitat/` — **The Waterbird Habitat Project** → `data/archive.json`, `/partners/waterbird-habitat-project`. Full source title and body preserved.

## Events and activities

- [x] `/celebrating-american-river-parkway-heroes/` — **Celebrate American River Parkway Heroes** → `data/archive.json`, `/events/american-river-parkway-heroes-2026`, `/stories/celebrating-parkway-heroes`. Full source title and body preserved.
- [x] `/earth-day-april-2026/` — **Earth Day April 2026** → `data/archive.json`, `/events/earth-day-at-sailor-bar-2026`. Full source title and body preserved.
- [x] `/event-calendar/` — **Events & Activities** → `/archive/event-calendar`, `/events`, `/events/past`. Full source title and body preserved. Malformed links and conflicting event language remain part of the faithful archive copy; structured event routes are supplemental.
- [x] `/health-wellness-day/` — **Family Health & Wellness Day** → `data/archive.json`, `/events/family-health-and-wellness-day-2026`. Full source title and body preserved.
- [x] `/friends-of-sailor-bar-rock-off-on-october-3rd-2025/` — **Friends of Sailor Bar Rock Off on October 3rd, 2025** → `data/archive.json`, `/events/friends-of-sailor-bar-rock-off`, `/stories/restoring-room-young-salmon`. Full source title and body preserved.
- [x] `/real-wildlife-encounters/` — **Real Wildlife Encounters** → `/archive/real-wildlife-encounters`, `/events/real-wildlife-encounters`. Full source title and body preserved. The original five-word event page is preserved even though it conflicts with the flyer.
- [x] `/sailor-bar-bench-and-table-dedication-ceremony/` — **Sailor Bar Bench and Table Dedication Ceremony** → `data/archive.json`, `/events/bench-and-table-dedication`, `/stories/seventeen-places-to-pause`. Full source title and body preserved. The conflicting legacy date/count language is preserved without correction.
- [x] `/sailor-bar-bench-dedication/` — **Sailor Bar Bench Dedication** → `data/archive.json`, `/events/bench-and-table-dedication`, `/stories/seventeen-places-to-pause`. Full source title and body preserved. The conflicting legacy count is preserved without correction.
- [x] `/event/bald-eagles-and-birdhouses/` — **SAILOR BAR HAS GONE TO THE BIRDS! (Click for flyer)** → `data/archive.json`, `/events/real-wildlife-encounters`. Full source title and body preserved with 1 local media file.
- [x] `/something-fishy-is-going-on-here-the-remarkable-spawning-journey/` — **Something Fishy is Going on Here! The Remarkable Spawning Journey** → `data/archive.json`, `/events/salmon-spawning-journey`. Full source title and body preserved.
- [x] `/the-ghost-of-sailor-bar-how-sailor-bar-got-its-name-legends-and-historical-facts/` — **The Ghost of Sailor Bar: How Sailor Bar Got its Name, Legends and Historical Facts** → `data/archive.json`, `/events/ghost-of-sailor-bar`. Full source title and body preserved.
- [x] `/the-wild-and-scenic-american-river/` — **The Wild and Scenic American River** → `data/archive.json`, `/events/wild-and-scenic-american-river-2026`. Full source title and body preserved.
- [x] `/events/` — **Events** → `data/archive.json`, `/events`, `/events/past`. Full source title and body preserved. The generated legacy event listing visible on September 2, 2026 is preserved; the new event index remains the functional calendar.

## Media

- [x] `/blog-posts/` — **Blog Posts** → `data/archive.json`. Full source title and body preserved. The original “Blog Main Page” copy is preserved.
- [x] `/photo-gallery/` — **Photo Gallery** → `/archive/photo-gallery`. Full source title and body preserved.

## Media library and files

- [x] `/archive/media-library` — all discovered legacy media is presented in one local reference page.
- [x] All original WordPress media items returned by the legacy media API, plus externally linked source documents, have local copies or local generated-size variants in `public/files`.
- [x] Linked PDFs are preserved, including the Ghost of Sailor Bar article, three brochure versions, the gold-dredge article, and the September 19 event flyer.

## Explicitly not migrated

No imported source record was discarded from the internal migration snapshot. Empty pages, placeholders, duplicates, misspellings, and contradictory statements remain in `data/archive.json` for fidelity, but resolved records are intentionally removed from the public archive as the site is consolidated.

The following infrastructure was not migrated because it is not public article content:

- WordPress administration screens such as `/wp-admin/upload.php` — replaced by the local media reference at `/archive/media-library`.
- Legacy theme header, giant navigation menu, template-demo footer, CSS, and JavaScript — presentation chrome rather than page content.
- Tribe Events search, view-switcher, and calendar-subscription controls — plugin UI replaced by the new event index; the visible event listing itself is preserved.

If legacy content needs correction or context, add a clearly separate editorial note. Never silently change the imported source words.
