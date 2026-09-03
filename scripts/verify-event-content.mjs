#!/usr/bin/env node

import { readFileSync } from "node:fs";
import Database from "better-sqlite3";
import { eventPageContent, eventSeriesIntroduction } from "../lib/event-content.ts";

const archive = JSON.parse(readFileSync(new URL("../data/archive.json", import.meta.url), "utf8"));
const db = new Database(new URL("../data/sailorbar.db", import.meta.url).pathname, { readonly: true });
const events = db.prepare("SELECT slug, title, date, time, location, flyer_path FROM events ORDER BY date").all();
const errors = [];

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
    .replace(/\s+/g, " ")
    .trim();
}

const verbatimBodySources = {
  "friends-of-sailor-bar-rock-off": ["friends-of-sailor-bar-rock-off-on-october-3rd-2025"],
  "bench-and-table-dedication": ["sailor-bar-bench-and-table-dedication-ceremony", "sailor-bar-bench-dedication"],
  "earth-day-at-sailor-bar-2026": ["earth-day-april-2026"],
  "interactive-birding-2026": ["interactive-birding-at-sailor-bar"],
  "family-health-and-wellness-day-2026": ["health-wellness-day"],
  "american-river-parkway-heroes-2026": ["celebrating-american-river-parkway-heroes"],
};

for (const event of events) {
  const content = eventPageContent[event.slug];
  if (!content) {
    errors.push(`Missing clean content for event ${event.slug}`);
    continue;
  }
  if (/\(Click for flyer\)/i.test(content.title) || /\(Click for flyer\)/i.test(content.body)) {
    errors.push(`Obsolete click-for-flyer text remains in ${event.slug}`);
  }
  if (/^#{1,6}\s/m.test(content.body)) errors.push(`Markdown heading found in ${event.slug}`);

  for (const sourceSlug of content.sources) {
    if (!archive.some((item) => item.slug === sourceSlug)) errors.push(`Unknown event source ${sourceSlug} for ${event.slug}`);
  }

  for (const sourceSlug of verbatimBodySources[event.slug] ?? []) {
    const source = archive.find((item) => item.slug === sourceSlug);
    const sourceText = normalize(source?.contentHtml ?? "");
    if (sourceText && !normalize(content.body).includes(sourceText)) {
      errors.push(`Clean body for ${event.slug} no longer contains the complete text from ${sourceSlug}`);
    }
  }

  const relatedUrls = content.relatedLinks?.map((link) => link.href).join(" ") ?? "";
  for (const sourceSlug of content.sources) {
    const source = archive.find((item) => item.slug === sourceSlug);
    for (const match of (source?.contentHtml ?? "").matchAll(/youtube\.com\/embed\/([\w-]+)/g)) {
      if (!relatedUrls.includes(match[1])) errors.push(`Video ${match[1]} from ${sourceSlug} is missing on ${event.slug}`);
    }
  }
}

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
  if (!eventSeriesIntroduction.includes(phrase)) errors.push(`Event series introduction is missing: ${phrase}`);
}

const structuredRequirements = {
  "wild-and-scenic-american-river-2026": ["The Wild and Scenic American River", "2026-08-15"],
  "real-wildlife-encounters": ["Sailor Bar Has Gone to the Birds!", "Real Wildlife Encounters", "Friends of Sailor Bar", "4253 Illinois Avenue", "2026-09-19"],
  "ghost-of-sailor-bar": ["The Ghost of Sailor Bar: How Sailor Bar Got its Name, Legends and Historical Facts", "2026-10-17", "Ghost-of-Sailor-Bar.pdf"],
  "salmon-spawning-journey": ["Something Fishy is Going on Here! The Remarkable Spawning Journey", "2026-11-21"],
  "new-year-river-cleanup": ["New Year River Clean-up", "2027-01-16", "trails, shoreline, and wildlife habitat"],
};
for (const [slug, phrases] of Object.entries(structuredRequirements)) {
  const event = events.find((candidate) => candidate.slug === slug);
  const content = eventPageContent[slug];
  const completeText = [content?.title, content?.body, content?.organizer, content?.address, content?.mapHref, content?.editorialNote, content?.relatedLinks?.map((link) => `${link.label} ${link.href}`).join(" "), event?.date, event?.time, event?.location, event?.flyer_path].join(" ");
  for (const phrase of phrases) {
    if (!completeText.includes(phrase)) errors.push(`Event ${slug} is missing structured information: ${phrase}`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Verified complete, heading-free content for ${events.length} event pages.`);
