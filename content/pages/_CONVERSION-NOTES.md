# Promoted Markdown conversion notes

Generated September 3, 2026 from `data/archive.json`. Verify with `node scripts/verify-promoted-markdown.mjs`.

| Markdown file | Legacy slug | Source blocks | Media |
| --- | --- | --- | --- |
| about/index.md | about-sailor-bar | 16/16 | — |
| about/recreation.md | recreation | 18/18 | — |
| about/amenities.md | amenities | 4/4 | — |
| about/brochure-and-map.md | friends-of-sailor-bar-brochure-and-map | 1/1 | /files/Sailor-Bar-Brochure-v12a.pdf |
| about/turtle-pond.md | turtle-pond | 13/13 | — |
| about/boat-launch.md | boat-launch | 8/8 | /files/sailor-bar-boat-launch-768x1024.webp |
| about/olive-avenue-overlook.md | olive-avenue-river-overlook | 8/8 | — |
| wildlife/index.md | wildlife | 20/20 | — |
| wildlife/birding.md | birding-at-sailor-bar | 49/49 | /files/Heron-Rookery-Tree-225x300.jpg |
| wildlife/plant-life.md | plant-life | 16/16 | — |
| wildlife/salmon-and-steelhead.md | nature-study | 16/16 | — |
| history/index.md | a-detailed-history-of-sailor-bar | 59/59 | — |
| history/nisenan-history.md | native-american-history | 48/48 | /files/Grinding-Rocks-at-Sailor-Bar.jpg |
| history/mining-and-dredging.md | gold-dredging-industrial-mining-on-a-massive-scale | 49/49 | 3 files (PDF, JPG, PNG) |

## Conversion caveats

- **Heading levels.** Source pages mix `<h1>`–`<h4>`, `<div role="heading" aria-level="3">`, and bold `<strong>` lines used as headings. Existing `<h2>`–`<h4>` levels were kept. `<div role="heading">` became `###`. Bold-only section labels in Turtle Pond and Boat Launch became `##`. The source `<h1>Impacts of the Gold Rush on the Nisenan People</h1>` in Native American History was demoted to `##` (and its `<h2>` children to `###`) because the frontmatter title is the only H1. Empty `<h1>`/`<h2>` placeholder headings were dropped.
- **About Sailor Bar link headings.** The source has seven centered `<h3>` elements that are only links. They were kept as `###` link headings. Links that had pointed at `/archive/...` were retargeted to the promoted routes where one exists (`/about/recreation`, `/about/amenities`, `/wildlife`, `/wildlife/salmon-and-steelhead`, `/history/nisenan-history`); `Scenic River Views` and `Sailor Bar Gold Rush Legacy` still point to `/archive/...` because they have no promoted page. `target="_blank"` was not preserved.
- **Turtle Pond.** Source HTML is pasted Google-search markup (`<div>` blocks, HTML comments, computed-style attributes, a nested `<ul><li><ul>`). Only text, the one external link, and the flattened three-item list were kept. A trailing `<hr>` was dropped. Original typos are preserved ("companies’ night watchman", "turtle pond").
- **Boat Launch.** `<mark>`, `<u>`, and `role="button"` spans have no Markdown equivalent; the heading is a plain `##`. The image has no alt text in the source, so `![](…)` is used.
- **Wildlife.** Emoji in headings and the `⚠️` safety paragraph are preserved verbatim. Two `<hr>` separators and malformed `<p></ul>` closers were dropped.
- **Plant Life.** Doubly nested `<ul><li><ul>` lists were flattened to single-level lists. Scientific names were `<em><u>` underlined with tooltip spans; only italics were kept. The Blue Elderberry list item is an anchor wrapping bold+italic text; it is kept as a link to `/archive/the-elderberry`. The `[1]` YouTube citation is preserved as a linked footnote-style marker.
- **Recreation.** Six zero-width spaces (`\u200B`) inside "Activities" and after "RV" were removed. `target="_self"` was dropped.
- **Brochure and map.** The PDF embedder block becomes a plain link to the PDF. The visible text is exactly "Sailor Bar Brochure v12a".
- **Native American History and Birding.** `<figure>/<figcaption>` became an image followed by an italic caption paragraph; the caption text also fills the empty alt attribute.
- **Gold Dredging.** The `<iframe>` embed of `https://archive.org/embed/caclmmgd_000033?autoplay=1#t=20` cannot be expressed in Markdown; it is replaced by a link to the Internet Archive item (`?start=20`). The embed had no title text in the source, so the link label ("Gold Dredge (Internet Archive film, starts at 0:20)") is new wording taken from the Internet Archive item title. The `<a>` for `Sailor_Bar_Gold_Dredge_Article` keeps its raw filename text. The "How Dredges Worked" section was a single `<p>` with `<br>`-separated numbered lines; it is an ordered list. Numbers and wording are unchanged.
- **Amenities.** The "*Photos to come*" placeholder is preserved.
- **Olive Avenue overlook.** The source misspelling "placred" is preserved.
- **Contradictions not editorialized.** No editorial notes were added. Known cross-page tensions remain as in the sources (e.g. "13 Benches and Tables" on Amenities vs. "12 new benches and 7 tables" in the bench dedication pages; "1900 to 1962" vs. "1899–1913" dredging periods, which the Gold Dredging article itself already explains). If the promoted pages should surface these, add a visibly separate editorial note per AGENTS.md.
- **Descriptions.** `description` frontmatter is taken from the excerpt (untruncated sentences), not invented.
- **Not covered here.** Nothing under `/archive` or `data/` was changed. No routes, loaders, or package files were touched.
