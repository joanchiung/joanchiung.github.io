// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Swap site for the real domain at launch; using the GitHub user-site URL for now
export default defineConfig({
  site: 'https://joanchiung.github.io',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false, // zh has no prefix, en uses /en/
    },
  },
});
