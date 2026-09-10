# Deploying

The site is an Astro static build served by a Cloudflare Worker
(`@astrojs/cloudflare` adapter + `wrangler.jsonc`). Deploy is Git-connected:
every push to `main` on GitHub rebuilds and publishes.

## One-time setup (Cloudflare dashboard)

1. Push the repo to GitHub (`main`).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Workers** →
   **Import a repository** → pick `hanswassermann/portfolio`.
3. Build settings:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Version / preview command:** leave default (or `npx wrangler versions upload`)
   - Node version comes from `.node-version` (22).
4. Deploy. The site goes live at `https://hanswassermann.<your-subdomain>.workers.dev`.
5. Copy that URL and add a **build environment variable**:
   - `SITE_URL` = `https://hanswassermann.<your-subdomain>.workers.dev`

   This feeds canonical URLs, OpenGraph tags, `sitemap.xml`, and `robots.txt`.
   Redeploy (push any commit, or "Retry deployment") so it takes effect.

## Analytics (Cloudflare Web Analytics)

1. Cloudflare dashboard → **Analytics & Logs** → **Web Analytics** → **Add a site**.
2. Enter the `*.workers.dev` hostname. Choose the **JS snippet** option
   (automatic setup only works behind Cloudflare's proxy, i.e. a custom domain).
3. Copy the **token** from the snippet it shows (the `"token": "…"` value).
4. Add another **build environment variable**:
   - `PUBLIC_CF_BEACON_TOKEN` = `<that token>`
5. Redeploy. The beacon script (`src/components/MainHead.astro`) only renders in
   production builds when this variable is set — nothing loads in `npm run dev`.

Data shows up in the Web Analytics dashboard within a few minutes: page views,
top pages, referrers, countries, and load-time / Core Web Vitals. No cookies, so
no consent banner needed. (It does **not** track individual clicks or heatmaps —
that needs a separate tool like Microsoft Clarity or PostHog.)

## Custom domain (later)

1. Add the domain to Cloudflare (Registrar or move nameservers).
2. Worker → **Settings** → **Domains & Routes** → add the custom domain.
3. Update the `SITE_URL` build variable to the new URL and redeploy.

## Manual deploy (fallback)

```sh
npx wrangler login
npm run deploy
```
