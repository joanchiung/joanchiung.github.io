// Site UI strings (labels, buttons, nav) — not editorial copy.
// Editorial content (hero, About, article body) lives in its own .md / .astro, not here.

export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

export const htmlLang: Record<Locale, string> = { zh: 'zh-TW', en: 'en-US' };

// Resume PDF served per locale: path in public/ + the filename the browser saves as.
export const resume: Record<Locale, { href: string; filename: string }> = {
  zh: { href: '/joan-chang-cv-zh.pdf', filename: '2026_張瓊文履歷.pdf' },
  en: { href: '/joan-chang-cv-en.pdf', filename: '2026_JoanChang_CV.pdf' },
};

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
      '用寫作幫助自己更理解不同領域的概念，包含前端、區塊鏈、金融與能源。',
    'writing.featured': '精選',
    'writing.all': '全部',
    'writing.empty': '還沒有文章。',
    'writing.pager.prev': '← 上一頁',
    'writing.pager.next': '下一頁 →',
    'writing.back': '← 回文章列表',

    'post.prev': '← 上一篇',
    'post.next': '下一篇 →',

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

    'footer.resume': 'Download resume',
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

    'about.back': '← Home',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];

export function useT(locale: Locale) {
  const dict = ui[locale] ?? ui[defaultLocale];
  return (key: UIKey): string => dict[key] ?? ui[defaultLocale][key];
}

// ---- Path / locale helpers ----

/** Which locale the current path belongs to */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh';
}

/** Map a path to its equivalent URL in the given locale */
export function pathForLocale(pathname: string, locale: Locale): string {
  const bare =
    pathname === '/en' || pathname === '/en/'
      ? '/'
      : pathname.startsWith('/en/')
        ? pathname.slice(3)
        : pathname;
  return locale === 'en' ? (bare === '/' ? '/en/' : '/en' + bare) : bare;
}

/** Path prefix for the locale (zh is default, no prefix) */
export function base(locale: Locale): string {
  return locale === 'en' ? '/en' : '';
}
