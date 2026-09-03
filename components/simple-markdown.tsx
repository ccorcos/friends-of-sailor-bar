import type { ReactNode } from "react";

const inlinePattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;

function renderInline(text: string): ReactNode[] {
  return text.split(inlinePattern).filter(Boolean).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a href={link[2]} key={index}>{link[1]}</a>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export function SimpleMarkdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      {blocks.map((block, index) => {
        const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
        if (lines.every((line) => line.startsWith("- "))) {
          return <ul key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{renderInline(line.slice(2))}</li>)}</ul>;
        }
        return <p key={index}>{renderInline(lines.join(" "))}</p>;
      })}
    </>
  );
}
