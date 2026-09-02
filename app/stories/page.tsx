export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-structure";
import { getPosts } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Updates" };

export default function StoriesPage() {
  const posts = getPosts();

  return (
    <>
      <PageIntro title="Updates">Project reports, event recaps, and other news from Friends of Sailor Bar.</PageIntro>
      <section className="page-content container" aria-label="Recent updates">
        <div className="content-list">
          {posts.map((post) => (
            <article className="image-card" key={post.id}>
              <div className="card-image">
                <Image src={post.image} alt="" fill sizes="(max-width: 700px) 35vw, 25vw" />
              </div>
              <div className="card-copy">
                <p className="meta">{formatDate(post.published_at, { month: "long", day: "numeric", year: "numeric" })}</p>
                <h2><Link href={`/stories/${post.slug}`}>{post.title}</Link></h2>
                <p>{post.excerpt}</p>
                <Link className="detail-link" href={`/stories/${post.slug}`}>Read update <ArrowRight aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
