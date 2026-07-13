# FAQ

## General

### What is Verdacio?

A personal website that showcases your Unity WebGL games. Games run on Unity Play; Verdacio is the portfolio and discovery layer.

### Why not host games directly on the site?

Unity WebGL builds are large (often 50–200+ MB), need specific server configuration, and consume bandwidth. Unity Play handles hosting for free and provides a stable player. Verdacio links to it.

### Can I use itch.io instead of Unity Play?

Yes. The content schema can be extended with an `itchUrl` field. v1 docs focus on Unity Play as the stated workflow.

---

## Unity Play

### Do I need a paid Unity license to publish on Unity Play?

Check current Unity licensing terms. Personal/hobby tiers have historically been able to publish WebGL; verify for your Unity version.

### Should games be Public or Unlisted on Unity Play?

- **Public** — discoverable on Unity Play browse/search
- **Unlisted** — only via direct link (good if Verdacio is the primary entry point)

### Does the Unity Play URL change when I update a build?

No. Updating a game keeps the same share URL. Verdacio content does not need updating for build-only changes.

### Can I embed games on Verdacio?

Yes, via Unity Play's embed iframe. See [Unity Play integration](../guides/unity-play-integration.md). Embeds are heavier than links — use on game detail pages, not the home grid.

### Why doesn't the embed work on my phone?

Mobile WebGL support varies. Always provide a direct "Play on Unity Play" link as fallback. Some Unity Play mobile issues have been reported and fixed over time — test on real devices.

---

## Website

### Why Astro instead of Next.js or WordPress?

Astro is optimized for content sites with minimal JavaScript. For a game catalog with mostly static pages, it's faster and simpler than a full React app. See [stack research](../research/website-stack-research.md).

### How do I add a new game?

See [Adding a game](../guides/adding-a-game.md). Summary: publish on Unity Play → add markdown file → deploy.

### How much does hosting cost?

Cloudflare Pages and Vercel both offer free tiers sufficient for a personal portfolio.

### Can I use a custom domain?

Yes. Configure in your hosting provider after deploy.

---

## Development

### The site isn't scaffolded yet — what can I do now?

Read the docs, review the design spec, and publish games to Unity Play. Implementation (Astro scaffold) is the next phase after design approval.

### How do I run the site locally?

See [local development](../guides/local-development.md) — available after Phase 1 implementation.
