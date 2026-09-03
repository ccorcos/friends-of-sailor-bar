# Runtime media

Place newly editable images and PDFs here and reference them as `/media/<path>` from Markdown frontmatter or bodies.

Files are served by `app/media/[...path]/route.ts` without a Next.js rebuild or service restart. Existing immutable assets may remain under `public/images` and `public/files`.
