export const dynamic = "force-dynamic";

import Image from "next/image";
import { Newspaper } from "lucide-react";
import { getPosts } from "@/lib/db";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export default function StoriesPage() {
  const posts = getPosts();
  return <><section className="page-hero"><div className="shell"><p className="kicker"><Newspaper size={15} /> Newsletters & field notes</p><h1>Stories from the river</h1><p>Project updates, wildlife observations, community news, and reflections from the people who care for Sailor Bar.</p></div></section><section className="page-content"><div className="shell all-stories">{posts.map(post => <article className="story-card" key={post.id}><div className="story-image"><Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="story-copy"><span>{post.category} · {formatDate(post.published_at)}</span><h2>{post.title}</h2><p>{post.body}</p></div></article>)}</div></section></>;
}
