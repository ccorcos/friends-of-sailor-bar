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
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const event = getEventBySlug((await params).slug);
  if (!event) notFound();

  const isPast = event.date < getSailorBarDate();

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
              <dd>{event.location}</dd>
            </div>
          </dl>
          {event.html && (
            <div className="essay-body event-body">
              <MarkdownContent html={event.html} />
            </div>
          )}
          {!isPast && (
            <div className="event-actions">
              <Link className="button button-primary" href="/volunteer">Ask about helping <ArrowRight aria-hidden="true" /></Link>
            </div>
          )}
        </article>
      </section>
    </>
  );
}
