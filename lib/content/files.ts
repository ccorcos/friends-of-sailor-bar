import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { z } from "zod";
import { compileMarkdown } from "./markdown";

export const CONTENT_ROOT = path.resolve(process.cwd(), "content");

export type MarkdownSource = {
  body: string;
  html: string;
  frontmatter: unknown;
};

type CacheEntry = {
  fingerprint: string;
  source?: MarkdownSource;
  error?: ContentError;
};

const markdownCache = new Map<string, CacheEntry>();
const draftCache = new Map<string, { fingerprint: string; draft: boolean }>();
const SAFE_PART = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;

export class ContentError extends Error {
  constructor(message: string, readonly filePath?: string, options?: ErrorOptions) {
    super(filePath ? `${message}: ${path.relative(CONTENT_ROOT, filePath)}` : message, options);
    this.name = "ContentError";
  }
}

export function assertSafePart(value: string, label = "path segment"): void {
  if (!SAFE_PART.test(value) || value === "." || value === "..") {
    throw new ContentError(`Invalid ${label} ${JSON.stringify(value)}`);
  }
}

function isContained(root: string, candidate: string): boolean {
  return candidate === root || candidate.startsWith(`${root}${path.sep}`);
}

export function resolveContentPath(...parts: string[]): string {
  const candidate = path.resolve(CONTENT_ROOT, ...parts);
  if (!isContained(CONTENT_ROOT, candidate)) {
    throw new ContentError("Content path escapes the content root");
  }
  return candidate;
}

function canonicalContainedFile(filePath: string): { canonicalPath: string; stat: fs.Stats } {
  const root = fs.realpathSync.native(CONTENT_ROOT);
  const canonicalPath = fs.realpathSync.native(filePath);
  if (!isContained(root, canonicalPath)) {
    throw new ContentError("Content file escapes the content root", filePath);
  }
  const stat = fs.statSync(canonicalPath);
  if (!stat.isFile()) throw new ContentError("Content path is not a file", filePath);
  return { canonicalPath, stat };
}

export function markdownFileIsDraft(filePath: string): boolean {
  let canonicalPath: string;
  let stat: fs.Stats;
  try {
    ({ canonicalPath, stat } = canonicalContainedFile(filePath));
  } catch (error) {
    if (error instanceof ContentError) throw error;
    throw new ContentError("Unable to inspect content file", filePath, { cause: error });
  }

  const fingerprint = `${canonicalPath}:${stat.mtimeMs}:${stat.ctimeMs}:${stat.size}`;
  const cached = draftCache.get(filePath);
  if (cached?.fingerprint === fingerprint) return cached.draft;

  const raw = fs.readFileSync(canonicalPath, "utf8");
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? "";
  const draft = /^draft:\s*true\s*(?:#.*)?$/im.test(frontmatter);
  draftCache.set(filePath, { fingerprint, draft });
  return draft;
}

export function readMarkdownSource(filePath: string): MarkdownSource {
  let canonicalPath: string;
  let stat: fs.Stats;
  try {
    ({ canonicalPath, stat } = canonicalContainedFile(filePath));
  } catch (error) {
    if (error instanceof ContentError) throw error;
    throw new ContentError("Unable to read content file", filePath, { cause: error });
  }

  const fingerprint = `${canonicalPath}:${stat.mtimeMs}:${stat.ctimeMs}:${stat.size}`;
  const cached = markdownCache.get(filePath);
  if (cached?.fingerprint === fingerprint) {
    if (cached.error) throw cached.error;
    return cached.source!;
  }

  try {
    const parsed = matter(fs.readFileSync(canonicalPath, "utf8"));
    const source = {
      body: parsed.content,
      html: compileMarkdown(parsed.content),
      frontmatter: parsed.data,
    } satisfies MarkdownSource;
    markdownCache.set(filePath, { fingerprint, source });
    return source;
  } catch (error) {
    const contentError = new ContentError("Invalid Markdown content", filePath, { cause: error });
    markdownCache.set(filePath, { fingerprint, error: contentError });
    throw contentError;
  }
}

export function parseMarkdownFile<T extends z.ZodType>(filePath: string, schema: T): MarkdownSource & {
  data: z.output<T>;
} {
  const source = readMarkdownSource(filePath);
  const result = schema.safeParse(source.frontmatter);
  if (!result.success) {
    throw new ContentError(`Invalid frontmatter (${result.error.issues.map((issue) => issue.message).join("; ")})`, filePath, {
      cause: result.error,
    });
  }
  return { ...source, data: result.data };
}

export function listMarkdownFiles(directory: string, recursive = false): string[] {
  const requestedDirectory = path.resolve(directory);
  if (!isContained(CONTENT_ROOT, requestedDirectory)) {
    throw new ContentError("Content directory escapes the content root", directory);
  }

  let entries: fs.Dirent[];
  let canonicalDirectory: string;
  try {
    const root = fs.realpathSync.native(CONTENT_ROOT);
    canonicalDirectory = fs.realpathSync.native(requestedDirectory);
    if (!isContained(root, canonicalDirectory)) {
      throw new ContentError("Content directory escapes the content root", directory);
    }
    entries = fs.readdirSync(canonicalDirectory, { withFileTypes: true });
  } catch (error) {
    if (error instanceof ContentError) throw error;
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw new ContentError("Unable to list content directory", directory, { cause: error });
  }

  const files: string[] = [];
  for (const entry of entries) {
    if (entry.name.startsWith("_")) continue;
    const entryPath = path.join(canonicalDirectory, entry.name);
    if (recursive && entry.isDirectory()) {
      files.push(...listMarkdownFiles(entryPath, true));
    } else if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "index.md") {
      files.push(entryPath);
    }
  }
  return files.sort();
}

export function markdownFileExists(filePath: string): boolean {
  try {
    const { stat } = canonicalContainedFile(filePath);
    return stat.isFile();
  } catch (error) {
    if (error instanceof ContentError && error.message.includes("escapes")) throw error;
    return false;
  }
}

export function clearContentCache(): void {
  markdownCache.clear();
  draftCache.clear();
}
