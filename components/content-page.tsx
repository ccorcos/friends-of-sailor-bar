import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutArticle } from "@/components/about-article";
import { MarkdownContent } from "@/components/markdown-content";
import { getPageByPath, type PageDocument } from "@/lib/content";

export type ContentPageProps = {
  section: string;
  segments?: readonly string[];
};

/**
 * Loads a Markdown page at request time. Missing paths resolve to `undefined`;
 * malformed files remain visible as authoring errors.
 */
export function findContentPage(section: string, segments: readonly string[] = []): PageDocument | undefined {
  // Keep one canonical URL per document: `index.md` is only reachable as the
  // section root, and underscore-prefixed files stay unroutable.
  if (segments.some((segment) => segment === "index" || segment.startsWith("_"))) return undefined;
  return getPageByPath(section, segments);
}

export function contentPageMetadata(section: string, segments: readonly string[] = []): Metadata {
  const page = findContentPage(section, segments);
  if (!page) return { title: "Page not found" };
  return {
    title: page.title,
    // Next normalizes an optional catch-all's `/section/index` request onto the
    // section root, so point every page at its one canonical URL.
    alternates: { canonical: page.href },
    ...(page.image ? { openGraph: { images: [page.image] } } : {}),
  };
}

export function ContentPage({ section, segments = [] }: ContentPageProps) {
  const page = findContentPage(section, segments);
  if (!page) notFound();

  return (
    <AboutArticle>
      <h1>{page.title}</h1>
      <MarkdownContent className="archive-content" html={page.html} />
    </AboutArticle>
  );
}
