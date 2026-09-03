import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <section className="detail-page standalone-detail container">
      <article className="essay-card">
        <h1>Contact Us</h1>
        <div className="essay-body">
          <p>
            For more information about Sailor Bar, please send an email to{" "}
            <a href="mailto:protectsailorbar@yahoo.com">protectsailorbar@yahoo.com</a>.
          </p>
          <p>We will respond as soon as we can.</p>
          <p><em>Thank you for your interest in Sailor Bar!</em></p>
        </div>
      </article>
    </section>
  );
}
