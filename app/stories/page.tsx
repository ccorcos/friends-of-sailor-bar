export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SubscribeForm } from "@/components/forms";
import { MarkdownContent } from "@/components/markdown-content";
import { getCollectionIndex, getUpdates } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function generateMetadata(): Metadata {
  const index = getCollectionIndex("updates");
  return {
    title: index?.title ?? "Updates",
    description: index?.description,
  };
}

export default function StoriesPage() {
  const index = getCollectionIndex("updates");
  const updates = getUpdates();

  return (
    <>
      <header className="updates-intro container">
        <h1>{index?.title ?? "Updates"}</h1>
        <SubscribeForm />
      </header>
      <section className="page-content container" aria-label="Recent updates">
        <div className="content-list">
          {index?.html && <MarkdownContent className="essay-body" html={index.html} />}
          {updates.map((update) => {
            const href = `/stories/${update.slug}`;
            const dateLabel = formatDate(update.publishedAt, { month: "long", day: "numeric", year: "numeric" });
            const showImage = Boolean(update.image);

            return (
              <article className={`image-card${showImage ? "" : " legacy-text-card"}`} key={update.slug}>
                {showImage && update.image && (
                  <Link
                    className="card-image"
                    href={href}
                    aria-label={`Read ${update.title}`}
                  >
                    <Image src={update.image} alt="" fill sizes="(max-width: 700px) 100vw, 10rem" />
                  </Link>
                )}
                <div className="card-copy">
                  <p className="meta">{dateLabel}</p>
                  <h2><Link href={href}>{update.title}</Link></h2>
                  <Link className="detail-link" href={href} aria-label={`Read ${update.title}`}>
                    Read update <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
