import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="detail-page standalone-detail container">
      <article className="essay-card">
        <h1>Contact</h1>
        <div className="essay-body">
          <p>For more information about Sailor Bar, email <a href="mailto:protectsailorbar@yahoo.com">protectsailorbar@yahoo.com</a>.</p>
          <p>We will respond as soon as we can.</p>
        </div>
      </article>
    </section>
  );
}
