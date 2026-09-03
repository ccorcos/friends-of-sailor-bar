import type { Metadata } from "next";
import { ContentPage, contentPageMetadata } from "@/components/content-page";

export const dynamic = "force-dynamic";

const SECTION = "friends-of-sailor-bar";

type FriendsRouteProps = { params: Promise<{ segments?: string[] }> };

export async function generateMetadata({ params }: FriendsRouteProps): Promise<Metadata> {
  return contentPageMetadata(SECTION, (await params).segments ?? []);
}

export default async function FriendsOfSailorBarPage({ params }: FriendsRouteProps) {
  return <ContentPage section={SECTION} segments={(await params).segments ?? []} />;
}
