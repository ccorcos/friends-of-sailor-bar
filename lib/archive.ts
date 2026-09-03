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

// The source snapshot keeps every imported page. The site owner explicitly
// removed this one page from the public archive on September 3, 2026.
const HIDDEN_ARCHIVE_SLUGS = new Set(["friends-of-sailor-bar"]);
const rawArchiveItems = archiveData as ArchiveItem[];
export const archiveItems = rawArchiveItems.filter((item) => !HIDDEN_ARCHIVE_SLUGS.has(item.slug));
export const mediaLibraryItem = rawArchiveItems.find((item) => item.slug === "media-library");

export const archiveCategories = Array.from(new Set(archiveItems.map((item) => item.category)));

export function getArchiveItem(slug: string) {
  return archiveItems.find((item) => item.slug === slug);
}
