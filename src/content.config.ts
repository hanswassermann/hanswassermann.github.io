import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
    projects: defineCollection({
        loader: glob({
            base: './src/content/projects',
            pattern: [ '**/*.md', '!**/_*/**', '!**/_*.md' ]
        }),
        schema: z.object({
            title: z.string(),
            description: z.string(),
            date: z.coerce.date(),
            updated: z.coerce.date().optional(),
            tags: z.array(z.string()).default([]),
            image: z
                .object({
                    path: z.string(),
                    alt: z.string().optional()
                })
                .optional(),
            // Set to true to load KaTeX and render $…$ / $$…$$ math on the page.
            math: z.boolean().default(false),
            noindex: z.boolean().default(false)
        })
    })
};
