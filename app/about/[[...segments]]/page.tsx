import type { Metadata } from "next";
import { ContentPage, contentPageMetadata } from "@/components/content-page";

export const dynamic = "force-dynamic";

const SECTION = "about";

type AboutRouteProps = { params: Promise<{ segments?: string[] }> };

export async function generateMetadata({ params }: AboutRouteProps): Promise<Metadata> {
  return contentPageMetadata(SECTION, (await params).segments ?? []);
}

export default async function AboutPage({ params }: AboutRouteProps) {
  return <ContentPage section={SECTION} segments={(await params).segments ?? []} />;
}
