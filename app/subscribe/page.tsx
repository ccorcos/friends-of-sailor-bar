import { Mail } from "lucide-react";
import { SubscribeForm } from "@/components/forms";

export default function SubscribePage() {
  return <>
    <section className="page-hero"><div className="shell"><p className="kicker"><Mail size={15} /> Email list</p><h1>Email updates</h1><p>Receive occasional email about projects and events at Sailor Bar.</p></div></section>
    <section className="form-page subscribe-page"><div className="shell form-page-grid"><div><h2>Subscribe</h2><p>You can unsubscribe at any time.</p></div><SubscribeForm /></div></section>
  </>;
}
