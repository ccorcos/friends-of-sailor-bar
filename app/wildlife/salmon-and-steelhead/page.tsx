import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";
import { LegacyContent, LegacyTitle } from "@/components/legacy-content";

export const metadata: Metadata = { title: "Salmon and Steelhead Runs at Sailor Bar" };

export default function SalmonAndSteelheadPage() {
  return (
    <AboutArticle>
      <LegacyTitle slug="nature-study" />
      <LegacyContent slug="nature-study" />
    </AboutArticle>
  );
}
