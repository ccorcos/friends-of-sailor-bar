import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

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
image: "/images/project.jpg"
order: 1
---

Project body.
`;
}

function updateMarkdown(title: string, extra = ""): string {
  return `---
title: ${JSON.stringify(title)}
image: ""
publishedAt: "2099-01-01"
${extra}---

Update body.
`;
}

test("runtime content loading, caching, and validation", async () => {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sailor-content-test-"));
  const originalCwd = process.cwd();

  try {
    fs.mkdirSync(path.join(temporaryRoot, "content", "events"), { recursive: true });
    fs.mkdirSync(path.join(temporaryRoot, "content", "projects"), { recursive: true });
    fs.mkdirSync(path.join(temporaryRoot, "content", "updates"), { recursive: true });
    fs.mkdirSync(path.join(temporaryRoot, "content", "about", "about"), { recursive: true });

    const eventPath = path.join(temporaryRoot, "content", "events", "alpha.md");
    fs.writeFileSync(eventPath, eventMarkdown("Alpha"));
    fs.writeFileSync(path.join(temporaryRoot, "content", "events", "index.md"), "---\ntitle: Events\n---\n\nIndex body.\n");
    fs.writeFileSync(path.join(temporaryRoot, "content", "events", "__template.md"), eventMarkdown("Template"));
    fs.writeFileSync(path.join(temporaryRoot, "content", "projects", "project.md"), projectMarkdown("Project"));
    fs.writeFileSync(path.join(temporaryRoot, "content", "projects", "index.md"), "---\ntitle: Projects\n---\n");
    fs.writeFileSync(path.join(temporaryRoot, "content", "updates", "update.md"), updateMarkdown("Update"));
    fs.writeFileSync(path.join(temporaryRoot, "content", "about", "about", "index.md"), "---\ntitle: About\nimage: \"\"\norder: 1\n---\n\nAbout body.\n");
    fs.writeFileSync(path.join(temporaryRoot, "content", "about", "about", "visit.md"), "---\ntitle: Visit\nimage: \"\"\norder: 2\n---\n\nVisit body.\n");

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

    fs.writeFileSync(
      path.join(temporaryRoot, "content", "events", "video.md"),
      eventMarkdown("Video", {
        body: "[Watch the river video](https://youtu.be/JtPuMxViJvc)\n\nRead the [video notes](https://www.youtube.com/watch?v=JtPuMxViJvc).",
      }),
    );
    const video = content.getEventBySlug("video");
    assert.ok(video);
    assert.match(video.html, /class="video-embed"/);
    assert.match(video.html, /<iframe[^>]+youtube-nocookie\.com\/embed\/JtPuMxViJvc/);
    assert.match(video.html, /title="Watch the river video"/);
    assert.match(video.html, /<a href="https:\/\/www\.youtube\.com\/watch\?v=JtPuMxViJvc">video notes<\/a>/);
    fs.unlinkSync(path.join(temporaryRoot, "content", "events", "video.md"));

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
    fs.writeFileSync(
      path.join(temporaryRoot, "content", "projects", "removed-media-path.md"),
      projectMarkdown("Removed media path").replace("/images/project.jpg", "/media/project.jpg"),
    );
    assert.throws(() => content.getProjectBySlug("removed-media-path"), /Assets must use \/images or \/files/);
    assert.equal(content.getUpdates()[0].title, "Update");
    assert.equal(content.getCollectionIndex("projects")?.title, "Projects");
    assert.equal(content.getPageByPath("about")?.href, "/about");
    assert.deepEqual(content.getPageNavigation("about").map((item: { href: string }) => item.href), ["/about/visit"]);

    fs.writeFileSync(path.join(temporaryRoot, "content", "projects", "removed-field.md"), projectMarkdown("Removed field").replace("order: 1\n", "order: 1\nsummary: \"Removed\"\n"));
    assert.throws(() => content.getProjectBySlug("removed-field"), /Invalid frontmatter/);
    fs.writeFileSync(path.join(temporaryRoot, "content", "updates", "removed-field.md"), updateMarkdown("Removed field", "excerpt: \"Removed\"\n"));
    assert.throws(() => content.getUpdateBySlug("removed-field"), /Invalid frontmatter/);

    assert.equal(content.getSailorBarDate(new Date("2026-09-03T12:00:00Z")), "2026-09-03");
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
});
