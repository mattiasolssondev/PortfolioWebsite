# Deployment

Deploy Playframe to **Vercel**. Vercel serves only static files — no WebGL game binaries.

---

## Build output

```bash
npm run build    # outputs to dist/
npm run preview  # local preview of production build
```

---

## Vercel setup

1. Push repo to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Astro:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy

Preview deployments are created automatically for pull requests.

---

## Custom domain (later)

When ready:

1. Vercel → Project Settings → Domains
2. Add your domain and configure DNS per Vercel instructions
3. Update `site` in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
});
```

Until then, the site runs on `your-project.vercel.app`.

---

## Environment variables

v1 requires **no** environment variables.

---

## Branch strategy

| Branch | Deploy target |
|--------|---------------|
| `main` | Production |
| PR branches | Vercel preview URLs |

---

## Post-deploy verification

- [ ] Home page loads over HTTPS (dark theme)
- [ ] Game thumbnails visible
- [ ] Game detail embed loads Unity Play iframe
- [ ] "Open on Unity Play" fallback works
- [ ] `/about` accessible
- [ ] Mobile layout correct

---

## Rollback

Revert the commit on `main` and push. Vercel redeploys the previous version.

---

## What Vercel does NOT host

| Asset | Hosted on |
|-------|-----------|
| WebGL `.wasm`, `.data`, `.js` | Unity Play |
| Game runtime | Unity Play (via iframe) |
| Thumbnails, HTML, CSS | Vercel |

This keeps Vercel well within free tier limits.
