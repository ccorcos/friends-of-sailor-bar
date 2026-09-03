import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";
import { LegacyContent, LegacyTitle } from "@/components/legacy-content";

export const metadata: Metadata = {
  title: "About Sailor Bar",
  description: "Visitor information, directions, activities, and points of interest at Sailor Bar.",
};

export default function AboutPage() {
  return (
    <AboutArticle>
      <LegacyTitle slug="about-sailor-bar" />
      <LegacyContent slug="about-sailor-bar" />
    </AboutArticle>
  );
}
