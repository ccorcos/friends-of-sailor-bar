import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DetailBackLink } from "@/components/page-structure";
import { getPostBySlug } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  return { title: post?.title ?? "Update" };
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();

  return (
    <>
      <DetailBackLink href="/stories" label="All updates" />
      <section className="detail-page container">
        <article className="essay-card">
          <h1>{post.title}</h1>
          <p className="essay-date">{formatDate(post.published_at, { month: "long", day: "numeric", year: "numeric" })}</p>
          <div className="feature-image">
            <Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, 48rem" priority />
          </div>
          <div className="essay-body">
            <p className="lead">{post.excerpt}</p>
            <p>{post.body}</p>
          </div>
        </article>
      </section>
    </>
  );
}
