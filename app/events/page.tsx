export const dynamic = "force-dynamic";

import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { getUpcomingEvents } from "@/lib/db";

function dateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export default function EventsPage() {
  const events = getUpcomingEvents();
  return <>
    <section className="page-hero"><div className="shell"><p className="kicker"><CalendarDays size={15} /> Schedule</p><h1>Events</h1><p>Upcoming programs, walks, and volunteer workdays at Sailor Bar. Check each listing for its time and meeting location.</p></div></section>
    <section className="page-content"><div className="shell"><div className="event-list-page">{events.map(event => <article className="calendar-card" key={event.id}><time dateTime={event.date}>{dateLabel(event.date)}</time><div><span className="pill" style={{color:"#9c4f34"}}>{event.category}</span><h2><Link href={`/events/${event.slug}`}>{event.title}</Link></h2><p>{event.summary}</p><Link className="detail-link" href={`/events/${event.slug}`}>Event details <ArrowRight size={15} /></Link></div><div className="calendar-meta"><strong>{event.time}</strong><br /><span><MapPin size={13} style={{verticalAlign:"middle"}} /> {event.location}</span><br /><small>Free and open to the community.</small></div></article>)}</div></div></section>
  </>;
}
