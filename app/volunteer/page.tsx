import type { Metadata } from "next";
import { VolunteerForm } from "@/components/forms";
import { LegacyContent, LegacyTitle } from "@/components/legacy-content";

export const metadata: Metadata = { title: "Get Involved" };

export default function VolunteerPage() {
  return (
    <section className="detail-page standalone-detail container">
      <article className="essay-card">
        <LegacyTitle slug="get-involved" />
        <LegacyContent slug="get-involved" />
        <div className="embedded-form"><VolunteerForm /></div>
      </article>
    </section>
  );
}
