import { AboutDirectorySections, type DirectorySection } from "@/components/about-directory-sections";
import { getPageByPath, getPageNavigation, type PageNavigationItem } from "@/lib/content";

const SECTIONS = ["about", "sailor-bar", "wildlife", "history", "partners"] as const;

type DirectoryLink = { href: string; label: string };

function toLink(item: Pick<PageNavigationItem, "href" | "title">): DirectoryLink {
  return { href: item.href, label: item.title };
}

/**
 * Builds the directory from Markdown frontmatter at request time so new pages
 * appear without a rebuild. Section roots live in `index.md`, which
 * `getPageNavigation` deliberately omits, so they are loaded directly.
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

export function AboutDirectory({ currentSection }: { currentSection: string }) {
  const sections = buildSections();

  return (
    <aside className="about-directory">
      <AboutDirectorySections
        key={currentSection}
        sections={sections}
        activeSectionHref={`/${currentSection}`}
      />
    </aside>
  );
}
