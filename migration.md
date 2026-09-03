# Legacy website migration tracker

**Audit date:** September 2, 2026  
**Legacy source:** `https://friendsofsailorbar.org/`  
**Inventory source:** the live Yoast `page-sitemap.xml`, `tribe_events-sitemap.xml`, WordPress REST API, and Tribe Events API

## Fidelity standard

Every public legacy page is preserved with the same published title, body words, headings, lists, links, captions, images, and downloads. Internal URLs and media paths are rewritten only so they work on the new site. The WordPress theme, navigation chrome, administration screens, and plugin controls are not part of the article copy.

A short excerpt may appear on an index card, but it never replaces the full imported detail content. Every source page has a permanent copy under `/archive`; selected content is also promoted into the main About, History, Wildlife, Events, Updates, Contact, Donate, or Volunteer sections without replacing the archive copy.

## Verification summary

- **71 of 71 public legacy URLs faithfully imported and checked off.**
- All **69 WordPress page bodies** match the live source word-for-word after HTML is reduced to normalized visible text.
- Both Tribe Events sitemap URLs are preserved, including the single-event record and the generated event listing visible on September 2, 2026.
- All **59 discovered WordPress media URL variants** and **2 externally linked source PDFs** are mapped to local files; every imported `/files/...` reference exists.
- `data/archive-manifest.json` records the title, word count, local media, and SHA-256 text hash for each public legacy page.

## Cleaned event presentation

As of September 3, 2026, all eleven current event detail pages use the complete event information without rendering the raw WordPress formatting:

- the permanent `/archive` copies remain verbatim;
- dates, times, and meeting places appear once in the structured facts;
- event bodies render as heading-free Markdown-style paragraphs;
- “(Click for flyer),” WordPress plugin labels, and duplicated facts are omitted;
- conflicting source details are retained in separate editorial notes;
- source flyers, videos, PDFs, and related updates remain linked;
- `scripts/verify-event-content.mjs` checks every event, its source mapping, full rich source bodies, videos, and required structured details.

## Organization

- [x] `/accomplishments/` — **Accomplishments** → `/archive/accomplishments`. Full source title and body preserved.
- [x] `/contact/` — **Contact Us** → `/archive/contact`, `/contact`. Full source title and body preserved.
- [x] `/donate/` — **Donate** → `/archive/donate`. Full source title and body preserved. The original “page in progress” copy is preserved; the substantive donation page is separately promoted at `/donate`.
- [x] `/friends-of-sailor-bar/` — **Friends of Sailor Bar** → `/archive/friends-of-sailor-bar`. Full source title and body preserved.
- [x] `/friends-of-sailor-bar-leaders/` — **Friends of Sailor Bar Leadership** → `/archive/friends-of-sailor-bar-leaders`. Full source title and body preserved. The source body is empty; that empty state is preserved rather than filled with invented copy.
- [x] `/friends-of-sailor-bar-stewardship/` — **Friends of Sailor Bar Stewardship** → `/archive/friends-of-sailor-bar-stewardship`. Full source title and body preserved. The source body is empty; that empty state is preserved.
- [x] `/get-involved/` — **Get Involved** → `/archive/get-involved`, `/volunteer`. Full source title and body preserved.
- [x] `/` — **Home** → `/archive/home`. Full source title and body preserved with 9 local media files.
- [x] `/mission-vision-values/` — **Mission, Vision & Values** → `/archive/mission-vision-values`. Full source title and body preserved. The original “page in progress” copy is preserved.
- [x] `/our-aspiration/` — **Our Aspiration** → `/archive/our-aspiration`. Full source title and body preserved.
- [x] `/volunteer-sign-up/` — **Volunteer Sign Up** → `/archive/volunteer-sign-up`. Full source title and body preserved. The original “page in progress” copy is preserved; the working form remains at `/volunteer`.
- [x] `/your-donations-support-sailor-bar-activities/` — **Your Donations Support Sailor Bar Activities** → `/archive/your-donations-support-sailor-bar-activities`, `/donate`. Full source title and body preserved.

## Park guide

- [x] `/about-sailor-bar/` — **About Sailor Bar** → `/archive/about-sailor-bar`, `/about`. Full source title and body preserved.
- [x] `/activities-amenities/` — **Activities & Amenities** → `/archive/activities-amenities`. Full source title and body preserved.
- [x] `/amenities/` — **Amenities** → `/archive/amenities`, `/about/amenities`. Full source title and body preserved.
- [x] `/friends-of-sailor-bar-brochure-and-map/` — **Friends of Sailor Bar Brochure and Map** → `/archive/friends-of-sailor-bar-brochure-and-map`, `/about/brochure-and-map`. Full source title and body preserved with 1 local media file.
- [x] `/recreation/` — **Recreation** → `/archive/recreation`, `/about/recreation`. Full source title and body preserved.
- [x] `/scenic-river-views/` — **Scenic River Views** → `/archive/scenic-river-views`. Full source title and body preserved.

## Nature

- [x] `/interactive-birding-at-sailor-bar/birding-at-sailor-bar/` — **Birding at Sailor Bar** → `/archive/birding-at-sailor-bar`, `/wildlife/birding`. Full source title and body preserved with 1 local media file.
- [x] `/interactive-birding-at-sailor-bar/` — **Interactive Birding at Sailor Bar** → `/archive/interactive-birding-at-sailor-bar`, `/events/interactive-birding-2026`. Full source title and body preserved.
- [x] `/plant-life/` — **Plant Life** → `/archive/plant-life`, `/wildlife/plant-life`. Full source title and body preserved.
- [x] `/nature-study/` — **Salmon and Steelhead Runs at Sailor Bar** → `/archive/nature-study`, `/wildlife/salmon-and-steelhead`. Full source title and body preserved.
- [x] `/the-elderberry/` — **The Elderberry: An Ancient Plant with an Important Story** → `/archive/the-elderberry`. Full source title and body preserved with 3 local media files.
- [x] `/wildlife/` — **Wildlife** → `/archive/wildlife`, `/wildlife`. Full source title and body preserved.

## History

- [x] `/a-detailed-history-of-sailor-bar/` — **A Detailed History of Sailor Bar** → `/archive/a-detailed-history-of-sailor-bar`, `/history`. Full source title and body preserved.
- [x] `/chinese-diggings-across-from-sailor-bar/` — **Chinese Diggings Across from Sailor Bar** → `/archive/chinese-diggings-across-from-sailor-bar`. Full source title and body preserved with 1 local media file.
- [x] `/gold-dredging-industrial-mining-on-a-massive-scale/` — **Gold Dredging along the Lower American River** → `/archive/gold-dredging-industrial-mining-on-a-massive-scale`, `/history/mining-and-dredging`. Full source title and body preserved with 3 local media files.
- [x] `/sailor-bar-history/` — **Gold Rush Legacy** → `/archive/sailor-bar-history`. Full source title and body preserved.
- [x] `/859-2/` — **How the American River has Changed over Time** → `/archive/859-2`. Full source title and body preserved.
- [x] `/native-american-history/` — **Native American History** → `/archive/native-american-history`, `/history/nisenan-history`. Full source title and body preserved with 1 local media file.
- [x] `/remembering-camp-sabadaca/` — **Remembering Camp Sabadaca** → `/archive/remembering-camp-sabadaca`. Full source title and body preserved with 1 local media file.
- [x] `/sailor-bar-history-2/` — **Sailor Bar History** → `/archive/sailor-bar-history-2`. Full source title and body preserved. The source body is empty; the duplicate page is still preserved.
- [x] `/the-ghost-of-sailor-bar/` — **The Ghost of Sailor Bar** → `/archive/the-ghost-of-sailor-bar`. Full source title and body preserved with 1 local media file.

## Places

- [x] `/aerojet-groundwater-pumps/` — **Aerojet Groundwater Pumps** → `/archive/aerojet-groundwater-pumps`. Full source title and body preserved with 1 local source document.
- [x] `/boat-launch/` — **Boat Launch** → `/archive/boat-launch`, `/about/boat-launch`. Full source title and body preserved with 1 local media file.
- [x] `/great-horned-owl-nest-east-of-sailor-bar/` — **Great Horned Owl Nest East of Sailor Bar** → `/archive/great-horned-owl-nest-east-of-sailor-bar`. Full source title and body preserved with 1 local media file.
- [x] `/grinding-rocks/` — **Grinding Rocks** → `/archive/grinding-rocks`. Full source title and body preserved with 1 local media file.
- [x] `/heron-rookeries/` — **Heron Rookeries** → `/archive/heron-rookeries`. Full source title and body preserved.
- [x] `/key-points-of-interest/` — **Key Points of Interest** → `/archive/key-points-of-interest`. Full source title and body preserved. The source body is empty; the directory placeholder is still preserved.
- [x] `/flag-pole/` — **Lt. Stephen D. Moore Flag Pole** → `/archive/flag-pole`. Full source title and body preserved.
- [x] `/olive-avenue-river-overlook/` — **Olive Avenue River Overlook** → `/archive/olive-avenue-river-overlook`, `/about/olive-avenue-overlook`. Full source title and body preserved.
- [x] `/side-channel/` — **Side Channel East of the Boat Launch** → `/archive/side-channel`, `/stories/restoring-room-young-salmon`. Full source title and body preserved.
- [x] `/turtle-pond/` — **Turtle Pond** → `/archive/turtle-pond`, `/about/turtle-pond`, `/stories/welcoming-path-turtle-pond`. Full source title and body preserved.

## Partners

- [x] `/american-river-parkway-equestrian-patrol/` — **American River Parkway Equestrian Trail Patrol** → `/archive/american-river-parkway-equestrian-patrol`. Full source title and body preserved with 1 local media file.
- [x] `/american-river-parway-bike-patrol/` — **American River Parway Bike Patrol** → `/archive/american-river-parway-bike-patrol`. Full source title and body preserved.
- [x] `/partners/` — **Events & Activities** → `/archive/partners`. Full source title and body preserved. The source body is empty and the legacy title is “Events & Activities”; both are preserved.
- [x] `/fair-oaks-historical-society/` — **Fair Oaks Historical Society** → `/archive/fair-oaks-historical-society`. Full source title and body preserved.
- [x] `/friends-of-lakes-folsom-and-natoma-folfan/` — **Friends of Lakes Folsom and Natoma (FOLFAN)** → `/archive/friends-of-lakes-folsom-and-natoma-folfan`. Full source title and body preserved.
- [x] `/partners-affiliates/` — **Our Partners** → `/archive/partners-affiliates`. Full source title and body preserved with 1 local source document.
- [x] `/project-pick-up-fishing-line/` — **Project Pick-up Fishing Line** → `/archive/project-pick-up-fishing-line`. Full source title and body preserved.
- [x] `/river-city-waterway-alliance/` — **River City Waterway Alliance** → `/archive/river-city-waterway-alliance`. Full source title and body preserved.
- [x] `/sacramento-bird-alliance/` — **Sacramento Bird Alliance** → `/archive/sacramento-bird-alliance`. Full source title and body preserved with 1 local media file.
- [x] `/sacramento-county-regional-parks/` — **Sacramento County Regional Parks** → `/archive/sacramento-county-regional-parks`. Full source title and body preserved.
- [x] `/sacramento-water-forum/` — **Sacramento Water Forum** → `/archive/sacramento-water-forum`. Full source title and body preserved.
- [x] `/save-the-american-river-association-sara/` — **Save the American River Association (SARA)** → `/archive/save-the-american-river-association-sara`. Full source title and body preserved.
- [x] `/waterbird-habitat/` — **The Waterbird Habitat Project** → `/archive/waterbird-habitat`. Full source title and body preserved.

## Events and activities

- [x] `/celebrating-american-river-parkway-heroes/` — **Celebrate American River Parkway Heroes** → `/archive/celebrating-american-river-parkway-heroes`, `/events/american-river-parkway-heroes-2026`, `/stories/celebrating-parkway-heroes`. Full source title and body preserved.
- [x] `/earth-day-april-2026/` — **Earth Day April 2026** → `/archive/earth-day-april-2026`, `/events/earth-day-at-sailor-bar-2026`. Full source title and body preserved.
- [x] `/event-calendar/` — **Events & Activities** → `/archive/event-calendar`, `/events`, `/events/past`. Full source title and body preserved. Malformed links and conflicting event language remain part of the faithful archive copy; structured event routes are supplemental.
- [x] `/health-wellness-day/` — **Family Health & Wellness Day** → `/archive/health-wellness-day`, `/events/family-health-and-wellness-day-2026`. Full source title and body preserved.
- [x] `/friends-of-sailor-bar-rock-off-on-october-3rd-2025/` — **Friends of Sailor Bar Rock Off on October 3rd, 2025** → `/archive/friends-of-sailor-bar-rock-off-on-october-3rd-2025`, `/events/friends-of-sailor-bar-rock-off`, `/stories/restoring-room-young-salmon`. Full source title and body preserved.
- [x] `/real-wildlife-encounters/` — **Real Wildlife Encounters** → `/archive/real-wildlife-encounters`, `/events/real-wildlife-encounters`. Full source title and body preserved. The original five-word event page is preserved even though it conflicts with the flyer.
- [x] `/sailor-bar-bench-and-table-dedication-ceremony/` — **Sailor Bar Bench and Table Dedication Ceremony** → `/archive/sailor-bar-bench-and-table-dedication-ceremony`, `/events/bench-and-table-dedication`, `/stories/seventeen-places-to-pause`. Full source title and body preserved. The conflicting legacy date/count language is preserved without correction.
- [x] `/sailor-bar-bench-dedication/` — **Sailor Bar Bench Dedication** → `/archive/sailor-bar-bench-dedication`, `/events/bench-and-table-dedication`, `/stories/seventeen-places-to-pause`. Full source title and body preserved. The conflicting legacy count is preserved without correction.
- [x] `/event/bald-eagles-and-birdhouses/` — **SAILOR BAR HAS GONE TO THE BIRDS! (Click for flyer)** → `/archive/bald-eagles-and-birdhouses`, `/events/real-wildlife-encounters`. Full source title and body preserved with 1 local media file.
- [x] `/something-fishy-is-going-on-here-the-remarkable-spawning-journey/` — **Something Fishy is Going on Here! The Remarkable Spawning Journey** → `/archive/something-fishy-is-going-on-here-the-remarkable-spawning-journey`, `/events/salmon-spawning-journey`. Full source title and body preserved.
- [x] `/the-ghost-of-sailor-bar-how-sailor-bar-got-its-name-legends-and-historical-facts/` — **The Ghost of Sailor Bar: How Sailor Bar Got its Name, Legends and Historical Facts** → `/archive/the-ghost-of-sailor-bar-how-sailor-bar-got-its-name-legends-and-historical-facts`, `/events/ghost-of-sailor-bar`. Full source title and body preserved.
- [x] `/the-wild-and-scenic-american-river/` — **The Wild and Scenic American River** → `/archive/the-wild-and-scenic-american-river`, `/events/wild-and-scenic-american-river-2026`. Full source title and body preserved.
- [x] `/events/` — **Events** → `/archive/events`, `/events`, `/events/past`. Full source title and body preserved. The generated legacy event listing visible on September 2, 2026 is preserved; the new event index remains the functional calendar.

## Media

- [x] `/blog-posts/` — **Blog Posts** → `/archive/blog-posts`. Full source title and body preserved. The original “Blog Main Page” copy is preserved.
- [x] `/photo-gallery/` — **Photo Gallery** → `/archive/photo-gallery`. Full source title and body preserved.

## Media library and files

- [x] `/archive/media-library` — all discovered legacy media is presented in one local reference page.
- [x] All original WordPress media items returned by the legacy media API, plus externally linked source documents, have local copies or local generated-size variants in `public/files`.
- [x] Linked PDFs are preserved, including the Ghost of Sailor Bar article, three brochure versions, the gold-dredge article, and the September 19 event flyer.

## Explicitly not migrated

No public content page was intentionally omitted. Empty pages, placeholders, duplicates, misspellings, and contradictory statements are preserved because fidelity takes precedence over editorial cleanup.

The following infrastructure was not migrated because it is not public article content:

- WordPress administration screens such as `/wp-admin/upload.php` — replaced by the local media reference at `/archive/media-library`.
- Legacy theme header, giant navigation menu, template-demo footer, CSS, and JavaScript — presentation chrome rather than page content.
- Tribe Events search, view-switcher, and calendar-subscription controls — plugin UI replaced by the new event index; the visible event listing itself is preserved.

If legacy content needs correction or context, add a clearly separate editorial note. Never silently change the imported source words.
