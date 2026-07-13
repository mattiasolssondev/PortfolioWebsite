# Playframe design spec

**Date:** 2026-07-13  
**Status:** Implemented (MVP)  
**Author:** Project setup  

---

## Summary

**Playframe** is a personal game portfolio website that showcases WebGL games created in Unity. Games are hosted on Unity Play and **embedded via iframe** on game detail pages — WebGL builds are never uploaded to Vercel. Playframe provides branding, discovery, and context (descriptions, screenshots, tags) with in-site playback through Unity Play's official embed.

**Hosting:** [Vercel](https://vercel.com/) (static Astro site)  
**Theme:** Dark-first  
**Custom domain:** Added later  

---

## Name

**Playframe** — a portfolio that *frames* your games for play via Unity Play embeds.

- **Play** → Unity Play hosting
- **Frame** → iframe embed on your site
- Short, memorable, describes the architecture

---

## Goals

1. **Showcase games** — Visitors see what you've made and can play each game
2. **Play in place** — Embed Unity Play iframes so visitors stay on your site
3. **No self-hosting** — WebGL builds live on Unity Play only; Vercel serves static HTML + images
4. **Easy to maintain** — Adding a game is metadata + thumbnail + embed URL, then deploy
5. **Professional presence** — A cohesive dark-themed home for your work

## Non-goals (v1)

- Hosting WebGL builds on Vercel or any self-hosted storage
- User accounts, comments, or leaderboards
- Blog or news section (can add later)
- Multi-language support
- Custom domain (deferred)

---

## User stories

| As a… | I want to… | So that… |
|-------|------------|----------|
| Visitor | Browse a grid of games | I can discover what you've made |
| Visitor | Read about a game and play it on the same page | I don't have to leave your site |
| Visitor | Open the game on Unity Play if embed fails | I can still play on mobile or with issues |
| You (creator) | Upload WebGL to Unity Play only | I don't manage game file hosting |
| You (creator) | Add a new game in under 10 minutes | Shipping stays frictionless |
| You (creator) | Update a Unity Play build without changing Playframe | Embed URL stays stable |

---

## Pages

### Home (`/`)

- Hero: **Playframe** wordmark, short tagline, optional featured game
- Game grid: cards with thumbnail, title, tags, short description
- Dark background, subtle card borders/glow on hover
- Footer: social links, copyright

### Game detail (`/games/[slug]`)

- Title, full description (MDX supported)
- **Embedded Unity Play player** (primary) — iframe from `embedUrl`
- **"Open on Unity Play"** link (fallback, new tab)
- Screenshot gallery (optional, below player)
- Metadata: release date, tags, engine (Unity), platform (WebGL)
- Back link to home / related games by tag

### About (`/about`)

- Who you are, what you make, contact/social links

### 404

- Friendly message, link back home

---

## Content model

Each game is defined in `content/games/<slug>.md`. See [content schema](../architecture/content-schema.md).

**Required:** `title`, `slug`, `unityPlayUrl`, `embedUrl`, `description`, `thumbnail`, `status`, `releasedAt`  
**Optional:** `tags`, `featured`, `screenshots`, `unityVersion`, `playTime`

`embedUrl` is required for `status: released` games — embedding is the primary playback method.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Playframe on Vercel (Astro)               │
│  Static HTML/CSS + thumbnails only — NO WebGL files     │
│  ┌─────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │  Home   │  │ Game detail  │  │ Content Collections │ │
│  │  cards  │  │  + iframe    │  │  (games/*.md)       │ │
│  └─────────┘  └──────┬───────┘  └─────────────────────┘ │
└──────────────────────┼──────────────────────────────────┘
                       │ iframe embed (no file upload)
                       ▼
┌─────────────────────────────────────────────────────────┐
│              Unity Play (WebGL hosting)                  │
│  play.unity3dusercontent.com — serves game runtime     │
└─────────────────────────────────────────────────────────┘
```

See [Unity Play embed research](../research/unity-play-embed-research.md) for full analysis.

### Data flow: adding a game

1. Build WebGL in Unity → zip → upload to Unity Play (not Vercel)
2. Copy share URL + embed URL from Unity Play (Share → Embed)
3. Create `content/games/my-game.md` with metadata, `embedUrl`, and thumbnail
4. Commit, push → Vercel builds and deploys static site
5. Game appears on home grid; detail page embeds Unity Play player

---

## Tech stack

| Component | Technology |
|-----------|------------|
| Framework | Astro 5.x |
| Language | TypeScript |
| Styling | Tailwind CSS, **dark theme** |
| Content | Astro Content Collections |
| Images | `astro:assets` for optimized thumbnails |
| SEO | `@astrojs/sitemap`, per-page meta |
| Hosting | **Vercel** |
| Game hosting | **Unity Play** (embed only) |
| CI | Vercel git integration (build on push) |

---

## UI direction

- **Theme:** **Dark-first** — near-black background (`#0a0a0f` range), light text, accent color for CTAs
- **Tone:** Clean game-dev portfolio; let game thumbnails provide color
- **Layout:** Responsive card grid (1 col mobile → 2–3 cols desktop)
- **Typography:** Distinct but readable; avoid generic font stacks
- **Game cards:** Thumbnail, title, 1-line description, tag pills with subtle accent
- **Embed player:** 16:9 responsive wrapper, minimal chrome, dark border
- **Motion:** Subtle hover glow on cards only; no heavy animation libraries on v1

```
┌──────────────────────────────────────────┐
│  PLAYFRAME         [About]    ░ dark ░  │
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

Game detail:
┌──────────────────────────────────────────┐
│  ← Back    Game Title                    │
│  ┌────────────────────────────────────┐  │
│  │     Unity Play iframe embed        │  │
│  │         (game plays here)          │  │
│  └────────────────────────────────────┘  │
│  [Open on Unity Play ↗]                  │
│  Description, screenshots, tags...       │
└──────────────────────────────────────────┘
```

---

## Error handling

| Scenario | Behavior |
|----------|----------|
| Game slug not found | 404 page |
| Missing thumbnail | Fallback placeholder image |
| Missing `embedUrl` on released game | Build fails (schema validation) |
| Unity Play down / embed fails | Show message + "Open on Unity Play" link |
| Invalid content frontmatter | Build fails with clear validation error (Zod schema) |

---

## Testing strategy (v1)

- **Build:** `astro build` must pass with zero errors
- **Content:** Schema validation catches bad game entries at build time
- **Manual:** Verify each embed loads; test fallback link; test mobile + desktop
- **Lighthouse:** Target 90+ on home page; game detail with embed will score lower — acceptable

---

## Implementation phases

### Phase 1 — Scaffold (MVP)

- Astro project with Tailwind, dark theme tokens
- Content Collections for games (`embedUrl` required)
- Home + game detail (with embed) + about + 404
- One example game entry
- Deploy to **Vercel**

### Phase 2 — Polish

- Featured game on home
- Screenshot gallery on detail pages
- Open Graph images per game
- Tag filtering on home
- Lazy-load embed iframe

### Phase 3 — Optional enhancements

- Custom domain on Vercel
- Blog/devlog
- Analytics
- Light theme toggle (dark remains default)

---

## Resolved decisions

| Question | Decision |
|----------|----------|
| Site name | **Playframe** |
| Hosting | **Vercel** |
| Game hosting | **Unity Play embed** — no WebGL on Vercel |
| Embed vs link | **Embed primary** on detail pages; Unity Play link as fallback |
| Theme | **Dark-first** |
| Custom domain | **Later** — use Vercel subdomain initially |

---

## Approval

- [x] Design reviewed by project owner
- [x] Open questions resolved
- [x] Ready for implementation plan
- [x] Phase 1 MVP scaffolded
