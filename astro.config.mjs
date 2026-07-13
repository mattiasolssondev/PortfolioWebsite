// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Update when custom domain is added
const site = process.env.PUBLIC_SITE_URL ?? 'https://playframe.vercel.app';

export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
