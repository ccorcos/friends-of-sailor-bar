import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";

export const metadata: Metadata = { title: "Plant Life at Sailor Bar" };

export default function PlantLifePage() {
  return (
    <AboutArticle>
      <h1>Plant Life at Sailor Bar</h1>

      <section className="about-first-section">
        <h2>Reading the ground</h2>
        <p>Sailor Bar&apos;s plant communities change as the ground rises away from the river. Moist riverbank gives way to floodplain, oak woodland, open meadow, and the dry gravel tailings left by dredging. The plants in each area determine which birds, insects, and mammals can live there.</p>
      </section>

      <section>
        <h2>Riverbank trees</h2>
        <p><strong>Fremont cottonwood</strong> (<em>Populus fremontii</em>) forms much of the tall canopy near the river. Its crowns provide shade, nesting structure, and prominent perches.</p>
        <p><strong>Willows</strong> (<em>Salix</em> species) grow along the shoreline and floodplain. Their roots help hold banks in place, while dense willow growth shelters songbirds.</p>
        <p><strong>White alder</strong> (<em>Alnus rhombifolia</em>) also grows near water and contributes to the cool, shaded river corridor.</p>
      </section>

      <section>
        <h2>Oak woodland and shrubs</h2>
        <p><strong>Valley oak</strong> (<em>Quercus lobata</em>) and <strong>blue oak</strong> (<em>Quercus douglasii</em>) anchor the drier woodland. Their acorns feed wildlife and have long been an important food for Nisenan people.</p>
        <p><strong>Coyote brush</strong> (<em>Baccharis pilularis</em>) grows along transitions between woodland and open ground, providing cover for small birds and mammals.</p>
        <p><strong>Blue elderberry</strong> (<em>Sambucus cerulea</em>) produces flowers used by pollinators and berries eaten by birds and mammals. Elderberry is also the host plant for the Valley elderberry longhorn beetle. Do not cut, break, or probe its stems.</p>
      </section>

      <section>
        <h2>Wildflowers and seasonal change</h2>
        <p>Mountain garland, yerba mansa, and other wildflowers appear in different soils and moisture conditions. Spring brings the strongest growth and bloom. By summer, meadow grasses turn gold and the landscape&apos;s color shifts toward seed heads, berries, bark, and foliage.</p>
        <p>Seasonal plants are easy to overlook or trample. Staying on established trails protects seedlings and flowers while still allowing close observation.</p>
      </section>

      <section>
        <h2>Invasive plants</h2>
        <p>Yellow star-thistle spreads across dry tailings and open ground, crowding out native grasses and creating dense, spiny stands. Floating water fern can occasionally cover still water around Turtle Pond. Other introduced plants compete with native vegetation throughout the park.</p>
        <p>Removing invasive plants and establishing native replacements requires repeated work over several seasons. New planting projects also need watering and maintenance until roots are established.</p>
      </section>

      <section>
        <h2>A recovering landscape</h2>
        <p>Much of Sailor Bar&apos;s rocky ground was arranged by mining machinery rather than ordinary river movement. Plants returned first where finer soil, shade, and moisture collected between the tailings. Those pockets now provide real habitat, even while the industrial shape of the land remains visible.</p>
        <p>Many recorded species can be reviewed in the <a href="https://www.inaturalist.org/projects/sailor-bar-biodiversity">Sailor Bar Biodiversity Project on iNaturalist</a>.</p>
        <ul>
          <li>Leave flowers, berries, branches, and seeds for wildlife.</li>
          <li>Do not collect plants or disturb holes in elderberry stems.</li>
          <li>Clean seeds and mud from footwear to avoid spreading invasive plants.</li>
          <li>Photograph observations rather than taking specimens.</li>
        </ul>
      </section>
    </AboutArticle>
  );
}
