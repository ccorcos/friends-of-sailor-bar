import type { NextConfig } from "next";
import archiveManifest from "./data/archive-manifest.json";

const promotedLegacyDestinations: Record<string, string> = {
  "/about-sailor-bar/": "/about",
  "/recreation/": "/about/recreation",
  "/amenities/": "/about/amenities",
  "/friends-of-sailor-bar-brochure-and-map/": "/about/brochure-and-map",
  "/turtle-pond/": "/about/turtle-pond",
  "/boat-launch/": "/about/boat-launch",
  "/olive-avenue-river-overlook/": "/about/olive-avenue-overlook",
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

const occupiedLegacyPaths = new Set(["/", "/contact/", "/donate/", "/events/", "/wildlife/"]);

const nextConfig: NextConfig = {
  allowedDevOrigins: ["sailorbar.exe.xyz", "sailorbar.exe.xyz:8000"],
  async redirects() {
    return archiveManifest
      .filter((item) => !occupiedLegacyPaths.has(item.originalPath))
      .map((item) => ({
        source: item.originalPath.replace(/\/$/, ""),
        destination: promotedLegacyDestinations[item.originalPath] ?? `/archive/${item.slug}`,
        permanent: true,
      }));
  },
};

export default nextConfig;
