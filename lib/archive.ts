import archiveData from "@/data/archive.json";
import publicArchiveSlugs from "@/data/public-archive-slugs.json";

export type ArchiveItem = {
  slug: string;
  title: string;
  category: string;
  originalPath: string;
  modified: string;
  excerpt: string;
  contentHtml: string;
};

// Keep the complete legacy snapshot in data/archive.json for migration verification.
// Public archive access is limited to records that still need editorial resolution.
const PUBLIC_ARCHIVE_SLUGS = new Set<string>(publicArchiveSlugs);

const rawArchiveItems = archiveData as ArchiveItem[];
export const archiveItems = rawArchiveItems.filter((item) => PUBLIC_ARCHIVE_SLUGS.has(item.slug));
export const mediaLibraryItem = archiveItems.find((item) => item.slug === "media-library");

export const archiveCategories = Array.from(new Set(archiveItems.map((item) => item.category)));

export function getArchiveItem(slug: string) {
  return archiveItems.find((item) => item.slug === slug);
}
