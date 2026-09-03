# Archive content audit

**Audit date:** September 3, 2026  
**Scope:** The post-pruning public archive and the legacy source snapshot retained in `data/archive.json`.

This is an editorial placement audit, not an external fact-check. The records with clear destinations have now been promoted, and public archive access is limited to unresolved material while the complete source snapshot remains available internally for migration verification.

## Post-change summary

The public archive now contains **exactly 4 items**:

| Disposition | Count | Meaning |
| --- | ---: | --- |
| **Discussion fragments** | 3 | Short records with useful details that still need an editorial placement or policy decision. |
| **Needs curation** | 1 | `media-library` remains public while its 40 preserved files are reviewed and placed contextually. |

The nine resolved History, Places, and Partners records have now joined the other internal-only records. All source material remains unchanged in `data/archive.json` for migration verification. Including the intentionally hidden `friends-of-sailor-bar` record, the internal snapshot still contains all **72 records**; 68 are now internal-only.

`friends-of-sailor-bar` remains intentionally hidden and does not appear in the archive index or resolve at `/archive/friends-of-sailor-bar`.

## Public archive allowlist

These are the only records that should appear at `/archive` or resolve below `/archive/[slug]`:

1. `event-calendar`
2. `real-wildlife-encounters`
3. `photo-gallery`
4. `media-library`

## Discussion notes for the 3 fragments

These records remain public because their useful details have not yet received a final editorial disposition.

| Archive record | Likely destination | Discussion needed before removal |
| --- | --- | --- |
| `event-calendar` | `/events` | Retain the Friends/Regional Parks educational-series context and its wildlife, history, and stewardship scope. Treat the third-Saturday schedule and 2026 event list as dated material; do not carry forward malformed links, superseded dates, directions without review, or obsolete “link on the title” instructions. |
| `real-wildlife-encounters` | `/events/real-wildlife-encounters` | The fragment contributes only an alternate legacy title and September 19 date. Decide how to display that title alongside the different flyer title so neither source is silently overwritten. |
| `photo-gallery` | `/contact` or a future submission policy | Decide whether the site still accepts public photo submissions and where consent, credit, accessibility, and reuse expectations should live. Reconcile the legacy `sailorbar@yahoo.com` address with current contact information before promoting the invitation. |

## Suggested decision batches for the 3 fragments

- **Event cleanup:** `event-calendar` and `real-wildlife-encounters` need placement within the current event system while preserving contradictory or dated source language.
- **Owner policy decision:** `photo-gallery` depends on whether public photo submissions are still accepted.

## Resolved History, Places, and Partners records

The two remaining History records are now faithful Markdown pages at `/history/gold-rush-legacy` and `/history/the-ghost-of-sailor-bar`.

All three legacy Places records are now in the About Sailor Bar section at `/about/grinding-rocks`, `/about/heron-rookeries`, and `/about/flag-pole`.

All four remaining Partners records are now in the Our Partners section at `/partners/american-river-parkway-equestrian-patrol`, `/partners/friends-of-lakes-folsom-and-natoma-folfan`, `/partners/project-pick-up-fishing-line`, and `/partners/sacramento-bird-alliance`.

Each page preserves every legacy text block, link, caption, image, and downloadable file referenced by its source. The nine resolved records no longer appear in the public archive.

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

Several original images have resized variants used by the homepage or promoted Camp Sabadaca, Chinese Diggings, Nisenan history, Grinding Rocks, birding, owl, boat-launch, dredging, Equestrian Trail Patrol, and Sacramento Bird Alliance pages. Keep the best-quality originals internally even when the public page uses a smaller derivative.

### Images with a likely editorial home

- **General Sailor Bar and wildlife photography:** `Day-At-AmerRiverFO-copy-scaled.jpg`, `8-ST-mamababies-scaled.jpg`, `bike-trail-still-water-copy-scaled.jpg`, `deer.jpg`, `glittering-stars.jpg`, `riverwalk3.jpg`, `ST8-woodpecker-scaled.jpg`, `ST9my-salmon.jpg`, and `view-scaled.jpg`. These could selectively support the homepage, About, wildlife, birding, salmon, or Turtle Pond pages; they should not all be added merely to empty the archive.
- **American River Parkway Heroes/event material:** `eagle-speaker.jpg`, `eagle-speaker2crowd.jpg`, `eagle-speaker3-closeup.jpg`, `john-chart.jpg`, `kathy-k-text.png`, and the two July 8 event screenshots. The photographs and chart could enrich the existing Heroes event/story; the screenshots are probably redundant once their text is represented accessibly.
- **History:** `San_Juan_Record_1958_02_06_211_copy_2421x1887.jpg` has a resized derivative on the promoted mining-and-dredging page; retain the original internally.
- **Equestrian patrol:** `American-River-Equestrian-Trail-Patrol.png` is now displayed on the promoted partner page.
- **Sacramento Bird Alliance:** `American_River_1_Larry_Hickey.JPG` is now displayed with its source credit on the promoted partner page.
- **Bench:** `bench-photo1.jpg` can be compared with the existing bench image and retained only if it adds a distinct useful view.

### Likely internal-only or redundant files

- Two alternate brochure versions, `Sailor-Bar-Brochure-v12.pdf` and `Sailor-Bar-Brochure-v14.pdf`, should remain internal until the owner identifies the authoritative public edition. Version `v12a` is currently linked.
- Five logo/sidebar variants are near-duplicates or legacy presentation assets: `cropped-cropped-Sailor-bar-logo-1.jpg`, `cropped-Sailor-bar-logo-1.jpg`, `cropped-Sailor-bar-logo.jpg`, `Sailor-bar-logo.jpg`, and `Sidebar-Color-SailorBar.png`. Choose at most one if the current text brand is ever replaced; otherwise keep them internal.
- Low-value screenshots and duplicate generated sizes do not need public pages or links.

Do not create a general primary-site download directory solely because the files were preserved. Remove `media-library` from the public allowlist after useful images are placed, authoritative document versions are chosen, and internal-only files are documented.

## Internal preservation and completed promotion

`data/archive.json`, `data/archive-assets.json`, and `data/archive-manifest.json` remain the migration source of truth and should not be pruned with the public routes. Removed archive pages remain available to verification scripts and editors through those internal files, but they neither appear in the public archive index nor resolve as public archive detail pages.

The clear-destination records are represented by the homepage, promoted About/Wildlife/History/Partners pages, the Friends of Sailor Bar section, event and update pages, and the working volunteer route.
