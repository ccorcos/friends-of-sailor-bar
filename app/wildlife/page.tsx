import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";
import { LegacyContent, LegacyTitle } from "@/components/legacy-content";

export const metadata: Metadata = { title: "Wildlife" };

export default function WildlifePage() {
  return (
    <AboutArticle>
      <LegacyTitle slug="wildlife" />
      <LegacyContent slug="wildlife" />
    </AboutArticle>
  );
}
