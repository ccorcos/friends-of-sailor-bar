import { AboutDirectory } from "@/components/about-directory";

export function AboutArticle({ children, currentSection }: { children: React.ReactNode; currentSection: string }) {
  return (
    <div className="about-layout about-layout-standalone container">
      <AboutDirectory currentSection={currentSection} />
      <article className="about-essay editorial-article">{children}</article>
    </div>
  );
}
