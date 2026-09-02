export const dynamic = "force-dynamic";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { getUpcomingEvents } from "@/lib/db";

function dateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export default function EventsPage() {
  const events = getUpcomingEvents();
  return <>
    <section className="page-hero"><div className="shell"><h1>Events</h1><p>Upcoming programs, walks, and volunteer workdays at Sailor Bar.</p></div></section>
    <section className="page-content"><div className="shell"><div className="event-list-page">{events.map(event => <article className="calendar-card" key={event.id}><time dateTime={event.date}>{dateLabel(event.date)}</time><div><h2><Link href={`/events/${event.slug}`}>{event.title}</Link></h2><p>{event.summary}</p><Link className="detail-link" href={`/events/${event.slug}`}>Event details <ArrowRight size={15} /></Link></div><div className="calendar-meta"><strong>{event.time}</strong><br /><span><MapPin size={13} style={{verticalAlign:"middle"}} /> {event.location}</span></div></article>)}</div></div></section>
  </>;
}
