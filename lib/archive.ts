import archiveData from "@/data/archive.json";

export type ArchiveItem = {
  slug: string;
  title: string;
  category: string;
  originalPath: string;
  modified: string;
  excerpt: string;
  contentHtml: string;
};

// The archive is a migration queue, not a permanent duplicate of the new site.
// Remove entries here once their useful content has been migrated or deliberately retired.
const resolvedArchiveSlugs = new Set([
  "accomplishments",
  "about-sailor-bar",
  "activities-amenities",
  "amenities",
  "bald-eagles-and-birdhouses",
  "birding-at-sailor-bar",
  "blog-posts",
  "boat-launch",
  "celebrating-american-river-parkway-heroes",
  "donate",
  "earth-day-april-2026",
  "event-calendar",
  "friends-of-sailor-bar",
  "friends-of-sailor-bar-leaders",
  "friends-of-sailor-bar-rock-off-on-october-3rd-2025",
  "friends-of-sailor-bar-stewardship",
  "friends-of-sailor-bar-brochure-and-map",
  "get-involved",
  "gold-dredging-industrial-mining-on-a-massive-scale",
  "health-wellness-day",
  "interactive-birding-at-sailor-bar",
  "key-points-of-interest",
  "mission-vision-values",
  "native-american-history",
  "nature-study",
  "olive-avenue-river-overlook",
  "our-aspiration",
  "partners",
  "plant-life",
  "real-wildlife-encounters",
  "recreation",
  "sailor-bar-bench-and-table-dedication-ceremony",
  "sailor-bar-bench-dedication",
  "sailor-bar-history",
  "sailor-bar-history-2",
  "scenic-river-views",
  "side-channel",
  "something-fishy-is-going-on-here-the-remarkable-spawning-journey",
  "the-ghost-of-sailor-bar-how-sailor-bar-got-its-name-legends-and-historical-facts",
  "the-wild-and-scenic-american-river",
  "turtle-pond",
  "volunteer-sign-up",
  "wildlife",
  "your-donations-support-sailor-bar-activities",
  "a-detailed-history-of-sailor-bar",
]);

const rawArchiveItems = archiveData as ArchiveItem[];
export const archiveItems = rawArchiveItems.filter((item) => !resolvedArchiveSlugs.has(item.slug));

export const archiveCategories = Array.from(new Set(archiveItems.map((item) => item.category)));

export function getArchiveItem(slug: string) {
  return archiveItems.find((item) => item.slug === slug);
}
