import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

export type Event = {
  id: number; title: string; slug: string; date: string; time: string;
  location: string; summary: string; category: string; featured: number;
};
export type Post = {
  id: number; title: string; slug: string; published_at: string;
  excerpt: string; body: string; image: string; category: string;
};

const dataDir = path.join(process.cwd(), "data");
fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(path.join(dataDir, "sailorbar.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS volunteers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    interests TEXT DEFAULT '',
    message TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    summary TEXT NOT NULL,
    category TEXT NOT NULL,
    featured INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    published_at TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    body TEXT NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL
  );
`);

const eventCount = db.prepare("SELECT COUNT(*) as count FROM events").get() as { count: number };
if (!eventCount.count) {
  const insert = db.prepare(`INSERT INTO events
    (title, slug, date, time, location, summary, category, featured)
    VALUES (@title, @slug, @date, @time, @location, @summary, @category, @featured)`);
  const events = [
    { title: "Real Wildlife Encounters", slug: "real-wildlife-encounters", date: "2026-09-19", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Oak gathering area", summary: "Meet the remarkable wildlife that shares the river corridor and learn how to observe animals safely and respectfully.", category: "Nature program", featured: 1 },
    { title: "The Ghost of Sailor Bar", slug: "ghost-of-sailor-bar", date: "2026-10-17", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Oak gathering area", summary: "Discover how Sailor Bar got its name through local legends, historical facts, and stories from the river.", category: "History walk", featured: 1 },
    { title: "Something Fishy Is Going On Here!", slug: "salmon-spawning-journey", date: "2026-11-21", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Oak gathering area", summary: "Follow the remarkable spawning journey of salmon returning to the American River.", category: "River ecology", featured: 1 },
    { title: "New Year River Clean-up", slug: "new-year-river-cleanup", date: "2027-01-16", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Illinois Avenue entrance", summary: "Start the year outside with neighbors caring for trails, shoreline, and wildlife habitat.", category: "Volunteer day", featured: 0 }
  ];
  const tx = db.transaction(() => events.forEach((event) => insert.run(event)));
  tx();
}

const postCount = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
if (!postCount.count) {
  const insert = db.prepare(`INSERT INTO posts
    (title, slug, published_at, excerpt, body, image, category)
    VALUES (@title, @slug, @published_at, @excerpt, @body, @image, @category)`);
  const posts = [
    { title: "A more welcoming path to Turtle Pond", slug: "welcoming-path-turtle-pond", published_at: "2026-08-24", excerpt: "Our vision for a gentler, more accessible nature walk where more neighbors can experience the pond and its wildlife.", body: "We are beginning community conversations around a more accessible nature walk at Turtle Pond. The goal is a route that welcomes visitors with a wider range of mobility while protecting this sensitive habitat. Listening, careful design, and partnership with Regional Parks will guide every step.", image: "/images/river-overlook.jpg", category: "Project update" },
    { title: "Restoring room for young salmon", slug: "restoring-room-young-salmon", published_at: "2026-07-28", excerpt: "Volunteers joined river partners to restore flow through an important side channel below Nimbus Dam.", body: "Working together with Sacramento County Parks, the Water Forum, and wildlife partners, volunteers helped disperse rock barriers and restore movement through the side channel. It is a practical example of compassionate, community-powered stewardship.", image: "/images/geese.jpg", category: "Stewardship" },
    { title: "Seventeen new places to pause", slug: "seventeen-places-to-pause", published_at: "2026-06-12", excerpt: "New benches and tables now give visitors more places to rest, gather, and take in the river landscape.", body: "Thanks to generous community support, seventeen benches and tables have been installed throughout Sailor Bar. These simple places to pause can make the park more welcoming while helping visitors slow down and notice the life around them.", image: "/images/bench.jpg", category: "Community news" }
  ];
  const tx = db.transaction(() => posts.forEach((post) => insert.run(post)));
  tx();
}

export function getUpcomingEvents(limit?: number): Event[] {
  const sql = `SELECT * FROM events WHERE date >= date('now') ORDER BY date ASC${limit ? " LIMIT ?" : ""}`;
  return (limit ? db.prepare(sql).all(limit) : db.prepare(sql).all()) as Event[];
}

export function getEventBySlug(slug: string): Event | undefined {
  return db.prepare("SELECT * FROM events WHERE slug = ?").get(slug) as Event | undefined;
}

export function getPosts(limit?: number): Post[] {
  const sql = `SELECT * FROM posts ORDER BY published_at DESC${limit ? " LIMIT ?" : ""}`;
  return (limit ? db.prepare(sql).all(limit) : db.prepare(sql).all()) as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  return db.prepare("SELECT * FROM posts WHERE slug = ?").get(slug) as Post | undefined;
}

export default db;
