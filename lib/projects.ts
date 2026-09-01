export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  image: string;
  tag: string;
  status: string;
  summary: string;
  detail: string;
};

export const projects: Project[] = [
  {
    slug: "accessible-turtle-pond-walk",
    title: "A more accessible Turtle Pond walk",
    shortTitle: "A path for more of us",
    image: "/images/river-overlook.jpg",
    tag: "Access",
    status: "Listening & planning",
    summary: "Creating a more accessible nature walk around Turtle Pond.",
    detail: "We want more neighbors to experience the quiet beauty of Turtle Pond. This project envisions a gentler, more accessible nature route designed in partnership with people with disabilities, park stewards, and habitat experts.",
  },
  {
    slug: "butterfly-sanctuary",
    title: "Butterfly sanctuary",
    shortTitle: "A sanctuary on the wing",
    image: "/images/woodpecker.jpg",
    tag: "Habitat",
    status: "Habitat design",
    summary: "Building butterfly habitat for monarchs and California pipevine swallowtails.",
    detail: "A native garden for monarchs and California pipevine swallowtails will provide food, shelter, and places to reproduce—while giving visitors a close-up view of the park’s web of life.",
  },
  {
    slug: "water-fountain-welcome-garden",
    title: "Water fountain & welcome garden",
    shortTitle: "Water & welcome",
    image: "/images/grinding-rocks.jpg",
    tag: "Visitor care",
    status: "Early planning",
    summary: "A drinking fountain and native plant garden at the Olive Street entrance.",
    detail: "At the Olive Street entrance, we envision a water fountain paired with a native garden in the parking island: a practical welcome that also creates habitat and a stronger sense of arrival.",
  },
  {
    slug: "oak-trees",
    title: "Oak trees for the next century",
    shortTitle: "Oaks for the next century",
    image: "/images/bench.jpg",
    tag: "Restoration",
    status: "Site assessment",
    summary: "Planting shade trees near the benches at the Olive Street parking area.",
    detail: "Young native oaks planted near the benches by the Olive Street parking area will grow into vital habitat and generous shade for generations of park visitors.",
  },
  {
    slug: "riverside-native-meadow",
    title: "Riverside native meadow",
    shortTitle: "A meadow by the water",
    image: "/images/river-sunrise.jpg",
    tag: "Native plants",
    status: "Concept",
    summary: "Bringing a native plant meadow to the riverside bench west of the entrance.",
    detail: "Near the waterside bench roughly 300 yards from the Olive Street entrance, a native meadow can support birds and pollinators, improve biodiversity, and shift with the seasons.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
