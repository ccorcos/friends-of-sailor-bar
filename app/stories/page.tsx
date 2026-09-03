export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SubscribeForm } from "@/components/forms";
import { getPosts } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { getStoryLegacyItems } from "@/lib/legacy-mappings";

export const metadata: Metadata = { title: "Updates" };

export default function StoriesPage() {
  const posts = getPosts();

  return (
    <>
      <header className="updates-intro container">
        <h1>Updates</h1>
        <SubscribeForm />
      </header>
      <section className="page-content container" aria-label="Recent updates">
        <div className="content-list">
          {posts.map((post) => {
            const href = `/stories/${post.slug}`;
            const legacy = getStoryLegacyItems(post.slug)[0];
            const dateLabel = formatDate(legacy?.modified ?? post.published_at, { month: "long", day: "numeric", year: "numeric" });

            if (legacy) {
              // Faithful legacy import: show the exact source title and source excerpt,
              // with no modern feature image, as a text-only card.
              return (
                <article className="image-card legacy-text-card" key={post.id}>
                  <div className="card-copy">
                    <p className="meta">{dateLabel}</p>
                    <h2><Link href={href}>{legacy.title}</Link></h2>
                    <p>{legacy.excerpt}</p>
                    <Link className="detail-link" href={href} aria-label={`Read ${legacy.title}`}>
                      Read update <ArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            }

            return (
              <article className="image-card" key={post.id}>
                <Link
                  className="card-image"
                  href={href}
                  aria-label={`Read ${post.title}`}
                >
                  <Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, 10rem" />
                </Link>
                <div className="card-copy">
                  <p className="meta">{dateLabel}</p>
                  <h2><Link href={href}>{post.title}</Link></h2>
                  <p>{post.excerpt}</p>
                  <Link className="detail-link" href={href}>Read update <ArrowRight aria-hidden="true" /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
