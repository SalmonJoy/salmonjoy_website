# Salmon Joy — AI, made practical

Astro static website with TypeScript, GSAP ScrollTrigger, and a deferred Three.js companion. All content is rendered as HTML. No backend, enquiry storage, analytics, or live AI API.

## Development

`npm run dev` starts Astro. `npm run check` checks TypeScript and Astro templates. `npm run build` produces `dist/`. Use the Sites build helper when preparing a deployment.

Content is in `src/data/content.ts` and `src/pages/index.astro`. Authentic local photographs are in `public/images`; provenance is in the parent research folder. Three historical PDFs retain their original paths.

Nori uses one WebGL renderer, progressively loaded after the essential content. The SVG fallback remains usable with reduced motion or failed WebGL. Motion preference is the only local-storage value. Workshop finder and message builder keep entries in memory until navigation/reload.

## Launch

The current release targets an owner-private Sites preview. Canonical metadata and sitemap target `https://salmonjoy.com`. Production domain cutover requires visual approval, preservation of existing mail DNS and PDF paths, an apex canonical with `www` redirect, and retention of the previous deployment for rollback. Do not change domain records as part of preview publication.
