# Salmon Joy — AI, made practical

Astro static website with TypeScript, GSAP ScrollTrigger, and a deferred Three.js companion. All content is rendered as HTML. No backend, enquiry storage, analytics, or live AI API.

## Development

`npm run dev` starts Astro. `npm run check` checks TypeScript and Astro templates. `npm run build` produces `dist/`. `npm run verify` validates the generated pages, metadata, JSON-LD, links and sitemap. Deployment remains an owner action.

Content is in `src/data/` (services, articles, projects, case details and shared SEO metadata) and `src/pages/index.astro`. Authentic local photographs are in `public/images`; provenance is in the parent research folder. Three historical PDFs retain their original paths.

Nori uses one WebGL renderer, progressively loaded after the essential content. The SVG fallback remains usable with reduced motion or failed WebGL. Motion preference is the only local-storage value. Workshop finder and message builder keep entries in memory until navigation/reload.

## Launch

The owner approved the private Sites preview and will deploy the production build to their existing Hostinger server. No further deployment is authorized. Canonical metadata and sitemap target `https://salmonjoy.com`. Upload the contents of `dist/` to the configured website document root; the production site needs only a static web server, with no Node.js process or application backend. Preserve all paths, including the three legacy PDFs and `_astro/` assets. Configure HTTPS and a server-level `www` redirect to the apex, retaining the previous deployment for rollback and preserving mail DNS. Physical-device and native 200% zoom checks are deferred to the owner; see `QA.md`.

## SEO release

See [SEO-HANDOFF.md](docs/SEO-HANDOFF.md) for publication dates, Hostinger/Nginx migration, Search Console, Bing, crawlers and optional manual IndexNow. See [CONTENT-AND-AUTHORITY.md](docs/CONTENT-AND-AUTHORITY.md) for the keyword map, four future article briefs, profile copy and unsent outreach drafts. The measurement workbook accompanies the handoff kit. No visitor analytics was added.

## Graphite visual release

The selected default is Graphite + Burgundy. See [THEME-DECISION.md](docs/THEME-DECISION.md) for comparison scores, palette tokens and reproduction commands. Use Node.js 22.19 or newer. Set SITE_THEME to graphite, navy or copper for isolated local comparisons; omit it for the final default. npm run build also generates matching article and social images. npm run verify includes theme consistency and contrast checks.

The new salmonjoy-graphite-hostinger.zip and salmonjoy-graphite-handoff.zip supersede the earlier ZIPs, which remain rollback copies. The local comparison gallery is separate from the public build.
