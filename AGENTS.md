# Agent instructions

Guidance for AI coding assistants working on Playframe.

## Project purpose

Playframe is a dark-themed static Astro portfolio on Vercel that embeds Unity WebGL games from Unity Play via iframe. It is **not** a game host — WebGL builds are never uploaded to Vercel.

## Before implementing

1. Read [design spec](docs/superpowers/specs/2026-07-13-playframe-design.md)
2. Read [Unity Play embed research](docs/research/unity-play-embed-research.md)
2. Read [architecture overview](docs/architecture/overview.md)
3. Read [content schema](docs/architecture/content-schema.md)

## Tech stack (approved)

- Astro 5.x + TypeScript
- Content Collections with Zod validation
- Tailwind CSS, dark theme
- Deploy to Vercel

## Conventions

- Game content lives in `content/games/*.md`
- Only link/embed `play.unity.com` and `play.unity3dusercontent.com` URLs
- Prefer static Astro components; use client islands only when needed
- Keep diffs minimal and focused
- Update docs when changing schema or architecture

## Do not

- Self-host WebGL builds on Vercel (Unity Play embed only)
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
