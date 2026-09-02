import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";

export const metadata: Metadata = { title: "Birding at Sailor Bar" };

export default function BirdingPage() {
  return (
    <AboutArticle>
      <h1>Birding at Sailor Bar</h1>

      <section className="about-first-section">
        <h2>Why birds gather here</h2>
        <p>The American River runs beside stands of willow, alder, and cottonwood. Behind them are oak woodland, open meadow, dry gravel tailings, and Turtle Pond. Each habitat supports different birds, while the edges between habitats are often the most productive places to stop and listen.</p>
        <p>More than 200 species have been recorded at Sailor Bar. The exact total changes as observations are added, but the record reflects the park&apos;s unusual variety within a short walk.</p>
      </section>

      <section>
        <h2>Where to look</h2>
        <p><strong>Along the river:</strong> watch the shallows and gravel bars for Great Blue Herons and Great Egrets, scan open water for waterfowl, and listen for songbirds in the willows.</p>
        <p><strong>In oak woodland and meadow:</strong> look for Acorn Woodpeckers, finches, sparrows, Wild Turkeys, California Quail, and hawks using exposed perches.</p>
        <p><strong>At Turtle Pond:</strong> the pond, cattails, and overhanging trees attract grebes, ducks, blackbirds, vireos, sparrows, and other birds that favor quiet water and dense cover.</p>
        <p><strong>Overhead:</strong> Red-tailed Hawks, Red-shouldered Hawks, Osprey, Bald Eagles, pelicans, and other large birds follow the river corridor. Look up regularly.</p>
      </section>

      <section>
        <h2>Birding through the seasons</h2>
        <p>Spring brings returning migrants and nesting activity. Resident birds raise young through summer. Fall migration moves new species through the river corridor, while winter brings seasonal visitors and makes woodland birds easier to see through bare vegetation.</p>
        <p>There is no single best month. Repeating the same route during different seasons is one of the easiest ways to understand how the park changes.</p>
      </section>

      <section>
        <h2>Herons and nesting birds</h2>
        <p>Great Blue Herons nest colonially in mature trees around Sailor Bar. Their large stick nests and harsh calls can be noticeable during the spring nesting season. Observe from established trails, keep noise down, and do not linger beneath active nest trees. Repeated disturbance can cause nesting birds to abandon a site.</p>
        <p>The same caution applies to every nest. Avoid publishing precise locations for sensitive nesting sites, and use binoculars or a telephoto lens rather than closing the distance.</p>
      </section>

      <section>
        <h2>Identification tools</h2>
        <p><a href="https://merlin.allaboutbirds.org/">Merlin Bird ID</a>, from the Cornell Lab of Ornithology, can suggest birds from a description, photograph, or sound recording. Sound ID is especially useful in dense riverbank vegetation where birds are often heard before they are seen. Treat suggestions as a starting point and compare them with the bird&apos;s appearance and behavior.</p>
        <p><a href="https://ebird.org/hotspot/L225847">The Sailor Bar eBird hotspot</a> collects checklists submitted by birders. Reviewing recent observations before a visit can show which species are being reported during the current season. Adding a complete checklist after a walk contributes to the shared record.</p>
      </section>

      <section>
        <h2>Simple field habits</h2>
        <ul>
          <li>Visit early, when bird activity and light are often better.</li>
          <li>Stop more than you walk. Ten quiet minutes at a habitat edge can reveal more than another mile of trail.</li>
          <li>Notice movement, posture, feeding behavior, and sound rather than relying only on color.</li>
          <li>Keep dogs leashed and remain on established trails.</li>
          <li>Give nesting birds and rookeries a wide berth.</li>
        </ul>
      </section>
    </AboutArticle>
  );
}
