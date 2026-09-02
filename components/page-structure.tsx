import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PageIntro({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <header className={`page-intro container${children ? "" : " page-intro-simple"}`}>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </header>
  );
}

export function DetailIntro({ backHref, backLabel, title, meta }: {
  backHref: string;
  backLabel: string;
  title: string;
  meta?: React.ReactNode;
}) {
  return (
    <header className="detail-intro container">
      <Link className="back-link" href={backHref}><ArrowLeft aria-hidden="true" /> {backLabel}</Link>
      {meta && <p className="meta">{meta}</p>}
      <h1>{title}</h1>
    </header>
  );
}
