import Image from "next/image";
import { Leaf } from "lucide-react";

const projects = [
  { title: "A more accessible Turtle Pond walk", image: "/images/river-overlook.jpg", status: "Listening & planning", text: "We want more neighbors to experience the quiet beauty of Turtle Pond. This project envisions a gentler, more accessible nature route designed in partnership with people with disabilities, park stewards, and habitat experts." },
  { title: "Butterfly sanctuary", image: "/images/woodpecker.jpg", status: "Habitat design", text: "A native garden for monarchs and California pipevine swallowtails will provide food, shelter, and places to reproduce—while giving visitors a close-up view of the park’s web of life." },
  { title: "Water fountain & welcome garden", image: "/images/grinding-rocks.jpg", status: "Early planning", text: "At the Olive Street entrance, we envision a water fountain paired with a native garden in the parking island: a practical welcome that also creates habitat and a stronger sense of arrival." },
  { title: "Oak trees for the next century", image: "/images/bench.jpg", status: "Site assessment", text: "Young native oaks planted near the benches by the Olive Street parking area will grow into vital habitat and generous shade for generations of park visitors." },
  { title: "Riverside native meadow", image: "/images/river-sunrise.jpg", status: "Concept", text: "Near the waterside bench roughly 300 yards from the Olive Street entrance, a native meadow can support birds and pollinators, improve biodiversity, and shift with the seasons." },
];

export default function ProjectsPage() {
  return <><section className="page-hero"><div className="shell"><p className="kicker"><Leaf size={15} /> Compassion in action</p><h1>Our current projects</h1><p>Five grounded, hopeful ideas to make Sailor Bar healthier, more welcoming, and more resilient. Each will grow through thoughtful partnership and community support.</p></div></section><section className="page-content"><div className="shell">{projects.map((project, index) => <article className="project-detail" key={project.title}><div className="detail-image"><Image src={project.image} fill alt="" sizes="(max-width:900px) 100vw, 50vw" /></div><div className="detail-copy"><span className="number">0{index + 1} · {project.status}</span><h2>{project.title}</h2><p>{project.text}</p></div></article>)}</div></section></>;
}
