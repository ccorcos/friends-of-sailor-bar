#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const legacyOrigin = "https://friendsofsailorbar.org";
const archivePath = new URL("../data/archive.json", import.meta.url);
const assetsPath = new URL("../data/archive-assets.json", import.meta.url);
const manifestPath = new URL("../data/archive-manifest.json", import.meta.url);

const existingItems = JSON.parse(await readFile(archivePath, "utf8"));
const assets = JSON.parse(await readFile(assetsPath, "utf8"));
const categoryByPath = new Map(existingItems.map((item) => [item.originalPath, item.category]));
const mediaLibraryItem = existingItems.find((item) => item.slug === "media-library");

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
}

function pathFromLink(link) {
  const url = new URL(link);
  return url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
}

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

function textFromHtml(contentHtml) {
  return decodeEntities(
    contentHtml
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  ).replace(/\s+/g, " ").trim();
}

function excerptFromHtml(contentHtml) {
  const text = textFromHtml(contentHtml);
  if (text.length <= 180) return text;
  return `${text.slice(0, 177).replace(/\s+\S*$/, "")}…`;
}

const pages = await fetchJson(
  `${legacyOrigin}/wp-json/wp/v2/pages?per_page=100&_fields=slug,link,title,content,modified`,
);
const tribeEvents = await fetchJson(
  `${legacyOrigin}/wp-json/tribe/events/v1/events?per_page=100`,
);

const pageRecords = pages.map((page) => {
  const originalPath = pathFromLink(page.link);
  return {
    slug: page.slug,
    title: decodeEntities(page.title.rendered),
    category: originalPath === "/contact/" ? "Organization" : (categoryByPath.get(originalPath) ?? "Legacy pages"),
    originalPath,
    modified: page.modified.slice(0, 10),
    sourceHtml: page.content.rendered,
  };
});

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function eventTime(details) {
  const hour = Number(details.hour);
  const period = hour >= 12 ? "pm" : "am";
  return `${hour % 12 || 12}:${details.minutes} ${period}`;
}

const eventRecords = tribeEvents.events.map((event) => {
  const organizer = event.organizer?.[0];
  const venue = event.venue;
  const displayDate = `${monthNames[Number(event.start_date_details.month) - 1]} ${Number(event.start_date_details.day)}`;
  const displayTime = `${eventTime(event.start_date_details)} - ${eventTime(event.end_date_details)}`;
  const mapQuery = encodeURIComponent([venue?.address, venue?.city, venue?.state, venue?.country].filter(Boolean).join(", "));

  return {
    slug: event.slug,
    title: decodeEntities(event.title),
    category: "Events and activities",
    originalPath: pathFromLink(event.url),
    modified: event.modified.slice(0, 10),
    sourceHtml: [
      '<p><a href="/archive/events">« All Events</a></p>',
      event.description,
      `<p>${displayDate} @ ${displayTime}</p>`,
      "<p>Add to calendar</p>",
      "<h2>DETAILS</h2>",
      `<p><strong>Date:</strong><br>${displayDate}</p>`,
      `<p><strong>Time:</strong><br>${displayTime}</p>`,
      "<h2>ORGANIZER</h2>",
      `<p>${organizer?.organizer ?? ""}</p>`,
      organizer?.website ? `<p><a href="${organizer.website}">View Organizer Website</a></p>` : "",
      "<h2>VENUE</h2>",
      `<p>${venue?.venue ?? ""}<br>${venue?.address ?? ""}<br>${venue?.city ?? ""}, ${venue?.state ?? ""} ${venue?.country ?? ""} <a href="https://www.google.com/maps/search/?api=1&query=${mapQuery}">+ Google Map</a></p>`,
      venue?.website ? `<p><a href="${venue.website}">View Venue Website</a></p>` : "",
    ].join("\n"),
  };
});

// The legacy /events/ URL is a generated Tribe Events archive rather than a
// WordPress page. Preserve the complete visitor-facing event listing as it
// appeared at migration time; the interactive search controls are application
// chrome and are represented by the new site's /events route.
const eventsIndexRecord = {
  slug: "events",
  title: "Events",
  category: "Events and activities",
  originalPath: "/events/",
  modified: "2026-08-24",
  sourceHtml: [
    "<h2>September 2026</h2>",
    "<article>",
    "<p><strong>SAT 19</strong></p>",
    '<h3><a href="https://friendsofsailorbar.org/event/bald-eagles-and-birdhouses/">SAILOR BAR HAS GONE TO THE BIRDS! (Click for flyer)</a></h3>',
    "<p>September 19 @ 9:30 am - 11:30 am</p>",
    "<p>Sailor Bar 4253 Illinois Avenue, Fair Oaks, CA, United States</p>",
    "</article>",
  ].join("\n"),
};

const records = [...pageRecords, ...eventRecords, eventsIndexRecord];
const slugByPath = new Map(records.map((record) => [record.originalPath, record.slug]));
const localBySource = new Map(assets.map((asset) => [asset.source, asset.local]));

function rewriteUrls(sourceHtml) {
  // Responsive srcset candidates are generated derivatives of the same image.
  // The canonical src is copied locally; removing srcset prevents WordPress-only
  // derivative URLs from becoming broken references.
  let contentHtml = sourceHtml
    .replace(/\s+srcset=("[^"]*"|'[^']*')/gi, "")
    .replace(/\s+sizes=("[^"]*"|'[^']*')/gi, "");

  // Longest URLs first so a full-size media URL cannot partially replace a
  // generated-size URL with a shared prefix.
  const mediaMappings = [...localBySource.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [source, local] of mediaMappings) {
    contentHtml = contentHtml.replaceAll(source, local);
  }

  contentHtml = contentHtml.replace(/href=(['"])(https?:\/\/(?:www\.)?friendsofsailorbar\.org(?:\/[^'"\s<]*)?)\1/gi, (attribute, quote, absolute) => {
    let url;
    try {
      url = new URL(absolute);
    } catch {
      return attribute;
    }

    const normalizedPath = url.pathname === "/" || url.pathname.endsWith("/")
      ? url.pathname
      : `${url.pathname}/`;
    const slug = slugByPath.get(normalizedPath);
    if (!slug) return attribute;
    return `href=${quote}/archive/${slug}${url.search}${url.hash}${quote}`;
  });

  return contentHtml;
}

const archiveItems = records
  .map((record) => {
    const contentHtml = rewriteUrls(record.sourceHtml);
    return {
      slug: record.slug,
      title: record.title,
      category: record.category,
      originalPath: record.originalPath,
      modified: record.modified,
      excerpt: excerptFromHtml(contentHtml),
      contentHtml,
    };
  })
  .sort((a, b) => {
    const oldA = existingItems.findIndex((item) => item.originalPath === a.originalPath);
    const oldB = existingItems.findIndex((item) => item.originalPath === b.originalPath);
    if (oldA === -1 && oldB === -1) return a.originalPath.localeCompare(b.originalPath);
    if (oldA === -1) return 1;
    if (oldB === -1) return -1;
    return oldA - oldB;
  });

if (mediaLibraryItem) archiveItems.push(mediaLibraryItem);

const manifest = archiveItems
  .filter((item) => item.slug !== "media-library")
  .map((item) => {
    const localMedia = [...item.contentHtml.matchAll(/(?:src|href)="(\/files\/[^"]+)"/g)].map((match) => match[1]);
    const text = textFromHtml(item.contentHtml);
    return {
      originalPath: item.originalPath,
      slug: item.slug,
      title: item.title,
      words: text ? text.split(/\s+/).length : 0,
      media: [...new Set(localMedia)],
      textSha256: createHash("sha256").update(text).digest("hex"),
    };
  });

await writeFile(archivePath, `${JSON.stringify(archiveItems, null, 2)}\n`);
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Imported ${manifest.length} public legacy pages and ${assets.length} local media mappings.`);
