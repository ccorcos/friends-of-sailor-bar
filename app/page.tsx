export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ClipboardList, HandHeart, Mail } from "lucide-react";
import { getPosts, getUpcomingEvents } from "@/lib/db";
import { projects } from "@/lib/projects";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export default function Home() {
  const events = getUpcomingEvents(3);
  const posts = getPosts(3);
  return (
    <>
      <section className="hero">
        <Image src="/images/river-sunrise.jpg" alt="The American River at Sailor Bar" fill priority sizes="100vw" />
        <div className="hero-wash" />
        <div className="shell hero-content">
          <p className="eyebrow light">Fair Oaks, California</p>
          <h1>Friends of Sailor Bar</h1>
          <p className="hero-copy">Sailor Bar is a Sacramento County park along the American River. The site was used for hydraulic gold mining, and large piles of rock tailings still shape much of its landscape.</p>
          <div className="hero-actions"><Link className="button button-sun" href="/projects">Current projects <ArrowRight size={18} /></Link><Link className="button button-outline" href="/volunteer">Volunteer</Link></div>
        </div>
      </section>

      <section className="action-strip">
        <div className="shell action-grid">
          <Link href="/projects"><ClipboardList /><span><small>Current work</small><strong>View our projects</strong></span><ArrowRight /></Link>
          <Link href="/events"><CalendarDays /><span><small>Schedule</small><strong>Upcoming events</strong></span><ArrowRight /></Link>
          <Link href="/subscribe"><Mail /><span><small>Email</small><strong>Get updates</strong></span><ArrowRight /></Link>
        </div>
      </section>

      <section className="section projects-preview">
        <div className="shell">
          <div className="section-heading"><div><p className="kicker">Current work</p><h2>Projects at Sailor Bar</h2></div><p>We are currently working on park access, habitat planting, visitor water, shade trees, and a native meadow.</p></div>
          <div className="project-grid">
            {projects.map((project, index) => <Link className={`project-card project-${index + 1}`} href={`/projects/${project.slug}`} key={project.title}>
              <Image src={project.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
              <div className="project-overlay" />
              <span className="project-tag">{project.tag}</span>
              <div className="project-copy"><h3>{project.shortTitle}</h3><p>{project.summary}</p></div>
            </Link>)}
          </div>
          <div className="center"><Link className="button button-dark" href="/projects">All project details <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="section events-preview">
        <div className="shell">
          <div className="section-heading on-dark"><div><p className="kicker">Schedule</p><h2>Upcoming events</h2></div><Link className="text-link light" href="/events">All events <ArrowRight size={17} /></Link></div>
          <div className="event-list">
            {events.map((event) => <article className="event-row" key={event.id}><time dateTime={event.date}><strong>{new Date(`${event.date}T12:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" })}</strong><span>{new Date(`${event.date}T12:00:00Z`).getUTCDate()}</span></time><div className="event-info"><span className="pill">{event.category}</span><h3>{event.title}</h3><p>{event.summary}</p></div><div className="event-meta"><span>{event.time}</span><span>{event.location}</span></div><Link aria-label={`View ${event.title}`} href={`/events/${event.slug}`}><ArrowRight /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="section stories-preview">
        <div className="shell">
          <div className="section-heading"><div><p className="kicker">Updates</p><h2>News from Sailor Bar</h2></div><Link className="text-link" href="/stories">All updates <ArrowRight size={17} /></Link></div>
          <div className="story-grid">{posts.map((post, index) => <article className={index === 0 ? "story-card featured" : "story-card"} key={post.id}><div className="story-image"><Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className="story-copy"><span>{post.category} · {formatDate(post.published_at)}</span><h3>{post.title}</h3><p>{post.excerpt}</p><Link href={`/stories/${post.slug}`}>Read update <ArrowRight size={16} /></Link></div></article>)}</div>
        </div>
      </section>

      <section className="section updates"><div className="shell updates-grid"><div><p className="kicker">Email list</p><h2>Get project and event updates</h2><p>We send occasional email about upcoming events and work at Sailor Bar.</p></div><Link className="button button-dark" href="/subscribe">Subscribe <ArrowRight size={18} /></Link></div></section>

      <section className="section volunteer"><div className="shell volunteer-grid"><div><p className="kicker light">Volunteer</p><h2>Help with work at Sailor Bar</h2><p>Tell us what kind of work you are interested in and how you would like to help.</p></div><div className="volunteer-cta"><HandHeart size={28} /><p>Opportunities may include workdays, native planting, event support, and administrative help.</p><Link className="button button-light" href="/volunteer">Volunteer interest form <ArrowRight size={18} /></Link></div></div></section>
    </>
  );
}
