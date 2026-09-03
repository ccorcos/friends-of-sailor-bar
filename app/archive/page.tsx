import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-structure";
import { archiveCategories, archiveItems } from "@/lib/archive";

export const metadata: Metadata = { title: "Archive" };

export default function ArchivePage() {
  return (
    <>
      <PageIntro title="Archive" />
      <section className="archive-page container">
        <div className="archive-directory">
          <p className="archive-note">Faithful page-by-page copies from the previous Friends of Sailor Bar website, including original wording and local media.</p>
          {archiveCategories.map((category) => (
            <section className="archive-group" key={category}>
              <h2>{category}</h2>
              <ul>
                {archiveItems.filter((item) => item.category === category).map((item) => (
                  <li key={item.slug}><Link href={`/archive/${item.slug}`}>{item.title}</Link></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
