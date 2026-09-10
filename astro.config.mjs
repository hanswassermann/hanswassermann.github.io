// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { satteri } from "@astrojs/markdown-satteri";
import { externalLinks } from "./src/plugins/externalLinks";

export default defineConfig({
    adapter: cloudflare(),
    // Set SITE_URL in the Cloudflare build env vars once you know your URL
    // (e.g. https://hanswassermann.<subdomain>.workers.dev, later your custom domain).
    site: process.env.SITE_URL ?? 'https://hanswassermann.com',
    trailingSlash: 'never',
    prefetch: { prefetchAll: true },
    markdown: {
        processor: satteri({
            hastPlugins: [ externalLinks ]
        })
    }
});