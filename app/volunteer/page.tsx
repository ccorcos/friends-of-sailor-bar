import type { Metadata } from "next";
import { PageIntro } from "@/components/page-structure";
import { VolunteerForm } from "@/components/forms";

export const metadata: Metadata = { title: "Volunteer" };

export default function VolunteerPage() {
  return (
    <>
      <PageIntro title="Volunteer">Tell us what work interests you and how you would like to help Friends of Sailor Bar.</PageIntro>
      <section className="form-page container">
        <div className="form-layout">
          <div>
            <h2>Ways to help</h2>
            <p>Needs may include workdays, native planting, visitor support, professional services, and administrative work.</p>
          </div>
          <VolunteerForm />
        </div>
      </section>
    </>
  );
}
