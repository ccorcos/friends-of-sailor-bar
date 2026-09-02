# Content audit and migration plan

**Audit date:** September 2, 2026

## Executive summary

- The legacy WordPress sitemap contains **71 HTML pages** plus **8 unique image URLs** (one image is listed twice). Four linked PDFs and two additional brochure versions were also discovered.
- The current Next.js site contains **17 public pages**, one compatibility redirect, and two form APIs.
- The current site has exactly **seven visitor-facing dependencies on the legacy site**: Donate in the header, plus Contact, About, People, History, Photos, and Map in the footer.
- The legacy site has substantial material worth retaining, especially park orientation, history, ecology, points of interest, partners, and event archives. It also has many empty pages, duplicated topics, contradictory event information, stale details, and public template content that should not be copied as-is.
- Recommended approach: migrate by **content model and topic**, not page-for-page. Build authoritative internal destination pages, move dated material into Events or Updates, preserve old URLs with permanent redirects, and only retire the old site after a link and redirect audit.

## Legacy site audit

### Discovery and technical behavior

- `robots.txt` allows crawling and declares `sitemap_index.xml`.
- The sitemap index exposes `page-sitemap.xml` and `tribe_events-sitemap.xml`.
- Canonical host behavior is HTTPS, non-`www`, and trailing slashes.
- `/sailor-bar-history/` has an incorrect canonical pointing to `/about__trashed/sailor-bar-history/`, which redirects back.
- The globally rendered footer contains unrelated theme-demo contact information for Bellagio, Italy, a fake phone number, `support@example.com`, and placeholder Latin copy.
- The global navigation is extremely large and exposes nearly every page.

### Full HTML sitemap: 71 pages

#### Organization, participation, and media

1. `/`
2. `/friends-of-sailor-bar/`
3. `/our-aspiration/`
4. `/mission-vision-values/`
5. `/friends-of-sailor-bar-leaders/`
6. `/friends-of-sailor-bar-stewardship/`
7. `/accomplishments/`
8. `/contact/`
9. `/get-involved/`
10. `/volunteer-sign-up/`
11. `/donate/`
12. `/your-donations-support-sailor-bar-activities/`
13. `/photo-gallery/`
14. `/blog-posts/`
15. `/partners/`

#### Park overview, recreation, and nature

16. `/about-sailor-bar/`
17. `/activities-amenities/`
18. `/recreation/`
19. `/amenities/`
20. `/scenic-river-views/`
21. `/wildlife/`
22. `/plant-life/`
23. `/interactive-birding-at-sailor-bar/`
24. `/interactive-birding-at-sailor-bar/birding-at-sailor-bar/`
25. `/nature-study/`
26. `/health-wellness-day/`
27. `/real-wildlife-encounters/`
28. `/the-wild-and-scenic-american-river/`

#### History, culture, restoration, and points of interest

29. `/sailor-bar-history/`
30. `/a-detailed-history-of-sailor-bar/`
31. `/sailor-bar-history-2/`
32. `/native-american-history/`
33. `/gold-dredging-industrial-mining-on-a-massive-scale/`
34. `/859-2/`
35. `/the-ghost-of-sailor-bar/`
36. `/the-ghost-of-sailor-bar-how-sailor-bar-got-its-name-legends-and-historical-facts/`
37. `/chinese-diggings-across-from-sailor-bar/`
38. `/remembering-camp-sabadaca/`
39. `/the-elderberry/`
40. `/grinding-rocks/`
41. `/side-channel/`
42. `/aerojet-groundwater-pumps/`
43. `/key-points-of-interest/`
44. `/turtle-pond/`
45. `/boat-launch/`
46. `/heron-rookeries/`
47. `/flag-pole/`
48. `/olive-avenue-river-overlook/`
49. `/friends-of-sailor-bar-brochure-and-map/`
50. `/great-horned-owl-nest-east-of-sailor-bar/`

#### Partners and affiliates

51. `/partners-affiliates/`
52. `/save-the-american-river-association-sara/`
53. `/sacramento-county-regional-parks/`
54. `/friends-of-lakes-folsom-and-natoma-folfan/`
55. `/sacramento-bird-alliance/`
56. `/sacramento-water-forum/`
57. `/waterbird-habitat/`
58. `/project-pick-up-fishing-line/`
59. `/american-river-parway-bike-patrol/`
60. `/american-river-parkway-equestrian-patrol/`
61. `/river-city-waterway-alliance/`
62. `/fair-oaks-historical-society/`

#### Events and archive

63. `/events/`
64. `/event/bald-eagles-and-birdhouses/`
65. `/event-calendar/`
66. `/sailor-bar-bench-dedication/`
67. `/earth-day-april-2026/`
68. `/celebrating-american-river-parkway-heroes/`
69. `/sailor-bar-bench-and-table-dedication-ceremony/`
70. `/friends-of-sailor-bar-rock-off-on-october-3rd-2025/`
71. `/something-fishy-is-going-on-here-the-remarkable-spawning-journey/`

### Media listed directly in the XML sitemap

- `/wp-content/uploads/2026/08/American-River-Equestrian-Trail-Patrol.png`
- `/wp-content/uploads/2026/08/Grinding-Rocks-at-Sailor-Bar.jpg` (listed twice)
- `/wp-content/uploads/2026/08/San_Juan_Record_1958_02_06_211_copy_2421x1887.jpg`
- `/wp-content/uploads/2026/08/sailor-bar-dredge.png`
- `/wp-content/uploads/2026/09/campsabadaca.jpg`
- `/wp-content/uploads/2026/08/Heron-Rookery-Tree.jpg`
- `/wp-content/uploads/2026/09/owls-at-nimbus-fish-hatchery-v0-rhcqdulsugva1.webp`
- `/wp-content/uploads/2026/09/sailor-bar-boat-launch.webp`

### Linked documents

- `Ghost-of-Sailor-Bar.pdf`
- `Sailor-Bar-Brochure-v12a.pdf`
- `Sailor_Bar_Gold_Dredge_Article.pdf`
- `sb-sep-19-event-flyer.pdf`
- Two additional public brochure versions, `v12` and `v14`, were discoverable through WordPress media data.

### Content worth migrating

- Organization purpose, aspiration, contact information, volunteering, and donation instructions.
- Park entrances, directions, recreation, facilities, fees, access, safety, and map/brochure.
- Wildlife, plants, birding, salmon and steelhead interpretation.
- Detailed river, mining, Nisenan, Camp Sabadaca, and place-name history.
- Turtle Pond, boat launch, grinding rocks, side channel, rookeries, overlook, memorial flagpole, groundwater pumps, Chinese Diggings, and owl-nest interpretation.
- Partner relationships and stewardship programs.
- Past-event records, photographs, and the four linked documents.

### Content that should not be copied as-is

#### Empty or placeholder pages

- `/mission-vision-values/`
- `/friends-of-sailor-bar-leaders/`
- `/friends-of-sailor-bar-stewardship/`
- `/accomplishments/`
- `/volunteer-sign-up/`
- `/donate/`
- `/activities-amenities/`
- `/scenic-river-views/`
- `/health-wellness-day/`
- `/interactive-birding-at-sailor-bar/`
- `/blog-posts/`
- `/partners/`
- `/key-points-of-interest/`
- `/sailor-bar-history-2/`

#### Duplicates and conflicts

- `/partners-affiliates/` is the useful partner directory; `/partners/` is empty and incorrectly titled.
- `/your-donations-support-sailor-bar-activities/` contains useful donation instructions; `/donate/` is a placeholder.
- History is split across an overview, a detailed history, an empty duplicate, mining pages, the Ghost story, and PDFs.
- Bench pages disagree between 12 benches plus 7 tables, 17 total items, and 13 amenities.
- Bench-dedication dates disagree between March 18 and March 21, 2026.
- The Event Calendar says September 19 is “Real Wildlife Encounters,” while the published event and flyer say “Sailor Bar Has Gone to the Birds.”
- The Event Calendar’s November 21 link is malformed and returns 404 even though the correct page exists.
- Contact email is inconsistent: `protectsailorbar@yahoo.com` versus `sailorbar@yahoo.com`.
- `/american-river-parway-bike-patrol/` contains a slug/title typo; `/859-2/` is opaque.

#### Accuracy and editorial review required

- Current parking fees, hours, launch/restroom conditions, fishing rules, and park regulations.
- Event dates, times, names, meeting places, costs, and registration requirements.
- Partner names, branding, program descriptions, statistics, and copied material.
- Historical, scientific, cultural, environmental-cleanup, and legal claims.
- Nisenan cultural interpretation should be reviewed with appropriate representatives.
- Sensitive nesting locations should not be made more precise than necessary.
- Photo ownership, credits, permissions, captions, and alt text.

## Current Next.js site audit

### Full public sitemap: 17 pages

1. `/`
2. `/projects`
3. `/projects/accessible-turtle-pond-walk`
4. `/projects/butterfly-sanctuary`
5. `/projects/water-fountain-welcome-garden`
6. `/projects/oak-trees`
7. `/projects/riverside-native-meadow`
8. `/events`
9. `/events/real-wildlife-encounters`
10. `/events/ghost-of-sailor-bar`
11. `/events/salmon-spawning-journey`
12. `/events/new-year-river-cleanup`
13. `/stories`
14. `/stories/welcoming-path-turtle-pond`
15. `/stories/restoring-room-young-salmon`
16. `/stories/seventeen-places-to-pause`
17. `/volunteer`

Additional routes:

- `/voluneer` redirects to `/volunteer` with a temporary 307.
- `POST /api/subscribe`
- `POST /api/volunteer`

Missing standard discovery assets:

- `/robots.txt`
- `/sitemap.xml`
- `/favicon.ico`

### Current content inventory

- **Home:** three dashboard panels for four featured projects, three upcoming events, and three updates. It has no H1 or introductory organization/park copy.
- **Projects:** five proposed projects with short summaries and provisional detail copy.
- **Events:** four future events dated September 19, October 17, and November 21, 2026, plus January 16, 2027. Detail pages contain only summary, date, time, meeting place, category, and volunteer CTA.
- **Updates:** three short posts about Turtle Pond access, salmon side-channel restoration, and benches/tables, plus email signup.
- **Volunteer:** working interest form with name, email, interest checkboxes, and message.
- **Forms/data:** SQLite stores events, posts, subscribers, and volunteers. No public administration/export workflow exists.
- **Images:** eight local photographs; `deer.jpg` and `woodpecker.jpg` are unused. Rendered images currently use empty alt text.

### All legacy-site dependencies

Header:

- Donate → legacy `/donate/`

Footer:

- Contact → legacy `/contact/`
- About → legacy `/about-sailor-bar/`
- People → legacy `/friends-of-sailor-bar-leaders/`
- History → legacy `/sailor-bar-history/`
- Photos → legacy `/photo-gallery/`
- Map → legacy `/friends-of-sailor-bar-brochure-and-map/`

These are the only application outbound links. The current site otherwise has no direct contact email, social links, map, partner links, donation processor link, or event-registration destination.

## Comparison

| Area | Legacy site | Current site | Migration decision |
|---|---|---|---|
| Organization | Broad but uneven; several placeholders | Almost absent | Create authoritative About, People, Contact, Donate pages |
| Park guide | Extensive directions, recreation, facilities, nature | Absent | Create Visit and Explore sections |
| History | Extensive but fragmented and partly duplicated | One thin future event | Consolidate into reviewed History collection |
| Points of interest | About ten individual pages | Absent | Migrate as a structured Places collection |
| Partners | Directory plus many profiles | Absent | Create internal partner directory and selective detail pages |
| Projects | Stewardship/program material scattered | Five clear proposed projects | Keep current model; add verified status and richer details |
| Events | Two competing systems and conflicting data | Four simple future events | Make current Events authoritative after verification |
| Past activities | Many dated pages of mixed quality | Three polished but short updates | Migrate worthwhile records into Updates with dates and photos |
| Volunteer | Email/placeholder | Working form | Keep current form; add expectations and privacy language |
| Subscribe | Not found | Working email form | Keep; document consent and operations |
| Donate | Useful instructions hidden on one page; CTA points to placeholder | CTA points to old placeholder | Build internal Donate page and link directly to verified processor |
| Photos/files | Gallery invitation, many images, brochure and PDFs | Eight images, no gallery/downloads | Curate, credit, optimize, and migrate selected assets |
| SEO | XML sitemap exists but quality problems | No sitemap/robots/canonicals | Add technical discovery only after final route map |

## Recommended target information architecture

Keep the restrained current navigation, but add internal destinations rather than recreating the legacy mega-menu.

- `/` — clearer purpose, location context, and primary calls to action
- `/projects` and `/projects/[slug]`
- `/events` and `/events/[slug]`
- `/stories` and `/stories/[slug]`
- `/visit` — entrances, directions, hours, fees, access, amenities, safety, map
- `/explore` — nature and recreation hub
  - `/explore/wildlife`
  - `/explore/plants`
  - `/explore/birding`
  - `/explore/salmon-and-steelhead`
- `/places` and `/places/[slug]` — Turtle Pond, boat launch, grinding rocks, side channel, rookeries, overlook, flagpole, pumps, Chinese Diggings, owl viewing
- `/history` — reviewed overview and collection
  - `/history/nisenan-history`
  - `/history/mining-and-dredging`
  - `/history/river-changes`
  - `/history/ghost-of-sailor-bar`
  - `/history/camp-sabadaca`
- `/partners` and, where useful, `/partners/[slug]`
- `/about`
- `/people`
- `/contact`
- `/donate`
- `/volunteer`
- `/photos`
- `/map`

The exact nesting can be adjusted before implementation. Every legacy URL should receive either a migrated equivalent or an explicit permanent redirect.

## Phased migration plan

### Phase 1 — Resolve source-of-truth conflicts

Before publishing migrated copy, confirm:

1. Official contact email and mailing address.
2. Donation recipient, processor URL, tax language, and check instructions.
3. September 19, October 17, and November 21 event identities and details.
4. Bench/table count and dedication date.
5. Current park fees, hours, rules, facilities, and entrance addresses.
6. Approved organization purpose, leadership list, partners, and project status.
7. Ownership/permission for every migrated photograph, PDF, and copied partner passage.

### Phase 2 — Remove legacy dependencies first

Build internal versions of the seven destinations currently linked to the old site:

- Donate
- Contact
- About
- People
- History
- Photos
- Map

Then replace all seven legacy links. This makes the current site operationally independent before the larger archive migration.

### Phase 3 — Migrate evergreen visitor content

Create and populate Visit, Explore, Places, History, and Partners. Consolidate duplicate legacy pages into reviewed canonical content rather than copying WordPress pages verbatim.

### Phase 4 — Migrate dated records and media

- Convert worthwhile past-event pages into Updates.
- Preserve dates, captions, credits, and original context.
- Move the brochure/map and historical PDFs to stable local URLs.
- Curate a real photo gallery rather than migrating every media-library item.

### Phase 5 — Redirect and discovery layer

- Produce a complete old-to-new URL redirect table.
- Use permanent redirects for all retired legacy pages, typo slugs, duplicates, and PDF versions.
- Add sitemap, robots, canonical URLs, metadata, structured event data, favicon, and a custom 404.
- Verify no internal page links to `friendsofsailorbar.org`.

### Phase 6 — Cutover validation

- Crawl the new site for broken links, missing images, duplicate titles, and orphan pages.
- Test desktop/mobile layouts, forms, redirects, downloads, and event dates.
- Confirm analytics/search-console ownership and submission handling.
- Keep a rollback/export copy of WordPress until redirects and migrated assets are verified.

## Suggested implementation order

1. Confirm facts and route map.
2. Contact, About, People, Donate.
3. Visit, Map, and Photos.
4. History and Places.
5. Explore and Partners.
6. Event reconciliation and archive migration.
7. Redirect table, SEO/discovery files, and final cutover.
