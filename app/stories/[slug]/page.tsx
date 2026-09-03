export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { DetailBackLink } from "@/components/page-structure";
import { getUpdateBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const update = getUpdateBySlug((await params).slug);
  return {
    title: update?.title ?? "Update",
  };
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const update = getUpdateBySlug((await params).slug);
  if (!update) notFound();

  return (
    <>
      <DetailBackLink href="/stories" label="All updates" />
      <section className="detail-page container">
        <article className="essay-card">
          <h1>{update.title}</h1>
          <p className="essay-date">{formatDate(update.publishedAt, { month: "long", day: "numeric", year: "numeric" })}</p>
          {update.image && (
            <div className="feature-image">
              <Image src={update.image} alt="" fill sizes="(max-width: 700px) 100vw, 48rem" priority />
            </div>
          )}
          <div className="essay-body">
            {update.html && <MarkdownContent html={update.html} />}
          </div>
        </article>
      </section>
    </>
  );
}
