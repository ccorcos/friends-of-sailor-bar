import Link from "next/link";

const sections = [
  {
    href: "/about",
    label: "About Sailor Bar",
    children: [
      { href: "/archive/recreation", label: "Recreation" },
      { href: "/archive/amenities", label: "Amenities" },
      { href: "/archive/friends-of-sailor-bar-brochure-and-map", label: "Brochure and map" },
      { href: "/archive/turtle-pond", label: "Turtle Pond" },
      { href: "/archive/boat-launch", label: "Boat launch" },
      { href: "/archive/olive-avenue-river-overlook", label: "Olive Avenue overlook" },
    ],
  },
  {
    href: "/wildlife",
    label: "Wildlife",
    children: [
      { href: "/wildlife/birding", label: "Birding" },
      { href: "/wildlife/plant-life", label: "Plant life" },
      { href: "/wildlife/salmon-and-steelhead", label: "Salmon and steelhead" },
    ],
  },
  {
    href: "/history",
    label: "History",
    children: [
      { href: "/history/nisenan-history", label: "Nisenan history" },
      { href: "/history/mining-and-dredging", label: "Mining and dredging" },
    ],
  },
  { href: "/archive/friends-of-sailor-bar", label: "Friends of Sailor Bar" },
];

export function AboutDirectory() {
  return (
    <aside className="about-directory">
      <nav aria-label="About Sailor Bar sections">
        <ul className="about-directory-list">
          {sections.map((section) => (
            <li key={section.href}>
              <Link href={section.href}>{section.label}</Link>
              {section.children && (
                <ul>
                  {section.children.map((child) => (
                    <li key={child.href}><Link href={child.href}>{child.label}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
