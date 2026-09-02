import type { Metadata } from "next";
import { PageIntro } from "@/components/page-structure";
import { SubscribeForm } from "@/components/forms";

export const metadata: Metadata = { title: "Subscribe" };

export default function SubscribePage() {
  return (
    <>
      <PageIntro title="Subscribe">Receive occasional email about projects and events at Sailor Bar.</PageIntro>
      <section className="form-page container">
        <div className="form-layout">
          <div>
            <h2>Stay informed</h2>
            <p>We send occasional project and event updates. You can unsubscribe at any time.</p>
          </div>
          <SubscribeForm />
        </div>
      </section>
    </>
  );
}
