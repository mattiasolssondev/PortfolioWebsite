# FAQ

## General

### What is Playframe?

A dark-themed personal website on Vercel that showcases your Unity WebGL games. Games run inside Unity Play iframes — you don't host WebGL files yourself.

### Why not host games on Vercel?

Unity WebGL builds are large (50–200+ MB), need special server configuration, and consume bandwidth. Unity Play hosts them for free and provides official embed iframes. Vercel only serves your static portfolio.

### Can I play games without leaving Playframe?

Yes. Game detail pages embed Unity Play via iframe. A fallback "Open on Unity Play" link is provided for mobile or embed issues.

---

## Unity Play

### Do I upload WebGL to Playframe/Vercel?

**No.** Upload only to Unity Play. Playframe stores the embed URL and renders an iframe.

### How do I get the embed URL?

On Unity Play: open your game → **Share → Embed** → copy the iframe `src`. See [Unity Play integration](../guides/unity-play-integration.md).

### Should games be Public or Unlisted on Unity Play?

- **Public** — discoverable on Unity Play browse/search
- **Unlisted** — only via direct link (good if Playframe is the primary entry point)

### Does the embed URL change when I update a build?

No. Re-upload to Unity Play; the embed URL stays the same. No Playframe content change needed for build-only updates.

### Why doesn't the embed work on my phone?

Mobile WebGL is inconsistent. Use the "Open on Unity Play" fallback link. Test on real devices.

---

## Website

### Why Astro on Vercel?

Astro is optimized for content sites with minimal JavaScript. Vercel has first-class Astro support with free hosting and preview deploys. See [stack research](../research/website-stack-research.md).

### Is the site dark themed?

Yes. Dark-first is the default and only theme in v1.

### When do I add a custom domain?

Whenever you're ready — configure in Vercel project settings. The site works on a `*.vercel.app` subdomain until then.

### How do I add a new game?

See [Adding a game](../guides/adding-a-game.md). Summary: publish on Unity Play → copy embed URL → add markdown file → deploy.

---

## Development

### The site isn't scaffolded yet — what can I do now?

Read the docs, publish games to Unity Play, and collect embed URLs. Implementation is the next phase.
