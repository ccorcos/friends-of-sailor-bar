import type { Metadata } from "next";
import Link from "next/link";
import { AboutDirectory } from "@/components/about-directory";

export const metadata: Metadata = {
  title: "About Sailor Bar",
  description: "Visitor information, directions, activities, and points of interest at Sailor Bar.",
};

export default function AboutPage() {
  return (
    <div className="about-layout about-layout-standalone container">
      <AboutDirectory />

      <article className="about-essay">
        <h1>About Sailor Bar</h1>
        <section id="park" className="about-first-section">
          <p>Sailor Bar is part of the American River Parkway in Fair Oaks. Sacramento County Regional Parks operates the park, which includes river access, walking and riding trails, oak woodland, open meadow, gravel bars, Turtle Pond, and broad fields of stone left by historic mining.</p>
          <p>The park has two entrances and several distinct areas rather than one central destination. Visitors come to walk, fish, launch small watercraft, watch wildlife, picnic, attend community programs, or spend quiet time beside the river.</p>
        </section>

        <section id="visiting">
          <h2>Visiting</h2>
          <p>The Illinois Avenue entrance leads toward the boat ramp, the final parking area, and the oak gathering area used for many Friends of Sailor Bar events. The Olive Avenue entrance opens near the upper meadow and river overlook.</p>
          <p>Facilities and river conditions can change. Check <a href="https://regionalparks.saccounty.gov/us/en/parks/american-river-parkway/sailor-bar.html">Sacramento County Regional Parks</a> for current hours, parking fees, rules, closures, and boat-launch information.</p>
        </section>

        <section id="map">
          <h2>Map and directions</h2>
          <p>The two park entrances are at 4253 Illinois Avenue and 8266 Olive Avenue in Fair Oaks. They do not connect by road inside the park, so choose the entrance nearest the area you intend to visit.</p>
          <p><a href="/files/Sailor-Bar-Brochure-v12a.pdf">Sailor Bar brochure and map (PDF)</a></p>
        </section>

        <section id="activities">
          <h2>Things to do</h2>
          <ul className="about-activity-list">
            <li><strong>Walk and observe wildlife.</strong> Trails pass through riverbank habitat, oak woodland, meadow, and the rocky terrain shaped by mining.</li>
            <li><strong>Fish or watch the salmon runs.</strong> Chinook salmon return in fall and steelhead in winter. Follow current fishing rules and keep clear of spawning beds.</li>
            <li><strong>Launch a small boat.</strong> The Illinois Avenue boat ramp provides river access for rafts, kayaks, paddleboards, and other small watercraft when conditions allow.</li>
            <li><strong>Ride the parkway.</strong> Equestrian and bicycle routes connect Sailor Bar with the wider American River Parkway.</li>
            <li><strong>Picnic or pause beside the river.</strong> Benches and tables are placed throughout the park, including near the overlook and gathering areas.</li>
          </ul>
        </section>

        <section id="places">
          <h2>Places to notice</h2>
          <dl className="place-list">
            <div><dt>Turtle Pond</dt><dd>A sheltered pond and wildlife area near the northern end of the park.</dd></div>
            <div><dt>Olive Avenue overlook</dt><dd>An open meadow above the river with broad views across the corridor.</dd></div>
            <div><dt>Boat ramp</dt><dd>A river access point near the Illinois Avenue entrance.</dd></div>
            <div><dt>Salmon side channel</dt><dd>A constructed channel that provides slower-water habitat for young fish.</dd></div>
            <div><dt>Oak gathering area</dt><dd>The shaded meeting place for many community and educational events.</dd></div>
            <div><dt>Historic landscape</dt><dd>Mining tailings, altered bluffs, cultural resources, and memorials show the many layers of Sailor Bar&apos;s history.</dd></div>
          </dl>
        </section>

        <section id="wildlife">
          <h2>Wildlife</h2>
          <p>The river, pond, riparian trees, oak woodland, meadow, and gravel tailings support different communities of plants and animals. The wildlife section covers the park&apos;s habitats and links to detailed guides for birding, plant life, salmon, and steelhead.</p>
          <p><Link href="/wildlife">Explore wildlife at Sailor Bar</Link></p>
        </section>

        <section id="history">
          <h2>History</h2>
          <p>Sailor Bar is a layered landscape shaped by Nisenan history, the Gold Rush, hydraulic mining, industrial dredging, aggregate extraction, public recreation, and river restoration.</p>
          <p><Link href="/history">Read the history of Sailor Bar</Link></p>
        </section>

        <section id="friends">
          <h2>Friends of Sailor Bar</h2>
          <p>Friends of Sailor Bar is a volunteer-led community working with Regional Parks and neighboring organizations to care for this part of the American River Parkway.</p>
          <p>Current priorities include habitat improvement, native planting, visitor access, educational programs, and responsible interpretation of the park&apos;s history. Proposed projects remain proposals until their locations, partners, approvals, funding, and maintenance plans are established.</p>
        </section>
      </article>
    </div>
  );
}
