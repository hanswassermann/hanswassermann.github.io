# Personal Portfolio

Source for Hans Wassermann's portfolio site.

Built with [Astro](https://astro.build) and deployed as a static site on a
[Cloudflare Worker](https://developers.cloudflare.com/workers/). Originally based
on the Astro [Portfolio theme](https://astro.build/themes/details/portfolio),
since heavily rewritten.

## Pages

- **Home** (`src/pages/index.astro`) — intro, photo, and a two-sided experience
  timeline driven by `src/data/experience.ts`.
- **About** (`src/pages/about.astro`) — bio and contact.
- **Projects** (`src/pages/projects/`) — one Markdown file per project in
  `src/content/projects/`, rendered by `[...slug].astro`; `[...slug].md.ts`
  serves a plain-Markdown version for LLMs.
- **Resume** (`src/pages/resume.astro`) — embeds `public/resume.pdf`.

## Content

Projects are Markdown with frontmatter validated by `src/content.config.ts`
(`title`, `description`, `date` required; `tags`, `image`, `math` optional).

- Project images live in `public/assets/projects/<slug>/`; set `image.path` in
  frontmatter to use one as the card + banner.
- Set `math: true` to load KaTeX and render `$…$` / `$$…$$` on that page.
- Code blocks and `<figure>`/`<figcaption>` styling live in
  `src/styles/markdown.css`.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static build to dist/
npm run preview    # build + wrangler dev
```

Restart the dev server after editing `astro.config.mjs` or
`src/content.config.ts` — those don't hot-reload.

## Deploy

Git-connected Cloudflare Worker: every push to `main` rebuilds and publishes.
Full setup and the `SITE_URL` / `PUBLIC_CF_BEACON_TOKEN` build variables are in
[`DEPLOY.md`](DEPLOY.md).
