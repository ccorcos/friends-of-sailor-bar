import { notFound } from "next/navigation";
import { getArchiveItem } from "@/lib/archive";

export function LegacyContent({ slug }: { slug: string }) {
  const item = getArchiveItem(slug);
  if (!item) notFound();

  return <div className="archive-content" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />;
}

export function LegacyTitle({ slug }: { slug: string }) {
  const item = getArchiveItem(slug);
  if (!item) notFound();

  return <h1>{item.title}</h1>;
}
