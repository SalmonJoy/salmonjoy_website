# SEO release handoff

Prepared 1 November 2026. Local build only. The owner deploys to Hostinger. No DNS, account, live server, outreach or subscription changes are included.

## Release steps

1. Review the two original articles and new service pages for voice and factual fit. Their examples are illustrative, not claims of completed client exercises.
2. On the real first-publication day, set ARTICLE_PUBLISH_DATE to that YYYY-MM-DD date before building. On PowerShell: `$env:ARTICLE_PUBLISH_DATE = 'YYYY-MM-DD'`. Replace the placeholder with the actual date. Do not change this on subsequent rebuilds; preserve the original first-publication date in release configuration. Later additions should use per-article dates in the article collection. Set modifiedAt only after a substantive edit.
3. Run `npm ci`, `npm run check`, `npm run build`, `node scripts/verify.mjs` and `node scripts/verify-seo.mjs`. Omit npm ci if dependencies are already installed and unchanged. A build without the publication variable deliberately omits unknown publication dates.
4. Upload the contents of dist to a new release directory. Back up the existing Nginx virtual-host configuration and keep the old release. Set the document root/symlink only when ready; no Node.js process is needed.
5. Merge the example in deploy/nginx-salmonjoy.conf.example with the actual virtual host. Preserve TLS certificates, ACME handling, other hosted sites and current security headers. The example is NOT a drop-in configuration: actual root and TLS paths must be retained from the server. Run nginx -t before any reload.
6. Check HTTPS apex, www and HTTP redirects, clean routes, unknown-path 404 status, static assets and the three historical PDF URLs. Validate both profile PDFs return X-Robots-Tag: noindex; the project portfolio must remain downloadable and not inherit that header.
7. Retain existing nameservers, MX/TXT records and unrelated subdomains. Hosting stays on the current VPS; no Sites domain connection is required.
8. Run the physical iPhone Safari, Android Chrome/keyboard and desktop 200% zoom checks deferred by the owner. Check the contact controls and Nori do not obscure fields.

## URL migration inventory

The current public site is a single HTML homepage with fragment navigation. The public homepage and three PDF paths remain. Previously prepared case-study routes remain unchanged. There are no planned path renames.

| Existing address | Treatment |
| --- | --- |
| / | Preserve; replace only when owner deploys |
| /#about, /#projects, /#training, /#contact | Preserve sections; provide legacy projects anchor alias |
| /#skills, /#experience | Provide legacy anchors leading to engineering and biography context |
| /Profile.pdf | Preserve download; noindex header |
| /Salmon Joy Profile 2025 (2).pdf | Preserve download; noindex header |
| /Salmon Project Portfolio.pdf | Preserve download and supporting evidence |
| /projects/ and three case-study routes | Preserve |
| /privacy/ | Preserve |

Before switching, export any historical URLs from Search Console and inspect the actual server log/config for additional routes. If a retired URL has a genuine replacement, map it individually with a permanent redirect. Unrelated missing paths must remain 404; fragments are client-side and need HTML anchors, not server redirects.

## Search Console and Bing setup (owner actions)

- Check existing properties before creating one. Prefer a Google Search Console Domain property for salmonjoy.com and verify through the requested DNS TXT record only when you choose to do so. Keep all existing mail and verification records.
- Add/verify the site in Bing Webmaster Tools using the account's supported verification method. Submit https://salmonjoy.com/sitemap.xml in both tools after the public release.
- Inspect the homepage, each training page and one article using the tools' URL inspection. Check fetched content, selected canonical, mobile rendering and indexability. Request indexing for key new URLs once; repeated requests are not a ranking strategy.
- Use Rich Results Test for supported types and Schema.org Validator for the complete graph. Service and CreativeWork markup describe content without promising a special search result.
- Search Console Web performance provides the ordinary search baseline; inspect any available AI-specific views without assuming the account has a particular feature. Bing AI Performance reports citations for supported experiences, not visits or conversion.

## Optional IndexNow

Nothing is submitted automatically. Run `node scripts/indexnow.mjs --prepare-key` once to create a public verification key file; rebuild and deploy it. Set INDEXNOW_KEY to its filename without .txt. The key is a public ownership-verification token, not a private API credential. Keep it stable.

Dry-run: `node scripts/indexnow.mjs / /training/ /insights/choose-corporate-ai-training/`.

After deployment only, add `--submit`. The command checks sitemap membership, deployed key, response status, canonical URL and noindex before posting. Submit only added or materially updated URLs. HTTP 200 means receipt; 202 means verification pending. Neither proves indexing. Do not run submission as part of build or preview.

## Crawlers and AI search

The existing robots policy allows public crawling. Do not add broad bot blocks or disable hosting security to pursue AI visibility. Inspect server logs for genuine fetches and verify claimed crawlers with their operator's official IP/rDNS guidance before making a narrow exception. Search access and model-training permission are separate; GPTBot policy remains unchanged.

Sources: https://developers.google.com/search/docs/appearance/ai-features ; https://developers.openai.com/api/docs/bots ; https://docs.perplexity.ai/docs/resources/perplexity-crawlers ; https://www.indexnow.org/documentation

## Measurement

Use the supplied workbook monthly after release. Keep periods, country/device filters and query definitions consistent. Separate branded searches containing Salmon Joy/salmonjoy from non-branded service searches. Record exports and dates in the source columns. Leave unavailable values blank rather than entering zero.

Record qualified enquiries manually with an anonymous reference and self-reported discovery source. Do not record names, email addresses, phone numbers or enquiry text in analytics. No visitor tracking script was added, so contact clicks and complete attribution are not available.

For AI observations, use the same 12 questions, new conversations, a recorded product/model/search mode and date. Save the actual cited URL and factual errors, not just whether the name appeared. Visibility is variable and the sample is not a ranking score.

Monthly: inspect indexing/errors and core pages; review non-branded query opportunities; publish two reviewed articles; check new legitimate mentions; refresh obsolete technical details. Quarterly: review programme role wording, metrics and archived documents against current evidence.
