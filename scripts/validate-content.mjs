#!/usr/bin/env node

// Validate runtime Markdown content with the same schemas and loader used by
// the application. Run through the package script so tsx can load TypeScript
// and React's server-only condition can be applied:
//   npm run content:validate

import fs from "node:fs";
import path from "node:path";
import {
  getCollectionIndex,
  getEventBySlug,
  getPageByPath,
  getPastEvents,
  getProjectBySlug,
  getProjects,
  getUpcomingEvents,
  getUpdateBySlug,
  getUpdates,
} from "../lib/content/index.ts";
import {
  CONTENT_ROOT,
  listMarkdownFiles,
  parseMarkdownFile,
  readMarkdownSource,
  resolveContentPath,
} from "../lib/content/files.ts";
import {
  collectionIndexFrontmatterSchema,
  eventFrontmatterSchema,
  pageFrontmatterSchema,
  projectFrontmatterSchema,
  updateFrontmatterSchema,
} from "../lib/content/schemas.ts";

const repositoryRoot = path.dirname(CONTENT_ROOT);
const publicRoot = path.join(repositoryRoot, "public");
const errors = [];
const errorSet = new Set();
const assetReferences = new Map();
const collections = [
  { name: "events", schema: eventFrontmatterSchema, indexSchema: collectionIndexFrontmatterSchema },
  { name: "projects", schema: projectFrontmatterSchema, indexSchema: collectionIndexFrontmatterSchema },
  { name: "updates", schema: updateFrontmatterSchema, indexSchema: collectionIndexFrontmatterSchema },
];
const itemDocuments = new Map(collections.map(({ name }) => [name, new Map()]));
const pageDocuments = new Map();
const pageRoutes = new Set();
let validatedTemplateCount = 0;

function addError(message) {
  if (!errorSet.has(message)) {
    errorSet.add(message);
    errors.push(message);
  }
}

function labelFor(filePath) {
  return path.relative(repositoryRoot, filePath).split(path.sep).join("/");
}

function readDirectoryFiles(directory, recursive = false) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith("_")) continue;
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory() && recursive) files.push(...readDirectoryFiles(entryPath, true));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(entryPath);
  }
  return files;
}

function validateSlug(slug, label) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    addError(`${label}: filename slug must be lowercase words separated by hyphens`);
  }
}

function parseFile(filePath, schema) {
  try {
    return parseMarkdownFile(filePath, schema);
  } catch (error) {
    addError(`${labelFor(filePath)}: ${error instanceof Error ? error.message : String(error)}`);
    return undefined;
  }
}

function directoriesWithMarkdown(root) {
  if (!fs.existsSync(root)) return [];
  const directories = [];

  const visit = (directory) => {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    if (entries.some((entry) => entry.isFile() && entry.name.endsWith(".md") && !entry.name.startsWith("_"))) {
      directories.push(directory);
    }
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith("_")) visit(path.join(directory, entry.name));
    }
  };

  visit(root);
  return directories.sort();
}

function validateTemplate(filePath, schema) {
  if (!fs.existsSync(filePath)) {
    addError(`${labelFor(filePath)} is missing`);
    return;
  }

  try {
    const source = readMarkdownSource(filePath);
    const frontmatter = source.frontmatter;
    if (!frontmatter || typeof frontmatter !== "object" || Array.isArray(frontmatter)) {
      addError(`${labelFor(filePath)}: template must have frontmatter`);
      return;
    }

    for (const field of Object.keys(schema.shape)) {
      if (!Object.hasOwn(frontmatter, field)) {
        addError(`${labelFor(filePath)}: template must show the ${field} frontmatter field`);
      }
    }

    parseFile(filePath, schema);
    validatedTemplateCount += 1;
  } catch (error) {
    addError(`${labelFor(filePath)}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function cleanAssetPath(value) {
  if (!value.startsWith("/")) return undefined;
  const withoutQuery = value.split(/[?#]/, 1)[0];
  const match = withoutQuery.match(/^\/(images|files|media)\/(.+)$/);
  if (!match) return undefined;
  try {
    return { root: match[1], relativePath: decodeURIComponent(match[2]) };
  } catch {
    return { root: match[1], relativePath: match[2] };
  }
}

function recordAsset(value, filePath) {
  if (typeof value !== "string") return;
  const cleaned = cleanAssetPath(value.trim());
  if (!cleaned) return;
  const key = `${cleaned.root}/${cleaned.relativePath}`;
  const references = assetReferences.get(key) ?? [];
  references.push(labelFor(filePath));
  assetReferences.set(key, references);
}

function scanAssets(filePath, data, body) {
  const scanValue = (value) => {
    if (typeof value === "string") recordAsset(value, filePath);
    else if (Array.isArray(value)) value.forEach(scanValue);
    else if (value && typeof value === "object") Object.values(value).forEach(scanValue);
  };
  scanValue(data);

  // This covers Markdown destinations and raw HTML references. The renderer
  // drops raw HTML, but finding a missing referenced file is still useful to
  // an author (and avoids silently losing a local asset).
  const pattern = /(?:\]\(|(?:src|href)=["'])\s*(\/(?:images|files|media)\/[^\s)"'>]+)/gi;
  for (const match of body.matchAll(pattern)) recordAsset(match[1], filePath);
}

function assetFilePath(root, relativePath) {
  if (!relativePath || path.isAbsolute(relativePath)) return undefined;
  const base = root === "media" ? path.join(CONTENT_ROOT, "media") : path.join(publicRoot, root);
  const candidate = path.resolve(base, relativePath);
  if (candidate !== base && !candidate.startsWith(`${base}${path.sep}`)) return undefined;
  return candidate;
}

function checkAssets() {
  for (const [reference, files] of assetReferences) {
    const slash = reference.indexOf("/");
    const root = reference.slice(0, slash);
    const relativePath = reference.slice(slash + 1);
    const candidate = assetFilePath(root, relativePath);
    if (!candidate) {
      addError(`${files[0]}: local asset path /${reference} escapes its asset root`);
    } else if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) {
      addError(`${files[0]}: local asset /${reference} does not exist`);
    }
  }
}

function validateTemplates() {
  for (const collection of collections) {
    validateTemplate(
      resolveContentPath(collection.name, "__template.md"),
      collection.schema,
    );
  }

  const pagesRoot = resolveContentPath("pages");
  for (const directory of directoriesWithMarkdown(pagesRoot)) {
    validateTemplate(path.join(directory, "__template.md"), pageFrontmatterSchema);
  }
}

function validateCollections() {
  for (const collection of collections) {
    const directory = resolveContentPath(collection.name);
    const indexPath = resolveContentPath(collection.name, "index.md");
    if (!fs.existsSync(indexPath)) addError(`content/${collection.name}/index.md is missing`);
    else {
      const parsed = parseFile(indexPath, collection.indexSchema);
      if (parsed) scanAssets(indexPath, parsed.data, parsed.body);
    }

    let files;
    try {
      // This is deliberately the same item discovery used by the collection
      // loaders; index files, templates, and underscore-prefixed notes are not
      // public collection items.
      files = listMarkdownFiles(directory);
    } catch (error) {
      addError(`content/${collection.name}: ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }

    const slugs = new Set();
    for (const filePath of files) {
      const slug = path.basename(filePath, ".md");
      validateSlug(slug, labelFor(filePath));
      if (slugs.has(slug)) addError(`${labelFor(filePath)}: duplicate collection slug "${slug}"`);
      slugs.add(slug);

      const parsed = parseFile(filePath, collection.schema);
      if (!parsed) continue;
      scanAssets(filePath, parsed.data, parsed.body);
      itemDocuments.get(collection.name).set(slug, { filePath, data: parsed.data, body: parsed.body });
    }
  }
}

function validatePages() {
  const pagesRoot = resolveContentPath("pages");
  if (!fs.existsSync(pagesRoot)) {
    addError("content/pages is missing");
    return;
  }

  const sectionEntries = fs.readdirSync(pagesRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"));
  for (const sectionEntry of sectionEntries) {
    const indexPath = path.join(pagesRoot, sectionEntry.name, "index.md");
    if (!fs.existsSync(indexPath)) addError(`content/pages/${sectionEntry.name}/index.md is missing`);
  }

  for (const filePath of readDirectoryFiles(pagesRoot, true)) {
    const relative = path.relative(pagesRoot, filePath).split(path.sep).join("/");
    const parts = relative.split("/");
    const section = parts[0];
    const filename = parts.at(-1);
    const stem = path.basename(filename, ".md");
    const segments = stem === "index" && parts.length === 2
      ? []
      : [...parts.slice(1, -1), stem];
    const route = `/${[section, ...segments].join("/")}`;
    validateSlug(section, `content/pages/${section}`);
    segments.forEach((segment) => validateSlug(segment, labelFor(filePath)));
    if (pageRoutes.has(route)) addError(`${labelFor(filePath)}: duplicate page route ${route}`);
    pageRoutes.add(route);

    const parsed = parseFile(filePath, pageFrontmatterSchema);
    if (!parsed) continue;
    scanAssets(filePath, parsed.data, parsed.body);
    pageDocuments.set(route, { filePath, data: parsed.data, body: parsed.body, section, segments });
  }
}

function exerciseLoaders() {
  // The per-file parsing above additionally validates templates and hidden
  // authoring files. These calls exercise the public loader paths.
  try {
    getUpcomingEvents();
    getPastEvents();
    getProjects();
    getUpdates();
    getCollectionIndex("events");
    getCollectionIndex("projects");
    getCollectionIndex("updates");
  } catch (error) {
    addError(`Collection loader failed: ${error instanceof Error ? error.message : String(error)}`);
  }

  const itemLoaders = {
    events: getEventBySlug,
    projects: getProjectBySlug,
    updates: getUpdateBySlug,
  };
  for (const [collectionName, documents] of itemDocuments) {
    const load = itemLoaders[collectionName];
    for (const [slug, document] of documents) {
      try {
        const loaded = load(slug);
        if (loaded === undefined) {
          addError(`${labelFor(document.filePath)}: item loader returned no public result for ${slug}`);
        }
      } catch (error) {
        addError(`${labelFor(document.filePath)}: item loader failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }

  for (const page of pageDocuments.values()) {
    try {
      if (!getPageByPath(page.section, page.segments)) {
        addError(`${labelFor(page.filePath)}: page loader returned no public document for ${page.section}/${page.segments.join("/") || "index"}`);
      }
    } catch (error) {
      addError(`${labelFor(page.filePath)}: page loader failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

validateTemplates();
validateCollections();
validatePages();
checkAssets();
if (errors.length === 0) exerciseLoaders();

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} problem(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  const counts = collections.map(({ name }) => `${itemDocuments.get(name).size} ${name}`).join(", ");
  console.log(`Validated ${counts}, ${pageDocuments.size} pages, ${assetReferences.size} local assets, and ${validatedTemplateCount} templates.`);
}
