# Deploy salmonjoy.com from GitHub

Prepared 2 November 2026. Repository: https://github.com/SalmonJoy/salmonjoy_website

This is a **static Astro website**. Build the source and serve the contents of `dist/` with your web server. There is no database, backend, production Node process, PM2 service or enquiry API. Email and WhatsApp messages are prepared locally; the visitor sends them in the chosen app.

The selected design is Graphite + Burgundy. The public canonical address is **https://salmonjoy.com**, with `www` redirected to it. Pushing this repository does not deploy it; no automatic deployment workflow is included.

## 1. Choose your deployment method

- **Hostinger VPS with Nginx and SSH:** follow the release-directory procedure below. It assumes Linux, a sudo-capable deployment account, and an existing Nginx installation.
- **Managed hosting or a panel-controlled server:** build locally, then upload only `dist/` contents to the website's configured document root using SFTP or the panel. Use your panel's supported controls for redirects, TLS, caching and headers. Nginx examples are not Apache/LiteSpeed `.htaccess` rules. Do not replace panel-generated configuration blindly.

Before changing the live server, identify the actual document root, active virtual-host configuration, certificate paths and any panel that owns them. The paths below are examples for a dedicated Nginx VPS, not facts about your server.

Keep the existing site and configuration as a rollback copy. Preserve nameservers, MX, SPF, DKIM, DMARC, other TXT records and unrelated subdomains. If the domain already reaches this server, no DNS change is needed. If moving servers, update only the relevant web A/AAAA records deliberately; check for stale IPv6 records as well.

## 2. Build requirements and first checkout

Use **Node.js 22.19 or newer within the Node 22 line**, npm, Git and enough disk space for dependencies and retained releases. Node is needed only on the machine performing the build. Install it from an official distribution or your established version manager. Include development dependencies: the build uses Astro checking, font tooling and image generation.

Run as your ordinary deployment user, outside the web document root:

```bash
mkdir -p "$HOME/src"
cd "$HOME/src"
git clone https://github.com/SalmonJoy/salmonjoy_website.git
cd salmonjoy_website
node --version
npm --version
npm ci --include=dev
```

The repository root contains `package.json`; there is **no additional `site/` directory after cloning**. If GitHub requires authentication, use a read-only SSH deploy key or your credential manager. Do not embed credentials in clone URLs or put them in public files. Do not run `npm audit fix --force` during deployment; dependency upgrades need separate review and testing.

## 3. Configure and validate a release

For the animated lesson release, also read [LEARN-HANDOFF.md](docs/LEARN-HANDOFF.md). Set `LESSON_PUBLISH_DATE` to the actual first public lesson date before the release build, then preserve it on later builds. Leave it unset for local review. It does not replace `ARTICLE_PUBLISH_DATE`. All four `/learn/` routes are static directory URLs and use the existing Nginx `try_files` routing.

The theme defaults to graphite; the explicit setting below prevents an old shell override from selecting a comparison theme. The two initial article dates are deliberately unknown until actual publication. On first launch, enter the genuine publication date, record it in your deployment configuration, and reuse that same date on later builds. Do not replace it with today's date each time. For future articles, use individual dates in `src/data/articles.ts`.

Run these commands from the repository root in Bash. Stop if any command fails:

```bash
set -e
export SITE_THEME=graphite
read -r -p 'Original article publication date (YYYY-MM-DD): ' ARTICLE_PUBLISH_DATE
export ARTICLE_PUBLISH_DATE
test -n "$ARTICLE_PUBLISH_DATE"
npm run check
npm run build
npm run verify
git rev-parse HEAD
```

Record the commit SHA and publication date with the release. The date is not a secret. An omitted date produces undated articles; an invalid supplied date fails validation. Set `modifiedAt` only for substantive article revisions.

The build creates `dist/index.html`, directory-based inner pages, `404.html`, `sitemap.xml`, `robots.txt`, matching theme graphics, hashed `_astro/` assets and the three historical PDFs. `npm run verify` checks links, metadata, canonicals, structured data, sitemap coverage and theme contrast/consistency.

For a local review:

```bash
npm run preview -- --port 4321
```

Open `http://127.0.0.1:4321` on the build machine. For a remote build machine, use an SSH tunnel from your laptop (`ssh -L 4321:127.0.0.1:4321 YOUR_USER@YOUR_SERVER`) and open that same local URL. Stop the preview with Ctrl+C when finished. Astro preview is not the production server. Keep staging private; do not leave public staging pages indexable.

### Building on Windows instead

From the cloned repository in PowerShell:

```powershell
npm ci --include=dev
$env:SITE_THEME = 'graphite'
$env:ARTICLE_PUBLISH_DATE = Read-Host 'Original article publication date (YYYY-MM-DD)'
npm run check
# Continue only if the check succeeded.
npm run build
# Continue only if the build succeeded.
npm run verify
# Continue only if verification succeeded.
Compress-Archive -Path .\dist\* -DestinationPath .\salmonjoy-upload.zip
```

Use a new ZIP filename for later releases. Upload/extract its contents into a new release directory, or use SFTP to copy `dist/` contents. `index.html` must sit directly in the configured document root, not in a nested `dist` directory. Upload no source, `.git`, `.env`, `node_modules`, QA reports or handoff documents. Do not copy Windows `node_modules` to Linux; build on one machine or install dependencies natively on the other.

## 4. Prepare a VPS release without replacing the live site

The example layout is:

```text
/var/www/salmonjoy/
  releases/<timestamp>-<commit>/   # compiled website files only
  current -> releases/<release>/  # Nginx document root
```

After the build passes, from the repository root:

```bash
set -e
RELEASE_ID="$(date -u +%Y%m%dT%H%M%SZ)-$(git rev-parse --short HEAD)"
RELEASE_DIR="/var/www/salmonjoy/releases/$RELEASE_ID"
sudo install -d -m 755 /var/www/salmonjoy/releases
sudo mkdir -m 755 "$RELEASE_DIR"
sudo cp -a dist/. "$RELEASE_DIR/"
sudo find "$RELEASE_DIR" -type d -exec chmod 755 {} +
sudo find "$RELEASE_DIR" -type f -exec chmod 644 {} +
test -f "$RELEASE_DIR/index.html"
test -f "$RELEASE_DIR/training/index.html"
test -f "$RELEASE_DIR/404.html"
printf 'Prepared release: %s\n' "$RELEASE_DIR"
```

If upgrading an existing symlink release, retain the previous hashed assets in the new directory so visitors who already loaded old HTML can still request its JS/CSS:

```bash
if [ -d /var/www/salmonjoy/current/_astro ]; then
  sudo cp -an /var/www/salmonjoy/current/_astro/. "$RELEASE_DIR/_astro/"
fi
```

This accumulates old hashed assets; periodically review and retire them after your rollback/cache window. Never overwrite the old release while preparing a new one.

## 5. Configure Nginx, TLS and routing

Review [the Nginx example](deploy/nginx-salmonjoy.conf.example). It must be **merged with your actual virtual host**; it intentionally omits real certificate paths and is not a paste-and-run complete config.

1. Back up the active virtual-host file and note the old document root. For example, after substituting the real path: `sudo cp -a /etc/nginx/sites-available/salmonjoy.com /etc/nginx/sites-available/salmonjoy.com.before-graphite`.
2. Keep your existing HTTPS certificate/key directives and renewal mechanism. Certificates must cover both `salmonjoy.com` and `www.salmonjoy.com`, even though `www` redirects. If HTTPS is not configured, provision it through your existing panel/ACME client before launch; do not bypass certificate warnings.
3. Preserve the existing `/.well-known/acme-challenge/` handling. A server-level redirect can take precedence over challenge handling; where required, place the HTTP redirect inside `location /` alongside the challenge location.
4. Set the apex HTTPS document root to `/var/www/salmonjoy/current`. Keep `index index.html`, correct MIME types, and `try_files $uri $uri/ =404`. This is a multipage site: do not use an SPA fallback to `/index.html` for missing URLs.
5. Permanently redirect HTTP and HTTPS `www` to `https://salmonjoy.com$request_uri`. Preserve paths and query strings. Keep the example's `index.html` alias redirect, and verify slashless directories resolve to their trailing-slash canonical URL.
6. Serve the custom `404.html` with HTTP **404** for unknown routes. Do not redirect all missing URLs to the homepage.
7. Apply `X-Robots-Tag: noindex` to `/Profile.pdf` and `/Salmon Joy Profile 2025 (2).pdf`. Do not apply it to `/Salmon Project Portfolio.pdf` or normal public pages.
8. Compress text responses; cache hashed `_astro/` files long-term and revalidate HTML and fixed-name images. The sample uses `Cache-Control: no-cache` for general content. Purge relevant CDN cache entries if you already use a CDN; no new CDN is required.
9. Preserve existing security headers. Nginx `add_header` directives inside a location normally replace inherited `add_header` directives: repeat/include your existing security headers in those locations as needed. Do not assume they remain inherited. A new Content Security Policy must accommodate Astro's inline theme styles, JSON-LD and the actual generated scripts; test before enforcing it.
10. Keep your established firewall and hosting security protections. Only normal public HTTP/HTTPS access is required; no Node development port needs to be exposed.

If the server uses IPv6 listeners, retain appropriate IPv6 server blocks as well. For panel-managed Nginx, use its supported custom directives to avoid them being overwritten on regeneration.

## 6. Activate and check the release

Complete the phone and zoom checks in section 8 first. On first migration, `/var/www/salmonjoy/current` must be absent or an existing symlink. If it is a real directory, stop and retain/migrate it deliberately; do not overwrite it with these commands.

Run in the same Bash session where `RELEASE_DIR` was set:

```bash
set -e
test -f "$RELEASE_DIR/index.html"
if [ -e /var/www/salmonjoy/current ] && [ ! -L /var/www/salmonjoy/current ]; then
  echo 'current is a real directory; migrate it manually first.' >&2
  exit 1
fi
PREVIOUS_RELEASE="$(readlink -f /var/www/salmonjoy/current 2>/dev/null || true)"
printf 'Record previous release for rollback: %s\n' "$PREVIOUS_RELEASE"
NEXT_LINK="/var/www/salmonjoy/current-next-$RELEASE_ID"
sudo ln -s "$RELEASE_DIR" "$NEXT_LINK"
sudo mv -Tf "$NEXT_LINK" /var/www/salmonjoy/current
sudo nginx -t
sudo systemctl reload nginx
```

The symlink switch is atomic on this Linux layout. On an already-active `current` root, the switch itself activates new files before reload; run preflight checks before it. If validation fails, do not reload an invalid config; restore the previous symlink/config as described below. If your server does not use systemd, use its documented service reload command instead.

For first migration, the old virtual host remains live until the validated new config is reloaded. Keep the previous server configuration and old content outside the new release tree until launch is confirmed.

## 7. Verify the public site after activation

Use a browser and HTTP headers. On Windows use `curl.exe` rather than the PowerShell `curl` alias. Examples below use Bash `curl`:

```bash
curl -I https://salmonjoy.com/
curl -I 'http://salmonjoy.com/training/?check=1'
curl -I 'https://www.salmonjoy.com/training/?check=1'
curl -I https://salmonjoy.com/training/
curl -I https://salmonjoy.com/training/chatgpt-for-business/
curl -I https://salmonjoy.com/insights/choose-corporate-ai-training/
curl -I https://salmonjoy.com/a-deliberately-missing-page/
curl -I https://salmonjoy.com/Profile.pdf
curl -I 'https://salmonjoy.com/Salmon%20Joy%20Profile%202025%20%282%29.pdf'
curl -I 'https://salmonjoy.com/Salmon%20Project%20Portfolio.pdf'
curl -fsS https://salmonjoy.com/robots.txt
curl -fsS https://salmonjoy.com/sitemap.xml
curl -I -H 'Accept-Encoding: gzip' https://salmonjoy.com/
```

Expected results:

- Normal pages, assets and all three PDFs return 200; missing paths return 404 with the helpful error page.
- HTTP and `www` permanently redirect to the HTTPS apex, preserving path/query, without loops. HTTPS validates normally on both hosts.
- Both profile PDFs carry `X-Robots-Tag: noindex`; the portfolio and normal pages do not.
- `robots.txt` allows intended crawling, sitemap lists canonical public pages, and no staging-wide `noindex` or password protection remains on production.
- HTML contains the HTTPS apex canonical, real page text and structured data. Query parameters do not change the canonical.
- Text responses compress when negotiated. Check one actual `_astro/` URL copied from page source for its long cache lifetime and correct MIME type. Never invent a hashed filename.
- Open the social image at `/og.png` and article images; ensure they show the graphite theme. Check the browser console for failed assets and mixed content.

Submit `https://salmonjoy.com/sitemap.xml` in your existing Google Search Console and Bing Webmaster Tools properties after launch. Follow [SEO-HANDOFF.md](docs/SEO-HANDOFF.md) for verification, optional manually invoked IndexNow and ongoing measurement. Do not run IndexNow before deployment. No analytics script is installed. Search inclusion and rankings are not guaranteed.

## 8. Human pre-launch checklist

- Review service/article wording and the accurate OpenAI programme partner affiliation; confirm the actual publication date.
- Check iPhone Safari and Android Chrome, including the enquiry form with the keyboard open. Confirm Nori and contact controls do not cover fields.
- Check desktop at native 200% zoom, keyboard navigation, visible focus, menu Escape/focus return, and reduced motion.
- Try every training track, project filters, case links, FAQs, newsletter/social links, PDFs and back-to-top.
- Prepare email and WhatsApp messages with punctuation, inspect the preview, and test copy-message. Opening an app is not proof of delivery; the visitor must send the message there.
- Check portrait loading, article reading, scrolling and the companion fallback. Review [QA.md](QA.md) for existing lab results and their limits.

## 9. Subsequent updates and rollback

To update, use the existing source checkout outside the web root:

```bash
git status --short
# Resolve any local edits before continuing; do not discard them blindly.
git pull --ff-only origin main
npm ci --include=dev
```

Repeat build/verify and release steps with the **original** article publication date. Record the new commit SHA, keep the previous release, and use a fresh release directory. Review changed Nginx guidance before altering live config. No force push, automated server hook or deployment credential is required in this repository.

For rollback on the symlink layout, replace the example path with the recorded previous release and verify that it exists:

```bash
set -e
ROLLBACK_DIR='/var/www/salmonjoy/releases/REPLACE_WITH_PREVIOUS_RELEASE'
test -f "$ROLLBACK_DIR/index.html"
ROLLBACK_LINK="/var/www/salmonjoy/rollback-next-$(date -u +%Y%m%dT%H%M%SZ)"
sudo ln -s "$ROLLBACK_DIR" "$ROLLBACK_LINK"
sudo mv -Tf "$ROLLBACK_LINK" /var/www/salmonjoy/current
sudo nginx -t
sudo systemctl reload nginx
```

If configuration also changed, restore the saved config before its validation/reload. For first-migration rollback, restore the original document root/configuration instead of assuming it used this symlink layout. Recheck HTTPS and important pages; purge relevant existing CDN caches. Keep release files until the rollback/cache window has passed; there is no automatic destructive cleanup command here.

## 10. Troubleshooting

| Symptom | Check |
| --- | --- |
| Build dependency/engine failure | Node version, `npm ci --include=dev`, native OS dependencies; do not reuse another OS's node_modules |
| Homepage works, inner pages fail | Correct document root, directory `index.html`, `try_files`; all dist subdirectories copied |
| Missing URLs return the homepage | Remove the SPA fallback and preserve real 404 responses |
| CSS/JS missing or wrong MIME | `_astro/` uploaded, MIME types configured, no HTML fallback for asset URLs |
| Old design remains | Correct `current` target, graphite build setting, browser/CDN cache and fixed-name image revalidation |
| 403 | Directory traversal/read permissions and correct Nginx root; do not make files world-writable |
| HTTPS or redirect loop | Actual certificates, active server blocks and any existing reverse proxy/CDN TLS configuration |
| Nori or form fails | Console errors, blocked JS/CSP, missing assets; verify direct contact fallback |
| Search engine sees noindex | Staging headers/access controls, meta tags and hosting bot protections; retain noindex only where intended |

Official references: [Astro deployment](https://docs.astro.build/en/guides/deploy/), [Nginx static routing](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files), [Nginx response-header inheritance](https://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header). The commands above are tailored to this repository; the actual server configuration still needs inspection and `nginx -t` on your server.
