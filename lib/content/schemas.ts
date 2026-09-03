import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected an ISO date (YYYY-MM-DD)").refine((value) => {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}, "Expected a valid calendar date");

const optionalText = z.string().trim().optional();
const safeHref = z.string().trim().min(1).refine(
  (href) => href.startsWith("/") || /^(https?:|mailto:)/i.test(href),
  "Links must be root-relative or use http, https, or mailto",
);
const optionalHref = z.union([z.literal(""), safeHref]).optional();
const optionalAssetPath = z.string().trim().refine(
  (value) => value === "" || /^\/(?:images|files|media)\//.test(value),
  "Assets must use /images, /files, or /media",
).optional();

export const relatedLinkSchema = z.object({
  label: z.string().trim().min(1),
  href: safeHref,
}).strict();

const editorialFields = {
  draft: z.boolean().default(false),
  legacySources: z.array(z.string().trim().min(1)).default([]),
  editorialNote: optionalText,
};

export const eventFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  date: isoDate,
  time: z.string().trim().min(1),
  location: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  category: z.string().trim().min(1),
  featured: z.boolean().default(false),
  flyer: optionalAssetPath,
  storySlug: optionalText,
  relatedUpdate: optionalText,
  relatedLinks: z.array(relatedLinkSchema).default([]),
  organizer: optionalText,
  address: optionalText,
  mapHref: optionalHref,
  ...editorialFields,
}).strict();

export const projectFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  shortTitle: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  image: optionalAssetPath,
  status: z.string().trim().min(1),
  order: z.number().int().default(0),
  featured: z.boolean().default(false),
  featuredOrder: z.number().int().optional(),
  ...editorialFields,
}).strict();

export const updateFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  publishedAt: isoDate,
  excerpt: z.string().trim().min(1),
  category: z.string().trim().min(1),
  image: optionalAssetPath,
  relatedEvent: optionalText,
  relatedProject: optionalText,
  ...editorialFields,
}).strict();

export const pageFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  navTitle: optionalText,
  navOrder: z.number().int().default(0),
  image: optionalAssetPath,
  ...editorialFields,
}).strict();

export const collectionIndexFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  description: optionalText,
  summary: optionalText,
  eyebrow: optionalText,
  image: optionalAssetPath,
  navTitle: optionalText,
  navOrder: z.number().int().default(0),
  ...editorialFields,
}).strict();

export type RelatedLink = z.infer<typeof relatedLinkSchema>;
export type EventFrontmatter = z.infer<typeof eventFrontmatterSchema>;
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type UpdateFrontmatter = z.infer<typeof updateFrontmatterSchema>;
export type PageFrontmatter = z.infer<typeof pageFrontmatterSchema>;
export type CollectionIndexFrontmatter = z.infer<typeof collectionIndexFrontmatterSchema>;
