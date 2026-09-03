export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects, getUpcomingEvents, getUpdates } from "@/lib/content";
import { formatDate } from "@/lib/format";

export default function Home() {
  const events = getUpcomingEvents(3);
  const updates = getUpdates(3);
  const featuredProjects = getProjects().slice(0, 5);

  return (
    <div className="home container">
      <div className="home-grid">
        <section className="panel">
          <h2>Projects</h2>
          <div className="panel-list project-list">
            {featuredProjects.map((project) => (
              <Link
                className={project.image ? "project-summary" : "text-summary"}
                href={`/projects/${project.slug}`}
                key={project.slug}
              >
                {project.image ? (
                  <>
                    <span className="thumbnail">
                      <Image src={project.image} alt="" fill unoptimized={project.image.startsWith("/media/")} sizes="(max-width: 900px) 25vw, 10vw" />
                    </span>
                    <span><strong>{project.title}</strong></span>
                  </>
                ) : (
                  <strong>{project.title}</strong>
                )}
              </Link>
            ))}
          </div>
          <Link className="more-link" href="/projects">All projects <ArrowRight aria-hidden="true" /></Link>
        </section>

        <section className="panel">
          <h2>Events</h2>
          <div className="panel-list">
            {events.map((event) => (
              <Link
                className="home-event-summary"
                href={`/events/${event.slug}`}
                key={event.slug}
                aria-label={`View ${event.title}`}
              >
                <time className="home-event-date" dateTime={event.date}>
                  <span>{formatDate(event.date, { month: "short" })}</span>
                  <strong>{formatDate(event.date, { day: "numeric" })}</strong>
                </time>
                <span className="home-event-copy">
                  <strong>{event.title}</strong>
                  <small>{formatDate(event.date, { month: "long", day: "numeric", year: "numeric" })} · {event.time}</small>
                  <span>{event.location}</span>
                </span>
              </Link>
            ))}
            {!events.length && <p className="empty-state">No upcoming events are listed.</p>}
          </div>
          <div className="panel-links">
            <Link className="more-link" href="/events">All events <ArrowRight aria-hidden="true" /></Link>
            <Link className="more-link" href="/events/past">Past events <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="panel">
          <h2>Updates</h2>
          <div className="panel-list">
            {updates.map((update) => (
              <Link
                className="text-summary"
                href={`/stories/${update.slug}`}
                key={update.slug}
                aria-label={`Read ${update.title}`}
              >
                <small>{formatDate(update.publishedAt, { month: "short", day: "numeric", year: "numeric" })}</small>
                <strong>{update.title}</strong>
              </Link>
            ))}
          </div>
          <Link className="more-link" href="/stories">All updates <ArrowRight aria-hidden="true" /></Link>
        </section>
      </div>
    </div>
  );
}
