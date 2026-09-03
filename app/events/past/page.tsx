export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { EventCard } from "@/components/event-card";
import { PageIntro } from "@/components/page-structure";
import { getCollectionIndex, getPastEvents } from "@/lib/content";

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
          {events.map((event) => <EventCard event={event} key={event.slug} past />)}
          {!events.length && <p className="empty-state">No past events are listed.</p>}
        </div>
      </section>
    </>
  );
}
