import Link from "next/link";
import { getPageByPath, getPageNavigation, type PageNavigationItem } from "@/lib/content";

const SECTIONS = ["about", "wildlife", "history", "partners"] as const;

type DirectoryLink = { href: string; label: string };
type DirectorySection = DirectoryLink & { children: DirectoryLink[] };

function toLink(item: Pick<PageNavigationItem, "href" | "title" | "navTitle">): DirectoryLink {
  return { href: item.href, label: item.navTitle ?? item.title };
}

/**
 * Builds the directory from Markdown frontmatter at request time so a new file
 * with `navTitle` appears without a rebuild. Section roots live in `index.md`,
 * which `getPageNavigation` deliberately omits, so they are loaded directly.
 */
function buildSections(): DirectorySection[] {
  return SECTIONS.flatMap((section): DirectorySection[] => {
    const root = getPageByPath(section);
    if (!root) return [];
    return [{
      ...toLink(root),
      children: getPageNavigation(section).map(toLink),
    }];
  });
}

export function AboutDirectory() {
  const sections = buildSections();

  return (
    <aside className="about-directory">
      <nav aria-label="About Sailor Bar sections">
        <ul className="about-directory-list">
          {sections.map((section) => (
            <li key={section.href}>
              <Link href={section.href}>{section.label}</Link>
              {section.children.length > 0 && (
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
