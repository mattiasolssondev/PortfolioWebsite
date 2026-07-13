# Deployment

How to build and deploy Verdacio to production.

---

## Build output

Astro produces a static site in `dist/`:

```bash
npm run build
npm run preview   # optional local preview of production build
```

Everything in `dist/` can be served by any static host or CDN.

---

## Recommended hosts

### Cloudflare Pages

1. Push repo to GitHub
2. [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → Create project
3. Connect GitHub repo
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 20 (set via `NODE_VERSION` env var)
5. Deploy

**Custom domain:** Pages → Custom domains → add your domain.

### Vercel

1. Import repo at [vercel.com/new](https://vercel.com/new)
2. Vercel auto-detects Astro
3. Deploy

**Custom domain:** Project Settings → Domains.

---

## Environment variables

v1 requires **no** environment variables. All content is in the repo.

Future optional vars:

| Variable | Purpose |
|----------|---------|
| `PUBLIC_ANALYTICS_ID` | Analytics script ID |
| `SITE_URL` | Canonical URL for sitemap (or set in `astro.config.mjs`) |

---

## `astro.config.mjs` site URL

Set your production URL for sitemaps and canonical links:

```javascript
export default defineConfig({
  site: 'https://verdacio.example.com',
  // ...
});
```

---

## Branch strategy

| Branch | Deploy target |
|--------|---------------|
| `main` | Production |
| PR branches | Preview deployments (automatic on Vercel/Cloudflare) |

---

## CI checklist

On every push to `main`:

1. Install dependencies (`npm ci`)
2. Run build (`npm run build`)
3. Deploy `dist/` to CDN

Both Cloudflare Pages and Vercel do this automatically. No GitHub Actions required unless you want extra steps (lint, link checking).

---

## Optional GitHub Actions

If you prefer explicit CI or deploy to GitHub Pages:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      # Add deploy step for your host
```

---

## Post-deploy verification

- [ ] Home page loads over HTTPS
- [ ] All game thumbnails visible
- [ ] Each game link opens Unity Play
- [ ] `/about` accessible
- [ ] Sitemap at `/sitemap-index.xml` (after `@astrojs/sitemap` added)
- [ ] Mobile layout looks correct

---

## Rollback

Revert the git commit on `main` and push. CDN redeploys the previous version within minutes.
