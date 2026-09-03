export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { PageIntro } from "@/components/page-structure";
import { getCollectionIndex, getProjects } from "@/lib/content";

export function generateMetadata(): Metadata {
  const index = getCollectionIndex("projects");
  return {
    title: index?.title ?? "Projects",
    description: index?.description,
  };
}

export default function ProjectsPage() {
  const index = getCollectionIndex("projects");
  const projects = getProjects();

  return (
    <>
      <PageIntro title={index?.title ?? "Projects"} />
      <section className="page-content container" aria-label="Current projects">
        <div className="content-list">
          {index?.html && <MarkdownContent className="essay-body" html={index.html} />}
          {projects.map((project) => (
            <article className={`image-card${project.image ? "" : " legacy-text-card"}`} key={project.slug}>
              {project.image && (
                <Link
                  className="card-image"
                  href={`/projects/${project.slug}`}
                  aria-label={`View ${project.title}`}
                >
                  <Image src={project.image} fill unoptimized={project.image.startsWith("/media/")} alt="" sizes="(max-width: 700px) 100vw, 10rem" />
                </Link>
              )}
              <div className="card-copy">
                <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
                <p>{project.summary}</p>
                <Link className="detail-link" href={`/projects/${project.slug}`}>Project details <ArrowRight aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
