import type { HTMLAttributes } from "react";

type MarkdownContentProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "dangerouslySetInnerHTML"> & {
  html: string;
};

export function MarkdownContent({ html, className, ...props }: MarkdownContentProps) {
  const classes = ["editorial-content", className].filter(Boolean).join(" ");
  return <div {...props} className={classes} dangerouslySetInnerHTML={{ __html: html }} />;
}
