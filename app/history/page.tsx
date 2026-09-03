import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";
import { LegacyContent, LegacyTitle } from "@/components/legacy-content";

export const metadata: Metadata = { title: "A Detailed History of Sailor Bar" };

export default function HistoryPage() {
  return (
    <AboutArticle>
      <LegacyTitle slug="a-detailed-history-of-sailor-bar" />
      <LegacyContent slug="a-detailed-history-of-sailor-bar" />
    </AboutArticle>
  );
}
