import { getCollection, type CollectionEntry } from 'astro:content';

export const PAGE_SIZE = 10;

export type Post = CollectionEntry<'posts'>;

export async function getWriting(lang: 'zh' | 'en', isDev: boolean) {
  const all = (await getCollection('posts'))
    .filter((p) => p.data.lang === lang)
    .filter((p) => isDev || !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return {
    all,
    featured: all
      .filter((p) => p.data.featured)
      .sort((a, b) => b.data.order - a.data.order || b.data.date.valueOf() - a.data.date.valueOf()),
    timeline: all.filter((p) => !p.data.featured),
  };
}

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** 依單篇文章在「全部（依日期新到舊）」清單中的位置，回傳上一篇（較新）與下一篇（較舊） */
export function neighbours(all: Post[], id: string) {
  const i = all.findIndex((p) => p.id === id);
  return { prev: i > 0 ? all[i - 1] : null, next: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
}
