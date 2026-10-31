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

- Owner review of the private preview before replacing salmonjoy.com, as specified in the approved delivery plan.
- Real iPhone Safari and Android Chrome checks, including their on-screen keyboards and a mid-range phone performance pass. Chrome viewport testing is not a substitute for those physical-device checks.
- Native browser 200% zoom was not verifiably changed through the available controls; narrow-viewport reflow checks passed, but an actual zoom check remains.
- Domain cutover, apex/www redirect, existing email DNS preservation, and live-domain smoke checks remain part of the approved-launch stage. No DNS records have been changed. The old deployment remains available.
