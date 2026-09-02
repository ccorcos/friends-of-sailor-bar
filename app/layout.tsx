import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Friends of Sailor Bar",
  description: "Projects, events, and volunteer information for Friends of Sailor Bar in Fair Oaks, California.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/"><strong>Friends of Sailor Bar</strong></Link>
            <nav aria-label="Main navigation">
              <Link href="/projects">Projects</Link>
              <Link href="/events">Events</Link>
              <Link href="/stories">Updates</Link>
              <Link href="/volunteer">Volunteer</Link>
              <Link className="nav-cta" href="/subscribe">Subscribe</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="shell simple-footer">
            <Link className="footer-title" href="/">Friends of Sailor Bar</Link>
            <nav aria-label="Footer navigation">
              <a href="https://friendsofsailorbar.org/contact/">Contact</a>
              <a href="https://friendsofsailorbar.org/about-sailor-bar/">About Sailor Bar</a>
              <a href="https://friendsofsailorbar.org/friends-of-sailor-bar-leaders/">People</a>
              <a href="https://friendsofsailorbar.org/sailor-bar-history/">History</a>
              <a href="https://friendsofsailorbar.org/photo-gallery/">Photo gallery</a>
              <a href="https://friendsofsailorbar.org/friends-of-sailor-bar-brochure-and-map/">Map</a>
            </nav>
            <span>© 2026 Friends of Sailor Bar</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
