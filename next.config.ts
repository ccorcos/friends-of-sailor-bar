import type { NextConfig } from "next";
import archiveManifest from "./data/archive-manifest.json";
import publicArchiveSlugs from "./data/public-archive-slugs.json";

const promotedLegacyDestinations: Record<string, string> = {
  "/about-sailor-bar/": "/about",
  "/recreation/": "/about/recreation",
  "/amenities/": "/about/amenities",
  "/friends-of-sailor-bar-brochure-and-map/": "/about/brochure-and-map",
  "/turtle-pond/": "/about/turtle-pond",
  "/boat-launch/": "/about/boat-launch",
  "/olive-avenue-river-overlook/": "/about/olive-avenue-overlook",
  "/side-channel/": "/stories/restoring-room-young-salmon",
  "/contact/": "/contact",
  "/get-involved/": "/volunteer",
  "/your-donations-support-sailor-bar-activities/": "/donate",
  "/wildlife/": "/wildlife",
  "/plant-life/": "/wildlife/plant-life",
  "/interactive-birding-at-sailor-bar/birding-at-sailor-bar/": "/wildlife/birding",
  "/nature-study/": "/wildlife/salmon-and-steelhead",
  "/a-detailed-history-of-sailor-bar/": "/history",
  "/native-american-history/": "/history/nisenan-history",
  "/gold-dredging-industrial-mining-on-a-massive-scale/": "/history/mining-and-dredging",
  "/chinese-diggings-across-from-sailor-bar/": "/history/chinese-diggings",
  "/859-2/": "/history/river-changes",
  "/remembering-camp-sabadaca/": "/history/camp-sabadaca",
  "/the-elderberry/": "/wildlife/elderberry",
  "/great-horned-owl-nest-east-of-sailor-bar/": "/wildlife/great-horned-owls",
  "/aerojet-groundwater-pumps/": "/about/aerojet-groundwater-pumps",
  "/partners-affiliates/": "/partners",
  "/american-river-parway-bike-patrol/": "/partners/american-river-bike-patrol",
  "/fair-oaks-historical-society/": "/partners/fair-oaks-historical-society",
  "/river-city-waterway-alliance/": "/partners/river-city-waterway-alliance",
  "/sacramento-county-regional-parks/": "/partners/sacramento-county-regional-parks",
  "/save-the-american-river-association-sara/": "/partners/save-the-american-river-association",
  "/waterbird-habitat/": "/partners/waterbird-habitat-project",
  "/sacramento-water-forum/": "/stories/water-forum-2050-agreement",
  "/friends-of-sailor-bar-rock-off-on-october-3rd-2025/": "/events/friends-of-sailor-bar-rock-off",
  "/sailor-bar-bench-and-table-dedication-ceremony/": "/events/bench-and-table-dedication",
  "/sailor-bar-bench-dedication/": "/events/bench-and-table-dedication",
  "/earth-day-april-2026/": "/events/earth-day-at-sailor-bar-2026",
  "/interactive-birding-at-sailor-bar/": "/events/interactive-birding-2026",
  "/health-wellness-day/": "/events/family-health-and-wellness-day-2026",
  "/celebrating-american-river-parkway-heroes/": "/events/american-river-parkway-heroes-2026",
  "/the-wild-and-scenic-american-river/": "/events/wild-and-scenic-american-river-2026",
  "/event/bald-eagles-and-birdhouses/": "/events/real-wildlife-encounters",
  "/real-wildlife-encounters/": "/events/real-wildlife-encounters",
  "/the-ghost-of-sailor-bar-how-sailor-bar-got-its-name-legends-and-historical-facts/": "/events/ghost-of-sailor-bar",
  "/something-fishy-is-going-on-here-the-remarkable-spawning-journey/": "/events/salmon-spawning-journey",
};

const occupiedLegacyPaths = new Set(["/", "/contact/", "/donate/", "/events/", "/partners/", "/wildlife/"]);

const nextConfig: NextConfig = {
  allowedDevOrigins: ["sailorbar.exe.xyz", "sailorbar.exe.xyz:8000"],
  async redirects() {
    const publicArchiveSet = new Set(publicArchiveSlugs);
    return archiveManifest.flatMap((item) => {
      if (occupiedLegacyPaths.has(item.originalPath)) return [];
      const destination = promotedLegacyDestinations[item.originalPath]
        ?? (publicArchiveSet.has(item.slug) ? `/archive/${item.slug}` : undefined);
      return destination ? [{
        source: item.originalPath.replace(/\/$/, ""),
        destination,
        permanent: true,
      }] : [];
    });
  },
};

export default nextConfig;
