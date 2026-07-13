# Agent instructions

Guidance for AI coding assistants working on Verdacio.

## Project purpose

Verdacio is a static Astro portfolio site linking to Unity WebGL games hosted on Unity Play. It is **not** a game host.

## Before implementing

1. Read [design spec](docs/superpowers/specs/2026-07-13-verdacio-design.md)
2. Read [architecture overview](docs/architecture/overview.md)
3. Read [content schema](docs/architecture/content-schema.md)

## Tech stack (approved)

- Astro 5.x + TypeScript
- Content Collections with Zod validation
- Tailwind CSS (unless design changes)
- Deploy to Cloudflare Pages or Vercel

## Conventions

- Game content lives in `content/games/*.md`
- Only link/embed `play.unity.com` and `play.unity3dusercontent.com` URLs
- Prefer static Astro components; use client islands only when needed
- Keep diffs minimal and focused
- Update docs when changing schema or architecture

## Do not

- Self-host WebGL builds without explicit request
- Add a CMS, database, or auth in v1
- Ship heavy client JS on the home page
- Skip content schema validation

## Key docs

| Task | Doc |
|------|-----|
| Add a game | `docs/guides/adding-a-game.md` |
| Unity Play publish | `docs/guides/unity-play-integration.md` |
| Deploy | `docs/guides/deployment.md` |
| Stack decisions | `docs/research/website-stack-research.md` |

## Branch naming

Cloud agent branches: `cursor/<description>-f8fd`
