import { HandHeart } from "lucide-react";
import { VolunteerForm } from "@/components/forms";

export default function VolunteerPage() {
  return <>
    <section className="page-hero"><div className="shell"><p className="kicker"><HandHeart size={15} /> Volunteer</p><h1>Volunteer interest form</h1><p>Tell us what work interests you and how you would like to help Friends of Sailor Bar.</p></div></section>
    <section className="form-page"><div className="shell form-page-grid"><div><h2>Ways to help</h2><p>Volunteer needs may include workdays, native planting, visitor and event support, professional services, and administrative work.</p></div><VolunteerForm /></div></section>
  </>;
}
