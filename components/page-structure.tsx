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

export function DetailBackLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="detail-nav container">
      <Link className="back-link" href={href}><ArrowLeft aria-hidden="true" /> {label}</Link>
    </div>
  );
}
