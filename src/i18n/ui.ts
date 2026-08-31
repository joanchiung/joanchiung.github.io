// 網站 UI 字串（標籤、按鈕、導覽）——不是編輯型文案。
// 編輯型內容（hero、關於我、文章內文）放在各自的 .md / .astro，不在這裡。

export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

export const htmlLang: Record<Locale, string> = { zh: 'zh-TW', en: 'en-US' };

export const ui = {
  zh: {
    'nav.home': '首頁',
    'nav.about': '關於我',
    'nav.writing': '文章',
    'nav.brand': 'Joan Chang',
    'nav.lang.current': '繁體中文',
    'nav.lang.aria': '切換語言 / Switch language',
    'nav.theme.aria': '切換深淺色 / Toggle theme',

    'footer.resume': '下載履歷',
    'footer.copyright': '© 2026 Joan Chang',

    'writing.eyebrow': 'Writing',
    'writing.title': '文章',
    'writing.intro':
      '我在轉前端的路上，用寫作把每個學到的概念弄懂 —— 前端、區塊鏈，也包括我工作所在的金融與能源領域。',
    'writing.featured': '精選',
    'writing.all': '全部',
    'writing.empty': '還沒有文章。',
    'writing.pager.prev': '← 上一頁',
    'writing.pager.next': '下一頁 →',
    'writing.back': '← 回文章列表',

    'post.prev': '← 上一篇',
    'post.next': '下一篇 →',

    'about.eyebrow': '關於我',
    'about.back': '← 回首頁',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.writing': 'Writing',
    'nav.brand': 'Joan Chang',
    'nav.lang.current': 'English',
    'nav.lang.aria': '切換語言 / Switch language',
    'nav.theme.aria': '切換深淺色 / Toggle theme',

    'footer.resume': 'Download résumé',
    'footer.copyright': '© 2026 Joan Chang',

    'writing.eyebrow': 'Writing',
    'writing.title': 'Writing',
    'writing.intro': 'Notes on frontend, Web3, finance and energy — learning in public.',
    'writing.featured': 'Featured',
    'writing.all': 'All',
    'writing.empty': 'No articles yet.',
    'writing.pager.prev': '← Prev',
    'writing.pager.next': 'Next →',
    'writing.back': '← Back to writing',

    'post.prev': '← Previous',
    'post.next': 'Next →',

    'about.eyebrow': 'About',
    'about.back': '← Home',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];

export function useT(locale: Locale) {
  const dict = ui[locale] ?? ui[defaultLocale];
  return (key: UIKey): string => dict[key] ?? ui[defaultLocale][key];
}

// ---- 路徑 / 語系切換 helper ----

/** 目前路徑屬於哪個語系 */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh';
}

/** 把路徑轉成指定語系的對應網址 */
export function pathForLocale(pathname: string, locale: Locale): string {
  const bare =
    pathname === '/en' || pathname === '/en/'
      ? '/'
      : pathname.startsWith('/en/')
        ? pathname.slice(3)
        : pathname;
  return locale === 'en' ? (bare === '/' ? '/en/' : '/en' + bare) : bare;
}

/** 該語系的路徑前綴（zh 為預設、無前綴）*/
export function base(locale: Locale): string {
  return locale === 'en' ? '/en' : '';
}
