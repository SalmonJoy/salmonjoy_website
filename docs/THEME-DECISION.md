# Theme comparison and final choice

Selected: **Graphite + Burgundy**, 1 November 2026.

The graphite background gives the portrait room to stand out. Burgundy remains a recognisable personal detail in buttons, Nori's collar and light-page accents. Neutral steel highlights, upright Manrope headings and quieter diagrams create the technical character without making the site impersonal.

Midnight + Steel Blue is the most immediately associated with software, but its blue buttons and companion compete with the burgundy portrait and feel less specific to Salmon. Charcoal + Copper is distinctive and readable, but its warmth suggests a consultancy or craft brand more strongly than an AI engineering practice.

## Comparative assessment

Scores are a subjective design assessment of the rendered pages, not user research or a conversion forecast. All options use the same content, layout and typography. Motion was paused for screenshots. Contrast and functional correctness are separate requirements, not tradeable score points.

| Criterion | Weight | Graphite | Midnight | Copper |
| --- | ---: | ---: | ---: | ---: |
| Authority | 30% | 9/10 | 9/10 | 9/10 |
| Technical character | 25% | 9/10 | 10/10 | 7/10 |
| Portrait harmony | 20% | 10/10 | 7/10 | 8/10 |
| Reading clarity | 15% | 9/10 | 9/10 | 9/10 |
| Distinctiveness | 10% | 9/10 | 6/10 | 9/10 |
| **Weighted total** | **100%** | **92/100** | **85.5/100** | **83/100** |

Desktop and mobile screenshots cover the hero, teaching, training, enquiry, service, article and project views. Additional desktop project screenshots include the architecture diagram. Form borders were strengthened in all three candidates after the initial comparison. The final gallery includes those updated forms.

## Final system

- Dark surface #14171B; reading surface #F4F4F1; brand #7A2438; steel accent #C4CBD3; text #20262D; secondary text #57616A.
- Manrope throughout: hero 700, headings 600, body 400. Large italic phrases and handwritten annotations replaced with upright type.
- Consistent 6 px buttons/cards; circular companion controls and the portrait arch retained. Pink glows and decorative orbits removed; engineering nodes and diagrams retained.
- SVG and Three.js Nori share semantic material colours, with neutral shell and lighting. Article graphics and the portrait-led social image are generated in Manrope using the selected palette.
- URLs, SEO content, programme affiliation, contact details, real photographs, project evidence and all legacy PDFs are preserved.

## Reproduce or maintain

The default is in `src/data/theme-settings.json`; palette values are in `src/data/themes.json`. `SITE_THEME` accepts `graphite`, `navy` or `copper`. Invalid values fail the build. These are build settings, not a public theme selector.

Run `npm run build` for the selected default. It builds static HTML and then regenerates matching article images, social graphics and favicon in the output directory. `npm run theme:assets` refreshes public source graphics for development. The build uses the installed Manrope font; no external font request or system font installation is required.

To build a comparison on PowerShell, set `$env:SITE_THEME = 'navy'`, then run `npm run build -- --outDir '../qa/theme-comparison/builds/navy'`. Remove the temporary override with `Remove-Item Env:SITE_THEME` before building the final release. Each candidate build contains the same production routes; keep comparison builds local.

Use Node.js 22.19 or newer for the complete dependency engine requirements. `npm ci`, `npm run check`, `npm run build`, and `npm run verify` reproduce the release checks. The theme verifier checks semantic-token coverage, selected-theme consistency, matched graphics and key text/control contrast pairs for every palette.

## Handoff

Use the newly named graphite packages. Earlier SEO/design ZIPs remain available for rollback; their previews show the older styling. Nothing has been deployed or connected to a domain. Complete the previously deferred physical iPhone/Android, native 200% zoom and public-server checks before launch. See SEO-HANDOFF.md for truthful article dates and server configuration.
