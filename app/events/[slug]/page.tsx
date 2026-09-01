import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { getEventBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return <>
    <section className="detail-hero"><div className="shell">
      <Link className="back-link" href="/events"><ArrowLeft size={16} /> All events</Link>
      <span className="category">{event.category}</span>
      <h1>{event.title}</h1>
    </div></section>
    <section><div className="shell event-detail-grid">
      <div><p className="lead">{event.summary}</p></div>
      <aside className="event-facts">
        <div><CalendarDays size={20} /><span><strong>Date</strong>{formatDate(event.date)}</span></div>
        <div><Clock size={20} /><span><strong>Time</strong>{event.time}</span></div>
        <div><MapPin size={20} /><span><strong>Meeting place</strong>{event.location}</span></div>
      </aside>
    </div></section>
  </>;
}
