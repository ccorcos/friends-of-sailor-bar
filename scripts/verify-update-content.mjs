#!/usr/bin/env node
// Verifies that the Markdown update collection in content/updates is a faithful
// promotion of its legacy sources in data/archive.json: required frontmatter,
// exact legacy source references, every normalized source text block retained,
// every local /files media reference retained and present on disk, and every
// external link and embedded video still reachable from the update body.
//
// Self-contained: uses only Node built-ins.
// Run with `node scripts/verify-update-content.mjs`.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const updatesDir = join(root, "content", "updates");
const archive = JSON.parse(readFileSync(join(root, "data", "archive.json"), "utf8"));
const bySlug = new Map(archive.map((item) => [item.slug, item]));

const errors = [];
const warnings = [];
const summaries = [];

/* ------------------------------------------------------------------ *
 * Expected collection
 *
 * The published updates, the legacy pages each one was promoted from,
 * and the current title, date, and image choices.
 * ------------------------------------------------------------------ */

const knownUpdates = {
  "celebrating-parkway-heroes": {
    title: "Celebrate American River Parkway Heroes",
    image: "/images/river-sunrise.jpg",
    publishedAt: "2026-08-20",
    sources: ["celebrating-american-river-parkway-heroes"],
  },
  "restoring-room-young-salmon": {
    title: "Friends of Sailor Bar Rock Off on October 3rd, 2025",
    image: "/images/geese.jpg",
    publishedAt: "2026-08-20",
    sources: ["friends-of-sailor-bar-rock-off-on-october-3rd-2025", "side-channel"],
  },
  "seventeen-places-to-pause": {
    title: "Seventeen new places to pause",
    image: "/images/bench.jpg",
    publishedAt: "2026-06-12",
    // Natively authored update: the faithful legacy bench dedication copy lives
    // on /events/bench-and-table-dedication and under /archive.
    sources: [],
  },
  "water-forum-2050-agreement": {
    title: "Sacramento Water Forum",
    image: "/images/river-sunrise.jpg",
    publishedAt: "2026-08-20",
    sources: ["sacramento-water-forum"],
  },
  "welcoming-path-turtle-pond": {
    title: "Turtle Pond",
    image: "/images/river-overlook.jpg",
    publishedAt: "2026-08-30",
    sources: ["turtle-pond"],
  },
};

const archiveLinkReplacements = {
  "/archive/home": "/",
};

const requiredFields = ["title", "image", "publishedAt"];
const quotedFields = ["title", "image", "publishedAt"];
const allowedFields = new Set(requiredFields);

/* ------------------------------------------------------------------ *
 * Frontmatter
 * ------------------------------------------------------------------ */

function unquote(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2)) {
    return trimmed.slice(1, -1).replace(/\\([\\"])/g, "$1");
  }
  return trimmed;
}

// Minimal YAML front matter reader supporting scalars and simple string lists.
function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: null, head: [], body: markdown, error: "missing frontmatter block" };
  const head = match[1].split(/\r?\n/);
  const data = {};
  let currentKey = null;
  for (const rawLine of head) {
    if (!rawLine.trim()) continue;
    const listItem = rawLine.match(/^\s+-\s+(.*)$/);
    if (listItem) {
      if (!currentKey) return { data: null, head, body: "", error: `list entry outside of a key: ${rawLine.trim()}` };
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(unquote(listItem[1]));
      continue;
    }
    const kv = rawLine.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
    if (!kv) return { data: null, head, body: "", error: `unparseable frontmatter line: ${rawLine}` };
    currentKey = kv[1];
    const value = kv[2].trim();
    if (value === "" || value === "[]") data[currentKey] = [];
    else if (value === "true") data[currentKey] = true;
    else if (value === "false") data[currentKey] = false;
    else if (/^-?\d+(\.\d+)?$/.test(value)) data[currentKey] = Number(value);
    else data[currentKey] = unquote(value);
  }
  return { data, head, body: markdown.slice(match[0].length), error: null };
}

/* ------------------------------------------------------------------ *
 * Legacy source and Markdown text helpers
 * ------------------------------------------------------------------ */

function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replaceAll("&amp;", "&")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&hellip;", "\u2026")
    .replaceAll("&ndash;", "\u2013")
    .replaceAll("&mdash;", "\u2014");
}

// Normalization applied to both sides so that formatting differences (Markdown
// emphasis, curly quotes, zero-width characters, whitespace) cannot mask
// missing words.
function normalizeText(value) {
  return value
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Normalize legacy lines that used dash glyphs as visual bullets so they can
// be promoted to semantic Markdown lists without failing text coverage checks.
function normalizeSourceBlock(value) {
  return normalizeText(value).replace(/^(?:[-+*]|\u2013|\u2014)\s*/, "");
}

// Split legacy HTML into block-level text segments.
function sourceBlocks(contentHtml) {
  const withoutNoise = contentHtml
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, " ");
  const blockBoundary =
    /<\/?(?:p|div|h[1-6]|li|ul|ol|figure|figcaption|blockquote|tr|td|th|table|hr|iframe|section|article|header|footer)\b[^>]*>|<br\b[^>]*>/gi;
  return withoutNoise
    .split(blockBoundary)
    .map((chunk) => normalizeSourceBlock(decodeEntities(chunk.replace(/<[^>]+>/g, ""))))
    .filter((chunk) => chunk.length > 0);
}

function sourceMedia(contentHtml) {
  return [...new Set([...contentHtml.matchAll(/(?:src|href)="(\/files\/[^"]+)"/g)].map((m) => m[1]))];
}

function sourceExternalLinks(contentHtml) {
  return [...new Set([...contentHtml.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => decodeEntities(m[1])))];
}

function sourceArchiveLinks(contentHtml) {
  return [...new Set([...contentHtml.matchAll(/href="(\/archive\/[^"]+)"/g)].map((m) => m[1]))];
}

function sourceEmbeds(contentHtml) {
  return [...new Set([...contentHtml.matchAll(/<iframe[^>]*\ssrc="([^"]+)"/gi)].map((m) => decodeEntities(m[1])))];
}

// Reduce Markdown to plain text (keeps link text and image alt text).
function markdownToText(body) {
  return normalizeText(
    body
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, " $1 ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/^\s{0,3}#{1,6}\s+/gm, "")
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/^\s*(\d+)\.\s+/gm, "$1. ")
      .replace(/^\s*>\s?/gm, "")
      .replace(/(\*\*|__)/g, "")
      .replace(/(^|[^\w*])[*_](?=\S)([^*_]+?)(?<=\S)[*_](?=[^\w*]|$)/g, "$1$2")
      .replace(/`([^`]*)`/g, "$1"),
  );
}

function markdownTargets(body, pattern) {
  return [...new Set([...body.matchAll(pattern)].map((m) => m[1]))];
}

/* ------------------------------------------------------------------ *
 * Collection files
 * ------------------------------------------------------------------ */

if (!existsSync(updatesDir)) {
  console.error("content/updates does not exist");
  process.exit(1);
}

const fileNames = readdirSync(updatesDir).filter((name) => name.endsWith(".md")).sort();
if (!fileNames.includes("index.md")) errors.push("content/updates/index.md is missing");
if (!fileNames.includes("__template.md")) errors.push("content/updates/__template.md is missing");

const updateFiles = fileNames.filter((name) => name !== "index.md" && !name.startsWith("_"));
const foundSlugs = updateFiles.map((name) => name.slice(0, -3));

for (const slug of Object.keys(knownUpdates)) {
  if (!foundSlugs.includes(slug)) errors.push(`Missing Markdown update file content/updates/${slug}.md`);
}
for (const slug of foundSlugs) {
  if (!(slug in knownUpdates)) errors.push(`Unexpected update file content/updates/${slug}.md is not a known update`);
}

/* ------------------------------------------------------------------ *
 * Collection index
 * ------------------------------------------------------------------ */

if (fileNames.includes("index.md")) {
  const raw = readFileSync(join(updatesDir, "index.md"), "utf8");
  const { data, body, error } = parseFrontmatter(raw);
  if (error) errors.push(`content/updates/index.md: ${error}`);
  else {
    if (typeof data.title !== "string" || !data.title.trim()) errors.push("content/updates/index.md is missing a title");
    for (const field of Object.keys(data)) {
      if (field !== "title") errors.push(`content/updates/index.md: unknown frontmatter field ${field}`);
    }
    if ("slug" in data) errors.push("content/updates/index.md must not define a slug field");
    if (/^\s{0,3}#\s/m.test(body)) errors.push("content/updates/index.md body contains a level-one heading");
  }
}

/* ------------------------------------------------------------------ *
 * Template
 * ------------------------------------------------------------------ */

if (fileNames.includes("__template.md")) {
  const raw = readFileSync(join(updatesDir, "__template.md"), "utf8");
  const { data, error } = parseFrontmatter(raw);
  if (error) errors.push(`content/updates/__template.md: ${error}`);
  else {
    if ("slug" in data) errors.push("content/updates/__template.md must not define a slug field");
    for (const field of requiredFields) {
      if (!(field in data)) errors.push(`content/updates/__template.md is missing the ${field} field`);
    }
    for (const field of Object.keys(data)) {
      if (!allowedFields.has(field)) errors.push(`content/updates/__template.md: unknown frontmatter field ${field}`);
    }
  }
}

/* ------------------------------------------------------------------ *
 * Individual updates
 * ------------------------------------------------------------------ */

for (const name of updateFiles) {
  const slug = name.slice(0, -3);
  const label = `content/updates/${name}`;
  const raw = readFileSync(join(updatesDir, name), "utf8");
  const { data, head, body, error } = parseFrontmatter(raw);
  if (error) {
    errors.push(`${label}: ${error}`);
    continue;
  }
  const expected = knownUpdates[slug];

  // Frontmatter contract.
  for (const field of requiredFields) {
    if (!(field in data)) errors.push(`${label} is missing the ${field} field`);
  }
  for (const field of Object.keys(data)) {
    if (!allowedFields.has(field)) errors.push(`${label}: unknown frontmatter field ${field}`);
  }
  if ("slug" in data) errors.push(`${label} must not define a slug field; the filename is the slug`);
  for (const field of quotedFields) {
    const line = head.find((candidate) => candidate.startsWith(`${field}:`));
    if (line && !new RegExp(`^${field}: "`).test(line)) errors.push(`${label}: ${field} must be a quoted string`);
  }
  const publishedLine = head.find((candidate) => candidate.startsWith("publishedAt:"));
  if (publishedLine && !/^publishedAt: "\d{4}-\d{2}-\d{2}"$/.test(publishedLine)) {
    errors.push(`${label}: publishedAt must be a quoted YYYY-MM-DD value`);
  }
  if (typeof data.title !== "string" || !data.title.trim()) errors.push(`${label} has an empty title`);
  if (typeof data.image !== "string" || !data.image.trim()) {
    errors.push(`${label} has an empty image`);
  } else if (data.image.startsWith("/media/")) {
    if (!existsSync(join(root, "content", "media", data.image.slice("/media/".length)))) {
      errors.push(`${label}: image ${data.image} does not exist under content/media`);
    }
  } else if (data.image.startsWith("/")) {
    if (!existsSync(join(root, "public", data.image))) errors.push(`${label}: image ${data.image} does not exist under public/`);
  } else {
    errors.push(`${label}: image ${data.image} must be a root-relative path`);
  }

  // Body rules.
  if (!body.trim()) errors.push(`${label} has an empty body`);
  if (/^\s{0,3}#\s/m.test(body)) errors.push(`${label}: body contains a level-one heading; the title comes from frontmatter`);
  if (/<[a-z][^>]*>/i.test(body.replace(/`[^`]*`/g, ""))) warnings.push(`${label}: body contains raw HTML`);
  if (/\(Click for flyer\)/i.test(raw)) errors.push(`${label}: obsolete click-for-flyer text remains`);

  // Current title, date, and image.
  if (expected) {
    for (const field of requiredFields) {
      if (data[field] !== expected[field]) {
        errors.push(`${label}: ${field} is ${JSON.stringify(data[field])}; expected ${JSON.stringify(expected[field])}`);
      }
    }
  }

  // Legacy source references live in this verification map rather than page frontmatter.
  const sources = expected?.sources ?? [];

  const bodyText = markdownToText(body);
  const bodyMedia = markdownTargets(body, /\]\((\/files\/[^)\s]+)/g);
  const bodyLinks = markdownTargets(body, /\]\((https?:\/\/[^)\s]+)/g);
  const bodyArchiveLinks = markdownTargets(body, /\]\((\/archive\/[^)\s]+)/g);

  if (sources.length === 0) {
    // A natively authored update has no legacy text to preserve, but it still
    // has to carry its own body copy.
    if (bodyText.length < 40) errors.push(`${label}: natively authored update body is too short to be real content`);
    else summaries.push(`${label}: natively authored update, ${bodyText.split(" ").length} words, no legacy sources`);
  }

  for (const sourceSlug of sources) {
    const item = bySlug.get(sourceSlug);
    if (!item) {
      errors.push(`${label}: legacy source "${sourceSlug}" is not in data/archive.json`);
      continue;
    }

    // Complete source text.
    const blocks = sourceBlocks(item.contentHtml);
    let missing = 0;
    for (const block of blocks) {
      if (!bodyText.includes(block)) {
        missing += 1;
        errors.push(
          `${label}: missing source text from ${sourceSlug}: "${block.slice(0, 120)}${block.length > 120 ? "\u2026" : ""}"`,
        );
      }
    }

    // Local media, external links, archive links, embedded video.
    for (const media of sourceMedia(item.contentHtml)) {
      if (!bodyMedia.includes(media)) errors.push(`${label}: missing local media reference ${media} from ${sourceSlug}`);
    }
    for (const link of sourceExternalLinks(item.contentHtml)) {
      if (!bodyLinks.includes(link)) errors.push(`${label}: external link ${link} from ${sourceSlug} is not retained`);
    }
    for (const link of sourceArchiveLinks(item.contentHtml)) {
      const replacement = archiveLinkReplacements[link];
      if (!bodyArchiveLinks.includes(link) && !(replacement && body.includes(`](${replacement})`))) {
        errors.push(`${label}: archive link ${link} from ${sourceSlug} is not retained or redirected`);
      }
    }
    for (const embed of sourceEmbeds(item.contentHtml)) {
      const videoId = embed.match(/youtube\.com\/embed\/([\w-]+)/)?.[1];
      if (videoId && !bodyLinks.some((link) => link.includes(videoId))) {
        errors.push(`${label}: embedded video ${videoId} from ${sourceSlug} has no replacement link`);
      } else if (!videoId && !bodyLinks.includes(embed)) {
        errors.push(`${label}: embedded ${embed} from ${sourceSlug} has no replacement link`);
      } else if (!bodyLinks.includes(embed)) {
        warnings.push(`${label}: embed ${embed} from ${sourceSlug} is linked with a different URL form`);
      }
    }

    // Title and date choices for the primary legacy source.
    if (sourceSlug === sources[0]) {
      if (data.title !== item.title) {
        errors.push(`${label}: title "${data.title}" does not match primary legacy title "${item.title}"`);
      }
      if (item.modified && data.publishedAt !== item.modified) {
        errors.push(`${label}: publishedAt ${data.publishedAt} does not match the primary legacy modified date ${item.modified}`);
      }
    }

    summaries.push(`${label} \u2190 ${sourceSlug}: ${blocks.length - missing}/${blocks.length} source blocks present`);
  }

  // Every local media reference must exist on disk, and archive links must resolve.
  for (const media of bodyMedia) {
    if (!existsSync(join(root, "public", media))) errors.push(`${label}: local media ${media} does not exist under public/`);
  }
  for (const link of bodyArchiveLinks) {
    const target = link.slice("/archive/".length).replace(/\/$/, "");
    if (!bySlug.has(target)) errors.push(`${label}: link ${link} points to an unknown archive page`);
  }
}

/* ------------------------------------------------------------------ *
 * Result
 * ------------------------------------------------------------------ */

for (const line of summaries) console.log(line);
if (warnings.length) {
  console.log("\nWarnings:");
  for (const line of warnings) console.log(`- ${line}`);
}
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const line of errors) console.error(`- ${line}`);
  process.exit(1);
}
console.log(`\nVerified ${updateFiles.length} update page(s), the update index, and the update template.`);
