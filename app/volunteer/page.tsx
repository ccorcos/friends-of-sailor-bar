import { HandHeart } from "lucide-react";
import { VolunteerForm } from "@/components/forms";

export default function VolunteerPage() {
  return <>
    <section className="page-hero"><div className="shell"><p className="kicker"><HandHeart size={15} /> Get involved</p><h1>Volunteer with us</h1><p>Tell us what kind of work interests you. No special experience is needed—just care for Sailor Bar and a willingness to pitch in.</p></div></section>
    <section className="form-page"><div className="shell form-page-grid"><div><h2>Small acts add up.</h2><p>Join a workday, welcome visitors, help with native planting, share a professional skill, or lend a hand behind the scenes.</p></div><VolunteerForm /></div></section>
  </>;
}
