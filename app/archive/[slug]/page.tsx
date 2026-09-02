import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailBackLink } from "@/components/page-structure";
import { archiveItems, getArchiveItem } from "@/lib/archive";

export function generateStaticParams() {
  return archiveItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getArchiveItem((await params).slug);
  return { title: item?.title ?? "Archive" };
}

export default async function ArchiveDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getArchiveItem((await params).slug);
  if (!item) notFound();

  return (
    <>
      <DetailBackLink href="/archive" label="Archive" />
      <section className="detail-page container">
        <article className="essay-card archive-essay">
          <h1>{item.title}</h1>
          <div className="archive-content" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
        </article>
      </section>
    </>
  );
}
