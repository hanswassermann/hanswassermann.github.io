# Deploying

Static Astro site hosted on **GitHub Pages** at `https://hanswassermann.github.io`.
A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and publishes on
every push to `main`.

## One-time setup

1. **Rename the repo** to `hanswassermann.github.io`
   (GitHub → repo → Settings → General → Repository name → Rename).
   This is what makes the site serve from the root URL. History and your local
   clone keep working; run `git remote set-url origin` with the new URL if you
   want the remote updated locally.

2. **Enable Pages**: repo → Settings → Pages → **Source: GitHub Actions**.

3. Push to `main` (or use Settings → Actions → run the workflow manually). The
   workflow builds with `withastro/action`, adds `.nojekyll`, and deploys.
   First run takes ~1–2 minutes; the URL shows up under the workflow's
   `deploy` job and in Settings → Pages.

## Analytics (optional — Cloudflare Web Analytics)

Works on any domain, no Cloudflare hosting needed:

1. [Cloudflare dashboard](https://dash.cloudflare.com) → **Web Analytics** →
   **Add a site** → enter `hanswassermann.github.io` → pick the JS-snippet option.
2. Copy the token (the `"token": "…"` value).
3. Repo → Settings → Secrets and variables → **Actions** → **Variables** tab →
   **New repository variable**: name `PUBLIC_CF_BEACON_TOKEN`, value = the token.
4. Re-run the workflow. The beacon (`src/components/MainHead.astro`) only renders
   in production builds when this variable is set.

## Custom domain (later)

1. Repo → Settings → Pages → **Custom domain** → enter it (GitHub writes a
   `CNAME` file to the published site).
2. Add the DNS records GitHub shows at your registrar.
3. Set a repo Actions **variable** `SITE_URL` to the new `https://…` URL so
   canonical tags, OpenGraph, and `sitemap.xml` use it, then re-run the workflow.

## Local

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static build → dist/
npm run preview    # serve the built dist/
```

Restart the dev server after editing `astro.config.mjs` or
`src/content.config.ts` — those don't hot-reload.

## Notes

- GitHub Pages has no redirect support, so the old `_redirects` short links
  (`/cv`, `/linkedin`) are gone. If you want them back, add small HTML files with
  a `<meta http-equiv="refresh">` under `public/`.
