import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return <>
    <section className="detail-hero"><div className="shell">
      <Link className="back-link" href="/stories"><ArrowLeft size={16} /> All updates</Link>
      <span className="category">{formatDate(post.published_at)}</span>
      <h1>{post.title}</h1>
    </div></section>
    <article className="story-detail">
      <div className="story-detail-image"><Image src={post.image} alt="" fill sizes="760px" /></div>
      <p className="lead">{post.excerpt}</p>
      <p>{post.body}</p>
    </article>
  </>;
}
