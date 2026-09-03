# Archive content audit

**Audit date:** September 3, 2026  
**Scope:** The post-pruning public archive and the legacy source snapshot retained in `data/archive.json`.

This is an editorial placement audit, not an external fact-check. The records with clear destinations have now been promoted, and public archive access is limited to unresolved material while the complete source snapshot remains available internally for migration verification.

## Post-change summary

The public archive now contains **exactly 13 items**:

| Disposition | Count | Meaning |
| --- | ---: | --- |
| **Discussion fragments** | 12 | Short records with useful details that still need an editorial placement or policy decision. |
| **Needs curation** | 1 | `media-library` remains public while its 40 preserved files are reviewed and placed contextually. |

The resolved `get-involved` and `our-aspiration` records have now joined the other internal-only records. All source material remains unchanged in `data/archive.json` for migration verification. Including the intentionally hidden `friends-of-sailor-bar` record, the internal snapshot still contains all **72 records**; 59 are now internal-only.

`friends-of-sailor-bar` remains intentionally hidden and does not appear in the archive index or resolve at `/archive/friends-of-sailor-bar`.

## Public archive allowlist

These are the only records that should appear at `/archive` or resolve below `/archive/[slug]`:

1. `sailor-bar-history`
2. `the-ghost-of-sailor-bar`
3. `grinding-rocks`
4. `heron-rookeries`
5. `flag-pole`
6. `american-river-parkway-equestrian-patrol`
7. `friends-of-lakes-folsom-and-natoma-folfan`
8. `project-pick-up-fishing-line`
9. `sacramento-bird-alliance`
10. `event-calendar`
11. `real-wildlife-encounters`
12. `photo-gallery`
13. `media-library`

## Discussion notes for the 12 fragments

These records remain public because their useful details have not yet received a final editorial disposition.

| Archive record | Likely destination | Discussion needed before removal |
| --- | --- | --- |
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

## Suggested decision batches for the 12 fragments

- **Straightforward contextual additions:** `the-ghost-of-sailor-bar`, `heron-rookeries`, `flag-pole`, `american-river-parkway-equestrian-patrol`, `friends-of-lakes-folsom-and-natoma-folfan`, `sacramento-bird-alliance`, `event-calendar`, and `real-wildlife-encounters`. These mainly need placement, light date labeling, and link checks.
- **Owner policy decisions:** `project-pick-up-fishing-line` depends on whether Friends of Sailor Bar endorses the instructions and contact number; `photo-gallery` depends on whether public photo submissions are still accepted.
- **Higher-review historical material:** `sailor-bar-history` contains large historical-dollar comparisons that should be sourced or clearly dated; `grinding-rocks` should receive Nisenan cultural review before its added interpretation is promoted.

## Resolved organization records

`our-aspiration` is now promoted at `/friends-of-sailor-bar` as the first section in the shared information directory. Its complete organizational purpose, values, steering-committee description, and six “Compassion in Action” priorities are preserved there under the requested “Friends of Sailor Bar” title. The faithful source remains in `data/archive.json`, but `/archive/our-aspiration` no longer resolves.

The promoted section also contains `/friends-of-sailor-bar/contact`, preserving the complete legacy contact page. `/contact` permanently redirects to that canonical page.

`get-involved` was removed from the public archive at the site owner’s request. Its source remains in `data/archive.json`, and the working volunteer form remains at `/volunteer`.

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

The clear-destination records are represented by the homepage, promoted About/Wildlife/History/Partners pages, the Friends of Sailor Bar section, event and update pages, and the working volunteer route.
