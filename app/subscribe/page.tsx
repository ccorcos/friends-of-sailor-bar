import { Mail } from "lucide-react";
import { SubscribeForm } from "@/components/forms";

export default function SubscribePage() {
  return <>
    <section className="page-hero"><div className="shell"><p className="kicker"><Mail size={15} /> Stay connected</p><h1>Get river updates</h1><p>Receive occasional notes about events, project progress, wildlife moments, and practical ways to help.</p></div></section>
    <section className="form-page subscribe-page"><div className="shell form-page-grid"><div><h2>Good news, about once a month.</h2><p>We’ll keep it useful and uncomplicated. You can unsubscribe whenever you like.</p></div><SubscribeForm /></div></section>
  </>;
}
