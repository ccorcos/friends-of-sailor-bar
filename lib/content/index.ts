import "server-only";

import path from "node:path";
import {
  assertSafePart,
  listMarkdownFiles,
  markdownFileExists,
  markdownFileIsDraft,
  parseMarkdownFile,
  resolveContentPath,
} from "./files";
import {
  collectionIndexFrontmatterSchema,
  eventFrontmatterSchema,
  pageFrontmatterSchema,
  projectFrontmatterSchema,
  updateFrontmatterSchema,
  type CollectionIndexFrontmatter,
  type EventFrontmatter,
  type PageFrontmatter,
  type ProjectFrontmatter,
  type UpdateFrontmatter,
} from "./schemas";

export type ContentDocument = {
  slug: string;
  body: string;
  html: string;
};

export type EventDocument = ContentDocument & EventFrontmatter;
export type ProjectDocument = ContentDocument & ProjectFrontmatter;
export type UpdateDocument = ContentDocument & UpdateFrontmatter;
export type PageDocument = ContentDocument & PageFrontmatter & {
  section: string;
  segments: string[];
  href: string;
};
export type CollectionIndexDocument = ContentDocument & CollectionIndexFrontmatter & {
  collection: ContentCollection;
};

export type ContentCollection = "events" | "projects" | "updates";

export type PageNavigationItem = Pick<PageDocument, "slug" | "section" | "title" | "navTitle" | "navOrder" | "href">;

function documentFromFile<T extends object>(filePath: string, schema: Parameters<typeof parseMarkdownFile>[1]): ContentDocument & T {
  const parsed = parseMarkdownFile(filePath, schema);
  return {
    ...(parsed.data as T),
    slug: path.basename(filePath, ".md"),
    body: parsed.body,
    html: parsed.html,
  };
}

function validateLimit(limit: number | undefined): number | undefined {
  if (limit === undefined) return undefined;
  if (!Number.isInteger(limit) || limit < 0) throw new RangeError("limit must be a non-negative integer");
  return limit;
}

function itemFiles(collection: ContentCollection): string[] {
  return listMarkdownFiles(resolveContentPath(collection));
}

function isHiddenItemSlug(slug: string): boolean {
  return slug === "index" || slug.startsWith("_");
}

function loadEvents(): EventDocument[] {
  return itemFiles("events")
    .filter((file) => !markdownFileIsDraft(file))
    .map((file) => documentFromFile<EventFrontmatter>(file, eventFrontmatterSchema))
    .filter((document) => !document.draft);
}

export function getSailorBarDate(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function getUpcomingEvents(limit?: number): EventDocument[] {
  const safeLimit = validateLimit(limit);
  const today = getSailorBarDate();
  const events = loadEvents().filter((event) => event.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  return safeLimit === undefined ? events : events.slice(0, safeLimit);
}

export function getPastEvents(): EventDocument[] {
  const today = getSailorBarDate();
  return loadEvents().filter((event) => event.date < today).sort((a, b) => b.date.localeCompare(a.date));
}

export function getEventBySlug(slug: string): EventDocument | undefined {
  assertSafePart(slug, "event slug");
  if (isHiddenItemSlug(slug)) return undefined;
  const file = resolveContentPath("events", `${slug}.md`);
  if (!markdownFileExists(file) || markdownFileIsDraft(file)) return undefined;
  const event = documentFromFile<EventFrontmatter>(file, eventFrontmatterSchema);
  return event.draft ? undefined : event;
}

export function getProjects(): ProjectDocument[] {
  return itemFiles("projects")
    .filter((file) => !markdownFileIsDraft(file))
    .map((file) => documentFromFile<ProjectFrontmatter>(file, projectFrontmatterSchema))
    .filter((document) => !document.draft)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getProjectBySlug(slug: string): ProjectDocument | undefined {
  assertSafePart(slug, "project slug");
  if (isHiddenItemSlug(slug)) return undefined;
  const file = resolveContentPath("projects", `${slug}.md`);
  if (!markdownFileExists(file) || markdownFileIsDraft(file)) return undefined;
  const project = documentFromFile<ProjectFrontmatter>(file, projectFrontmatterSchema);
  return project.draft ? undefined : project;
}

export function getUpdates(limit?: number): UpdateDocument[] {
  const safeLimit = validateLimit(limit);
  const updates = itemFiles("updates")
    .filter((file) => !markdownFileIsDraft(file))
    .map((file) => documentFromFile<UpdateFrontmatter>(file, updateFrontmatterSchema))
    .filter((document) => !document.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return safeLimit === undefined ? updates : updates.slice(0, safeLimit);
}

export function getUpdateBySlug(slug: string): UpdateDocument | undefined {
  assertSafePart(slug, "update slug");
  if (isHiddenItemSlug(slug)) return undefined;
  const file = resolveContentPath("updates", `${slug}.md`);
  if (!markdownFileExists(file) || markdownFileIsDraft(file)) return undefined;
  const update = documentFromFile<UpdateFrontmatter>(file, updateFrontmatterSchema);
  return update.draft ? undefined : update;
}

export function getPageByPath(section: string, segments: readonly string[] = []): PageDocument | undefined {
  assertSafePart(section, "page section");
  segments.forEach((segment) => assertSafePart(segment, "page path segment"));
  if (section.startsWith("_") || segments.some((segment) => segment.startsWith("_"))) return undefined;

  const file = segments.length === 0
    ? resolveContentPath("pages", section, "index.md")
    : resolveContentPath("pages", section, ...segments.slice(0, -1), `${segments.at(-1)}.md`);
  if (!markdownFileExists(file) || markdownFileIsDraft(file)) return undefined;

  const page = documentFromFile<PageFrontmatter>(file, pageFrontmatterSchema);
  if (page.draft) return undefined;
  return {
    ...page,
    section,
    segments: [...segments],
    href: `/${[section, ...segments].join("/")}`,
  };
}

export function getPageNavigation(section?: string): PageNavigationItem[] {
  if (section !== undefined) assertSafePart(section, "page section");
  const pagesRoot = resolveContentPath("pages");
  const files = listMarkdownFiles(pagesRoot, true);
  const navigation = files.flatMap((file): PageNavigationItem[] => {
    const relative = path.relative(pagesRoot, file);
    const parts = relative.split(path.sep);
    const pageSection = parts[0];
    if (section !== undefined && pageSection !== section) return [];
    const pageSegments = [...parts.slice(1, -1), path.basename(parts.at(-1)!, ".md")];
    const page = getPageByPath(pageSection, pageSegments);
    if (!page || !page.navTitle) return [];
    return [{
      slug: page.slug,
      section: page.section,
      title: page.title,
      navTitle: page.navTitle,
      navOrder: page.navOrder,
      href: page.href,
    }];
  });
  return navigation.sort((a, b) => a.section.localeCompare(b.section) || a.navOrder - b.navOrder || a.navTitle!.localeCompare(b.navTitle!));
}

export function getCollectionIndex(collection: ContentCollection): CollectionIndexDocument | undefined {
  const file = resolveContentPath(collection, "index.md");
  if (!markdownFileExists(file) || markdownFileIsDraft(file)) return undefined;
  const document = documentFromFile<CollectionIndexFrontmatter>(file, collectionIndexFrontmatterSchema);
  if (document.draft) return undefined;
  return { ...document, collection };
}

export type {
  CollectionIndexFrontmatter,
  EventFrontmatter,
  PageFrontmatter,
  ProjectFrontmatter,
  RelatedLink,
  UpdateFrontmatter,
} from "./schemas";
export { ContentError } from "./files";
