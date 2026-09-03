import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected an ISO date (YYYY-MM-DD)").refine((value) => {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}, "Expected a valid calendar date");

const optionalText = z.string().trim().optional();
const assetPath = z.string().trim().refine(
  (value) => value === "" || /^\/(?:images|files|media)\//.test(value),
  "Assets must use /images, /files, or /media",
);
export const eventFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  date: isoDate,
  time: z.string().trim().min(1),
  location: z.string().trim().min(1),
}).strict();

export const projectFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  image: assetPath,
  order: z.number().int(),
}).strict();

export const updateFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  image: assetPath,
  publishedAt: isoDate,
}).strict();

export const pageFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  image: assetPath,
  order: z.number().int(),
}).strict();

export const collectionIndexFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  description: optionalText,
}).strict();

export type EventFrontmatter = z.infer<typeof eventFrontmatterSchema>;
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type UpdateFrontmatter = z.infer<typeof updateFrontmatterSchema>;
export type PageFrontmatter = z.infer<typeof pageFrontmatterSchema>;
export type CollectionIndexFrontmatter = z.infer<typeof collectionIndexFrontmatterSchema>;
