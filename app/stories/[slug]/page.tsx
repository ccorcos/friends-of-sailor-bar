import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DetailBackLink } from "@/components/page-structure";
import { getPostBySlug } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { getStoryLegacyItems } from "@/lib/legacy-mappings";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);
  const legacyItems = getStoryLegacyItems(slug);
  return { title: legacyItems[0]?.title ?? post?.title ?? "Update" };
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const legacyItems = getStoryLegacyItems(slug);

  return (
    <>
      <DetailBackLink href="/stories" label="All updates" />
      <section className="detail-page container">
        <article className="essay-card">
          <h1>{legacyItems[0]?.title ?? post.title}</h1>
          {legacyItems.length ? (
            <div className="legacy-sources">
              {legacyItems.map((item, index) => (
                <section className="legacy-source" key={item.slug}>
                  {index > 0 && <h2>{item.title}</h2>}
                  <div className="archive-content" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
                </section>
              ))}
            </div>
          ) : (
            <>
              <p className="essay-date">{formatDate(post.published_at, { month: "long", day: "numeric", year: "numeric" })}</p>
              <div className="feature-image">
                <Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, 48rem" priority />
              </div>
              <div className="essay-body">
                <p className="lead">{post.excerpt}</p>
                <p>{post.body}</p>
              </div>
            </>
          )}
        </article>
      </section>
    </>
  );
}
