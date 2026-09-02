import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DetailIntro } from "@/components/page-structure";
import { getProjectBySlug } from "@/lib/projects";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  return (
    <>
      <DetailIntro backHref="/projects" backLabel="All projects" title={project.title} />
      <section className="page-content container">
        <article className="story-card">
          <div className="feature-image">
            <Image src={project.image} alt="" fill sizes="(max-width: 700px) 100vw, 60vw" priority />
          </div>
          <div className="story-body">
            <p className="lead">{project.summary}</p>
            <p>{project.detail}</p>
            <Link className="button button-primary" href="/volunteer">Help with this work <ArrowRight aria-hidden="true" /></Link>
          </div>
        </article>
      </section>
    </>
  );
}
