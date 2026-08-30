import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 文章集合。要上稿一篇文章：在 src/content/posts/ 放一個 .md
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['zh', 'en']).default('zh'),
    draft: z.boolean().default(false),   // true = 只在本機 dev 顯示，build 不輸出
    featured: z.boolean().default(false), // true = Writing 頁置頂精選
    order: z.number().default(0),          // 精選排序，越大越前面（非精選不影響）
    source: z.string().optional(),        // 原始出處（例如 Threads 連結）
  }),
});

// 作品集合。要加一個作品：在 src/content/projects/ 放一個 .md
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tech: z.array(z.string()).default([]),
    repo: z.string().optional(),          // GitHub repo 連結
    demo: z.string().optional(),          // 線上 demo 連結
    status: z.string().optional(),        // 例如「repo 整理中」，有值時顯示為標記
    order: z.number().default(0),          // 越大越前面
    lang: z.enum(['zh', 'en']).default('zh'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, projects };
