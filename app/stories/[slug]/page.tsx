import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DetailIntro } from "@/components/page-structure";
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
      <DetailIntro
        backHref="/stories"
        backLabel="All updates"
        title={post.title}
        meta={formatDate(post.published_at, { month: "long", day: "numeric", year: "numeric" })}
      />
      <section className="page-content container">
        <article className="story-card">
          <div className="feature-image">
            <Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, 60vw" priority />
          </div>
          <div className="story-body">
            <p className="lead">{post.excerpt}</p>
            <p>{post.body}</p>
          </div>
        </article>
      </section>
    </>
  );
}
