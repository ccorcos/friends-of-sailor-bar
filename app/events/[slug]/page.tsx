export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { DetailBackLink } from "@/components/page-structure";
import { getEventBySlug, getSailorBarDate } from "@/lib/content";
import { formatDate } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const event = getEventBySlug((await params).slug);
  return {
    title: event?.title ?? "Event",
    description: event?.summary,
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const event = getEventBySlug((await params).slug);
  if (!event) notFound();

  const isPast = event.date < getSailorBarDate();
  const relatedStorySlug = event.storySlug || event.relatedUpdate;
  const hasActions = Boolean(relatedStorySlug || event.flyer || (!isPast && !event.flyer));

  return (
    <>
      <DetailBackLink href={isPast ? "/events/past" : "/events"} label={isPast ? "Past events" : "All events"} />
      <section className="detail-page container">
        <article className="essay-card">
          <h1>{event.title}</h1>
          <dl className="essay-facts">
            <div><dt>Date</dt><dd>{formatDate(event.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</dd></div>
            {event.time !== "Time not recorded" && <div><dt>Time</dt><dd>{event.time}</dd></div>}
            <div>
              <dt>Meeting place</dt>
              <dd>
                {event.location}
                {event.address && <><br />{event.mapHref ? <a href={event.mapHref}>{event.address}</a> : event.address}</>}
              </dd>
            </div>
            {event.organizer && <div><dt>Organizer</dt><dd>{event.organizer}</dd></div>}
          </dl>
          {(event.html || event.relatedLinks.length > 0 || event.editorialNote) && (
            <div className="essay-body event-body">
              {event.html && <MarkdownContent html={event.html} />}
              {event.relatedLinks.map((link) => <p key={link.href}><a href={link.href}>{link.label}</a></p>)}
              {event.editorialNote && <p className="editorial-note">{event.editorialNote}</p>}
            </div>
          )}
          {hasActions && (
            <div className="event-actions">
              {relatedStorySlug && (
                <Link className="button" href={`/stories/${relatedStorySlug}`}>Read the related update <ArrowRight aria-hidden="true" /></Link>
              )}
              {event.flyer && (
                <Link className="button" href={event.flyer}>Event flyer (PDF) <ArrowRight aria-hidden="true" /></Link>
              )}
              {!isPast && !event.flyer && (
                <Link className="button button-primary" href="/volunteer">Ask about helping <ArrowRight aria-hidden="true" /></Link>
              )}
            </div>
          )}
        </article>
      </section>
    </>
  );
}
