import { AboutDirectory } from "@/components/about-directory";

export function AboutArticle({ children }: { children: React.ReactNode }) {
  return (
    <div className="about-layout about-layout-standalone container">
      <AboutDirectory />
      <article className="about-essay editorial-article">{children}</article>
    </div>
  );
}
