import type { Metadata } from "next";
import { VolunteerForm } from "@/components/forms";
import { PageIntro } from "@/components/page-structure";

export const metadata: Metadata = { title: "Volunteer" };

export default function VolunteerPage() {
  return (
    <>
      <PageIntro title="Volunteer" />
      <section className="form-page container">
        <VolunteerForm />
      </section>
    </>
  );
}
