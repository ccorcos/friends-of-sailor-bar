import type { Metadata } from "next";
import { ContentPage, contentPageMetadata } from "@/components/content-page";

export const dynamic = "force-dynamic";

const SECTION = "wildlife";

type WildlifeRouteProps = { params: Promise<{ segments?: string[] }> };

export async function generateMetadata({ params }: WildlifeRouteProps): Promise<Metadata> {
  return contentPageMetadata(SECTION, (await params).segments ?? []);
}

export default async function WildlifePage({ params }: WildlifeRouteProps) {
  return <ContentPage section={SECTION} segments={(await params).segments ?? []} />;
}
