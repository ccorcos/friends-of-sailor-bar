import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DetailBackLink } from "@/components/page-structure";
import { SimpleMarkdown } from "@/components/simple-markdown";
import { getEventBySlug, getSailorBarDate } from "@/lib/db";
import { getEventPageContent } from "@/lib/event-content";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const event = getEventBySlug(slug);
  const content = getEventPageContent(slug);
  return { title: content?.title ?? event?.title ?? "Event" };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const content = getEventPageContent(slug);
  const isPast = event.date < getSailorBarDate();
  const hasActions = Boolean(event.story_slug || event.flyer_path || (!isPast && !event.flyer_path));

  return (
    <>
      <DetailBackLink href={isPast ? "/events/past" : "/events"} label={isPast ? "Past events" : "All events"} />
      <section className="detail-page container">
        <article className="essay-card">
          <h1>{content?.title ?? event.title}</h1>
          <dl className="essay-facts">
            <div><dt>Date</dt><dd>{formatDate(event.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</dd></div>
            {event.time !== "Time not recorded" && <div><dt>Time</dt><dd>{event.time}</dd></div>}
            <div>
              <dt>Meeting place</dt>
              <dd>
                {event.location}
                {content?.address && <><br />{content.mapHref ? <a href={content.mapHref}>{content.address}</a> : content.address}</>}
              </dd>
            </div>
            {content?.organizer && <div><dt>Organizer</dt><dd>{content.organizer}</dd></div>}
          </dl>
          {(content?.body || content?.relatedLinks?.length || content?.editorialNote) && (
            <div className="essay-body event-body">
              {content?.body && <SimpleMarkdown source={content.body} />}
              {content?.relatedLinks?.map((link) => <p key={link.href}><a href={link.href}>{link.label}</a></p>)}
              {content?.editorialNote && <p className="editorial-note">{content.editorialNote}</p>}
            </div>
          )}
          {hasActions && (
            <div className="event-actions">
              {event.story_slug && (
                <Link className="button" href={`/stories/${event.story_slug}`}>Read the related update <ArrowRight aria-hidden="true" /></Link>
              )}
              {event.flyer_path && (
                <Link className="button" href={event.flyer_path}>Event flyer (PDF) <ArrowRight aria-hidden="true" /></Link>
              )}
              {!isPast && !event.flyer_path && (
                <Link className="button button-primary" href="/volunteer">Ask about helping <ArrowRight aria-hidden="true" /></Link>
              )}
            </div>
          )}
        </article>
      </section>
    </>
  );
}
