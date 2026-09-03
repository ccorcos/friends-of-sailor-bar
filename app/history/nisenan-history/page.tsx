import type { Metadata } from "next";
import { AboutArticle } from "@/components/about-article";
import { LegacyContent, LegacyTitle } from "@/components/legacy-content";

export const metadata: Metadata = { title: "Native American History" };

export default function NisenanHistoryPage() {
  return (
    <AboutArticle>
      <LegacyTitle slug="native-american-history" />
      <LegacyContent slug="native-american-history" />
    </AboutArticle>
  );
}
