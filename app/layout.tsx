import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Friends of Sailor Bar",
  description: "Community-powered care for Sailor Bar and the American River Parkway.",
};

function Mark() {
  return <div className="mark" aria-hidden="true"><span>SB</span><i /></div>;
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="utility-bar">
          <div className="shell utility-inner">
            <span><MapPin size={14} /> Fair Oaks, California</span>
            <a href="mailto:protectsailorbar@yahoo.com"><Mail size={14} /> protectsailorbar@yahoo.com</a>
          </div>
        </div>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/"><Mark /><span><strong>Friends of Sailor Bar</strong><small>One river. One habitat. One voice.</small></span></Link>
            <nav aria-label="Main navigation">
              <Link href="/projects">Our work</Link>
              <Link href="/events">Events</Link>
              <Link href="/stories">Field notes</Link>
              <Link href="/volunteer">Volunteer</Link>
              <Link className="nav-cta" href="/subscribe">Get updates</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="shell footer-grid">
            <div><Link className="brand footer-brand" href="/"><Mark /><span><strong>Friends of Sailor Bar</strong><small>Keep her wild, together.</small></span></Link></div>
            <div><h3>Explore</h3><Link href="/projects">Current projects</Link><Link href="/events">Event calendar</Link><Link href="/stories">News & stories</Link></div>
            <div><h3>Get involved</h3><Link href="/volunteer">Volunteer</Link><Link href="/subscribe">Email updates</Link><a href="mailto:protectsailorbar@yahoo.com">Contact us</a></div>
            <div><h3>Visit</h3><p>4253 Illinois Avenue<br />Fair Oaks, CA</p><p className="small">Sailor Bar is part of the American River Parkway.</p></div>
          </div>
          <div className="shell footer-bottom"><span>© 2026 Friends of Sailor Bar</span><span>Photos courtesy of the Friends of Sailor Bar community.</span></div>
        </footer>
      </body>
    </html>
  );
}
