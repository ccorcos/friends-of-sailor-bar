import { getArchiveItem } from "@/lib/archive";

export const eventLegacySlugs: Record<string, string[]> = {
  "friends-of-sailor-bar-rock-off": ["friends-of-sailor-bar-rock-off-on-october-3rd-2025"],
  "bench-and-table-dedication": ["sailor-bar-bench-and-table-dedication-ceremony", "sailor-bar-bench-dedication"],
  "earth-day-at-sailor-bar-2026": ["earth-day-april-2026"],
  "interactive-birding-2026": ["interactive-birding-at-sailor-bar"],
  "family-health-and-wellness-day-2026": ["health-wellness-day"],
  "american-river-parkway-heroes-2026": ["celebrating-american-river-parkway-heroes"],
  "wild-and-scenic-american-river-2026": ["the-wild-and-scenic-american-river"],
  "real-wildlife-encounters": ["bald-eagles-and-birdhouses", "real-wildlife-encounters"],
  "ghost-of-sailor-bar": ["the-ghost-of-sailor-bar-how-sailor-bar-got-its-name-legends-and-historical-facts"],
  "salmon-spawning-journey": ["something-fishy-is-going-on-here-the-remarkable-spawning-journey"],
};

export const storyLegacySlugs: Record<string, string[]> = {
  "welcoming-path-turtle-pond": ["turtle-pond"],
  "restoring-room-young-salmon": ["friends-of-sailor-bar-rock-off-on-october-3rd-2025", "side-channel"],
  "celebrating-parkway-heroes": ["celebrating-american-river-parkway-heroes"],
};

export function getEventLegacyItems(eventSlug: string) {
  return (eventLegacySlugs[eventSlug] ?? []).map(getArchiveItem).filter((item) => item !== undefined);
}

export function getStoryLegacyItems(storySlug: string) {
  return (storyLegacySlugs[storySlug] ?? []).map(getArchiveItem).filter((item) => item !== undefined);
}
