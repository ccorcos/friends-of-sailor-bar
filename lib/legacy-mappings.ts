import { getArchiveItem } from "@/lib/archive";

export const storyLegacySlugs: Record<string, string[]> = {
  "welcoming-path-turtle-pond": ["turtle-pond"],
  "restoring-room-young-salmon": ["friends-of-sailor-bar-rock-off-on-october-3rd-2025", "side-channel"],
  "celebrating-parkway-heroes": ["celebrating-american-river-parkway-heroes"],
};

export function getStoryLegacyItems(storySlug: string) {
  return (storyLegacySlugs[storySlug] ?? []).map(getArchiveItem).filter((item) => item !== undefined);
}
