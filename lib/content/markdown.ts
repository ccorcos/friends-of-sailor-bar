import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

type SyntaxNode = {
  type?: string;
  depth?: number;
  children?: SyntaxNode[];
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  // `allowDangerousHtml` intentionally remains false. Markdown HTML nodes are dropped.
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

function containsLevelOneHeading(node: SyntaxNode): boolean {
  if (node.type === "heading" && node.depth === 1) return true;
  return node.children?.some(containsLevelOneHeading) ?? false;
}

export function compileMarkdown(body: string): string {
  const tree = processor.parse(body) as SyntaxNode;
  if (containsLevelOneHeading(tree)) {
    throw new Error("Markdown bodies may not contain a level-one heading; use the frontmatter title");
  }

  return String(processor.stringify(processor.runSync(tree as Parameters<typeof processor.runSync>[0])));
}
