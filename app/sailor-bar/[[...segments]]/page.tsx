import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { ContentPage, contentPageMetadata } from "@/components/content-page";

export const dynamic = "force-dynamic";

const SECTION = "sailor-bar";
const CONSOLIDATED_PAGES = new Set(["recreation", "amenities", "brochure-and-map"]);

type SailorBarRouteProps = { params: Promise<{ segments?: string[] }> };

export async function generateMetadata({ params }: SailorBarRouteProps): Promise<Metadata> {
  const segments = (await params).segments ?? [];
  return contentPageMetadata(SECTION, segments.length === 1 && CONSOLIDATED_PAGES.has(segments[0]) ? [] : segments);
}

export default async function SailorBarPage({ params }: SailorBarRouteProps) {
  const segments = (await params).segments ?? [];
  if (segments.length === 1 && CONSOLIDATED_PAGES.has(segments[0])) permanentRedirect("/sailor-bar");
  return <ContentPage section={SECTION} segments={segments} />;
}
