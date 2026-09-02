export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/db";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export default function StoriesPage() {
  const posts = getPosts();
  return <><section className="page-hero"><div className="shell"><h1>Updates</h1><p>Project reports, event recaps, and other news from Friends of Sailor Bar.</p></div></section><section className="page-content"><div className="shell all-stories">{posts.map(post => <article className="story-card" key={post.id}><div className="story-image"><Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, 220px" /></div><div className="story-copy"><span>{formatDate(post.published_at)}</span><h2><Link href={`/stories/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link className="detail-link" href={`/stories/${post.slug}`}>Read update</Link></div></article>)}</div></section></>;
}
