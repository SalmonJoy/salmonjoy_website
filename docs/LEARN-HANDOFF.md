# Learn GenAI with Salmon — local review release

Prepared 3 November 2026. This release is local only. It has not been deployed, committed or pushed.

## Focused activity redesign

The 3 November redesign uses one centred reading path: instruction, one visual, one decision, short feedback, then Continue. The 17 topic groups contain 32 smaller beats. Each beat has at most three choices, which collapse after selection. Optional detail follows the primary navigation. Recap and training enquiries appear after completion or Skip to recap.

Original SVG illustrations are part of the activity: a dog in a park or space cartoon, source-note-to-action diagrams, and policy/context cards. Nori stays small and quiet. Only changed objects animate, for 350 ms. There is no automatic progression or whole-stage animation.

The focused release packages are `salmonjoy-learn-focus-2026-11-03-source.zip`, `salmonjoy-learn-focus-2026-11-03-hostinger-review.zip` and `salmonjoy-learn-focus-2026-11-03-review-kit.zip`. Earlier packages remain available for rollback.

## What is included

- `/learn/` — the three-lesson hub.
- `/learn/how-ai-makes-an-answer/` — six beginner activities covering context, tokens, variation and unsupported claims.
- `/learn/give-ai-a-proper-brief/` — five business activities covering source-based briefs, evidence checks and a reusable prompt.
- `/learn/fix-the-rag-bot/` — six developer activities covering retrieval, eligibility context, citation support, missing information and three evaluation fixtures.

Each lesson has Back, Continue, direct step selection, Replay, Restart, explanatory retries, takeaways and related training links. The business enquiry selects AI at Work; the developer enquiry selects Build with GenAI. The ordinary floating companion and bottom contact bar are absent from lessons. The existing homepage teaching demonstration remains, with a link to Learn beneath it.

The starting activity and complete reading walkthrough are rendered by Astro. If scripting fails, the initial activity is inert and the complete walkthrough stays open. With JavaScript disabled, the interactive shell is hidden. Reusable prompt text, the fictional corpus, fixture traces and conceptual pseudocode also have static reading versions. Lesson progress is in memory only; refresh restarts it. The existing motion preference is the only persistent browser setting. No API, narration, account, analytics or learner data storage was added.

## Local review

From the repository root, using Node 22.19+ within the Node 22 line:

```powershell
npm ci --include=dev
$env:SITE_THEME = 'graphite'
$env:ARTICLE_PUBLISH_DATE = '2026-11-02'
Remove-Item Env:LESSON_PUBLISH_DATE -ErrorAction SilentlyContinue
npm run check
npm run build
npm run verify
npm run preview -- --port 4335
```

Use the existing `http://127.0.0.1:4335/learn/` preview. Do not start another server while it is running. If it has stopped, the command above restores the same port; do not accept a fallback port or run multiple instances. The owner requested this single preview remain running. The article date above preserves the date used in this review build; retain the site's actual original article date if your deployment record differs.

The review ZIP contains the complete static site, with no invented lesson publication date. The source ZIP excludes dependencies, build caches and Git history. The review kit includes source and static ZIPs, screenshots, test output and Lighthouse HTML/JSON reports. Previous packages remain untouched for rollback.

## Publication date and owner deployment

Use [DEPLOYMENT.md](../DEPLOYMENT.md) for the full Hostinger procedure. On the day the lessons actually become public, set `LESSON_PUBLISH_DATE` to that date and rebuild. Keep it unchanged on subsequent builds. This supplies the visible lesson date, `LearningResource.datePublished` and sitemap date. Dates must be real calendar dates in `YYYY-MM-DD` format. Omit the variable for an undated private preview.

```powershell
$env:LESSON_PUBLISH_DATE = Read-Host 'Actual first public lesson date (YYYY-MM-DD)'
npm run build
npm run verify
```

For Bash, use `export LESSON_PUBLISH_DATE=YYYY-MM-DD` with the actual date. The original article date is independent; do not replace it with the lesson date. If the lessons later launch on different dates, move publication dates into their individual typed records instead of using one release date.

Upload the entire new `dist/` release, preserving `_astro/`, `images/`, all existing routes and all three PDF paths. No new server route handler or backend is needed. Keep the old release available for rollback. After activation, verify all four `/learn/` URLs return 200, unknown routes return 404, the sitemap contains the new pages, and HTTPS/canonical redirects still work. Submit the updated sitemap through the owner's existing search tools when ready.

## Content and implementation map

| File | Purpose |
| --- | --- |
| `src/data/lesson-meta.json` | Shared route, title, audience and social-card metadata |
| `src/data/lessons.ts` | Typed lessons, teaching copy, static walkthroughs, sources and related training |
| `src/data/lesson-fixtures.ts` | Fictional notes, policies, token pieces, reusable brief and pseudocode |
| `src/data/lesson-beats.ts` | Typed focused instructions and authored answer branches |
| `src/scripts/lesson-flow.ts` | Pure beat state, dependency invalidation and fixture repairs |
| `src/scripts/lesson-engine.ts` | Predetermined evaluation fixtures and static trace support |
| `src/scripts/lesson-visuals.ts` | Original SVG scenes and source-to-output diagrams |
| `src/scripts/lesson-scenes.ts` | Rendered activity choices, evidence and feedback |
| `src/scripts/lesson-runtime.ts` | Navigation, focus, copy fallback and cancellable action animations |
| `src/scripts/lesson-shell.ts` | Lightweight navigation, motion and contact controls without Three.js/GSAP |
| `src/components/LessonActivity.astro` | Server-rendered activity and complete reading alternatives |
| `src/styles/lessons.css` | Responsive layout and SVG props using the existing theme tokens |
| `scripts/verify-lessons.mjs` | State, fixture, reading-fallback, route and schema checks |

Selecting an answer updates state before rendering and animation. New actions cancel pending animations. Pause/reduced motion skips animation while retaining state changes. There are no animation-based completion callbacks or automatic advancement. Candidate bars and all responses are labelled authored illustrations, not model probabilities, confidence, benchmarks or live generation.

## Validation and limits

- `npm run check`, `npm run build` and `npm run verify` pass. The build has 19 HTML pages, 18 indexable routes and 85 linked structured-data entities.
- All 32 beats were checked before and after a choice at 360, 390, 768, 1024, 1366 and 1440 CSS pixels: 384 combinations, no horizontal page overflow or Nori/title overlap. Representative mobile and desktop scenes were visually inspected and iterated.
- Correct and incorrect choices, retries, state-preserving Back/revisit, Replay, Restart, token bounds, rapid input and evaluation invalidation were checked. Unit checks cover 58 choice branches and all eight RAG repair-setting combinations, including dependency invalidation and skipped-claim handling.
- Browser checks cover prompt copying, clipboard-denied manual selection, script-blocked reading, keyboard activation/focus, menu Escape/focus return, polite feedback regions, motion pause and local enquiry preparation. No email or WhatsApp message was sent.
- Lesson network reports load only the shared bootstrap, lesson shell and enquiry helper: no Three.js, GSAP or WebGL scene. Three page-specific social graphics, breadcrumbs, canonical URLs, LearningResource markup, internal links and sitemap coverage pass validation.
- Mobile Lighthouse results and screenshots are in the accompanying review kit under `qa/lessons-focus-2026-11-03/`. These are local lab measurements, not field performance or a guarantee about a deployed server.
- Physical iPhone Safari, Android Chrome, their keyboards, native desktop 200% zoom and human screen-reader review remain owner sign-off checks. The 5–8 minute estimate is a design target, not a measured completion-time study.

The original local review packages and Lighthouse reports used Astro 5.18.2 and an older build toolchain with five reported advisories. Before pushing these lessons, the repository was reconciled with the owner's existing GitHub upgrade: Astro 7.3.8, sharp 0.35.5 and the updated Astro CLI path. Those upgrades are preserved, alongside esbuild 0.28.2 for lesson verification. The merged dependency audit reports zero vulnerabilities at this check. Build from the current GitHub source for deployment; the earlier ZIPs remain historical review/rollback artifacts.

Use Node 22.19+ in the Node 22 line or a compatible newer supported release. The merged source is validated with Node 24.22.1; Node 20 is not supported by this upgraded framework. The deployable output remains static HTML/CSS/JS/assets and does not run Astro or image processing on the production server. Do not use the development/preview server as production hosting.
