# Local development

> **Note:** This guide applies after the Astro site is scaffolded (Phase 1 implementation). The repo currently contains documentation only.

---

## Prerequisites

- **Node.js** 20 LTS or newer
- **npm** 10+ (or pnpm/yarn if you switch the project)
- Git

---

## First-time setup

```bash
git clone https://github.com/mattiasolssondev/PortfolioWebsite.git
cd PortfolioWebsite
npm install
```

---

## Development server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). The dev server hot-reloads on file changes.

---

## Common commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run astro check` | TypeScript + Astro diagnostics |

---

## Working with game content

1. Add or edit files in `content/games/`
2. Save — dev server reloads
3. Schema errors appear in the terminal if frontmatter is invalid

---

## Project structure

See [architecture overview](../architecture/overview.md).

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `EACCES` on npm install | Don't use `sudo`; fix npm permissions or use nvm |
| Port 4321 in use | `npm run dev -- --port 4322` |
| Content schema error | Compare frontmatter to [content schema](../architecture/content-schema.md) |
| Images not loading | Check path is relative to the markdown file or under `public/` |
