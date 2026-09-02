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

export const archiveItems = archiveData as ArchiveItem[];

export const archiveCategories = Array.from(new Set(archiveItems.map((item) => item.category)));

export function getArchiveItem(slug: string) {
  return archiveItems.find((item) => item.slug === slug);
}
