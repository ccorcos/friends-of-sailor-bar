export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { PageIntro } from "@/components/page-structure";
import { getCollectionIndex, getUpcomingEvents } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function generateMetadata(): Metadata {
  const index = getCollectionIndex("events");
  return {
    title: index?.title ?? "Events",
    description: index?.description,
  };
}

export default function EventsPage() {
  const index = getCollectionIndex("events");
  const events = getUpcomingEvents();

  return (
    <>
      <PageIntro title={index?.title ?? "Events"} />
      <section className="page-content container" aria-label="Upcoming events">
        <div className="content-list">
          {index?.html && <MarkdownContent className="essay-body" html={index.html} />}
          {events.map((event) => (
            <article className="event-card" key={event.slug}>
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
                <Link className="detail-link" href={`/events/${event.slug}`}>Event details <ArrowRight aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
          {!events.length && <p className="empty-state">No upcoming events are listed.</p>}
          <div className="page-actions">
            <Link className="button" href="/events/past">Past events <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
