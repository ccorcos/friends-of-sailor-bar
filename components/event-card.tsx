import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { EventDocument } from "@/lib/content";
import { formatDate, formatEventDateTime } from "@/lib/format";

type EventCardProps = {
  event: EventDocument;
  past?: boolean;
};

export function EventCard({ event, past = false }: EventCardProps) {
  const formattedDate = formatDate(event.date, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="event-card">
      <Link
        className={`event-date-tile${past ? " past-event-date-tile" : ""}`}
        href={`/events/${event.slug}`}
        aria-label={`View ${event.title} on ${formattedDate}`}
      >
        <time dateTime={event.date}>
          <span className="event-month">{formatDate(event.date, { month: "short" })}</span>
          <span className="event-day">{formatDate(event.date, { day: "numeric" })}</span>
          {past && <span className="event-year">{formatDate(event.date, { year: "numeric" })}</span>}
        </time>
      </Link>
      <div className="event-copy">
        <h2><Link href={`/events/${event.slug}`}>{event.title}</Link></h2>
        <p className="event-time">{formatEventDateTime(event.date, event.time)}</p>
        <p className="event-location">{event.location}</p>
        <Link className="detail-link" href={`/events/${event.slug}`}>
          Event details <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
