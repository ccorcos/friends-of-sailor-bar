import type { Metadata } from "next";
import { LegacyContent, LegacyTitle } from "@/components/legacy-content";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <section className="detail-page standalone-detail container">
      <article className="essay-card">
        <LegacyTitle slug="contact" />
        <LegacyContent slug="contact" />
      </article>
    </section>
  );
}
