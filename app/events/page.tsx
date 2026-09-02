export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-structure";
import { getUpcomingEvents } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  const events = getUpcomingEvents();

  return (
    <>
      <PageIntro title="Events" />
      <section className="page-content container" aria-label="Upcoming events">
        <div className="content-list">
          {events.map((event) => (
            <article className="event-card" key={event.id}>
              <time dateTime={event.date}>
                {formatDate(event.date, { weekday: "short", month: "long", day: "numeric", year: "numeric" })}
              </time>
              <h2><Link href={`/events/${event.slug}`}>{event.title}</Link></h2>
              <dl className="event-list-facts">
                <div><dt>Time</dt><dd>{event.time}</dd></div>
                <div><dt>Place</dt><dd>{event.location}</dd></div>
              </dl>
              <p>{event.summary}</p>
              <Link className="detail-link" href={`/events/${event.slug}`}>Event details <ArrowRight aria-hidden="true" /></Link>
            </article>
          ))}
          {!events.length && <p className="empty-state">No upcoming events are listed.</p>}
        </div>
      </section>
    </>
  );
}
