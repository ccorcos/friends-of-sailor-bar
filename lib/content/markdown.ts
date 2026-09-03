import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

type SyntaxNode = {
  type?: string;
  depth?: number;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: SyntaxNode[];
};

function youtubeVideoId(href: string): string | undefined {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return undefined;
  }

  const host = url.hostname.toLowerCase().replace(/^(?:www\.|m\.)/, "");
  let id: string | null | undefined;
  if (host === "youtu.be") {
    id = url.pathname.split("/").filter(Boolean)[0];
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    id = parts[0] === "watch" ? url.searchParams.get("v") : ["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : undefined;
  }

  return id && /^[A-Za-z0-9_-]{6,20}$/.test(id) ? id : undefined;
}

function textContent(node: SyntaxNode): string {
  if (node.type === "text") return node.value ?? "";
  return node.children?.map(textContent).join("") ?? "";
}

function embedStandaloneYouTubeLinks() {
  return (tree: SyntaxNode) => {
    function transform(node: SyntaxNode): void {
      if (!node.children) return;

      node.children = node.children.map((child) => {
        const visibleChildren = child.children?.filter((item) => item.type !== "text" || item.value?.trim()) ?? [];
        const link = child.type === "element" && child.tagName === "p" && visibleChildren.length === 1
          ? visibleChildren[0]
          : undefined;
        const href = link?.type === "element" && link.tagName === "a" ? link.properties?.href : undefined;
        const videoId = typeof href === "string" ? youtubeVideoId(href) : undefined;

        if (!videoId || !link) {
          transform(child);
          return child;
        }

        const label = textContent(link).trim() || "YouTube video";
        return {
          type: "element",
          tagName: "div",
          properties: { className: ["video-embed"] },
          children: [{
            type: "element",
            tagName: "iframe",
            properties: {
              src: `https://www.youtube-nocookie.com/embed/${videoId}`,
              title: label,
              loading: "lazy",
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
              allowFullScreen: true,
              referrerPolicy: "strict-origin-when-cross-origin",
            },
            children: [],
          }],
        };
      });
    }

    transform(tree);
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  // `allowDangerousHtml` intentionally remains false. Markdown HTML nodes are dropped.
  .use(remarkRehype)
  .use(rehypeSanitize)
  // Only sanitized, standalone YouTube links are converted to generated iframes.
  .use(embedStandaloneYouTubeLinks)
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
