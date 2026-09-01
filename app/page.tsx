export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, HandHeart, Leaf, Mail } from "lucide-react";
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
        <Image src="/images/river-sunrise.jpg" alt="Morning light over the American River at Sailor Bar" fill priority sizes="100vw" />
        <div className="hero-wash" />
        <div className="shell hero-content">
          <p className="eyebrow light"><Leaf size={16} /> Community-powered stewardship</p>
          <h1>Keep the river<br /><em>wild at heart.</em></h1>
          <p className="hero-copy">We bring neighbors together to care for the wildlife, landscapes, and stories of Sailor Bar.</p>
          <div className="hero-actions"><Link className="button button-sun" href="/volunteer">Get involved <ArrowRight size={18} /></Link><Link className="text-link light" href="/projects">See what we’re working on <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      <section className="intro section">
        <div className="shell intro-grid">
          <p className="kicker">Our shared place</p>
          <div><h2>A quiet bend in the river.<br />A lively community around it.</h2><p className="large-copy">Sailor Bar is a nature sanctuary tucked into the American River Parkway. We help people know it, love it, and care for it—so wildlife and neighbors can thrive here for generations.</p><Link className="text-link" href="/projects">Explore our mission <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      <section className="action-strip">
        <div className="shell action-grid">
          <Link href="/events"><CalendarDays /><span><small>Come outside</small><strong>Find an event</strong></span><ArrowRight /></Link>
          <Link href="/volunteer"><HandHeart /><span><small>Lend a hand</small><strong>Volunteer with us</strong></span><ArrowRight /></Link>
          <Link href="/subscribe"><Mail /><span><small>Stay close</small><strong>Get river updates</strong></span><ArrowRight /></Link>
        </div>
      </section>

      <section className="section projects-preview">
        <div className="shell">
          <div className="section-heading"><div><p className="kicker">What we’re growing</p><h2>Five projects.<br />One healthier habitat.</h2></div><p>Our current work is focused on access, native habitat, shade, and small comforts that make it easier for everyone to spend meaningful time outside.</p></div>
          <div className="project-grid">
            {projects.map((project, index) => <Link className={`project-card project-${index + 1}`} href={`/projects/${project.slug}`} key={project.title}>
              <Image src={project.image} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" />
              <div className="project-overlay" />
              <span className="project-tag">{project.tag}</span>
              <div className="project-copy"><h3>{project.shortTitle}</h3><p>{project.summary}</p></div>
            </Link>)}
          </div>
          <div className="center"><Link className="button button-dark" href="/projects">See all project details <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="section events-preview">
        <div className="shell">
          <div className="section-heading on-dark"><div><p className="kicker">Meet us at the river</p><h2>Upcoming gatherings</h2></div><Link className="text-link light" href="/events">Full event calendar <ArrowRight size={17} /></Link></div>
          <div className="event-list">
            {events.map((event) => <article className="event-row" key={event.id}><time dateTime={event.date}><strong>{new Date(`${event.date}T12:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" })}</strong><span>{new Date(`${event.date}T12:00:00Z`).getUTCDate()}</span></time><div className="event-info"><span className="pill">{event.category}</span><h3>{event.title}</h3><p>{event.summary}</p></div><div className="event-meta"><span>{event.time}</span><span>{event.location}</span></div><Link aria-label={`View ${event.title}`} href={`/events/${event.slug}`}><ArrowRight /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="section stories-preview">
        <div className="shell">
          <div className="section-heading"><div><p className="kicker">Field notes</p><h2>Stories from Sailor Bar</h2></div><Link className="text-link" href="/stories">Read all stories <ArrowRight size={17} /></Link></div>
          <div className="story-grid">{posts.map((post, index) => <article className={index === 0 ? "story-card featured" : "story-card"} key={post.id}><div className="story-image"><Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className="story-copy"><span>{post.category} · {formatDate(post.published_at)}</span><h3>{post.title}</h3><p>{post.excerpt}</p><Link href={`/stories/${post.slug}`}>Read story <ArrowRight size={16} /></Link></div></article>)}</div>
        </div>
      </section>

      <section className="quiet-quote"><div className="shell"><p>“The way of the river is our life force.”</p></div></section>

      <section className="section updates"><div className="shell updates-grid"><div><p className="kicker">A note from the river</p><h2>Good news, once a month.</h2><p>Upcoming events, project progress, wildlife moments, and simple ways to help.</p></div><Link className="button button-dark" href="/subscribe">Sign up for updates <ArrowRight size={18} /></Link></div></section>

      <section className="section volunteer"><div className="shell volunteer-grid"><div><p className="kicker light">Bring your good energy</p><h2>There’s a place for you here.</h2><p>No special experience needed—just care for this place and a willingness to pitch in.</p></div><div className="volunteer-cta"><HandHeart size={28} /><p>Join a workday, welcome guests, share a skill, or help behind the scenes.</p><Link className="button button-light" href="/volunteer">Offer to volunteer <ArrowRight size={18} /></Link></div></div></section>
    </>
  );
}
