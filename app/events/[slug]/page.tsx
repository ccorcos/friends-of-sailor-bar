import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DetailIntro } from "@/components/page-structure";
import { getEventBySlug } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const event = getEventBySlug((await params).slug);
  return { title: event?.title ?? "Event" };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const event = getEventBySlug((await params).slug);
  if (!event) notFound();

  return (
    <>
      <DetailIntro backHref="/events" backLabel="All events" title={event.title} meta={event.category} />
      <section className="page-content container">
        <article className="detail-card">
          <div className="detail-body">
            <p className="lead">{event.summary}</p>
            <Link className="button button-primary" href="/volunteer">Ask about helping <ArrowRight aria-hidden="true" /></Link>
          </div>
          <dl className="detail-facts">
            <div><dt>Date</dt><dd>{formatDate(event.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</dd></div>
            <div><dt>Time</dt><dd>{event.time}</dd></div>
            <div><dt>Meeting place</dt><dd>{event.location}</dd></div>
          </dl>
        </article>
      </section>
    </>
  );
}
