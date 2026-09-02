import type { Metadata } from "next";
import Link from "next/link";
import { resourceLinks, siteLinks } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Friends of Sailor Bar",
    template: "%s · Friends of Sailor Bar",
  },
  description: "Projects, events, and volunteer information for Friends of Sailor Bar in Fair Oaks, California.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header container">
          <Link className="brand" href="/">Friends of Sailor Bar</Link>
          <nav aria-label="Main navigation">
            {siteLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
            <Link className="button" href="/donate">Donate</Link>
            <Link className="button header-volunteer" href="/volunteer">Volunteer</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer container">
          <nav aria-label="More information">
            {resourceLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          </nav>
        </footer>
      </body>
    </html>
  );
}
