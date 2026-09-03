#!/usr/bin/env node
// Verifies that promoted Markdown pages under content/pages preserve the
// complete text of their legacy sources in data/archive.json, keep every local
// media reference, and follow the page frontmatter contract.
//
// Self-contained: uses only Node built-ins. Run with `node scripts/verify-promoted-markdown.mjs`.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const pagesRoot = join(root, "content", "pages");
const archive = JSON.parse(readFileSync(join(root, "data", "archive.json"), "utf8"));
const bySlug = new Map(archive.map((item) => [item.slug, item]));

const expectedNav = {
  "about/index.md": "About Sailor Bar",
  "about/recreation.md": "Recreation",
  "about/amenities.md": "Amenities",
  "about/brochure-and-map.md": "Brochure and map",
  "about/turtle-pond.md": "Turtle Pond",
  "about/boat-launch.md": "Boat launch",
  "about/olive-avenue-overlook.md": "Olive Avenue overlook",
  "wildlife/index.md": "Wildlife",
  "wildlife/birding.md": "Birding",
  "wildlife/plant-life.md": "Plant life",
  "wildlife/salmon-and-steelhead.md": "Salmon and steelhead",
  "history/index.md": "History",
  "history/nisenan-history.md": "Nisenan history",
  "history/mining-and-dredging.md": "Mining and dredging",
};

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
    .replaceAll("&hellip;", "…")
    .replaceAll("&ndash;", "–")
    .replaceAll("&mdash;", "—");
}

// Normalization used on both sides so that formatting differences (Markdown
// emphasis, curly quotes, zero-width characters, whitespace) do not mask
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

// Split legacy HTML into block-level text segments.
function sourceBlocks(contentHtml) {
  const withoutNoise = contentHtml
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ");
  const blockBoundary = /<\/?(?:p|div|h[1-6]|li|ul|ol|figure|figcaption|blockquote|tr|td|th|table|hr|iframe|section|article|header|footer)\b[^>]*>|<br\b[^>]*>/gi;
  return withoutNoise
    .split(blockBoundary)
    .map((chunk) => normalizeText(decodeEntities(chunk.replace(/<[^>]+>/g, ""))))
    .filter((chunk) => chunk.length > 0);
}

function sourceMedia(contentHtml) {
  return [...new Set([...contentHtml.matchAll(/(?:src|href)="(\/files\/[^"]+)"/g)].map((m) => m[1]))];
}

function sourceExternalLinks(contentHtml) {
  return [...new Set([...contentHtml.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]))];
}

// Minimal YAML front matter reader supporting scalars and simple lists.
function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: null, body: markdown, error: "Missing frontmatter block" };
  const data = {};
  let currentKey = null;
  for (const rawLine of match[1].split(/\r?\n/)) {
    if (!rawLine.trim()) continue;
    const listItem = rawLine.match(/^\s+-\s+(.*)$/);
    if (listItem && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(unquote(listItem[1]));
      continue;
    }
    const kv = rawLine.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
    if (!kv) return { data: null, body: "", error: `Unparseable frontmatter line: ${rawLine}` };
    currentKey = kv[1];
    const value = kv[2].trim();
    if (value === "") data[currentKey] = [];
    else if (value === "true") data[currentKey] = true;
    else if (value === "false") data[currentKey] = false;
    else if (/^-?\d+(\.\d+)?$/.test(value)) data[currentKey] = Number(value);
    else if (value === "[]") data[currentKey] = [];
    else data[currentKey] = unquote(value);
  }
  return { data, body: markdown.slice(match[0].length), error: null };
}

function unquote(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"');
  }
  return trimmed;
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

function markdownMedia(body) {
  return [...new Set([...body.matchAll(/\]\((\/files\/[^)\s]+)/g)].map((m) => m[1]))];
}

function markdownLinks(body) {
  return [...new Set([...body.matchAll(/\]\((https?:\/\/[^)\s]+)/g)].map((m) => m[1]))];
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".md") && !entry.startsWith("_")) out.push(full);
  }
  return out;
}

const errors = [];
const warnings = [];
const summaries = [];

if (!existsSync(pagesRoot)) {
  console.error(`No content pages directory at ${pagesRoot}`);
  process.exit(1);
}

const files = walk(pagesRoot);
for (const expected of Object.keys(expectedNav)) {
  if (!existsSync(join(pagesRoot, expected))) errors.push(`Expected page file is missing: content/pages/${expected}`);
}

for (const file of files) {
  const rel = relative(pagesRoot, file).split("\\").join("/");
  const label = `content/pages/${rel}`;
  const markdown = readFileSync(file, "utf8");
  const { data, body, error } = parseFrontmatter(markdown);
  if (error) {
    errors.push(`${label}: ${error}`);
    continue;
  }

  for (const key of ["title", "navTitle", "navOrder", "legacySources", "draft"]) {
    if (!(key in data)) errors.push(`${label}: frontmatter is missing "${key}"`);
  }
  if ("slug" in data) errors.push(`${label}: frontmatter must not define "slug" (filename is canonical)`);
  if (data.draft !== false) errors.push(`${label}: expected draft: false`);
  if (typeof data.navOrder !== "number") errors.push(`${label}: navOrder must be a number`);
  if (expectedNav[rel] && data.navTitle !== expectedNav[rel]) {
    errors.push(`${label}: navTitle "${data.navTitle}" does not match current navigation label "${expectedNav[rel]}"`);
  }
  if (/^\s{0,3}#\s/m.test(body)) errors.push(`${label}: body contains a level-one heading; the title comes from frontmatter`);
  if (/<[a-z][^>]*>/i.test(body.replace(/`[^`]*`/g, ""))) warnings.push(`${label}: body contains raw HTML`);

  const sources = Array.isArray(data.legacySources) ? data.legacySources : [];
  if (sources.length === 0) {
    warnings.push(`${label}: no legacySources; coverage not checked`);
    continue;
  }

  const bodyText = markdownToText(body);
  const bodyMedia = markdownMedia(body);
  const bodyLinks = markdownLinks(body);

  for (const slug of sources) {
    const item = bySlug.get(slug);
    if (!item) {
      errors.push(`${label}: legacy source "${slug}" is not in data/archive.json`);
      continue;
    }
    if (sources.length === 1 && data.title !== item.title) {
      errors.push(`${label}: title "${data.title}" does not exactly match legacy title "${item.title}"`);
    }

    const blocks = sourceBlocks(item.contentHtml);
    let missing = 0;
    for (const block of blocks) {
      if (!bodyText.includes(block)) {
        missing += 1;
        errors.push(`${label}: missing source text from ${slug}: "${block.slice(0, 120)}${block.length > 120 ? "…" : ""}"`);
      }
    }

    for (const media of sourceMedia(item.contentHtml)) {
      if (!bodyMedia.includes(media)) errors.push(`${label}: missing local media reference ${media} from ${slug}`);
    }
    for (const link of sourceExternalLinks(item.contentHtml)) {
      if (!bodyLinks.includes(link)) warnings.push(`${label}: external link ${link} from ${slug} is not present verbatim`);
    }
    for (const iframe of item.contentHtml.matchAll(/<iframe[^>]*src="([^"]+)"/g)) {
      const host = new URL(iframe[1]).host;
      if (!bodyLinks.some((link) => link.includes(host))) {
        errors.push(`${label}: embedded ${iframe[1]} from ${slug} has no replacement link`);
      } else {
        warnings.push(`${label}: <iframe> ${iframe[1]} from ${slug} was converted to a link`);
      }
    }

    summaries.push(`${label} ← ${slug}: ${blocks.length - missing}/${blocks.length} source blocks present`);
  }

  for (const media of bodyMedia) {
    if (!existsSync(join(root, "public", media))) errors.push(`${label}: local media ${media} does not exist under public/`);
  }
  for (const link of body.matchAll(/\]\((\/(?:about|wildlife|history|archive)[^)\s]*)\)/g)) {
    const target = link[1];
    if (target.startsWith("/archive/")) {
      const slug = target.slice("/archive/".length).replace(/\/$/, "");
      if (!bySlug.has(slug)) errors.push(`${label}: link ${target} points to an unknown archive page`);
    } else {
      const [, section, ...restParts] = target.split("/");
      const rest = restParts.join("/");
      const candidate = rest ? join(pagesRoot, section, `${rest}.md`) : join(pagesRoot, section, "index.md");
      if (!existsSync(candidate)) errors.push(`${label}: link ${target} has no matching Markdown page`);
    }
  }
}

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
console.log(`\nVerified ${files.length} promoted Markdown page(s).`);
