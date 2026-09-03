import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";
import { LegacyContent, LegacyTitle } from "@/components/legacy-content";

export const metadata: Metadata = { title: "Birding at Sailor Bar" };

export default function BirdingPage() {
  return (
    <AboutArticle>
      <LegacyTitle slug="birding-at-sailor-bar" />
      <LegacyContent slug="birding-at-sailor-bar" />
    </AboutArticle>
  );
}
