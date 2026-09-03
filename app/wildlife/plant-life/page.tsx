import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";
import { LegacyContent, LegacyTitle } from "@/components/legacy-content";

export const metadata: Metadata = { title: "Plant Life" };

export default function PlantLifePage() {
  return (
    <AboutArticle>
      <LegacyTitle slug="plant-life" />
      <LegacyContent slug="plant-life" />
    </AboutArticle>
  );
}
