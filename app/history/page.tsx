import type { Metadata } from "next";
import Link from "next/link";
import { AboutArticle } from "@/components/about-article";

export const metadata: Metadata = { title: "History of Sailor Bar" };

export default function HistoryPage() {
  return (
    <AboutArticle>
      <h1>History of Sailor Bar</h1>

      <section className="about-first-section">
        <h2>A landscape with many layers</h2>
        <p>Sailor Bar&apos;s history remains visible in the ground. Rounded cobbles lie in long ridges, steep banks show where gravel was removed, and trees gather where soil and moisture collected between expanses of stone. Modern habitat work reflects more recent efforts to care for a river changed by mining, dams, and development.</p>
        <p>The landscape holds the continuing history of Nisenan people, the upheaval of the Gold Rush, the machinery of industrial dredging, and the later creation of the American River Parkway.</p>
      </section>

      <section>
        <h2>A Nisenan homeland</h2>
        <p>Long before the name Sailor Bar appeared, the lower American River was within the homeland of Nisenan people. Communities lived along the river and surrounding oak woodland, grassland, and wetlands, drawing food, materials, and meaning from places known across generations.</p>
        <p>Cultural features documented in the wider river corridor remain protected and significant. Their precise locations should not be publicized or disturbed.</p>
        <p><Link href="/history/nisenan-history">Nisenan history along the lower American River</Link></p>
      </section>

      <section>
        <h2>Gold at the river</h2>
        <p>Gold seekers reached this part of the American River around 1850. Early miners worked loose placer deposits with pans, rockers, and sluices. As accessible deposits diminished, miners reworked earlier claims and searched deeper gravel.</p>
        <p>The name Sailor Bar is commonly connected to a story about a sailor, or group of sailors, who left a ship and came inland to mine. It remains a local legend rather than a firmly documented account.</p>
      </section>

      <section>
        <h2>Hydraulic mining and dredging</h2>
        <p>Hydraulic mining used high-pressure water to break apart gravel banks and wash material toward sluices. It moved far more earth than hand tools but stripped vegetation, altered slopes, and released sediment into the river system.</p>
        <p>Near the turn of the twentieth century, the Ashburton Mining Company constructed a bucket-line dredge at Sailor Bar. The machine excavated gravel, processed it for gold, and discharged the remaining cobble behind it. The tailing ridges visible today are the clearest remains of that industrial work.</p>
        <p><Link href="/history/mining-and-dredging">Mining and dredging at Sailor Bar</Link></p>
      </section>

      <section>
        <h2>Tailings and recovery</h2>
        <p>Dredging removed much of the former soil and vegetation. Coarse rock was piled into exposed rows while finer material settled elsewhere. The resulting ground drained differently and offered difficult conditions for plants.</p>
        <p>Vegetation gradually returned where moisture and finer soil collected. Oaks, shrubs, and riverbank plants now form habitat within a landscape that still carries the structure of mining.</p>
      </section>

      <section>
        <h2>Public ownership</h2>
        <p>The Fair Oaks Recreation and Park District acquired a substantial part of Sailor Bar in the 1960s. The land later passed to Sacramento County and became part of the American River Parkway.</p>
        <p>Public ownership did not recreate an untouched floodplain. It gave a heavily altered landscape a new purpose centered on open space, recreation, habitat, and river stewardship.</p>
      </section>

      <section>
        <h2>A changed river</h2>
        <p>Folsom and Nimbus dams regulated flows, interrupted the movement of sediment, and prevented salmon from reaching former spawning habitat upstream. Modern projects near Sailor Bar have returned selected gravel to the channel and created habitat for Chinook salmon and steelhead.</p>
        <p>Sailor Bar is neither pristine nature nor only an exhausted mining site. It is a living landscape where Indigenous history, extraction, public recreation, ecological recovery, and active restoration remain present together.</p>
      </section>

      <section>
        <h2>Sources and documents</h2>
        <ul>
          <li><a href="https://regionalparks.saccounty.gov/us/en/parks/american-river-parkway/sailor-bar.html">Sacramento County Regional Parks: Sailor Bar</a></li>
          <li><a href="/files/Sailor_Bar_Gold_Dredge_Article.pdf">Historical article about the Sailor Bar gold dredge (PDF)</a></li>
          <li><a href="https://www.usbr.gov/mp/ccao/american-river.html">U.S. Bureau of Reclamation: American River resources</a></li>
          <li><a href="https://waterforum.org/">Sacramento Water Forum</a></li>
        </ul>
      </section>
    </AboutArticle>
  );
}
