export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { MarkdownContent } from "@/components/markdown-content";
import { PageIntro } from "@/components/page-structure";
import { getCollectionIndex, getUpcomingEvents } from "@/lib/content";

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
          {events.map((event) => <EventCard event={event} key={event.slug} />)}
          {!events.length && <p className="empty-state">No upcoming events are listed.</p>}
          <div className="page-actions">
            <Link className="button" href="/events/past">Past events <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
