# Verdacio design spec

**Date:** 2026-07-13  
**Status:** Draft — pending review  
**Author:** Project setup  

---

## Summary

Verdacio is a personal game portfolio website that showcases WebGL games created in Unity. Games are hosted on Unity Play; Verdacio provides branding, discovery, and context (descriptions, screenshots, tags) with links and optional embeds back to Unity Play.

---

## Goals

1. **Showcase games** — Visitors see what you've made and can play each game
2. **Stay fast** — The site itself is lightweight; heavy WebGL loads only when playing
3. **Easy to maintain** — Adding a game is a content file + thumbnail, then deploy
4. **Professional presence** — A cohesive home for your work, not scattered Unity Play links

## Non-goals (v1)

- Hosting WebGL builds directly on Verdacio
- User accounts, comments, or leaderboards
- Blog or news section (can add later)
- Multi-language support

---

## User stories

| As a… | I want to… | So that… |
|-------|------------|----------|
| Visitor | Browse a grid of games | I can discover what you've made |
| Visitor | Read about a game before playing | I know what to expect |
| Visitor | Click Play and launch the game | I can try it immediately |
| You (creator) | Add a new game in under 10 minutes | Shipping stays frictionless |
| You (creator) | Update a game's Unity Play build without changing Verdacio | Unity Play URL stays stable across updates |

---

## Pages

### Home (`/`)

- Hero: site name, short tagline, optional featured game
- Game grid: cards with thumbnail, title, tags, short description
- Footer: social links, copyright

### Game detail (`/games/[slug]`)

- Title, full description (MDX supported)
- Screenshot gallery (optional)
- Primary CTA: **Play on Unity Play** (opens Unity Play in new tab)
- Secondary: embedded iframe player (optional, below fold)
- Metadata: release date, tags, engine (Unity), platform (WebGL)
- Back link to home / related games by tag

### About (`/about`)

- Who you are, what you make, contact/social links

### 404

- Friendly message, link back home

---

## Content model

Each game is defined in `content/games/<slug>.md` (or `.mdx`). See [content schema](../architecture/content-schema.md).

Required fields: `title`, `slug`, `unityPlayUrl`, `description`, `thumbnail`, `status`, `releasedAt`  
Optional: `embedUrl`, `tags`, `featured`, `screenshots`, `developmentStatus`

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Verdacio (Astro)                     │
│  Static HTML/CSS + minimal JS islands                   │
│  ┌─────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │  Home   │  │ Game detail  │  │ Content Collections │ │
│  │  page   │  │    page      │  │  (games/*.md)       │ │
│  └────┬────┘  └──────┬───────┘  └─────────────────────┘ │
└───────┼──────────────┼──────────────────────────────────┘
        │              │
        │   link/embed │
        ▼              ▼
┌─────────────────────────────────────────────────────────┐
│              Unity Play (WebGL hosting)                  │
│  play.unity.com / play.unity3dusercontent.com           │
└─────────────────────────────────────────────────────────┘
```

### Data flow: adding a game

1. Build WebGL in Unity → zip → upload to Unity Play
2. Copy share URL and (optional) embed URL from Unity Play
3. Create `content/games/my-game.md` with metadata + thumbnail image
4. Commit, push → CI builds and deploys static site
5. Game appears on home grid and has its own detail page

---

## Tech stack

| Component | Technology |
|-----------|------------|
| Framework | Astro 5.x |
| Language | TypeScript |
| Styling | Tailwind CSS (or CSS modules — decide at scaffold) |
| Content | Astro Content Collections |
| Images | `astro:assets` for optimized thumbnails |
| SEO | `@astrojs/sitemap`, per-page meta |
| Hosting | Cloudflare Pages or Vercel |
| CI | Host-native (build on push) |

---

## UI direction

- **Tone:** Clean, game-dev portfolio — dark or neutral theme works well for game showcases
- **Layout:** Responsive card grid (1 col mobile → 2–3 cols desktop)
- **Typography:** Distinct but readable; avoid generic "AI slop" font stacks
- **Game cards:** Thumbnail, title, 1-line description, tag pills
- **Motion:** Subtle hover on cards only; no heavy animation libraries on v1

Specific visual design to be refined during implementation. Functional wireframe:

```
┌──────────────────────────────────────────┐
│  VERDACIO          [About]               │
├──────────────────────────────────────────┤
│  Games I build in Unity                  │
│  ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ thumb  │ │ thumb  │ │ thumb  │       │
│  │ Title  │ │ Title  │ │ Title  │       │
│  │ tags   │ │ tags   │ │ tags   │       │
│  └────────┘ └────────┘ └────────┘       │
├──────────────────────────────────────────┤
│  © 2026 · GitHub · Unity Play            │
└──────────────────────────────────────────┘
```

---

## Error handling

| Scenario | Behavior |
|----------|----------|
| Game slug not found | 404 page |
| Missing thumbnail | Fallback placeholder image |
| Unity Play down / embed fails | "Play on Unity Play" link still works; show message on embed area |
| Invalid content frontmatter | Build fails with clear validation error (Zod schema) |

---

## Testing strategy (v1)

- **Build:** `astro build` must pass with zero errors
- **Content:** Schema validation catches bad game entries at build time
- **Manual:** Verify each game link opens Unity Play; test embed on mobile + desktop
- **Lighthouse:** Target 90+ on home page (no embed); game detail with embed will score lower — acceptable

---

## Implementation phases

### Phase 1 — Scaffold (MVP)

- Astro project with Tailwind
- Content Collections for games
- Home + game detail + about + 404
- One example/placeholder game entry
- Deploy to Cloudflare Pages or Vercel

### Phase 2 — Polish

- Featured game on home
- Screenshot gallery on detail pages
- Open Graph images per game
- Tag filtering on home

### Phase 3 — Optional enhancements

- Blog/devlog
- RSS feed
- Analytics
- Light/dark theme toggle

---

## Open questions

1. **Site name/branding:** Confirm "Verdacio" is the public name (repo is `PortfolioWebsite`)
2. **Domain:** Custom domain TBD
3. **Embed default:** Show embed on detail pages by default, or link-only?
4. **Theme:** Dark-first or light-first?

---

## Approval

- [ ] Design reviewed by project owner
- [ ] Open questions resolved
- [ ] Ready for implementation plan
