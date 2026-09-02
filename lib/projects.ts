export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  image: string;
  summary: string;
  detail: string;
};

export const projects: Project[] = [
  {
    slug: "accessible-turtle-pond-walk",
    title: "Accessible Turtle Pond Walk",
    shortTitle: "Accessible Turtle Pond Walk",
    image: "/images/river-overlook.jpg",
    summary: "Planning a more accessible route around Turtle Pond.",
    detail: "This project would improve access around Turtle Pond for visitors with a wider range of mobility needs. The route, scope, partners, and schedule still need to be documented and reviewed.",
  },
  {
    slug: "butterfly-sanctuary",
    title: "Butterfly Sanctuary",
    shortTitle: "Butterfly Sanctuary",
    image: "/images/pipevine-swallowtail.jpg",
    summary: "Creating habitat for monarchs and California pipevine swallowtails.",
    detail: "The proposed sanctuary would use native host and nectar plants for monarchs and California pipevine swallowtails. The planting plan, location, maintenance plan, and project schedule still need to be documented and reviewed.",
  },
  {
    slug: "water-fountain-welcome-garden",
    title: "Drinking Fountain and Welcome Garden",
    shortTitle: "Drinking Fountain and Welcome Garden",
    image: "/images/grinding-rocks.jpg",
    summary: "Adding drinking water and native plants at the Olive Street entrance.",
    detail: "This project proposes a drinking fountain and native planting in the parking island at the Olive Street entrance. The site plan, approvals, budget, and schedule still need to be documented and reviewed.",
  },
  {
    slug: "oak-trees",
    title: "Oak Tree Planting",
    shortTitle: "Oak Tree Planting",
    image: "/images/bench.jpg",
    summary: "Planting native oak trees near the Olive Street parking area.",
    detail: "This project proposes planting native oak trees near the benches at the Olive Street parking area. Tree species, locations, irrigation, maintenance, approvals, and timing still need to be documented and reviewed.",
  },
  {
    slug: "riverside-native-meadow",
    title: "Riverside Native Meadow",
    shortTitle: "Riverside Native Meadow",
    image: "/images/river-sunrise.jpg",
    summary: "Establishing a native meadow near the riverside bench west of the entrance.",
    detail: "This project proposes a native planting area near the riverside bench west of the Olive Street entrance. The exact site, plant list, site preparation, maintenance plan, approvals, and schedule still need to be documented and reviewed.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
