import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DetailBackLink } from "@/components/page-structure";
import { getEventBySlug, getSailorBarDate } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { getEventLegacyItems } from "@/lib/legacy-mappings";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const event = getEventBySlug(slug);
  const legacyItems = getEventLegacyItems(slug);
  return { title: legacyItems[0]?.title ?? event?.title ?? "Event" };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const isPast = event.date < getSailorBarDate();
  const legacyItems = getEventLegacyItems(slug);

  return (
    <>
      <DetailBackLink href={isPast ? "/events/past" : "/events"} label={isPast ? "Past events" : "All events"} />
      <section className="detail-page container">
        <article className="essay-card">
          <h1>{legacyItems[0]?.title ?? event.title}</h1>
          <dl className="essay-facts">
            <div><dt>Date</dt><dd>{formatDate(event.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</dd></div>
            {event.time !== "Time not recorded" && <div><dt>Time</dt><dd>{event.time}</dd></div>}
            <div><dt>Meeting place</dt><dd>{event.location}</dd></div>
          </dl>
          {legacyItems.length ? (
            <div className="legacy-sources">
              {legacyItems.map((item, index) => (
                <section className="legacy-source" key={item.slug}>
                  {index > 0 && <h2>{item.title}</h2>}
                  <div className="archive-content" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
                </section>
              ))}
            </div>
          ) : (
            <div className="essay-body"><p>{event.summary}</p></div>
          )}
          <div className="event-actions">
            {event.story_slug && (
              <Link className="button button-primary" href={`/stories/${event.story_slug}`}>Read the related update <ArrowRight aria-hidden="true" /></Link>
            )}
            {event.flyer_path && (
              <Link className="button button-primary" href={event.flyer_path}>View event flyer <ArrowRight aria-hidden="true" /></Link>
            )}
            {!isPast && !event.flyer_path && (
              <Link className="button button-primary" href="/volunteer">Ask about helping <ArrowRight aria-hidden="true" /></Link>
            )}
          </div>
        </article>
      </section>
    </>
  );
}
