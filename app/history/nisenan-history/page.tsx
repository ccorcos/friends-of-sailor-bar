import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";

export const metadata: Metadata = { title: "Nisenan History Along the Lower American River" };

export default function NisenanHistoryPage() {
  return (
    <AboutArticle>
      <h1>Nisenan History Along the Lower American River</h1>

      <section className="about-first-section">
        <p>The lower American River lies within the homeland of Nisenan people. Their history reaches far beyond written records created by settlers, miners, and government agencies, and it continues through Nisenan families and communities today.</p>
        <p>This introduction draws on public historical accounts. It does not speak for Nisenan people or replace histories shared by Nisenan knowledge keepers.</p>
      </section>

      <section>
        <h2>Life along the river</h2>
        <p>Nisenan communities lived in villages connected to the American River and the surrounding oak woodland, grassland, and wetlands. Seasonal gathering and established villages supported family and community life across the river corridor.</p>
        <p>The river provided fish, travel, and cultural connection. Nearby habitats provided acorns, seeds, roots, berries, game, waterfowl, and useful plants. These practices depended on close observation, skilled labor, and knowledge carried across generations.</p>
      </section>

      <section>
        <h2>Acorns and oak woodland</h2>
        <p>Acorns were gathered, dried, stored, shelled, ground into meal, leached to remove bitter tannins, and cooked. The process connected oak tending, food preparation, teaching, and community life.</p>
        <p>Bedrock mortars have been documented in the wider American River corridor. The depressions were formed through repeated grinding at places used over many generations. They are protected cultural resources, not abandoned curiosities. Their locations should not be publicized, and the features should never be touched or altered.</p>
      </section>

      <section>
        <h2>Salmon and seasonal return</h2>
        <p>Salmon and other fish were important seasonal foods. Their return connected water, weather, food, and community. The river today cannot be assumed to resemble the river known before mining, dams, diversions, and settlement changed its channels and spawning habitat.</p>
      </section>

      <section>
        <h2>The Gold Rush</h2>
        <p>The arrival of miners beginning in 1848 brought catastrophic change. Riverbanks were occupied and excavated, gathering areas were damaged or made inaccessible, fisheries and oak woodland were disrupted, and Native people across California experienced disease, forced labor, removal, and violence.</p>
        <p>The language of settlement can make the taking of land sound peaceful or inevitable. At Sailor Bar, mining history must include both the opportunities pursued by newcomers and the displacement and environmental damage imposed on existing communities.</p>
      </section>

      <section>
        <h2>Continuity</h2>
        <p>Nisenan people did not disappear. Descendants continue to live in the region, maintain family and cultural ties, revitalize language and traditions, and participate in contemporary public life.</p>
        <p>Visitors can help protect this history by remaining on established routes, leaving cultural materials where they are, and not sharing the locations of sensitive sites. The river corridor is not only a park or former mining ground. It remains part of a living Indigenous homeland.</p>
      </section>
    </AboutArticle>
  );
}
