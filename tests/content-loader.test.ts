import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import { NextRequest } from "next/server";

const repositoryRoot = process.cwd();

function eventMarkdown(title: string, options: { body?: string; extra?: string } = {}): string {
  return `---
title: ${JSON.stringify(title)}
date: "2099-01-01"
time: "9:00 AM"
location: "Sailor Bar"
${options.extra ?? ""}---

${options.body ?? "**Safe Markdown** [Details](/details) <script>alert('unsafe')</script>"}
`;
}

function projectMarkdown(title: string): string {
  return `---
title: ${JSON.stringify(title)}
shortTitle: ${JSON.stringify(title)}
summary: "A test project."
image: "/media/project.jpg"
status: "planning"
order: 1
featured: true
draft: false
---

Project body.
`;
}

test("runtime content loading, caching, validation, and media serving", async () => {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sailor-content-test-"));
  const originalCwd = process.cwd();

  try {
    fs.mkdirSync(path.join(temporaryRoot, "content", "events"), { recursive: true });
    fs.mkdirSync(path.join(temporaryRoot, "content", "projects"), { recursive: true });
    fs.mkdirSync(path.join(temporaryRoot, "content", "updates"), { recursive: true });
    fs.mkdirSync(path.join(temporaryRoot, "content", "pages", "about"), { recursive: true });
    fs.mkdirSync(path.join(temporaryRoot, "content", "media", "events"), { recursive: true });

    const eventPath = path.join(temporaryRoot, "content", "events", "alpha.md");
    fs.writeFileSync(eventPath, eventMarkdown("Alpha"));
    fs.writeFileSync(path.join(temporaryRoot, "content", "events", "index.md"), "---\ntitle: Events\n---\n\nIndex body.\n");
    fs.writeFileSync(path.join(temporaryRoot, "content", "events", "__template.md"), eventMarkdown("Template"));
    fs.writeFileSync(path.join(temporaryRoot, "content", "projects", "project.md"), projectMarkdown("Project"));
    fs.writeFileSync(path.join(temporaryRoot, "content", "projects", "index.md"), "---\ntitle: Projects\ndraft: false\n---\n");
    fs.writeFileSync(path.join(temporaryRoot, "content", "pages", "about", "index.md"), "---\ntitle: About\ndescription: About page\nnavTitle: About\nnavOrder: 1\ndraft: false\n---\n\nAbout body.\n");
    fs.writeFileSync(path.join(temporaryRoot, "content", "pages", "about", "visit.md"), "---\ntitle: Visit\ndescription: Visit page\nnavTitle: Visit\nnavOrder: 2\ndraft: false\n---\n\nVisit body.\n");

    process.chdir(temporaryRoot);
    const loaderUrl = pathToFileURL(path.join(repositoryRoot, "lib", "content", "index.ts")).href;
    const content = await import(loaderUrl);

    const initial = content.getUpcomingEvents();
    assert.deepEqual(initial.map((event: { slug: string }) => event.slug), ["alpha"]);
    assert.match(initial[0].html, /href="\/details"/);
    assert.match(initial[0].html, /<strong>Safe Markdown<\/strong>/);
    assert.doesNotMatch(initial[0].html, /<\/?script(?:\s|>)/i);

    fs.writeFileSync(
      path.join(temporaryRoot, "content", "events", "unsafe-link.md"),
      eventMarkdown("Unsafe link", { body: "[Unsafe](javascript:alert(1)) ![Unsafe image](javascript:alert(2))" }),
    );
    const unsafeLink = content.getEventBySlug("unsafe-link");
    assert.ok(unsafeLink);
    assert.doesNotMatch(unsafeLink.html, /javascript:/i);
    fs.unlinkSync(path.join(temporaryRoot, "content", "events", "unsafe-link.md"));

    const removedDraftFieldPath = path.join(temporaryRoot, "content", "events", "draft.md");
    fs.writeFileSync(removedDraftFieldPath, eventMarkdown("Draft", { extra: "draft: true\n" }));
    assert.throws(() => content.getEventBySlug("draft"), /Invalid frontmatter/);
    fs.unlinkSync(removedDraftFieldPath);
    assert.doesNotThrow(() => content.getUpcomingEvents());
    assert.equal(content.getEventBySlug("index"), undefined);

    fs.writeFileSync(eventPath, eventMarkdown("Alpha changed"));
    assert.equal(content.getEventBySlug("alpha")?.title, "Alpha changed");

    fs.writeFileSync(path.join(temporaryRoot, "content", "events", "new-event.md"), eventMarkdown("New event"));
    assert.deepEqual(content.getUpcomingEvents().map((event: { slug: string }) => event.slug), ["alpha", "new-event"]);
    fs.unlinkSync(eventPath);
    assert.deepEqual(content.getUpcomingEvents().map((event: { slug: string }) => event.slug), ["new-event"]);

    const malformedPath = path.join(temporaryRoot, "content", "events", "malformed.md");
    fs.writeFileSync(malformedPath, eventMarkdown("Malformed", { extra: "slug: forbidden\n" }));
    assert.throws(() => content.getEventBySlug("malformed"), /Invalid frontmatter/);
    fs.writeFileSync(malformedPath, eventMarkdown("Repaired"));
    assert.equal(content.getEventBySlug("malformed")?.title, "Repaired");

    fs.writeFileSync(path.join(temporaryRoot, "content", "events", "heading.md"), eventMarkdown("Heading", { body: "# Duplicate title" }));
    assert.throws(() => content.getEventBySlug("heading"), /Invalid Markdown content/);
    assert.throws(() => content.getEventBySlug("../outside"), /Invalid event slug/);

    const outsideMarkdown = path.join(temporaryRoot, "outside.md");
    fs.writeFileSync(outsideMarkdown, eventMarkdown("Outside"));
    fs.symlinkSync(outsideMarkdown, path.join(temporaryRoot, "content", "events", "link.md"));
    assert.throws(() => content.getEventBySlug("link"), /escapes the content root/);

    assert.equal(content.getProjects()[0].title, "Project");
    assert.equal(content.getCollectionIndex("projects")?.title, "Projects");
    assert.equal(content.getPageByPath("about")?.href, "/about");
    assert.deepEqual(content.getPageNavigation("about").map((item: { href: string }) => item.href), ["/about/visit"]);
    assert.equal(content.getSailorBarDate(new Date("2026-09-03T12:00:00Z")), "2026-09-03");

    const mediaPath = path.join(temporaryRoot, "content", "media", "events", "test.png");
    fs.writeFileSync(mediaPath, Buffer.from([0x89, 0x50, 0x4e, 0x47]));
    const routeUrl = pathToFileURL(path.join(repositoryRoot, "app", "media", "[...path]", "route.ts")).href;
    const route = await import(routeUrl);
    const context = { params: Promise.resolve({ path: ["events", "test.png"] }) };
    const response = await route.GET(new NextRequest("http://localhost/media/events/test.png"), context);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "image/png");
    assert.equal((await response.arrayBuffer()).byteLength, 4);

    const etag = response.headers.get("etag");
    assert.ok(etag);
    const notModified = await route.GET(
      new NextRequest("http://localhost/media/events/test.png", { headers: { "if-none-match": etag } }),
      context,
    );
    assert.equal(notModified.status, 304);

    fs.writeFileSync(path.join(temporaryRoot, "content", "media", "events", "new.pdf"), "new file");
    const newFile = await route.GET(
      new NextRequest("http://localhost/media/events/new.pdf"),
      { params: Promise.resolve({ path: ["events", "new.pdf"] }) },
    );
    assert.equal(newFile.status, 200);
    assert.equal(newFile.headers.get("content-type"), "application/pdf");

    fs.writeFileSync(path.join(temporaryRoot, "content", "media", "secret.md"), "secret");
    const disallowed = await route.GET(
      new NextRequest("http://localhost/media/secret.md"),
      { params: Promise.resolve({ path: ["secret.md"] }) },
    );
    assert.equal(disallowed.status, 404);

    const outsidePdf = path.join(temporaryRoot, "outside.pdf");
    fs.writeFileSync(outsidePdf, "outside");
    fs.symlinkSync(outsidePdf, path.join(temporaryRoot, "content", "media", "outside.pdf"));
    const escapedMedia = await route.GET(
      new NextRequest("http://localhost/media/outside.pdf"),
      { params: Promise.resolve({ path: ["outside.pdf"] }) },
    );
    assert.equal(escapedMedia.status, 404);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
});
