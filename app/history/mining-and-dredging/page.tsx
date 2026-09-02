import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";

export const metadata: Metadata = { title: "Mining and Dredging at Sailor Bar" };

export default function MiningAndDredgingPage() {
  return (
    <AboutArticle>
      <h1>Mining and Dredging at Sailor Bar</h1>

      <section className="about-first-section">
        <p>The broad fields of cobble at Sailor Bar can look natural at first. Individual stones were rounded by water, but many of the long ridges and uneven swales were arranged by mining machinery.</p>
        <p>Mining here began with people washing river gravel by hand and grew into an industry capable of excavating whole terraces. The surviving terrain records that change in scale.</p>
      </section>

      <section>
        <h2>Placer mining</h2>
        <p>Gold seekers reached Sailor Bar around 1850 and worked loose deposits in and beside the river. Pans, rockers, and sluice boxes used gold&apos;s weight to separate it from lighter sand and gravel.</p>
        <p>As easier deposits diminished, miners reworked old claims and searched deeper material. Chinese miners participated throughout the region, often while facing discriminatory laws and hostile conditions.</p>
      </section>

      <section>
        <h2>Hydraulic mining</h2>
        <p>Hydraulic mining directed high-pressure water against gravel banks, breaking them apart and washing sediment toward sluices. The method reduced hand excavation but stripped soil and vegetation, altered slopes, and released large amounts of sediment into waterways.</p>
        <p>Altered bluffs at Sailor Bar have long been associated with this period. Hydraulic equipment also established the industrial pattern that followed: recovering a small amount of gold by moving a very large amount of earth.</p>
      </section>

      <section>
        <h2>The Ashburton dredge</h2>
        <p>In 1899, the Ashburton Mining Company tested gravel deposits at Sailor Bar. Historical accounts identify the company&apos;s bucket-line dredge as the <em>Hercules</em>, launched around the turn of the twentieth century.</p>
        <p>Published descriptions differ on some operating details and production figures. What is clear is the physical scale of the work. The dredge processed the river terrace mechanically, overturning soil, vegetation, and older channels.</p>
      </section>

      <section>
        <h2>How a bucket-line dredge worked</h2>
        <p>A gold dredge was a floating excavation and processing plant. A continuous chain of steel buckets dug gravel at the front of the machine and lifted it aboard. Screens, water, and sluices separated heavier gold from the surrounding material.</p>
        <p>Coarse cobbles and finer waste were discharged behind the vessel. As digging continued at the front and tailings accumulated at the rear, the dredge moved slowly through a pond created by its own excavation.</p>
      </section>

      <section>
        <h2>Reading the tailings</h2>
        <p>Dredge tailings form elongated mounds, stony swales, and broad fields of unusually uniform cobble. Their repeated shapes reveal an industrial origin even though every stone was originally carried and rounded by the river.</p>
        <p>Dredging removed soil structure and separated finer material from coarse rock. Exposed ridges drained quickly and offered difficult conditions for plants. Over time, soil and moisture collected in lower areas, allowing trees and shrubs to return.</p>
      </section>

      <section>
        <h2>From gold to aggregate</h2>
        <p>Industrial use continued after the principal gold-dredging period. Across the lower American River region, old tailings became a source of construction material. Gravel and cobble were washed, crushed, sorted, and sold.</p>
        <p>This later industry further reshaped a landscape already transformed by gold extraction. River stone became mining waste, and mining waste became commercial aggregate.</p>
      </section>

      <section>
        <h2>An industrial landscape in a public park</h2>
        <p>Becoming part of the American River Parkway did not remove the tailings or recreate the earlier floodplain. Instead, public ownership gave the altered ground a new purpose.</p>
        <p>Today the mining terrain supports trails, recreation, patches of woodland, and wildlife habitat. Nearby restoration projects add suitable gravel back to a river whose natural sediment movement has been interrupted by dams. The stones at Sailor Bar remain both habitat and evidence of the costs written into the land.</p>
      </section>

      <section>
        <h2>Historical document</h2>
        <p><a href="/files/Sailor_Bar_Gold_Dredge_Article.pdf">Read the historical article about the Sailor Bar gold dredge (PDF)</a>.</p>
      </section>
    </AboutArticle>
  );
}
