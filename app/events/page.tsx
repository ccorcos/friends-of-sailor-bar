export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageIntro } from "@/components/page-structure";
import { getUpcomingEvents } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  const events = getUpcomingEvents();

  return (
    <>
      <PageIntro title="Events">Upcoming programs, walks, and volunteer workdays at Sailor Bar.</PageIntro>
      <section className="page-content container" aria-label="Upcoming events">
        <div className="content-list">
          {events.map((event) => (
            <article className="event-card" key={event.id}>
              <time dateTime={event.date}>
                {formatDate(event.date, { weekday: "short", month: "long", day: "numeric", year: "numeric" })}
              </time>
              <div>
                <h2><Link href={`/events/${event.slug}`}>{event.title}</Link></h2>
                <p>{event.summary}</p>
                <Link className="detail-link" href={`/events/${event.slug}`}>Event details <ArrowRight aria-hidden="true" /></Link>
              </div>
              <dl className="card-facts">
                <div><dt>Time</dt><dd>{event.time}</dd></div>
                <div><dt><MapPin aria-hidden="true" /> Place</dt><dd>{event.location}</dd></div>
              </dl>
            </article>
          ))}
          {!events.length && <p className="empty-state">No upcoming events are listed.</p>}
        </div>
      </section>
    </>
  );
}
