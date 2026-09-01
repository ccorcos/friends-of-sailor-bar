import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return <><section className="page-hero"><div className="shell"><p className="kicker"><Leaf size={15} /> Compassion in action</p><h1>Our current projects</h1><p>Five grounded, hopeful ideas to make Sailor Bar healthier, more welcoming, and more resilient. Each will grow through thoughtful partnership and community support.</p></div></section><section className="page-content"><div className="shell">{projects.map((project, index) => <article className="project-detail" key={project.title}><div className="detail-image"><Image src={project.image} fill alt="" sizes="(max-width:900px) 100vw, 50vw" /></div><div className="detail-copy"><span className="number">0{index + 1} · {project.status}</span><h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2><p>{project.detail}</p><Link className="detail-link" href={`/projects/${project.slug}`}>Project details <ArrowRight size={15} /></Link></div></article>)}</div></section></>;
}
