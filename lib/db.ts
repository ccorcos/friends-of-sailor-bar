import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

export type Event = {
  id: number; title: string; slug: string; date: string; time: string;
  location: string; summary: string; category: string; featured: number;
  story_slug: string; flyer_path: string;
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
    featured INTEGER NOT NULL DEFAULT 0,
    story_slug TEXT NOT NULL DEFAULT '',
    flyer_path TEXT NOT NULL DEFAULT ''
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
  CREATE TABLE IF NOT EXISTS content_migrations (
    name TEXT PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const eventColumns = db.prepare("PRAGMA table_info(events)").all() as { name: string }[];
if (!eventColumns.some((column) => column.name === "story_slug")) {
  db.exec("ALTER TABLE events ADD COLUMN story_slug TEXT NOT NULL DEFAULT ''");
}
if (!eventColumns.some((column) => column.name === "flyer_path")) {
  db.exec("ALTER TABLE events ADD COLUMN flyer_path TEXT NOT NULL DEFAULT ''");
}

function applyContentMigration(name: string, migrate: () => void) {
  const applied = db.prepare("SELECT 1 FROM content_migrations WHERE name = ?").get(name);
  if (applied) return;

  db.transaction(() => {
    migrate();
    db.prepare("INSERT INTO content_migrations (name) VALUES (?)").run(name);
  })();
}

applyContentMigration("2026-09-02-archive-integration", () => {
  const insertEvent = db.prepare(`INSERT OR IGNORE INTO events
    (title, slug, date, time, location, summary, category, featured, story_slug, flyer_path)
    VALUES (@title, @slug, @date, @time, @location, @summary, @category, @featured, @story_slug, @flyer_path)`);
  const events = [
    { title: "Friends of Sailor Bar Rock Off", slug: "friends-of-sailor-bar-rock-off", date: "2025-10-03", time: "Time not recorded", location: "Sailor Bar · Salmon side channel", summary: "Volunteers dispersed rock barriers and restored flow through habitat used by young salmon.", category: "Stewardship", featured: 0, story_slug: "restoring-room-young-salmon", flyer_path: "" },
    { title: "Sailor Bar Bench and Table Dedication", slug: "bench-and-table-dedication", date: "2026-03-18", time: "Time not recorded", location: "Sailor Bar · Olive Avenue overlook", summary: "A community ceremony recognized new places for visitors to rest, gather, and enjoy the river landscape.", category: "Community gathering", featured: 0, story_slug: "seventeen-places-to-pause", flyer_path: "" },
    { title: "Earth Day at Sailor Bar", slug: "earth-day-at-sailor-bar-2026", date: "2026-04-18", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Oak gathering area", summary: "A family Earth Day program with hands-on nature activities and a wildlife encounter.", category: "Nature program", featured: 0, story_slug: "", flyer_path: "" },
    { title: "Interactive Birding at Sailor Bar", slug: "interactive-birding-2026", date: "2026-05-16", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Oak gathering area", summary: "A guided community program introducing the birds and habitats of Sailor Bar.", category: "Nature program", featured: 0, story_slug: "", flyer_path: "" },
    { title: "Family Health and Wellness Day", slug: "family-health-and-wellness-day-2026", date: "2026-06-13", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Oak gathering area", summary: "A family program centered on spending healthy, active time outdoors.", category: "Community program", featured: 0, story_slug: "", flyer_path: "" },
    { title: "Celebrate American River Parkway Heroes", slug: "american-river-parkway-heroes-2026", date: "2026-07-18", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Oak gathering area", summary: "A gathering recognizing volunteers, public servants, and community organizations that care for the American River Parkway.", category: "Community gathering", featured: 0, story_slug: "celebrating-parkway-heroes", flyer_path: "" },
    { title: "The Wild and Scenic American River", slug: "wild-and-scenic-american-river-2026", date: "2026-08-15", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Oak gathering area", summary: "An educational program about the river corridor and the qualities that make it worth protecting.", category: "River program", featured: 0, story_slug: "", flyer_path: "" },
    { title: "Sailor Bar Has Gone to the Birds!", slug: "real-wildlife-encounters", date: "2026-09-19", time: "9:30 AM–11:30 AM", location: "Sailor Bar · Oak gathering area near the boat ramp", summary: "Learn about local bald eagles with wildlife photographer Kathy Kayner, then help paint bird boxes planned for Sailor Bar. Bird-box painting requested a $35 materials donation and advance reservation.", category: "Nature program", featured: 1, story_slug: "", flyer_path: "/files/sb-sep-19-event-flyer.pdf" },
    { title: "The Ghost of Sailor Bar", slug: "ghost-of-sailor-bar", date: "2026-10-17", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Oak gathering area", summary: "Discover how Sailor Bar got its name through local legends, historical facts, and stories from the river.", category: "History walk", featured: 1, story_slug: "", flyer_path: "" },
    { title: "Something Fishy Is Going On Here!", slug: "salmon-spawning-journey", date: "2026-11-21", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Oak gathering area", summary: "Follow the remarkable spawning journey of salmon returning to the American River.", category: "River ecology", featured: 1, story_slug: "", flyer_path: "" },
    { title: "New Year River Clean-up", slug: "new-year-river-cleanup", date: "2027-01-16", time: "9:30 AM–12:00 PM", location: "Sailor Bar · Illinois Avenue entrance", summary: "Start the year outside with neighbors caring for trails, shoreline, and wildlife habitat.", category: "Volunteer day", featured: 0, story_slug: "", flyer_path: "" }
  ];
  events.forEach((event) => insertEvent.run(event));

  const insertPost = db.prepare(`INSERT OR IGNORE INTO posts
    (title, slug, published_at, excerpt, body, image, category)
    VALUES (@title, @slug, @published_at, @excerpt, @body, @image, @category)`);
  const posts = [
    { title: "A more welcoming path to Turtle Pond", slug: "welcoming-path-turtle-pond", published_at: "2026-08-24", excerpt: "Our vision for a gentler, more accessible nature walk where more neighbors can experience the pond and its wildlife.", body: "We are beginning community conversations around a more accessible nature walk at Turtle Pond. The goal is a route that welcomes visitors with a wider range of mobility while protecting this sensitive habitat. Listening, careful design, and partnership with Regional Parks will guide every step.", image: "/images/river-overlook.jpg", category: "Project update" },
    { title: "Restoring room for young salmon", slug: "restoring-room-young-salmon", published_at: "2026-07-28", excerpt: "Volunteers joined river partners to restore flow through an important side channel below Nimbus Dam.", body: "Working together with Sacramento County Parks, the Water Forum, and wildlife partners, volunteers helped disperse rock barriers and restore movement through the side channel. It is a practical example of compassionate, community-powered stewardship.", image: "/images/geese.jpg", category: "Stewardship" },
    { title: "Celebrating American River Parkway heroes", slug: "celebrating-parkway-heroes", published_at: "2026-07-18", excerpt: "A morning of appreciation for the volunteers, public servants, and community groups who care for the parkway.", body: "Friends of Sailor Bar gathered beneath the oaks to recognize people and organizations whose work keeps the American River Parkway safer, cleaner, and welcoming to wildlife and visitors. The program highlighted the many forms that stewardship can take—from trail patrol and habitat care to public service, education, and waterway cleanup. It was also a reminder that the parkway depends on sustained cooperation across the whole river community.", image: "/images/river-sunrise.jpg", category: "Community news" },
    { title: "Seventeen new places to pause", slug: "seventeen-places-to-pause", published_at: "2026-06-12", excerpt: "New benches and tables now give visitors more places to rest, gather, and take in the river landscape.", body: "Thanks to generous community support, seventeen benches and tables have been installed throughout Sailor Bar. These simple places to pause can make the park more welcoming while helping visitors slow down and notice the life around them.", image: "/images/bench.jpg", category: "Community news" }
  ];
  posts.forEach((post) => insertPost.run(post));

  db.prepare(`UPDATE events SET
    title = ?, time = ?, location = ?, summary = ?, category = ?, featured = ?, flyer_path = ?
    WHERE slug = ?`).run(
    "Sailor Bar Has Gone to the Birds!",
    "9:30 AM–11:30 AM",
    "Sailor Bar · Oak gathering area near the boat ramp",
    "Learn about local bald eagles with wildlife photographer Kathy Kayner, then help paint bird boxes planned for Sailor Bar. Bird-box painting requested a $35 materials donation and advance reservation.",
    "Nature program",
    1,
    "/files/sb-sep-19-event-flyer.pdf",
    "real-wildlife-encounters"
  );

  const eventStoryLinks = [
    ["restoring-room-young-salmon", "friends-of-sailor-bar-rock-off"],
    ["seventeen-places-to-pause", "bench-and-table-dedication"],
    ["celebrating-parkway-heroes", "american-river-parkway-heroes-2026"],
  ] as const;
  const updateEventStory = db.prepare("UPDATE events SET story_slug = ? WHERE slug = ?");
  eventStoryLinks.forEach(([storySlug, eventSlug]) => updateEventStory.run(storySlug, eventSlug));
});

applyContentMigration("2026-09-02-move-imported-files", () => {
  db.prepare("UPDATE events SET flyer_path = REPLACE(flyer_path, '/archive/media/', '/files/') WHERE flyer_path LIKE '/archive/media/%'").run();
});

export function getSailorBarDate() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function getUpcomingEvents(limit?: number): Event[] {
  const today = getSailorBarDate();
  const sql = `SELECT * FROM events WHERE date >= ? ORDER BY date ASC${limit ? " LIMIT ?" : ""}`;
  return (limit ? db.prepare(sql).all(today, limit) : db.prepare(sql).all(today)) as Event[];
}

export function getPastEvents(): Event[] {
  return db.prepare("SELECT * FROM events WHERE date < ? ORDER BY date DESC").all(getSailorBarDate()) as Event[];
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
