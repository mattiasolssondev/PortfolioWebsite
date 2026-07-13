# Website stack research

**Date:** 2026-07-13  
**Status:** Approved  
**Purpose:** Evaluate the best way to build Playframe — a static game portfolio on Vercel that embeds Unity Play WebGL games.

---

## Requirements

Playframe needs to:

1. List games with title, description, thumbnail, tags
2. Embed games on detail pages via Unity Play iframe (no WebGL on Vercel)
3. Load fast on mobile and desktop
4. Be cheap or free to host (Vercel free tier)
5. Be easy to update when a new game ships
6. Dark-themed personal brand (about page, social links)

Playframe does **not** need (initially):

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

### Embedding on Playframe

Unity Play provides embed codes via **Share → Embed**. See [unity-play-embed-research.md](unity-play-embed-research.md) for full analysis.

**Decision:** **Embed is primary** on game detail pages. Unity Play hosts all WebGL files; Playframe renders an iframe. Vercel never stores game binaries. Fallback "Open on Unity Play" link for mobile/issues.

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

**Why Astro fits Playframe:**

- **Content-first:** Game catalog is markdown/JSON with validated frontmatter — no database
- **Performance:** Ships static HTML; game iframes load only on game detail pages
- **Islands:** Add React/Vue/Svelte only where needed (e.g. image gallery, theme toggle)
- **DX:** Fast builds, good TypeScript support, large theme ecosystem
- **Deployment:** Static output on Vercel with git-based deploys

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

## Hosting

**Decision: Vercel**

| Feature | Vercel |
|---------|--------|
| Free tier | Yes |
| Custom domain | Yes (add later) |
| Astro support | First-class auto-detection |
| Preview deploys | Per PR |
| WebGL hosting | No — and not needed |

Vercel serves only static Astro output. Game files stay on Unity Play.

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
| Framework | **Astro 5.x** | Content-heavy portfolio; minimal JS |
| Styling | **Tailwind CSS**, dark theme | Fast iteration; dark-first for game showcase |
| Content | **Astro Content Collections** | Typed metadata; `embedUrl` required |
| Game hosting | **Unity Play embed** | No WebGL on Vercel |
| Site hosting | **Vercel** | Astro-first-class; free tier |
| Theme | **Dark-first** | Game portfolio aesthetic |
| Custom domain | **Later** | Vercel subdomain until ready |

---

## Sources

- [Unity Play FAQ](https://play.unity.com/en/faq)
- [Unity Learn: Publish to WebGL](https://learn.unity.com/pathway/unity-essentials/unit/publishing-essentials/tutorial/publish-to-webgl-1)
- [Unity Discussions: Unity Play embed iframe](https://discussions.unity.com/t/how-can-i-make-an-embed-code-that-looks-exactly-like-on-play-unity/838018)
- [Astro documentation](https://docs.astro.build/)
- Portfolio migration case studies (Astro vs Next.js, 2025–2026)
