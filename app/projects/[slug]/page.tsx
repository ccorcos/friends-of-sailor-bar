import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug } from "@/lib/projects";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <>
    <section className="detail-hero"><div className="shell">
      <Link className="back-link" href="/projects"><ArrowLeft size={16} /> All projects</Link>
      <span className="category">{project.tag} · {project.status}</span>
      <h1>{project.title}</h1>
    </div></section>
    <article className="story-detail">
      <div className="story-detail-image"><Image src={project.image} alt="" fill sizes="760px" /></div>
      <p className="lead">{project.summary}</p>
      <p>{project.detail}</p>
      <Link className="button button-dark" href="/volunteer">Help with this work <ArrowRight size={17} /></Link>
    </article>
  </>;
}
