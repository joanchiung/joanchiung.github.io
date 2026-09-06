import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts collection. To publish: drop a .md into src/content/posts/
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['zh', 'en']).default('zh'),
    draft: z.boolean().default(false),   // true = dev only, excluded from build
    featured: z.boolean().default(false), // true = pinned on Writing page
    order: z.number().default(0),          // featured sort, higher first (ignored otherwise)
  }),
});

// Projects collection. To add one: drop a .md into src/content/projects/
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tech: z.array(z.string()).default([]),
    repo: z.string().optional(),          // GitHub repo link
    demo: z.string().optional(),          // live demo link
    status: z.string().optional(),        // e.g. "repo in progress"; shown as a tag when set
    order: z.number().default(0),          // higher first
    lang: z.enum(['zh', 'en']).default('zh'),
    draft: z.boolean().default(false),
  }),
});

// Standalone pages (currently just About). One .md per language; filename suffix picks the page (e.g. zh-about.md).
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),                    // page h1
    description: z.string().optional(),
    lang: z.enum(['zh', 'en']).default('zh'),
  }),
});

export const collections = { posts, projects, pages };
