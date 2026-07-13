# Website stack research

**Date:** 2026-07-13  
**Status:** Draft  
**Purpose:** Evaluate the best way to build Verdacio — a static game portfolio site that links to Unity Play WebGL games.

---

## Requirements

Verdacio needs to:

1. List games with title, description, thumbnail, tags, and links
2. Link out to Unity Play (and optionally embed games inline)
3. Load fast on mobile and desktop
4. Be cheap or free to host
5. Be easy to update when a new game ships (no CMS required initially)
6. Support a personal brand (about page, social links)

Verdacio does **not** need (initially):

- User accounts or authentication
- A database or server-side API
- Real-time features
- In-browser game hosting (Unity Play handles that)

---

## Game hosting: Unity Play

### What Unity Play provides

[Unity Play](https://play.unity.com/) is Unity's free WebGL hosting platform. Workflow:

1. Build your Unity project for **WebGL**
2. Zip the build output folder
3. Upload at [play.unity.com/upload](https://play.unity.com/upload) or via the WebGL Publisher package in the Editor
4. Set visibility: **Public**, **Unlisted**, or **Private**
5. Share via direct URL or embed iframe

### Visibility options

| Level | Searchable | Link access | Password |
|-------|------------|-------------|----------|
| Public | Yes | Yes | Optional |
| Unlisted | No | Yes | Optional |
| Private | No | Owner only | N/A |

For portfolio games, **Unlisted** is a good default: not in Unity Play browse/search, but playable via link. Add a password only if you need restricted access.

### Embedding on Verdacio

Unity Play provides embed codes via **Share → Embed**. Typical iframe pattern:

```html
<iframe
  id="webgl_iframe"
  frameborder="0"
  allow="autoplay; fullscreen; vr"
  allowfullscreen
  src="https://play.unity3dusercontent.com/webgl/<game-id>?screenshot=false&embedType=embed"
  width="810"
  height="640"
></iframe>
```

**Recommendation:** Use **link-out** as the primary CTA ("Play on Unity Play") and offer **optional embed** on individual game detail pages. Embedding keeps users on your site but loads a heavy WebGL runtime; linking is lighter and simpler.

### Alternatives considered

| Platform | Pros | Cons |
|----------|------|------|
| **Unity Play** | Free, official, Editor integration | Less control over player chrome |
| **itch.io** | Great indie community, embed support | Third-party branding, not Unity-specific |
| **Self-hosted WebGL** | Full control | Server config for compression, bandwidth costs, maintenance |
| **Simmer.io** | Easy embed | Another third-party dependency |

**Decision:** Unity Play for v1. Matches your stated workflow and keeps hosting free.

---

## Site framework comparison

### Candidates

| Framework | JS shipped | Content model | Best for |
|-----------|------------|---------------|----------|
| **Astro** | Zero by default | Content Collections (typed MD/MDX) | Portfolios, content sites |
| **Next.js** | React runtime | App router, ISR, APIs | Full web apps |
| **Hugo** | Zero | Markdown | Huge static sites, Go templates |
| **Eleventy** | Zero | Flexible | Custom static pipelines |
| **Plain HTML/CSS** | Minimal | Manual | Tiny sites, no build step |

### Astro (recommended)

**Why Astro fits Verdacio:**

- **Content-first:** Game catalog is markdown/JSON with validated frontmatter — no database
- **Performance:** Ships static HTML; game iframes load only on game detail pages
- **Islands:** Add React/Vue/Svelte only where needed (e.g. image gallery, theme toggle)
- **DX:** Fast builds, good TypeScript support, large theme ecosystem
- **Deployment:** Static output works on Cloudflare Pages, Vercel, Netlify, GitHub Pages

Portfolio sites migrated from Next.js to Astro report Lighthouse 100 scores and dramatically reduced client JS. For a site that is mostly game cards and text, Astro avoids shipping a React bundle on every page.

### Next.js (viable alternative)

Choose Next.js if you later need:

- User accounts / admin dashboard
- API routes for dynamic data
- ISR across hundreds of programmatic pages

For v1, these are YAGNI. Next.js static export works but carries more JS overhead than Astro for the same content.

### Hugo / Eleventy

Excellent performance, but less ergonomic for component-based game cards and optional interactive islands. Astro hits the sweet spot between flexibility and simplicity.

### Plain HTML

Works for 2–3 games but does not scale when adding metadata, tags, or consistent layouts. A static generator pays off quickly.

---

## Hosting comparison

| Host | Free tier | Custom domain | Build from Git | Notes |
|------|-----------|---------------|----------------|-------|
| **Cloudflare Pages** | Yes | Yes | Yes | Fast global CDN, generous limits |
| **Vercel** | Yes | Yes | Yes | Excellent DX, Astro-first-class |
| **Netlify** | Yes | Yes | Yes | Similar to Vercel |
| **GitHub Pages** | Yes | Yes | Actions required | Simpler, fewer features |

**Recommendation:** **Cloudflare Pages** or **Vercel**. Both support Astro, free custom domains, and automatic deploys on push to `main`.

---

## Content management approach

### v1: Git-based content (recommended)

Each game is a markdown or JSON file in `content/games/`:

```yaml
---
title: "My Game"
slug: "my-game"
unityPlayUrl: "https://play.unity.com/en/games/..."
embedUrl: "https://play.unity3dusercontent.com/webgl/..."
thumbnail: "./images/my-game.png"
tags: ["puzzle", "webgl"]
status: "released"
releasedAt: 2026-07-01
---
Short description for cards and SEO.
```

**Pros:** Version controlled, no CMS cost, type-safe validation via Astro Content Collections.  
**Cons:** Requires a git commit to add a game (fine for solo dev).

### Future: Headless CMS

Consider Sanity, Contentful, or Decap CMS if non-technical collaborators need to add games. Not needed for v1.

---

## SEO and social sharing

- Static pages with proper `<title>`, meta description, and Open Graph tags per game
- Astro supports `@astrojs/sitemap` for automatic sitemap generation
- Thumbnail images stored in repo or CDN for `og:image`

---

## Accessibility and mobile

- Game cards: semantic HTML, alt text on thumbnails
- Embed pages: provide "Open in new tab" fallback (iframes can be awkward on mobile)
- Unity Play mobile playback has had login quirks in the past; always offer direct link as fallback

---

## Final recommendation

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Astro 5.x** | Best fit for content-heavy portfolio; minimal JS |
| Styling | **Tailwind CSS** or plain CSS | Fast iteration; Tailwind is common in Astro starters |
| Content | **Astro Content Collections** | Typed game metadata, MDX for rich descriptions |
| Game hosting | **Unity Play** | Free, matches your workflow |
| Site hosting | **Cloudflare Pages** or **Vercel** | Free, fast, git-based deploys |
| Analytics (optional) | **Plausible** or **Cloudflare Web Analytics** | Privacy-friendly, lightweight |

---

## Sources

- [Unity Play FAQ](https://play.unity.com/en/faq)
- [Unity Learn: Publish to WebGL](https://learn.unity.com/pathway/unity-essentials/unit/publishing-essentials/tutorial/publish-to-webgl-1)
- [Unity Discussions: Unity Play embed iframe](https://discussions.unity.com/t/how-can-i-make-an-embed-code-that-looks-exactly-like-on-play-unity/838018)
- [Astro documentation](https://docs.astro.build/)
- Portfolio migration case studies (Astro vs Next.js, 2025–2026)
