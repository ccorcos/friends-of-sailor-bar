import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Donate" };

export default function DonatePage() {
  return (
    <section className="detail-page standalone-detail container">
      <article className="essay-card">
        <h1>Donate</h1>
        <div className="essay-body donate-content">
          <p className="lead">Your contribution supports Sailor Bar activities, educational events, guided walks, and restoration work.</p>

          <h2>Donate online</h2>
          <p>Online donations are accepted through the Sailor Bar Fund administered by Save the American River Association.</p>
          <p>
            <a className="button button-primary" href="https://www.sarariverwatch.org/sailor_bar">
              Donate to the Sailor Bar Fund <ArrowRight aria-hidden="true" />
            </a>
          </p>

          <h2>Donate by check</h2>
          <p>Make checks payable to <strong>Save the American River Association – Sailor Bar</strong> and mail them to:</p>
          <address>
            Save the American River Association<br />
            8836 Greenback Lane, Suite C<br />
            Orangevale, CA 95662
          </address>

          <p>Save the American River Association is a 501(c)(3) nonprofit organization. Contributions are tax-deductible to the extent allowed by law.</p>
        </div>
      </article>
    </section>
  );
}
