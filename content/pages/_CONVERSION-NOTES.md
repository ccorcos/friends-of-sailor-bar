# Promoted Markdown conversion notes

Generated September 3, 2026 from `data/archive.json`. Verify with `node scripts/verify-promoted-markdown.mjs`.

| Markdown file | Legacy slug | Source blocks | Media |
| --- | --- | --- | --- |
| friends-of-sailor-bar/index.md | our-aspiration | 11/11 required | — |
| friends-of-sailor-bar/contact.md | contact | 3/3 required | — |
| about/index.md | about-sailor-bar, recreation, amenities, friends-of-sailor-bar-brochure-and-map | 31/31 required (8 presentation/navigation blocks intentionally changed or omitted) | /files/Sailor-Bar-Brochure-v12a.pdf |
| about/turtle-pond.md | turtle-pond | 13/13 | — |
| about/boat-launch.md | boat-launch | 8/8 | /files/sailor-bar-boat-launch-768x1024.webp |
| about/olive-avenue-overlook.md | olive-avenue-river-overlook | 8/8 | — |
| about/aerojet-groundwater-pumps.md | aerojet-groundwater-pumps | 11/11 | /files/Aerojet-NPDES-Order-R5-2020-0051-002.pdf |
| wildlife/index.md | wildlife | 20/20 | — |
| wildlife/birding.md | birding-at-sailor-bar | 49/49 | /files/Heron-Rookery-Tree-225x300.jpg |
| wildlife/plant-life.md | plant-life | 16/16 | — |
| wildlife/salmon-and-steelhead.md | nature-study | 16/16 | — |
| wildlife/elderberry.md | the-elderberry | 66/66 required (1 gallery overlay block omitted) | 3 JPG files |
| wildlife/great-horned-owls.md | great-horned-owl-nest-east-of-sailor-bar | 29/29 | 1 WebP file |
| history/index.md | a-detailed-history-of-sailor-bar | 59/59 | — |
| history/nisenan-history.md | native-american-history | 48/48 | /files/Grinding-Rocks-at-Sailor-Bar.jpg |
| history/mining-and-dredging.md | gold-dredging-industrial-mining-on-a-massive-scale | 49/49 | 3 files (PDF, JPG, PNG) |
| history/chinese-diggings.md | chinese-diggings-across-from-sailor-bar | 23/23 | 1 JPG file |
| history/river-changes.md | 859-2 | 30/30 | — |
| history/camp-sabadaca.md | remembering-camp-sabadaca | 5/5 | 1 JPG file |
| partners/index.md | partners-affiliates | 37/37 | /files/American-River-Parkway-Plan-2008.pdf |
| partners/american-river-bike-patrol.md | american-river-parway-bike-patrol | 12/12 | — |
| partners/fair-oaks-historical-society.md | fair-oaks-historical-society | 10/10 | — |
| partners/river-city-waterway-alliance.md | river-city-waterway-alliance | 11/11 | — |
| partners/sacramento-county-regional-parks.md | sacramento-county-regional-parks | 13/13 | — |
| partners/save-the-american-river-association.md | save-the-american-river-association-sara | 10/10 | — |
| partners/waterbird-habitat-project.md | waterbird-habitat | 17/17 | — |

## Conversion caveats

- **Heading levels.** Source pages mix `<h1>`–`<h4>`, `<div role="heading" aria-level="3">`, and bold `<strong>` lines used as headings. Existing `<h2>`–`<h4>` levels were kept. `<div role="heading">` became `###`. Bold-only section labels in Turtle Pond and Boat Launch became `##`. The source `<h1>Impacts of the Gold Rush on the Nisenan People</h1>` in Native American History was demoted to `##` (and its `<h2>` children to `###`) because the frontmatter title is the only H1. Empty `<h1>`/`<h2>` placeholder headings were dropped.
- **About Sailor Bar consolidation.** The seven source link-only headings were removed because the same destinations are already available in the section directory. The complete Recreation and Amenities text and the brochure PDF link were consolidated into `about/index.md`; the former promoted detail routes redirect to `/about`. The all-caps “HOW TO ENTER SAILOR BAR” heading was changed to title case.
- **Turtle Pond.** Source HTML is pasted Google-search markup (`<div>` blocks, HTML comments, computed-style attributes, a nested `<ul><li><ul>`). Only text, the one external link, and the flattened three-item list were kept. A trailing `<hr>` was dropped. Original typos are preserved ("companies’ night watchman", "turtle pond").
- **Boat Launch.** `<mark>`, `<u>`, and `role="button"` spans have no Markdown equivalent; the heading is a plain `##`. The image has no alt text in the source, so `![](…)` is used.
- **Wildlife.** Emoji in headings and the `⚠️` safety paragraph are preserved verbatim. Two `<hr>` separators and malformed `<p></ul>` closers were dropped.
- **Plant Life.** Doubly nested `<ul><li><ul>` lists were flattened to single-level lists. Scientific names were `<em><u>` underlined with tooltip spans; only italics were kept. The Blue Elderberry list item is an anchor wrapping bold+italic text; it now links to the promoted `/wildlife/elderberry` page. The `[1]` YouTube citation is preserved as a linked footnote-style marker.
- **Recreation.** Six zero-width spaces (`\u200B`) inside "Activities" and after "RV" were removed. `target="_self"` was dropped.
- **Brochure and map.** The PDF embedder block becomes a plain link to the PDF. The visible text is exactly "Sailor Bar Brochure v12a".
- **Native American History and Birding.** `<figure>/<figcaption>` became an image followed by an italic caption paragraph; the caption text also fills the empty alt attribute.
- **Gold Dredging.** The `<iframe>` embed of `https://archive.org/embed/caclmmgd_000033?autoplay=1#t=20` cannot be expressed in Markdown; it is replaced by a link to the Internet Archive item (`?start=20`). The embed had no title text in the source, so the link label ("Gold Dredge (Internet Archive film, starts at 0:20)") is new wording taken from the Internet Archive item title. The `<a>` for `Sailor_Bar_Gold_Dredge_Article` keeps its raw filename text. The "How Dredges Worked" section was a single `<p>` with `<br>`-separated numbered lines; it is an ordered list. Numbers and wording are unchanged.
- **Amenities.** The "*Photos to come*" placeholder is preserved.
- **Olive Avenue overlook.** The source misspelling "placred" is preserved.
- **Elderberry.** Three source gallery images became ordinary Markdown images. A standalone `6` generated by the legacy gallery overlay was omitted as presentation noise; all substantive source blocks remain.
- **Great Horned Owls.** The complete legacy location text remains, preceded by a separate editorial warning that the record does not establish current nest occupancy and that visitors must not disturb wildlife.
- **Partners.** The legacy partner directory was converted into the `/partners` index. Substantial profiles link to promoted detail pages, the Water Forum item links to its promoted update, and the empty legacy stewardship archive link became plain text so the new directory does not point to a removed archive route.
- **Internal links.** Promoted content now links to current destinations (`/`, `/wildlife/elderberry`, and partner/detail routes) rather than removed public archive pages.
- **Contradictions not editorialized.** No editorial notes were added except the owl disturbance warning. Known cross-page tensions remain as in the sources (e.g. "13 Benches and Tables" on Amenities vs. "12 new benches and 7 tables" in the bench dedication pages; "1900 to 1962" vs. "1899–1913" dredging periods, which the Gold Dredging article itself already explains). If the promoted pages should surface these, add a visibly separate editorial note per AGENTS.md.
- **Not covered here.** The faithful legacy source records under `data/` were not changed. Public `/archive` access is limited to unresolved records listed in `data/public-archive-slugs.json`.
