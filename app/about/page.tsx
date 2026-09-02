import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-structure";

export const metadata: Metadata = {
  title: "About",
  description: "A concise guide to Sailor Bar, its wildlife, history, landmarks, and community stewardship.",
};

const sections = [
  { href: "#park", label: "Sailor Bar" },
  { href: "#visiting", label: "Visiting" },
  { href: "#wildlife", label: "Wildlife and plants" },
  { href: "#history", label: "History" },
  { href: "#places", label: "Places to notice" },
  { href: "#friends", label: "Friends of Sailor Bar" },
  { href: "#more", label: "More information" },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro title="About Sailor Bar">A place shaped by the American River, many generations of human history, and the wildlife that still finds refuge here.</PageIntro>
      <div className="about-layout container">
        <aside className="about-directory">
          <nav aria-label="On this page">
            <h2>On this page</h2>
            <ul>
              {sections.map((section) => <li key={section.href}><a href={section.href}>{section.label}</a></li>)}
            </ul>
            <h2>Elsewhere</h2>
            <ul>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/stories">Updates</Link></li>
              <li><Link href="/volunteer">Volunteer</Link></li>
              <li><Link href="/donate">Donate</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/archive">Archive</Link></li>
            </ul>
          </nav>
        </aside>

        <article className="about-essay">
          <section id="park">
            <h2>Sailor Bar</h2>
            <p className="lead">Sailor Bar is a quiet stretch of the American River Parkway in Fair Oaks, where oak woodland, open meadow, gravel bars, ponds, and river habitat meet.</p>
            <p>Sacramento County Regional Parks operates the park. Its trails and overlooks invite walking, wildlife observation, fishing, paddling, picnicking, and time beside the river. The landscape can feel secluded even though it sits within a larger urban region.</p>
            <p>The park is not a single viewpoint or trail. It includes two entrances, a boat ramp, Turtle Pond, riverside paths, broad tailing fields left by mining, and small habitat areas that change with the seasons and river conditions.</p>
          </section>

          <section id="visiting">
            <h2>Visiting</h2>
            <p>Sailor Bar can be entered from Olive Avenue or Illinois Avenue in Fair Oaks. The Illinois Avenue entrance leads toward the boat ramp and the oak gathering area used for many Friends of Sailor Bar programs. The Olive Avenue entrance opens near a meadow and river overlook.</p>
            <p>Conditions, fees, facilities, river access, and seasonal rules can change. Check <a href="https://regionalparks.saccounty.gov/us/en/parks/american-river-parkway/sailor-bar.html">Sacramento County Regional Parks</a> before visiting, especially when launching a boat or planning to fish.</p>
            <p><a href="/archive/media/Sailor-Bar-Brochure-v12a.pdf">Open the archived Sailor Bar brochure and map (PDF)</a>.</p>
          </section>

          <section id="wildlife">
            <h2>Wildlife and plants</h2>
            <p>The river, pond, riparian trees, oak woodland, meadow, and dry gravel tailings support different communities of plants and animals. Visitors may notice waterbirds, songbirds, raptors, deer, coyotes, rabbits, squirrels, reptiles, and signs of animals that remain out of sight.</p>
            <p>Fall Chinook salmon and winter steelhead are part of the river’s seasonal story. Side channels and gravel beds can provide important habitat for spawning fish and young salmon. Watching from a respectful distance helps protect fish and their nests in the gravel.</p>
            <p>Cottonwoods, willows, valley oaks, elderberries, native grasses, and seasonal wildflowers help define the park. Some areas also contain invasive plants, making careful restoration and native planting an ongoing stewardship concern.</p>
            <p>Wildlife sightings are never guaranteed. Observe quietly, keep dogs under control, do not feed animals, and avoid approaching nests, young animals, or sensitive habitat.</p>
            <p className="further-reading">Further reading: <Link href="/archive/birding-at-sailor-bar">Birding at Sailor Bar</Link>, <Link href="/archive/plant-life">Plant life</Link>, and <Link href="/archive/nature-study">salmon and steelhead runs</Link>.</p>
          </section>

          <section id="history">
            <h2>History</h2>
            <p>The lower American River has been home to Nisenan people since long before the creation of the park or the arrival of gold seekers. Bedrock mortars and other cultural resources connect the present landscape to generations of life, food gathering, and care for the river corridor. These places deserve protection and respectful interpretation rather than use as attractions.</p>
            <p>During the Gold Rush, miners worked gravel deposits along the river. Later hydraulic mining, dredging, and aggregate extraction changed the channel and surrounding land on an industrial scale. The rounded rock fields and altered bluffs visible today are not untouched scenery; they are evidence of that transformation.</p>
            <p>Sailor Bar’s name is commonly connected to stories of sailors leaving ships to search for gold. Some versions are documented as local history, while others belong more clearly to legend—including the story of a ghost said to guard buried treasure. Keeping folklore distinct from established fact makes both more interesting.</p>
            <p>In the twentieth century, the area became part of the public parkway. Recreation, flood-control infrastructure, habitat restoration, and community stewardship have continued to shape it. Sailor Bar is best understood as a living landscape rather than a place frozen in one period.</p>
            <p className="further-reading">Further reading: <Link href="/archive/a-detailed-history-of-sailor-bar">A detailed history of Sailor Bar</Link>, <Link href="/archive/native-american-history">Native American history</Link>, and <Link href="/archive/gold-dredging-industrial-mining-on-a-massive-scale">gold dredging along the lower American River</Link>.</p>
          </section>

          <section id="places">
            <h2>Places to notice</h2>
            <dl className="place-list">
              <div><dt>Turtle Pond</dt><dd>A sheltered pond and wildlife area near the northern end of the park, and the focus of a proposed more accessible walking route.</dd></div>
              <div><dt>Olive Avenue overlook</dt><dd>An open meadow above the river with broad views across the corridor.</dd></div>
              <div><dt>Boat ramp</dt><dd>A river access point near the Illinois Avenue entrance. Check current conditions and rules before launching.</dd></div>
              <div><dt>Salmon side channel</dt><dd>A constructed channel intended to provide slower-water habitat for young fish.</dd></div>
              <div><dt>Oak gathering area</dt><dd>The shaded meeting place for many community and educational events.</dd></div>
              <div><dt>Cultural and historic features</dt><dd>Grinding rocks, mining remains, and memorials are reminders that the park holds stories extending far beyond its present-day use.</dd></div>
            </dl>
          </section>

          <section id="friends">
            <h2>Friends of Sailor Bar</h2>
            <p>Friends of Sailor Bar is a volunteer-led community working with Regional Parks and neighboring organizations to care for this part of the American River Parkway.</p>
            <p>Our priorities are practical and long-term: welcoming more people into nature, improving habitat, sharing the park’s history responsibly, organizing educational programs, and creating useful ways for neighbors to participate. Current ideas include a more accessible Turtle Pond walk, native planting, oak trees, butterfly habitat, and visitor improvements.</p>
            <p>The work depends on listening, verification, public-agency review, and continued volunteer care. Proposed projects remain proposals until their locations, partners, approvals, funding, and maintenance plans are established.</p>
          </section>

          <section id="more">
            <h2>More information</h2>
            <ul className="about-links">
              <li><Link href="/projects">See current stewardship projects</Link></li>
              <li><Link href="/events">Find an upcoming event</Link></li>
              <li><Link href="/events/past">Browse past events</Link></li>
              <li><Link href="/stories">Read project and community updates</Link></li>
              <li><Link href="/volunteer">Offer to volunteer</Link></li>
              <li><Link href="/archive">Explore the preserved website archive</Link></li>
            </ul>
          </section>
        </article>
      </div>
    </>
  );
}
