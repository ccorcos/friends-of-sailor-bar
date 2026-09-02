import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return <><section className="page-hero"><div className="shell"><h1>Projects</h1><p>Projects currently being considered or planned at Sailor Bar.</p></div></section><section className="page-content"><div className="shell">{projects.map((project) => <article className="project-detail" key={project.title}><div className="detail-image"><Image src={project.image} fill alt="" sizes="(max-width:900px) 100vw, 220px" /></div><div className="detail-copy"><h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2><p>{project.summary}</p><Link className="detail-link" href={`/projects/${project.slug}`}>Project details <ArrowRight size={15} /></Link></div></article>)}</div></section></>;
}
