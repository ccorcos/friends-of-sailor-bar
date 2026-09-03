# Archive content audit

**Audit date:** September 3, 2026  
**Scope:** The post-pruning public archive and the legacy source snapshot retained in `data/archive.json`.

This is an editorial placement audit, not an external fact-check. The records with clear destinations have now been promoted, and public archive access is limited to unresolved material while the complete source snapshot remains available internally for migration verification.

## Post-change summary

The public archive now contains **exactly 15 items**:

| Disposition | Count | Meaning |
| --- | ---: | --- |
| **Discussion fragments** | 13 | Short records with useful details that still need an editorial placement or policy decision. |
| **Redundancy decision deferred** | 1 | `our-aspiration` remains public until its overlap with other organizational copy is discussed. |
| **Needs curation** | 1 | `media-library` remains public while its 40 preserved files are reviewed and placed contextually. |

The 26 already-incorporated records, 15 empty/placeholder records, and 15 newly promoted clear-destination records have been removed from the public archive. They remain unchanged in `data/archive.json` for source comparison and migration verification. Including the intentionally hidden `friends-of-sailor-bar` record, the internal snapshot still contains all **72 records**; 57 are now internal-only.

`friends-of-sailor-bar` remains intentionally hidden and does not appear in the archive index or resolve at `/archive/friends-of-sailor-bar`.

## Public archive allowlist

These are the only records that should appear at `/archive` or resolve below `/archive/[slug]`:

1. `get-involved`
2. `sailor-bar-history`
3. `the-ghost-of-sailor-bar`
4. `grinding-rocks`
5. `heron-rookeries`
6. `flag-pole`
7. `american-river-parkway-equestrian-patrol`
8. `friends-of-lakes-folsom-and-natoma-folfan`
9. `project-pick-up-fishing-line`
10. `sacramento-bird-alliance`
11. `event-calendar`
12. `real-wildlife-encounters`
13. `photo-gallery`
14. `our-aspiration`
15. `media-library`

## Discussion notes for the 13 fragments

These records remain public because their useful details have not yet received a final editorial disposition.

| Archive record | Likely destination | Discussion needed before removal |
| --- | --- | --- |
| `get-involved` | `/volunteer` | Decide whether to retain the volunteer-led organizational introduction. Verify or remove the dated statements that there are no ongoing roles yet and that a docent program is planned, and reconcile the legacy `protectsailorbar@yahoo.com` address with the site's current contact path. |
| `sailor-bar-history` | `/history/mining-and-dredging` | Retain the long-tom reference, trench description, hydraulic-mining sequence, and dredge-tailings explanation. Verify the $125 million historical production figure and $15 billion modern-value comparison before presenting them as current editorial fact. |
| `the-ghost-of-sailor-bar` | `/history` | Decide how to incorporate the 1908 newspaper-story reference, the September 28, 1977 *San Juan Record* republication, the newspaper's 1933–1980 context, and the later cairn folklore without confusing this fragment with the separate event record and source PDF. |
| `grinding-rocks` | `/history/nisenan-history` | Preserve the bedrock-mortar/milling-slick terminology, hardpan setting, and food-processing description, but review the cultural interpretation and terminology with appropriate Nisenan guidance before promotion. |
| `heron-rookeries` | `/wildlife/birding` | Retain the colonial-nesting explanation, breeding-season observations, calls, prey, binocular guidance, and disturbance precautions. Decide whether even general rookery-location language should be reduced to protect active nesting areas. |
| `flag-pole` | `/about/olive-avenue-overlook` | Retain the Lt. Stephen Douglas Moore memorial, plaque, Eagle Scout background, August 22, 1969 date, and community/scout maintenance tradition after checking the memorial details and whether the maintenance statement is still current. |
| `american-river-parkway-equestrian-patrol` | `/partners` | Retain the 1995 founding, patrol area, safety/public-assistance purpose, participation expectations, logo, and external link. Verify the organization's current name, nonprofit status, service area, and relationship with Regional Parks. |
| `friends-of-lakes-folsom-and-natoma-folfan` | `/partners` | Retain the park scope, cooperating-association role, program list, events, and recreation figures. Verify current organization status and programs, especially the time-sensitive statement about an animal-rescue festival beginning in May 2026. |
| `project-pick-up-fishing-line` | Partner or conservation-project coverage | Decide whether this is a partner profile, a general visitor action, or part of the waterbird-habitat material. Retain collection/recycling instructions, the entangled-wildlife response, rescue number, and PVC-bin idea only after ownership, safety guidance, and contact details are verified. |
| `sacramento-bird-alliance` | `/partners`, with a link from `/wildlife/birding` | Retain the partner description, inclusion statement, outings, Pacific Flyway/geographic context, species claim, image, and Larry Hickey credit. Verify the current organizational naming, programs, species count, and reuse permission/credit requirements. |
| `event-calendar` | `/events` | Retain the Friends/Regional Parks educational-series context and its wildlife, history, and stewardship scope. Treat the third-Saturday schedule and 2026 event list as dated material; do not carry forward malformed links, superseded dates, directions without review, or obsolete “link on the title” instructions. |
| `real-wildlife-encounters` | `/events/real-wildlife-encounters` | The fragment contributes only an alternate legacy title and September 19 date. Decide how to display that title alongside the different flyer title so neither source is silently overwritten. |
| `photo-gallery` | `/contact` or a future submission policy | Decide whether the site still accepts public photo submissions and where consent, credit, accessibility, and reuse expectations should live. Reconcile the legacy `sailorbar@yahoo.com` address with current contact information before promoting the invitation. |

## Suggested decision batches for the 13 fragments

- **Straightforward contextual additions:** `the-ghost-of-sailor-bar`, `heron-rookeries`, `flag-pole`, `american-river-parkway-equestrian-patrol`, `friends-of-lakes-folsom-and-natoma-folfan`, `sacramento-bird-alliance`, `event-calendar`, and `real-wildlife-encounters`. These mainly need placement, light date labeling, and link checks.
- **Owner policy decisions:** `get-involved` depends on the current volunteer model; `project-pick-up-fishing-line` depends on whether Friends of Sailor Bar endorses the instructions and contact number; `photo-gallery` depends on whether public photo submissions are still accepted.
- **Higher-review historical material:** `sailor-bar-history` contains large historical-dollar comparisons that should be sourced or clearly dated; `grinding-rocks` should receive Nisenan cultural review before its added interpretation is promoted.

## Deferred redundancy discussion: `our-aspiration`

Keep `our-aspiration` public for now. Before removing it, compare its complete organizational purpose, values, steering-committee description, and six “Compassion in Action” priorities against the promoted About, project, volunteer, events, and partner material.

The key question is whether a dedicated `/about/our-work` page would preserve meaningful organization-level context that is otherwise scattered or absent, or whether it would mostly duplicate existing public pages. The intentionally hidden `friends-of-sailor-bar` source overlaps at a high level but also contains different operational details: installed benches and tables, interpretive programs, the abandoned deeper-vehicle-access plan, and acknowledgments. That hidden source may inform the comparison, but it must not regain a public archive route.

Any promotion should separately review time-sensitive claims such as the ten-person steering committee, monthly events, named partnerships, and planned accessibility/habitat work. Remove `our-aspiration` from the public allowlist only after the redundancy question and coverage check are resolved.

## Media-library curation

`media-library` is a synthetic reference page linking to **40 preserved files**: **32 images and 8 PDFs**. It is not a coherent article.

### Files already serving clear public content

Six PDFs are already linked from promoted pages:

- `Ghost-of-Sailor-Bar.pdf`
- `Sailor-Bar-Brochure-v12a.pdf`
- `Sailor_Bar_Gold_Dredge_Article.pdf`
- `sb-sep-19-event-flyer.pdf`
- `Aerojet-NPDES-Order-R5-2020-0051-002.pdf`
- `American-River-Parkway-Plan-2008.pdf`

Several original images have resized variants used by the homepage or promoted Camp Sabadaca, Chinese Diggings, Nisenan history, birding, owl, boat-launch, and dredging pages. Keep the best-quality originals internally even when the public page uses a smaller derivative.

### Images with a likely editorial home

- **General Sailor Bar and wildlife photography:** `Day-At-AmerRiverFO-copy-scaled.jpg`, `8-ST-mamababies-scaled.jpg`, `bike-trail-still-water-copy-scaled.jpg`, `deer.jpg`, `glittering-stars.jpg`, `riverwalk3.jpg`, `ST8-woodpecker-scaled.jpg`, `ST9my-salmon.jpg`, and `view-scaled.jpg`. These could selectively support the homepage, About, wildlife, birding, salmon, or Turtle Pond pages; they should not all be added merely to empty the archive.
- **American River Parkway Heroes/event material:** `eagle-speaker.jpg`, `eagle-speaker2crowd.jpg`, `eagle-speaker3-closeup.jpg`, `john-chart.jpg`, `kathy-k-text.png`, and the two July 8 event screenshots. The photographs and chart could enrich the existing Heroes event/story; the screenshots are probably redundant once their text is represented accessibly.
- **History:** `San_Juan_Record_1958_02_06_211_copy_2421x1887.jpg` belongs with the remaining Ghost/history decision if its relevance and readable context are confirmed.
- **Equestrian patrol:** `American-River-Equestrian-Trail-Patrol.png` belongs with the remaining partner fragment if it is still the correct organization graphic.
- **Bench:** `bench-photo1.jpg` can be compared with the existing bench image and retained only if it adds a distinct useful view.

### Likely internal-only or redundant files

- Two alternate brochure versions, `Sailor-Bar-Brochure-v12.pdf` and `Sailor-Bar-Brochure-v14.pdf`, should remain internal until the owner identifies the authoritative public edition. Version `v12a` is currently linked.
- Five logo/sidebar variants are near-duplicates or legacy presentation assets: `cropped-cropped-Sailor-bar-logo-1.jpg`, `cropped-Sailor-bar-logo-1.jpg`, `cropped-Sailor-bar-logo.jpg`, `Sailor-bar-logo.jpg`, and `Sidebar-Color-SailorBar.png`. Choose at most one if the current text brand is ever replaced; otherwise keep them internal.
- Low-value screenshots and duplicate generated sizes do not need public pages or links.

Do not create a general primary-site download directory solely because the files were preserved. Remove `media-library` from the public allowlist after useful images are placed, authoritative document versions are chosen, and internal-only files are documented.

## Internal preservation and completed promotion

`data/archive.json`, `data/archive-assets.json`, and `data/archive-manifest.json` remain the migration source of truth and should not be pruned with the public routes. Removed archive pages remain available to verification scripts and editors through those internal files, but they neither appear in the public archive index nor resolve as public archive detail pages.

The 15 actionable clear-destination records are now represented by the homepage, six new About/History/Wildlife pages, the new Partners section and its detail pages, and the Water Forum update. `our-aspiration` was deliberately deferred rather than promoted to a possibly redundant `/about/our-work` page.
