import type { Metadata } from "next";

export const metadata: Metadata = { title: "Donate to Friends of Sailor Bar" };

export default function DonatePage() {
  return (
    <section className="detail-page standalone-detail container">
      <article className="essay-card donate-page">
        <h1>Donate to Friends of Sailor Bar</h1>
        <div className="essay-body donate-content">
          <p>
            Donations to Friends of Sailor Bar are handled through Save the American River Association (SARA).
          </p>
          <p>
            <a
              className="button button-primary"
              href="https://www.sarariverwatch.org/sailor_bar"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate online
            </a>
          </p>
          <p>On the SARA website, select the fund labeled <strong>Sailor Bar Fund</strong>.</p>

          <h2>Donate by check</h2>
          <p>
            Make checks payable to <strong>Save American River Association – Sailor Bar</strong> and mail them to:
          </p>
          <address>
            Save the American River Association<br />
            8836 Greenback Lane, Suite C<br />
            Orangevale, CA 95662
          </address>

          <p>SARA is a 501(c)(3) nonprofit organization. All donations are tax deductible.</p>
        </div>
      </article>
    </section>
  );
}
