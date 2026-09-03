import type { Metadata } from "next";
import { ContentPage, contentPageMetadata } from "@/components/content-page";

export const dynamic = "force-dynamic";

const SECTION = "partners";

type PartnersRouteProps = { params: Promise<{ segments?: string[] }> };

export async function generateMetadata({ params }: PartnersRouteProps): Promise<Metadata> {
  return contentPageMetadata(SECTION, (await params).segments ?? []);
}

export default async function PartnersPage({ params }: PartnersRouteProps) {
  return <ContentPage section={SECTION} segments={(await params).segments ?? []} />;
}
