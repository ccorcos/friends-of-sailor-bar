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
              <Link
                className="event-date-tile"
                href={`/events/${event.slug}`}
                aria-label={`View ${event.title} on ${formatDate(event.date, { month: "long", day: "numeric", year: "numeric" })}`}
              >
                <time dateTime={event.date}>
                  <span className="event-month">{formatDate(event.date, { month: "short" })}</span>
                  <span className="event-day">{formatDate(event.date, { day: "numeric" })}</span>
                </time>
              </Link>
              <div className="event-copy">
                <p className="event-time">
                  {formatDate(event.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })} · {event.time}
                </p>
                <p className="event-location">{event.location}</p>
                <h2><Link href={`/events/${event.slug}`}>{event.title}</Link></h2>
                <p>{event.summary}</p>
                <Link className="detail-link" href={`/events/${event.slug}`}>Event details <ArrowRight aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
          {!events.length && <p className="empty-state">No upcoming events are listed.</p>}
        </div>
      </section>
    </>
  );
}
