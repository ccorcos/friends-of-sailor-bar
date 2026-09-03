export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-structure";
import { getCollectionIndex, getPastEvents } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function generateMetadata(): Metadata {
  return {
    title: "Past events",
    description: getCollectionIndex("events")?.description,
  };
}

export default function PastEventsPage() {
  const events = getPastEvents();

  return (
    <>
      <PageIntro title="Past events" />
      <section className="page-content container" aria-label="Past events">
        <div className="content-list">
          {events.map((event) => (
            <article className="event-card" key={event.slug}>
              <Link
                className="event-date-tile past-event-date-tile"
                href={`/events/${event.slug}`}
                aria-label={`View ${event.title} on ${formatDate(event.date, { month: "long", day: "numeric", year: "numeric" })}`}
              >
                <time dateTime={event.date}>
                  <span className="event-month">{formatDate(event.date, { month: "short" })}</span>
                  <span className="event-day">{formatDate(event.date, { day: "numeric" })}</span>
                  <span className="event-year">{formatDate(event.date, { year: "numeric" })}</span>
                </time>
              </Link>
              <div className="event-copy">
                <p className="event-time">
                  {formatDate(event.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  {event.time !== "Time not recorded" && ` · ${event.time}`}
                </p>
                <p className="event-location">{event.location}</p>
                <h2><Link href={`/events/${event.slug}`}>{event.title}</Link></h2>
                <Link className="detail-link" href={`/events/${event.slug}`}>View record <ArrowRight aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
          {!events.length && <p className="empty-state">No past events are listed.</p>}
        </div>
      </section>
    </>
  );
}
