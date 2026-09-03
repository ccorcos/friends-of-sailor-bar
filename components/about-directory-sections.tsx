"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export type DirectoryLink = { href: string; label: string };
export type DirectorySection = DirectoryLink & { children: DirectoryLink[] };

export function AboutDirectorySections({
  sections,
  activeSectionHref,
}: {
  sections: DirectorySection[];
  activeSectionHref: string;
}) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((section) => [section.href, section.href === activeSectionHref])),
  );

  function toggleSection(href: string) {
    setExpandedSections((current) => ({ ...current, [href]: !current[href] }));
  }

  return (
    <nav aria-label="About Sailor Bar sections">
      <ul className="about-directory-list">
        {sections.map((section) => {
          const expanded = expandedSections[section.href] ?? false;
          const childListId = `about-directory-${section.href.slice(1)}`;

          return (
            <li key={section.href}>
              <div className="about-directory-heading">
                <Link href={section.href}>{section.label}</Link>
                {section.children.length > 0 && (
                  <button
                    className="about-directory-toggle"
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={childListId}
                    aria-label={`${expanded ? "Collapse" : "Expand"} ${section.label}`}
                    onClick={() => toggleSection(section.href)}
                  >
                    <ChevronDown aria-hidden="true" />
                  </button>
                )}
              </div>
              {section.children.length > 0 && expanded && (
                <ul id={childListId}>
                  {section.children.map((child) => (
                    <li key={child.href}><Link href={child.href}>{child.label}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
