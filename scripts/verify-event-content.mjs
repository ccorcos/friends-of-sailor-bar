#!/usr/bin/env node

// Verifies the Markdown event collection in content/events against the faithful
// legacy snapshot in data/archive.json. This script reads the Markdown files
// directly and deliberately has no dependencies beyond the Node standard
// library, so it stays runnable while the Markdown content foundation in
// lib/content is still being built.

import { readFileSync, readdirSync } from "node:fs";

const contentDir = new URL("../content/events/", import.meta.url);
const archive = JSON.parse(readFileSync(new URL("../data/archive.json", import.meta.url), "utf8"));
const errors = [];

/* ------------------------------------------------------------------ *
 * Minimal frontmatter parser
 * ------------------------------------------------------------------ */

function parseScalar(raw) {
  const value = raw.trim();
  if (value === "") return "";
  if (value === "[]") return [];
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith('"') && value.endsWith('"') && value.length >= 2) {
    return value
      .slice(1, -1)
      .replace(/\\([\\"])/g, "$1");
  }
  return value;
}

// Supports the subset used by this collection: `key: scalar`, `key: []`,
// sequences of scalars, and sequences of single-level mappings.
function parseFrontmatter(text, file) {
  if (!text.startsWith("---\n")) {
    errors.push(`${file}: missing frontmatter block`);
    return { data: {}, body: text };
  }
  const end = text.indexOf("\n---", 3);
  if (end === -1) {
    errors.push(`${file}: unterminated frontmatter block`);
    return { data: {}, body: "" };
  }
  const head = text.slice(4, end + 1);
  const body = text.slice(end + 4).replace(/^\n/, "");

  const data = {};
  let listKey = null;
  let listItem = null;

  const closeItem = () => {
    if (listKey && listItem) data[listKey].push(listItem);
    listItem = null;
  };

  for (const line of head.split("\n")) {
    if (!line.trim()) continue;

    const sequence = line.match(/^ {2}- (.*)$/);
    if (sequence) {
      if (!listKey) {
        errors.push(`${file}: sequence entry outside of a key: ${line.trim()}`);
        continue;
      }
      closeItem();
      const mapping = sequence[1].match(/^([A-Za-z][\w]*): (.*)$/);
      if (mapping) listItem = { [mapping[1]]: parseScalar(mapping[2]) };
      else data[listKey].push(parseScalar(sequence[1]));
      continue;
    }

    const nested = line.match(/^ {4}([A-Za-z][\w]*): (.*)$/);
    if (nested) {
      if (!listItem) {
        errors.push(`${file}: nested mapping outside of a sequence entry: ${line.trim()}`);
        continue;
      }
      listItem[nested[1]] = parseScalar(nested[2]);
      continue;
    }

    const pair = line.match(/^([A-Za-z][\w]*):(.*)$/);
    if (!pair) {
      errors.push(`${file}: unsupported frontmatter line: ${line}`);
      continue;
    }
    closeItem();
    listKey = null;
    const [, key, rest] = pair;
    if (rest.trim() === "") {
      data[key] = [];
      listKey = key;
    } else {
      data[key] = parseScalar(rest);
    }
  }
  closeItem();

  return { data, body };
}

function rawFrontmatterLines(text) {
  const end = text.indexOf("\n---", 3);
  return end === -1 ? [] : text.slice(4, end + 1).split("\n");
}

/* ------------------------------------------------------------------ *
 * Legacy source helpers
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
    .replaceAll("&apos;", "'");
}

function normalize(value) {
  return decodeEntities(value)
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\*\*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function archivePage(slug) {
  return archive.find((item) => item.slug === slug);
}

/* ------------------------------------------------------------------ *
 * Expected collection
 * ------------------------------------------------------------------ */

// The eleven current events, their canonical published dates, and the legacy
// archive pages each one was promoted from.
const knownEvents = {
  "friends-of-sailor-bar-rock-off": {
    date: "2025-10-03",
    sources: ["friends-of-sailor-bar-rock-off-on-october-3rd-2025"],
    verbatim: ["friends-of-sailor-bar-rock-off-on-october-3rd-2025"],
  },
  "bench-and-table-dedication": {
    date: "2026-03-18",
    sources: ["sailor-bar-bench-and-table-dedication-ceremony", "sailor-bar-bench-dedication"],
    verbatim: ["sailor-bar-bench-and-table-dedication-ceremony", "sailor-bar-bench-dedication"],
  },
  "earth-day-at-sailor-bar-2026": {
    date: "2026-04-18",
    sources: ["earth-day-april-2026"],
    verbatim: ["earth-day-april-2026"],
  },
  "interactive-birding-2026": {
    date: "2026-05-16",
    sources: ["interactive-birding-at-sailor-bar"],
    verbatim: ["interactive-birding-at-sailor-bar"],
  },
  "family-health-and-wellness-day-2026": {
    date: "2026-06-13",
    sources: ["health-wellness-day"],
    verbatim: ["health-wellness-day"],
  },
  "american-river-parkway-heroes-2026": {
    date: "2026-07-18",
    sources: ["celebrating-american-river-parkway-heroes"],
    verbatim: ["celebrating-american-river-parkway-heroes"],
  },
  "wild-and-scenic-american-river-2026": {
    date: "2026-08-15",
    sources: ["the-wild-and-scenic-american-river"],
    verbatim: [],
  },
  "real-wildlife-encounters": {
    date: "2026-09-19",
    sources: ["bald-eagles-and-birdhouses", "real-wildlife-encounters"],
    verbatim: [],
  },
  "ghost-of-sailor-bar": {
    date: "2026-10-17",
    sources: ["the-ghost-of-sailor-bar-how-sailor-bar-got-its-name-legends-and-historical-facts"],
    verbatim: [],
  },
  "salmon-spawning-journey": {
    date: "2026-11-21",
    sources: ["something-fishy-is-going-on-here-the-remarkable-spawning-journey"],
    verbatim: [],
  },
  "new-year-river-cleanup": {
    date: "2027-01-16",
    sources: [],
    verbatim: [],
  },
};

// Facts and rendered Markdown links that must survive in each event file.
const structuredRequirements = {
  "friends-of-sailor-bar-rock-off": ["Friends of Sailor Bar Rock Off", "2025-10-03", "GrdJAOh8QwQ"],
  "bench-and-table-dedication": ["Sailor Bar Bench and Table Dedication", "2026-03-18", "Olive Avenue", "q45O4qZyGTQ", "12 new benches and 7 tables"],
  "earth-day-at-sailor-bar-2026": ["Earth Day at Sailor Bar: Walk on the Wildlife Side", "2026-04-18", "9:30 AM–12:00 PM"],
  "interactive-birding-2026": ["Interactive Birding at Sailor Bar", "2026-05-16"],
  "family-health-and-wellness-day-2026": ["Family Health & Wellness Day", "2026-06-13"],
  "american-river-parkway-heroes-2026": ["Celebrate American River Parkway Heroes", "2026-07-18", "JtPuMxViJvc"],
  "wild-and-scenic-american-river-2026": ["The Wild and Scenic American River", "2026-08-15"],
  "real-wildlife-encounters": ["Sailor Bar Has Gone to the Birds!", "2026-09-19", "sb-sep-19-event-flyer.pdf"],
  "ghost-of-sailor-bar": ["The Ghost of Sailor Bar: How Sailor Bar Got its Name, Legends and Historical Facts", "2026-10-17", "Ghost-of-Sailor-Bar.pdf"],
  "salmon-spawning-journey": ["Something Fishy is Going on Here! The Remarkable Spawning Journey", "2026-11-21"],
  "new-year-river-cleanup": ["New Year River Clean-up", "2027-01-16", "trails, shoreline, and wildlife habitat"],
};

const requiredStringFields = ["title", "date", "time", "location"];
const allowedFields = new Set(requiredStringFields);

/* ------------------------------------------------------------------ *
 * Read the collection
 * ------------------------------------------------------------------ */

let fileNames = [];
try {
  fileNames = readdirSync(contentDir).filter((name) => name.endsWith(".md")).sort();
} catch {
  errors.push("content/events does not exist");
}

if (!fileNames.includes("index.md")) errors.push("content/events/index.md is missing");
if (!fileNames.includes("__template.md")) errors.push("content/events/__template.md is missing");

const eventFiles = fileNames.filter((name) => name !== "index.md" && !name.startsWith("_"));
const foundSlugs = eventFiles.map((name) => name.slice(0, -3));

for (const slug of Object.keys(knownEvents)) {
  if (!foundSlugs.includes(slug)) errors.push(`Missing Markdown event file content/events/${slug}.md`);
}
for (const slug of foundSlugs) {
  if (!(slug in knownEvents)) errors.push(`Unexpected event file content/events/${slug}.md is not a known event`);
}

/* ------------------------------------------------------------------ *
 * Event series introduction
 * ------------------------------------------------------------------ */

if (fileNames.includes("index.md")) {
  const raw = readFileSync(new URL("index.md", contentDir), "utf8");
  const { data, body } = parseFrontmatter(raw, "content/events/index.md");
  if (!data.title) errors.push("content/events/index.md is missing a title");
  if ("draft" in data || "legacySources" in data) errors.push("content/events/index.md contains removed event frontmatter fields");
  if (/^#{1,6}\s/m.test(body)) errors.push("Markdown heading found in content/events/index.md");

  const seriesRequirements = [
    "Third Saturday",
    "9:30–noon",
    "Friends of Sailor Bar",
    "Sacramento County Regional Parks",
    "wildlife, characteristics and history",
    "Illinois Avenue entrance",
    "last parking area",
    "boat launch area",
    "large oak tree",
  ];
  for (const phrase of seriesRequirements) {
    if (!body.includes(phrase)) errors.push(`Event series introduction is missing: ${phrase}`);
  }
}

/* ------------------------------------------------------------------ *
 * Template
 * ------------------------------------------------------------------ */

if (fileNames.includes("__template.md")) {
  const raw = readFileSync(new URL("__template.md", contentDir), "utf8");
  const { data } = parseFrontmatter(raw, "content/events/__template.md");
  for (const field of requiredStringFields) {
    if (!(field in data)) errors.push(`content/events/__template.md is missing the ${field} field`);
  }
  for (const field of Object.keys(data)) {
    if (!allowedFields.has(field)) errors.push(`content/events/__template.md: unknown frontmatter field ${field}`);
  }
  if ("slug" in data) errors.push("content/events/__template.md must not define a slug field; the filename is the slug");
}

/* ------------------------------------------------------------------ *
 * Individual events
 * ------------------------------------------------------------------ */

for (const name of eventFiles) {
  const slug = name.slice(0, -3);
  const file = `content/events/${name}`;
  const raw = readFileSync(new URL(name, contentDir), "utf8");
  const { data, body } = parseFrontmatter(raw, file);
  const rawLines = rawFrontmatterLines(raw);

  // Field presence, types, and quoting.
  for (const field of requiredStringFields) {
    if (!(field in data)) errors.push(`${file} is missing the ${field} field`);
    else if (typeof data[field] !== "string") errors.push(`${file}: ${field} must be a string`);
  }
  for (const field of Object.keys(data)) {
    if (!allowedFields.has(field)) errors.push(`${file}: unknown frontmatter field ${field}`);
  }
  for (const field of requiredStringFields) {
    const line = rawLines.find((candidate) => candidate.startsWith(`${field}:`));
    if (line && !/^\w+: "/.test(line)) errors.push(`${file}: ${field} must be a quoted string`);
  }

  if (!data.title) errors.push(`${file} has an empty title`);
  if (!data.location) errors.push(`${file} has an empty location`);
  if (!data.time) errors.push(`${file} has an empty time`);

  // Dates are quoted ISO calendar dates so YAML never reinterprets them.
  const dateLine = rawLines.find((candidate) => candidate.startsWith("date:"));
  if (dateLine && !/^date: "\d{4}-\d{2}-\d{2}"$/.test(dateLine)) {
    errors.push(`${file}: date must be a quoted YYYY-MM-DD value`);
  }
  const expected = knownEvents[slug];
  if (expected && data.date !== expected.date) {
    errors.push(`${file}: date ${data.date} does not match the published date ${expected.date}`);
  }

  // Body rules for cleaned event pages.
  if (/^#{1,6}\s/m.test(body)) errors.push(`Markdown heading found in ${file}`);
  if (/\(Click for flyer\)/i.test(raw)) errors.push(`Obsolete click-for-flyer text remains in ${file}`);

  // Complete promoted text for the rich source pages.
  const normalizedBody = normalize(body);
  for (const sourceSlug of expected?.verbatim ?? []) {
    const sourceText = normalize(archivePage(sourceSlug)?.contentHtml ?? "");
    if (sourceText && !normalizedBody.includes(sourceText)) {
      errors.push(`Body for ${file} no longer contains the complete text from ${sourceSlug}`);
    }
  }

  // Links formerly stored in frontmatter must remain reachable in Markdown.
  const bodyUrls = [...body.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map((match) => match[1]).join(" ");

  // Every embedded source video must still be reachable from the event page.
  for (const sourceSlug of expected?.sources ?? []) {
    const html = archivePage(sourceSlug)?.contentHtml ?? "";
    for (const match of html.matchAll(/youtube\.com\/embed\/([\w-]+)/g)) {
      if (!bodyUrls.includes(match[1])) errors.push(`Video ${match[1]} from ${sourceSlug} is missing on ${file}`);
    }
  }

  // Every source PDF must still be reachable from the event page.
  for (const sourceSlug of expected?.sources ?? []) {
    const html = archivePage(sourceSlug)?.contentHtml ?? "";
    for (const match of html.matchAll(/href="(\/files\/[^"]+\.pdf)"/gi)) {
      if (!bodyUrls.includes(match[1])) errors.push(`Document ${match[1]} from ${sourceSlug} is missing on ${file}`);
    }
  }

  // Required structured facts, checked across the whole file.
  for (const phrase of structuredRequirements[slug] ?? []) {
    if (!raw.includes(phrase)) errors.push(`Event ${slug} is missing structured information: ${phrase}`);
  }
}

/* ------------------------------------------------------------------ *
 * Result
 * ------------------------------------------------------------------ */

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Verified complete, heading-free Markdown content and rendered links for ${eventFiles.length} event pages, the event series introduction, and the event template.`);
