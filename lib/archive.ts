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

// The archive is the permanent, faithful record of the former WordPress site.
// Promoting content elsewhere must never remove or replace its archive copy.
const rawArchiveItems = archiveData as ArchiveItem[];
export const archiveItems = rawArchiveItems;
export const mediaLibraryItem = rawArchiveItems.find((item) => item.slug === "media-library");

export const archiveCategories = Array.from(new Set(archiveItems.map((item) => item.category)));

export function getArchiveItem(slug: string) {
  return archiveItems.find((item) => item.slug === slug);
}
