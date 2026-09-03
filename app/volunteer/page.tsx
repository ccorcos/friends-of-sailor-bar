import type { Metadata } from "next";
import { VolunteerForm } from "@/components/forms";

export const metadata: Metadata = { title: "Get Involved" };

export default function VolunteerPage() {
  return (
    <section className="detail-page standalone-detail container">
      <article className="essay-card">
        <h1>Get Involved</h1>
        <div className="embedded-form"><VolunteerForm /></div>
      </article>
    </section>
  );
}
