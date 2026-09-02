import type { Metadata } from "next";
import Link from "next/link";
import { AboutArticle } from "@/components/about-article";

export const metadata: Metadata = { title: "Wildlife at Sailor Bar" };

export default function WildlifePage() {
  return (
    <AboutArticle>
      <h1>Wildlife at Sailor Bar</h1>

      <section className="about-first-section">
        <h2>Several habitats in one park</h2>
        <p>Sailor Bar brings moving river water, a quiet pond, gravel bars, riparian forest, oak woodland, meadow, and dry mining tailings into a relatively compact area. Each habitat supports a different group of plants and animals, and wildlife moves between them throughout the day and year.</p>
        <p>The landscape is not untouched. Mining reshaped the bluffs and floodplain, dams changed river flow and sediment, and restoration work continues to rebuild habitat. Wildlife at Sailor Bar lives within that changed landscape.</p>
      </section>

      <section>
        <h2>Birds</h2>
        <p>Birds are the park&apos;s most visible wildlife. Waterbirds work the shallow river and pond edges, raptors follow the river corridor, woodpeckers and songbirds use the trees, and quail and turkeys move through the woodland and open ground. Migration and nesting seasons make every month different.</p>
        <p><Link href="/wildlife/birding">Birding at Sailor Bar</Link></p>
      </section>

      <section>
        <h2>Mammals, reptiles, and amphibians</h2>
        <p>Mule deer browse quieter trail edges. Coyotes, gray foxes, river otters, beavers, skunks, rabbits, and squirrels also use the park, though many are noticed only briefly or through tracks and other signs.</p>
        <p>Turtles bask around the pond, while lizards and Northern Pacific rattlesnakes use warm rocks and open ground. Stay on established trails, keep dogs leashed, look before stepping over rocks or logs, and give every wild animal room.</p>
      </section>

      <section>
        <h2>Fish and the river</h2>
        <p>Fall-run Chinook salmon and winter steelhead return to the lower American River to spawn. Both depend on clean gravel and suitable flows. Gravel placement and the side channel east of the boat ramp are parts of ongoing efforts to improve habitat for spawning fish and juveniles.</p>
        <p><Link href="/wildlife/salmon-and-steelhead">Salmon and steelhead</Link></p>
      </section>

      <section>
        <h2>Plants make the habitat</h2>
        <p>Cottonwoods, willows, alders, valley oaks, blue oaks, elderberries, native grasses, and seasonal wildflowers provide food, shade, nesting places, and cover. Invasive plants such as yellow star-thistle compete with native vegetation and make restoration an ongoing task.</p>
        <p><Link href="/wildlife/plant-life">Plant life at Sailor Bar</Link></p>
      </section>

      <section>
        <h2>Watching without disturbing</h2>
        <ul>
          <li>Keep your distance from nests, rookeries, young animals, and spawning fish.</li>
          <li>Use established trails and keep dogs under control.</li>
          <li>Never feed wildlife or remove plants and natural materials.</li>
          <li>Carry out fishing line and tackle, which can injure birds and mammals.</li>
          <li>Use binoculars or a long lens rather than approaching wildlife.</li>
        </ul>
      </section>
    </AboutArticle>
  );
}
