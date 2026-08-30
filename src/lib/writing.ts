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

/** 某一頁的文章列表 + 分頁資料（第 1 頁附精選）。route 檔只要呼叫這個。 */
export async function getWritingPage(lang: 'zh' | 'en', num: number, isDev: boolean) {
  const { featured, timeline } = await getWriting(lang, isDev);
  const last = Math.max(1, Math.ceil(timeline.length / PAGE_SIZE));
  const posts = timeline.slice((num - 1) * PAGE_SIZE, num * PAGE_SIZE);
  const b = lang === 'en' ? '/en' : '';
  const prevUrl =
    num <= 1 ? null : num === 2 ? `${b}/writing/` : `${b}/writing/page/${num - 1}/`;
  const nextUrl = num < last ? `${b}/writing/page/${num + 1}/` : null;
  return {
    featured: num <= 1 ? featured : undefined,
    posts,
    pager: { current: num, last, prevUrl, nextUrl },
  };
}

/** /writing/page/[num] 的靜態路徑（第 2 頁起） */
export async function writingPagePaths(lang: 'zh' | 'en', isDev: boolean) {
  const { timeline } = await getWriting(lang, isDev);
  const last = Math.max(1, Math.ceil(timeline.length / PAGE_SIZE));
  const paths = [];
  for (let n = 2; n <= last; n++) paths.push({ params: { num: String(n) } });
  return paths;
}

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** 依單篇文章在「全部（依日期新到舊）」清單中的位置，回傳上一篇（較新）與下一篇（較舊） */
export function neighbours(all: Post[], id: string) {
  const i = all.findIndex((p) => p.id === id);
  return { prev: i > 0 ? all[i - 1] : null, next: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
}
