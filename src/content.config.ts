import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 文章集合。要上稿一篇文章：在 src/content/posts/ 放一個 .md
// 檔名前綴用語言：zh-xxx.md / en-xxx.md（或用 lang 欄位）
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
    source: z.string().optional(),        // 原始出處（例如 Threads 連結）
  }),
});

export const collections = { posts };
