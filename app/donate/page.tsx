import type { Metadata } from "next";
import { LegacyContent, LegacyTitle } from "@/components/legacy-content";

export const metadata: Metadata = { title: "Your Donations Support Sailor Bar Activities" };

export default function DonatePage() {
  return (
    <section className="detail-page standalone-detail container">
      <article className="essay-card">
        <LegacyTitle slug="your-donations-support-sailor-bar-activities" />
        <LegacyContent slug="your-donations-support-sailor-bar-activities" />
      </article>
    </section>
  );
}
