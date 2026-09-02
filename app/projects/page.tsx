import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-structure";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageIntro title="Projects" />
      <section className="page-content container" aria-label="Current projects">
        <div className="content-list">
          {projects.map((project) => (
            <article className="image-card" key={project.slug}>
              <div className="card-image">
                <Image src={project.image} fill alt="" sizes="(max-width: 700px) 35vw, 25vw" />
              </div>
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
