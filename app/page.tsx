export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPosts, getUpcomingEvents } from "@/lib/db";
import { getEventPageContent } from "@/lib/event-content";
import { formatDate } from "@/lib/format";
import { getStoryLegacyItems } from "@/lib/legacy-mappings";
import { projects } from "@/lib/projects";

const featuredProjectSlugs = [
  "butterfly-sanctuary",
  "accessible-turtle-pond-walk",
  "water-fountain-welcome-garden",
  "oak-trees",
];

export default function Home() {
  const events = getUpcomingEvents(3);
  const posts = getPosts(3);
  const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);
    return project ? [project] : [];
  });

  return (
    <div className="home container">
      <div className="home-grid">
        <section className="panel">
          <h2>Projects</h2>
          <div className="panel-list project-list">
            {featuredProjects.map((project) => (
              <Link className="project-summary" href={`/projects/${project.slug}`} key={project.slug}>
                <span className="thumbnail">
                  <Image src={project.image} alt="" fill sizes="(max-width: 900px) 25vw, 10vw" />
                </span>
                <span><strong>{project.title}</strong><small>{project.summary}</small></span>
              </Link>
            ))}
          </div>
          <Link className="more-link" href="/projects">All projects <ArrowRight aria-hidden="true" /></Link>
        </section>

        <section className="panel">
          <h2>Events</h2>
          <div className="panel-list">
            {events.map((event) => {
              const title = getEventPageContent(event.slug)?.title ?? event.title;

              return (
                <Link
                  className="home-event-summary"
                  href={`/events/${event.slug}`}
                  key={event.id}
                  aria-label={`View ${title}`}
                >
                  <time className="home-event-date" dateTime={event.date}>
                    <span>{formatDate(event.date, { month: "short" })}</span>
                    <strong>{formatDate(event.date, { day: "numeric" })}</strong>
                  </time>
                  <span className="home-event-copy">
                    <small>{formatDate(event.date, { month: "long", day: "numeric", year: "numeric" })} · {event.time}</small>
                    <strong>{title}</strong>
                    <span>{event.location}</span>
                  </span>
                </Link>
              );
            })}
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
            {posts.map((post) => {
              const legacyItem = getStoryLegacyItems(post.slug)[0];
              const title = legacyItem?.title ?? post.title;
              const excerpt = legacyItem?.excerpt ?? post.excerpt;

              return (
                <Link
                  className="text-summary"
                  href={`/stories/${post.slug}`}
                  key={post.id}
                  aria-label={`Read ${title}`}
                >
                  <small>{formatDate(legacyItem?.modified ?? post.published_at, { month: "short", day: "numeric", year: "numeric" })}</small>
                  <strong>{title}</strong>
                  <span>{excerpt}</span>
                </Link>
              );
            })}
          </div>
          <Link className="more-link" href="/stories">All updates <ArrowRight aria-hidden="true" /></Link>
        </section>
      </div>
    </div>
  );
}
