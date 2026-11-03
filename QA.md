# Current verification — focused lessons, 3 November 2026

The latest lesson redesign uses a single reading path, integrated SVG scenes, 32 focused beats and a collapsed outline. Optional detail follows Continue. Recap/contact content appears after completion or Skip to recap. Earlier release reports below are historical.

Before pushing, the lesson commit was rebased onto the owner's existing Astro 7.3.8 / sharp 0.35.5 upgrade. The merged source passes check, build and verification under Node 24.22.1, and its dependency audit reports zero vulnerabilities. The screenshot and Lighthouse evidence describes the original local review build; those audits were not repeated for the dependency reconciliation. Use the current GitHub source for a new deployment rather than the older review ZIPs.

- Final check/build/verification pass: 49 checked files, no diagnostics, 19 HTML pages, 18 indexable routes, 85 structured entities, 21 projects and three legacy PDFs.
- Automated branch tests: 58 choice branches, eight RAG evaluation-setting combinations, state isolation, dependency invalidation, skipped-claim handling and fixture repairs.
- Browser layout checks: all 32 beats before/after a choice at 360, 390, 768, 1024, 1366 and 1440 CSS pixels (384 combinations), with no horizontal page overflow or Nori/title overlap. Desktop/mobile screenshots were inspected and the interface refined.
- Complete journeys, retries, Back, outline navigation, Escape, Restart, Replay, rapid token input, prompt-copy success/fallback, script-blocked reading, motion controls and training enquiry preparation were exercised.
- Final mobile Lighthouse: beginner 99, business 100, developer 99, homepage 97 for performance; accessibility, best practices and SEO 100 on all four. LCP 1.60–1.66 seconds, CLS 0. These are local lab results.
- Evidence: `qa/lessons-focus-2026-11-03/` in the review kit. See [lesson handoff](docs/LEARN-HANDOFF.md) for reproduction and publication settings.

Only the existing local preview on port 4335 is retained. Nothing was deployed or pushed. Physical phones, native 200% zoom and human screen-reader testing remain owner sign-off checks. This is a design review, not a measured learner study. Existing toolchain advisory details remain in the handoff.

# Historical: Graphite release verification - 1 November 2026

Selected Graphite + Burgundy after comparing three complete local builds. See [theme decision](docs/THEME-DECISION.md). Nothing was deployed; earlier releases and the private Sites preview remain unchanged.

## Current validation

- Astro: 35 files, zero errors, warnings or hints. Production and all three comparison builds succeed.
- Static checks: 15 HTML pages, 14 indexable URLs, 66 JSON-LD entities, unique canonicals, sitemap coverage, internal links and anchors pass. All 21 projects, three featured routes and three legacy PDFs retained.
- Shared semantic colours cover page text, controls, diagrams, SVG and Three.js Nori. Key text, focus and control contrast pairs pass for all three palettes; the lowest checked text ratio is 4.54:1 (copper). All final HTML and generated graphics select graphite. No old serif font or rose palette remains in code-generated assets.
- Estimated compressed HTML/CSS/fonts/portrait and all deferred JavaScript: 341,409 bytes, excluding lower-page images and PDFs. Three.js remains deferred.

## Current mobile Lighthouse lab results

Lighthouse 12.8.2, local production preview, simulated mobile throttling. These are lab measurements, not field Core Web Vitals or ranking predictions.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| home | 97 | 100 | 100 | 100 | 1.68 s | 0 | 93 ms |
| service | 98 | 100 | 100 | 100 | 1.21 s | 0 | 16 ms |
| article | 100 | 100 | 100 | 100 | 1.52 s | 0 | 0 ms |

A separate desktop audit with WebGL disabled and reduced motion forced scored 100 accessibility and 100 best practices, with no runtime error or console errors.

## Current browser and visual checks

- Comparable screenshots at 1440 and 390 px for all three palettes: hero, teaching, training, enquiry, service, article and project; additional desktop architecture views. Motion paused for comparison. Representative images across every palette inspected; strengthened form borders are reflected in the final gallery.
- Final homepage at 360, 390, 768, 1024, 1366 and 1440 px: no horizontal, heading, reading-text or form overflow. Thirteen inner pages checked at 360, 768 and 1440 px: no horizontal overflow.
- Mobile menu: keyboard opening, visible focus, focus containment, Escape dismissal and focus return pass. Dark-section focus uses steel; light sections use burgundy.
- All three Nori workshop-finder audiences select the correct track. Selected team size and learning goal carry into the contact form. Mobile enquiry preparation preserves Unicode punctuation and ampersands; WhatsApp encoding and copy-message action pass. No external message sent.
- Desktop Three.js Nori and palette materials inspected; teaching controls and sticky scene work. Motion pause removes sticky behaviour and trail. Paused reload presents the SVG companion.
- With scripts blocked, service copy, native FAQ keyboard disclosure and direct contact fallback remain usable.
- Final article images and portrait-led social image inspected. Comparison gallery image references and desktop/mobile selections verified.

## Remaining owner checks

Physical iPhone Safari, Android Chrome with the keyboard open, native desktop 200% zoom and field performance remain deferred. Public-server redirects, response codes, compression/cache configuration, historical-PDF noindex headers and crawler access require post-deployment checks. Assign truthful article publication dates when releasing; see docs/SEO-HANDOFF.md. No DNS, account, crawler submission or outreach action was performed.

Current evidence is in the parent qa/theme-comparison folder and the graphite handoff kit. Historical QA follows and describes earlier releases.

---

# SEO release verification ? 1 November 2026

This local production build extends the approved design. No deployment, DNS/account change, outreach, analytics installation or IndexNow submission was performed. The existing private Sites preview has not been updated for this SEO release.

## Automated checks

- Astro check: 32 files, zero errors, warnings or hints. Static build succeeds.
- 15 HTML pages: 14 indexable pages plus a noindex 404. Metadata, canonical uniqueness, JSON-LD syntax and linked entity identifiers, visible dates when supplied, breadcrumbs, internal links/anchors and sitemap coverage pass.
- All 21 project entries and three existing featured routes retained. All three PDF paths return HTTP 200 locally; missing paths return HTTP 404.
- Search crawling remains allowed by the existing robots policy. No new analytics script or model-training policy change.
- IndexNow dry-run only: nothing sent. Public key creation and submission remain explicit owner actions.
- Compressed HTML/CSS/fonts/portrait and all deferred JavaScript estimate: 375,107 bytes, excluding lower-page images and PDFs. Existing deferred Three.js bundle warning remains; the 3D code is not the initial mobile rendering path.

## Mobile Lighthouse lab results

Lighthouse 12.8.2, local production preview, simulated mobile throttling. These are lab measurements, not field Core Web Vitals or ranking predictions.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| home | 97 | 100 | 100 | 100 | 1.83 s | 0 | 60 ms |
| training | 98 | 100 | 100 | 100 | 1.37 s | 0 | 44 ms |
| article | 97 | 100 | 100 | 100 | 1.82 s | 0 | 86 ms |

## Browser checks

- Homepage screenshots inspected at CSS widths 360, 390, 768, 1024, 1366 and 1440; no horizontal overflow. Burgundy/ivory composition, portrait and Nori remain intact.
- All eight new pages and three enriched case-study pages checked at 390 px: no horizontal overflow or failed images. Representative desktop service and article layouts inspected, including reading content and article navigation.
- All three service enquiry actions reach #contact with the correct work/build/teach selection. Mobile message preparation preserves punctuation and selected track; no external message sent.
- Article contents links work. With script execution blocked through a local CSP, service text, native FAQ disclosure, article sections and author content remain readable; direct contact fallback is visible. Native FAQ keyboard activation works.
- Measurement workbook: four sheets rendered and inspected; guarded CTR formulas tested for normal, zero and blank inputs. No fabricated observations or enquiries.

## Owner checks before and after deployment

Physical iPhone Safari, Android Chrome with the keyboard open, native desktop 200% zoom and real device performance remain deferred. This environment's Chrome viewport checks do not establish those results. Nginx example is guidance, not a server-tested installed configuration. Owner must merge real TLS/root directives, run nginx -t, and verify live HTTPS/redirects, historical-PDF noindex headers, 404 status, crawling/security and search-tool verification after deployment.

Set truthful first-publication dates on release; the current build intentionally omits unknown dates. Review the new article voice before publishing. Source links and reported case metrics retain their limitations; no direct OpenAI employment is claimed.

Detailed reports and screenshots are in the parent qa/seo directory. Earlier design QA below is retained as historical evidence.

---

# Preview verification

Verified against the local production build on Windows/Chrome, 31 October 2026.

## Content and functionality

- Nine narrative sections, 21 library projects, three featured case-study routes, and privacy page.
- Original PDF paths preserved and file signatures verified.
- All local page, asset, and download targets checked by `node scripts/verify.mjs`.
- Business, engineering, and educator finder paths verified in the browser. Audience, team size, and learning goal carry into the enquiry.
- Email and WhatsApp encoding checked with apostrophes, Unicode quotes, ampersands, plus signs, percentages, and multiline text. Message review does not send anything.
- Clipboard copy verified against the prepared message.
- All seven project filters verified; category counts are 6, 2, 1, 3, 4, and 5, with 21 in All.
- Menu keyboard focus stays within the native dialog. Escape closes it and restores focus to the opener.
- Demonstration step buttons and scroll progression checked; desktop teaching stage sticks at 40 px and engineering stage at 70 px.
- Motion control, SVG fallback, script-blocked contact fallback, and failed-image layout preservation checked. A separate desktop Lighthouse run with WebGL disabled completed without a runtime error and scored 100 for accessibility.

## Visual and responsive review

Reviewed the hero, metrics, teaching panels, training panels, case studies, authentic photography, biography/timeline, newsletter, contact form, and mobile navigation. Fixed image intrinsic-height cropping, tablet caption collisions, short-window hero spacing, initial reading sizes, and guide hit-target overlap.

CSS viewport widths 360, 390, 768, 1024, 1366, and 1440 passed horizontal-overflow checks. Main reading copy is 16 px or larger. Phones and tablets use an animated SVG Nori; desktop uses deferred Three.js, with a static fallback for reduced motion or unavailable graphics. The guide remains functional in either rendering mode.

## Measured performance

Lighthouse 12.8.2 mobile lab audit on the optimized production build:

| Measure | Result |
| --- | ---: |
| Performance | 97 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| Largest contentful paint | 1.83 s |
| Cumulative layout shift | 0 |
| Total blocking time | 49 ms |

The initial client script is about 4.7 KB gzipped. Estimated compressed HTML, CSS, fonts, portrait, and all deferred JavaScript together are approximately 373 KB; lower-page photos and PDF downloads are excluded from that estimate. Reports and screenshots are in the parent `qa/` folder. These are lab results, not field measurements.

## Remaining launch gates

- Owner approved the private preview design on 31 October 2026.
- Real iPhone Safari and Android Chrome checks, including their on-screen keyboards and a mid-range phone performance pass. Chrome viewport testing is not a substitute for those physical-device checks.
- Native browser 200% zoom was not verifiably changed through the available controls; narrow-viewport reflow checks passed, but an actual zoom check remains.
- The owner will deploy to the existing Hostinger server and explicitly requested no deployment now. Domain cutover, apex/www redirect, and live-domain smoke checks are handed over to the owner. Existing website routing and email DNS are preserved. A temporary Sites verification TXT record was added and then removed when the hosting preference changed; the complete DNS table was verified identical to its original state. Both pending Sites custom-domain associations were removed. The old deployment remains available.


## Learn GenAI release ? 3 November 2026

Three standalone lessons and their hub are implemented. The final check/build/verification run passes: 46 checked source files, 19 HTML pages, 18 indexable routes, 85 structured entities, 21 projects and all three legacy PDFs. The new verifier covers 17 lesson steps and all eight RAG repair combinations.

Final local Lighthouse 12.8.2 mobile results:

| Page | Performance | Accessibility | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: |
| answer | 98 | 100 | 1.70 s | 0 | 0 ms |
| brief | 98 | 100 | 1.77 s | 0 | 0 ms |
| rag | 97 | 100 | 1.61 s | 0 | 0 ms |
| hub | 97 | 100 | 1.57 s | 0 | 39 ms |
| home | 95 | 100 | 1.85 s | 0 | 154 ms |

All five pages scored 100 for best practices and SEO. These reports use the final lesson-shell.CgvOsfLv.js build. Scores vary between lab runs; the final homepage remains above the 90 performance target. No field or physical-device result is claimed.

Browser testing exercised all 17 steps at each of 360, 390, 768, 1024, 1366 and 1440 CSS pixels (102 combinations), without horizontal page overflow or overlap between Nori's header area and activity evidence. Correct/incorrect choices, retries, Back, direct revisits, Replay, Restart, sequential rapid token input, final-token focus, takeaways focus, evaluation reset and clipboard denial were checked. Keyboard focus has a visible solid outline; Escape closes the menu and returns focus to its opener. Incorrect-answer explanations update a polite live region. Script-blocked pages expose the complete walkthrough, source corpus and direct contact links. Motion pause preserves state without animation; the same animation guard also respects prefers-reduced-motion.

The lessons load the small shared bootstrap, lesson shell and enquiry helper, with no Three.js, GSAP or canvas. The original homepage still loads its deferred companion. Email/WhatsApp URLs were inspected with fictional local form data; no message was sent. Business and developer lessons preselect their appropriate training tracks.

Reports, screenshots and the 102-row responsive log are in the accompanying review kit under qa/. See [LEARN-HANDOFF.md](docs/LEARN-HANDOFF.md) for reproduction and publication settings. Physical phones, native 200% zoom and a human screen-reader pass remain owner sign-off checks. The inherited build-tool dependency audit is not clean; details and the separate framework-upgrade recommendation are recorded in that handoff.
