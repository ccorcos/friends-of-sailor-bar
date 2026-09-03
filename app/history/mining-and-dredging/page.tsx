import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";
import { LegacyContent, LegacyTitle } from "@/components/legacy-content";

export const metadata: Metadata = { title: "Gold Dredging along the Lower American River" };

export default function MiningAndDredgingPage() {
  return (
    <AboutArticle>
      <LegacyTitle slug="gold-dredging-industrial-mining-on-a-massive-scale" />
      <LegacyContent slug="gold-dredging-industrial-mining-on-a-massive-scale" />
    </AboutArticle>
  );
}
