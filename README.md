# Playframe

A dark-themed game portfolio hosted on [Vercel](https://vercel.com/), showcasing WebGL games embedded from [Unity Play](https://play.unity.com/).

**Playframe** is the public-facing home for games you create. Each game is built in Unity, published to Unity Play, and **embedded on your site via iframe** — you never upload WebGL builds to Vercel.

## Status

**Phase:** MVP scaffolded — ready to add games and deploy

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build → dist/
```

## Add a game

1. Publish WebGL to [Unity Play](https://play.unity.com/upload)
2. Copy share URL + embed URL (Share → Embed)
3. Create `src/content/games/my-game.md` (see `your-first-game.md` for template)
4. Add thumbnail to `public/images/`
5. Set `status: released` and include `embedUrl`
6. Push to `main` → Vercel deploys

Full guide: [docs/guides/adding-a-game.md](docs/guides/adding-a-game.md)

## Stack

| Layer | Choice |
|-------|--------|
| Framework | [Astro 7](https://astro.build/) + Content Collections |
| Styling | Tailwind CSS 4, dark theme |
| Hosting | **Vercel** |
| Game hosting | **Unity Play** (embedded via iframe) |
| Content | `src/content/games/*.md` |

## Workflow

```
Unity → WebGL build → Unity Play → copy embed URL → add src/content/games/*.md → deploy to Vercel
```

## Project structure

```
/
├── src/
│   ├── components/       # GameCard, UnityPlayEmbed, Header, Footer
│   ├── content/games/    # Game markdown entries
│   ├── layouts/          # BaseLayout, GameLayout
│   ├── pages/            # Home, about, game detail, 404
│   └── styles/global.css # Dark theme tokens
├── public/images/        # Thumbnails and static assets
├── docs/                 # Project documentation
└── vercel.json
```

## Documentation

See [docs/README.md](docs/README.md) for the full index.

| Doc | Purpose |
|-----|---------|
| [Design spec](docs/superpowers/specs/2026-07-13-playframe-design.md) | Approved architecture and UI direction |
| [Embed research](docs/research/unity-play-embed-research.md) | Unity Play iframe without self-hosting |
| [Unity Play guide](docs/guides/unity-play-integration.md) | Publish and get embed URLs |
| [Deployment](docs/guides/deployment.md) | Deploy to Vercel |

## Deploy to Vercel

1. Import this repo at [vercel.com/new](https://vercel.com/new)
2. Vercel auto-detects Astro — deploy
3. Add custom domain later in project settings

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
