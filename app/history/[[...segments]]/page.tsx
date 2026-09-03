import type { Metadata } from "next";
import { ContentPage, contentPageMetadata } from "@/components/content-page";

export const dynamic = "force-dynamic";

const SECTION = "history";

type HistoryRouteProps = { params: Promise<{ segments?: string[] }> };

export async function generateMetadata({ params }: HistoryRouteProps): Promise<Metadata> {
  return contentPageMetadata(SECTION, (await params).segments ?? []);
}

export default async function HistoryPage({ params }: HistoryRouteProps) {
  return <ContentPage section={SECTION} segments={(await params).segments ?? []} />;
}
