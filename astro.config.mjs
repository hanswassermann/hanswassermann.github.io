// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from "@astrojs/markdown-satteri";
import { externalLinks } from "./src/plugins/externalLinks";

export default defineConfig({
    // Static site, deployed to GitHub Pages at hanswassermann.github.io.
    // Set SITE_URL to override (e.g. a custom domain later).
    site: process.env.SITE_URL ?? 'https://hanswassermann.github.io',
    trailingSlash: 'never',
    prefetch: { prefetchAll: true },
    markdown: {
        processor: satteri({
            hastPlugins: [ externalLinks ]
        })
    }
});
