export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { DetailBackLink } from "@/components/page-structure";
import { getProjectBySlug } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  return {
    title: project?.title ?? "Project",
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  return (
    <>
      <DetailBackLink href="/projects" label="All projects" />
      <section className="detail-page container">
        <article className="essay-card">
          <h1>{project.title}</h1>
          {project.image && (
            <div className="feature-image">
              <Image src={project.image} alt="" fill unoptimized={project.image.startsWith("/media/")} sizes="(max-width: 700px) 100vw, 48rem" priority />
            </div>
          )}
          <div className="essay-body">
            {project.html && <MarkdownContent html={project.html} />}
            <Link className="button button-primary" href="/volunteer">Help with this work <ArrowRight aria-hidden="true" /></Link>
          </div>
        </article>
      </section>
    </>
  );
}
