export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPosts, getUpcomingEvents } from "@/lib/db";
import { projects } from "@/lib/projects";

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export default function Home() {
  const events = getUpcomingEvents(3);
  const posts = getPosts(4);
  const projectOrder = ["butterfly-sanctuary", "accessible-turtle-pond-walk", "water-fountain-welcome-garden", "oak-trees"];
  const featuredProjects = projectOrder.map((slug) => projects.find((project) => project.slug === slug)).filter((project) => project !== undefined);

  return (
    <div className="home-dashboard">
      <header className="home-heading">
        <div>
          <Link className="home-title" href="/">Friends of Sailor Bar</Link>
          <p>Sailor Bar is a Sacramento County park along the American River in Fair Oaks, California.</p>
        </div>
        <div className="home-actions" aria-label="Get involved">
          <Link className="home-button primary" href="/volunteer">Volunteer</Link>
          <Link className="home-button" href="/subscribe">Subscribe</Link>
          <a className="home-button" href="https://friendsofsailorbar.org/donate/">Donate</a>
        </div>
      </header>

      <main className="home-columns">
        <section className="home-panel">
          <h1>Projects</h1>
          <div className="home-project-list">
            {featuredProjects.map((project) => (
              <Link className="home-project" href={`/projects/${project.slug}`} key={project.slug}>
                <span className="home-project-image"><Image src={project.image} alt="" fill sizes="72px" /></span>
                <span><strong>{project.title}</strong></span>
              </Link>
            ))}
          </div>
          <Link className="home-more" href="/projects">All projects <ArrowRight size={15} /></Link>
        </section>

        <section className="home-panel">
          <h1>Events</h1>
          <div className="home-event-list">
            {events.map((event) => (
              <Link className="home-event" href={`/events/${event.slug}`} key={event.id}>
                <span><strong>{formatEventDate(event.date)}</strong>{event.time}</span>
                <h2>{event.title}</h2>
                <p>{event.location}</p>
              </Link>
            ))}
            {!events.length && <p className="home-empty">No upcoming events are listed.</p>}
          </div>
          <Link className="home-more" href="/events">All events <ArrowRight size={15} /></Link>
        </section>

        <section className="home-panel">
          <h1>Updates</h1>
          <div className="home-update-list">
            {posts.map((post) => (
              <Link className="home-update" href={`/stories/${post.slug}`} key={post.id}>
                <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
                <h2>{post.title}</h2>
              </Link>
            ))}
          </div>
          <Link className="home-more" href="/stories">All updates <ArrowRight size={15} /></Link>
        </section>
      </main>

      <nav className="home-links" aria-label="More information">
        <a href="https://friendsofsailorbar.org/contact/">Contact</a>
        <a href="https://friendsofsailorbar.org/about-sailor-bar/">About Sailor Bar</a>
        <a href="https://friendsofsailorbar.org/friends-of-sailor-bar-leaders/">People</a>
        <a href="https://friendsofsailorbar.org/sailor-bar-history/">History</a>
        <a href="https://friendsofsailorbar.org/photo-gallery/">Photo gallery</a>
        <a href="https://friendsofsailorbar.org/friends-of-sailor-bar-brochure-and-map/">Map</a>
      </nav>
    </div>
  );
}
