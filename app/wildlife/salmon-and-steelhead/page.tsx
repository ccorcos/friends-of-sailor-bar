import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";

export const metadata: Metadata = { title: "Salmon and Steelhead at Sailor Bar" };

export default function SalmonAndSteelheadPage() {
  return (
    <AboutArticle>
      <h1>Salmon and Steelhead</h1>

      <section className="about-first-section">
        <h2>The runs</h2>
        <p>Fall-run Chinook salmon generally return from the Pacific between September and November. Steelhead make a similar journey during winter. Both can be observed from the banks at Sailor Bar when conditions and timing align.</p>
        <p>Timing changes from year to year with river flow and water temperature. A visit during the usual season does not guarantee a sighting.</p>
      </section>

      <section>
        <h2>Redds</h2>
        <p>Female salmon move gravel to create shallow nests called redds. From shore, a redd can look like a pale oval where darker surface material has been cleared away.</p>
        <p>Redds and their eggs are fragile. Walking through shallow spawning areas can destroy them. During the runs, remain on the bank or in established access areas and keep dogs out of water where fish are holding or spawning.</p>
      </section>

      <section>
        <h2>What the dams changed</h2>
        <p>Folsom and Nimbus dams block access to former upstream spawning grounds and trap gravel moving down from the Sierra Nevada. Salmon and steelhead now depend on habitat in the lower river, while the gravel they need is no longer naturally replenished at its former rate.</p>
        <p>Regulated releases also changed seasonal flooding, water temperature, channel movement, and floodplain habitat. The Nimbus Fish Hatchery was built to offset part of the spawning habitat lost above the dams.</p>
      </section>

      <section>
        <h2>Restoring spawning gravel</h2>
        <p>The <a href="https://waterforum.org/">Water Forum</a>, the U.S. Bureau of Reclamation, and partner agencies periodically place clean, sorted gravel into the lower American River and shape it into spawning habitat. Sailor Bar has been one location for this work.</p>
        <p>The gravel gives fish suitable places to build redds and gives the sediment-starved river material to move downstream. It is an ongoing intervention rather than a permanent repair.</p>
      </section>

      <section>
        <h2>The side channel</h2>
        <p>A constructed side channel east of the boat ramp provides calmer, shallower water where young Chinook and steelhead can shelter from fast current and larger predators. Slow water and riverbank vegetation also support insects that juvenile fish eat.</p>
        <p>Rock barriers built by visitors can reduce flow and block fish movement. Friends of Sailor Bar has worked with public agencies and volunteers to disperse those barriers and reopen the channel.</p>
      </section>

      <section>
        <h2>Watching responsibly</h2>
        <ul>
          <li>Watch from the bank and stay off pale spawning gravel.</li>
          <li>Keep dogs leashed and away from holding or spawning fish.</li>
          <li>Follow current fishing rules, barbless-hook requirements, and seasonal closures.</li>
          <li>Pack out fishing line and tackle.</li>
          <li>Give fish room to complete the final stage of their migration.</li>
        </ul>
      </section>
    </AboutArticle>
  );
}
