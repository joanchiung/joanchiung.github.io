// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 正式上線時 site 換成實際網域；先用 GitHub user site 位址
export default defineConfig({
  site: 'https://joanchiung.github.io',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false, // zh 不加前綴，en 走 /en/
    },
  },
});
