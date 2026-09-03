import fs from "node:fs";
import path from "node:path";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MEDIA_ROOT = path.resolve(process.cwd(), "content", "media");
const MIME_TYPES = new Map<string, string>([
  [".avif", "image/avif"],
  [".gif", "image/gif"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".webp", "image/webp"],
]);

type RouteContext = { params: Promise<{ path: string[] }> };
type MediaFile = { filePath: string; stat: fs.Stats; mime: string };

function contained(root: string, candidate: string): boolean {
  return candidate.startsWith(`${root}${path.sep}`);
}

function resolveMediaFile(parts: string[]): MediaFile | undefined {
  if (parts.length === 0 || parts.some((part) => !part || part === "." || part === ".." || part.includes("/") || part.includes("\\") || part.includes("\0"))) {
    return undefined;
  }

  const mime = MIME_TYPES.get(path.extname(parts.at(-1)!).toLowerCase());
  if (!mime) return undefined;
  const candidate = path.resolve(MEDIA_ROOT, ...parts);
  if (!contained(MEDIA_ROOT, candidate)) return undefined;

  try {
    const root = fs.realpathSync.native(MEDIA_ROOT);
    const filePath = fs.realpathSync.native(candidate);
    if (!contained(root, filePath)) return undefined;
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return undefined;
    return { filePath, stat, mime };
  } catch {
    return undefined;
  }
}

function etagFor(stat: fs.Stats): string {
  return `"${Math.trunc(stat.mtimeMs).toString(16)}-${Math.trunc(stat.ctimeMs).toString(16)}-${stat.size.toString(16)}"`;
}

function headersFor(file: MediaFile): Headers {
  const headers = new Headers({
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Content-Length": String(file.stat.size),
    "Content-Type": file.mime,
    "ETag": etagFor(file.stat),
    "Last-Modified": file.stat.mtime.toUTCString(),
    "X-Content-Type-Options": "nosniff",
  });
  return headers;
}

function isNotModified(request: NextRequest, file: MediaFile): boolean {
  const ifNoneMatch = request.headers.get("if-none-match");
  if (ifNoneMatch !== null) {
    const expected = etagFor(file.stat);
    return ifNoneMatch.split(",").some((value) => {
      const candidate = value.trim();
      return candidate === "*" || candidate.replace(/^W\//i, "") === expected;
    });
  }
  const ifModifiedSince = request.headers.get("if-modified-since");
  if (!ifModifiedSince) return false;
  const since = Date.parse(ifModifiedSince);
  return Number.isFinite(since) && Math.trunc(file.stat.mtimeMs / 1000) * 1000 <= since;
}

async function serve(request: NextRequest, context: RouteContext, includeBody: boolean): Promise<Response> {
  const file = resolveMediaFile((await context.params).path);
  if (!file) return new Response("Not found", { status: 404 });
  const headers = headersFor(file);
  if (isNotModified(request, file)) return new Response(null, { status: 304, headers });
  if (!includeBody) return new Response(null, { status: 200, headers });
  return new Response(new Uint8Array(fs.readFileSync(file.filePath)), { status: 200, headers });
}

export function GET(request: NextRequest, context: RouteContext): Promise<Response> {
  return serve(request, context, true);
}

export function HEAD(request: NextRequest, context: RouteContext): Promise<Response> {
  return serve(request, context, false);
}
