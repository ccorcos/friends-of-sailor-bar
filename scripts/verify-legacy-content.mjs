#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

const legacyOrigin = "https://friendsofsailorbar.org";
const archive = JSON.parse(readFileSync(new URL("../data/archive.json", import.meta.url), "utf8"));
const assets = JSON.parse(readFileSync(new URL("../data/archive-assets.json", import.meta.url), "utf8"));
const manifest = JSON.parse(readFileSync(new URL("../data/archive-manifest.json", import.meta.url), "utf8"));
const migration = readFileSync(new URL("../migration.md", import.meta.url), "utf8");

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

const publicItems = archive.filter((item) => item.slug !== "media-library");
const errors = [];

for (const asset of assets) {
  const diskPath = new URL(`../public${asset.local}`, import.meta.url);
  if (!existsSync(diskPath)) errors.push(`Missing imported asset ${asset.local} from ${asset.source}`);
}

for (const item of archive) {
  if (item.contentHtml.includes(`${legacyOrigin}/wp-content/uploads/`)) {
    errors.push(`Remote legacy media remains in ${item.originalPath}`);
  }
  for (const match of item.contentHtml.matchAll(/(?:src|href)="(\/files\/[^"]+)"/g)) {
    const diskPath = new URL(`../public${match[1]}`, import.meta.url);
    if (!existsSync(diskPath)) errors.push(`Missing local file ${match[1]} referenced by ${item.originalPath}`);
  }
}

if (publicItems.length !== 71) errors.push(`Expected 71 public pages, found ${publicItems.length}.`);
if (manifest.length !== 71) errors.push(`Expected 71 manifest entries, found ${manifest.length}.`);

const paths = new Set();
for (const item of publicItems) {
  if (paths.has(item.originalPath)) errors.push(`Duplicate source path: ${item.originalPath}`);
  paths.add(item.originalPath);

  if (!migration.includes(`- [x] \`${item.originalPath}\``)) {
    errors.push(`Migration checklist is missing a checked entry for ${item.originalPath}`);
  }

  const record = manifest.find((entry) => entry.originalPath === item.originalPath);
  if (!record) {
    errors.push(`Manifest entry missing for ${item.originalPath}`);
    continue;
  }
  const text = textFromHtml(item.contentHtml);
  const hash = createHash("sha256").update(text).digest("hex");
  if (hash !== record.textSha256) errors.push(`Text hash mismatch for ${item.originalPath}`);
}

const checkedPublicPaths = [...migration.matchAll(/^- \[x\] `([^`]+)`/gm)]
  .map((match) => match[1])
  .filter((path) => path.startsWith("/") && path !== "/archive/media-library");
if (new Set(checkedPublicPaths).size !== 71) {
  errors.push(`Expected 71 unique checked public source paths in migration.md, found ${new Set(checkedPublicPaths).size}.`);
}
if (/^- \[ \] `/m.test(migration)) errors.push("Unchecked migration entries remain in migration.md.");

try {
  const [pageSitemapXml, eventSitemapXml, pagesResponse, eventsResponse] = await Promise.all([
    fetch(`${legacyOrigin}/page-sitemap.xml`).then((response) => response.text()),
    fetch(`${legacyOrigin}/tribe_events-sitemap.xml`).then((response) => response.text()),
    fetch(`${legacyOrigin}/wp-json/wp/v2/pages?per_page=100&_fields=slug,link,title,content`).then((response) => response.json()),
    fetch(`${legacyOrigin}/wp-json/tribe/events/v1/events?per_page=100`).then((response) => response.json()),
  ]);

  const sitemapPaths = [...`${pageSitemapXml}${eventSitemapXml}`.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => new URL(match[1]).pathname);
  if (sitemapPaths.length !== 71 || sitemapPaths.some((path) => !paths.has(path))) {
    errors.push("The live legacy sitemaps no longer match the 71 captured public paths.");
  }

  for (const page of pagesResponse) {
    const originalPath = new URL(page.link).pathname;
    const item = publicItems.find((candidate) => candidate.originalPath === originalPath);
    if (!item) {
      errors.push(`Live WordPress page is missing locally: ${originalPath}`);
      continue;
    }
    if (item.title !== decodeEntities(page.title.rendered)) errors.push(`Title mismatch against live source: ${originalPath}`);
    if (textFromHtml(item.contentHtml) !== textFromHtml(page.content.rendered)) {
      errors.push(`Visible text mismatch against live source: ${originalPath}`);
    }
  }

  for (const event of eventsResponse.events) {
    const originalPath = new URL(event.url).pathname;
    const item = publicItems.find((candidate) => candidate.originalPath === originalPath);
    if (!item) {
      errors.push(`Live Tribe event is missing locally: ${originalPath}`);
      continue;
    }
    if (item.title !== decodeEntities(event.title)) errors.push(`Event title mismatch against live source: ${originalPath}`);
    const eventText = textFromHtml(item.contentHtml);
    const requiredText = [
      textFromHtml(event.description),
      event.organizer?.[0]?.organizer,
      event.venue?.venue,
      event.venue?.address,
      event.venue?.city,
      event.venue?.state,
      event.venue?.country,
    ].filter(Boolean);
    for (const value of requiredText) {
      if (!eventText.includes(value)) errors.push(`Event detail missing from faithful copy (${value}): ${originalPath}`);
    }
  }
} catch (error) {
  errors.push(`Could not verify against the live legacy source: ${error instanceof Error ? error.message : String(error)}`);
}

for (const item of publicItems) {
  if (/srcset=/i.test(item.contentHtml)) errors.push(`Unnormalized WordPress srcset remains in ${item.originalPath}`);
  if (/\/archive\/home[^\s"'<,)]+/.test(item.contentHtml)) errors.push(`Corrupted root URL rewrite in ${item.originalPath}`);
  if (/href="https?:\/\/[^"?#]+\.pdf(?:[?#][^"]*)?"/i.test(item.contentHtml)) {
    errors.push(`External PDF was not copied locally in ${item.originalPath}`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Verified 71 faithful legacy pages, their text hashes, and all referenced local media.");
