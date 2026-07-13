# Playframe

A dark-themed game portfolio hosted on [Vercel](https://vercel.com/), showcasing WebGL games embedded from [Unity Play](https://play.unity.com/).

**Playframe** is the public-facing home for games you create. Each game is built in Unity, published to Unity Play, and **embedded on your site via iframe** — you never upload WebGL builds to Vercel.

## Status

**Phase:** Documentation and planning (implementation not started)

See [docs/README.md](docs/README.md) for the full documentation index.

## Quick links

| Doc | Purpose |
|-----|---------|
| [Design spec](docs/superpowers/specs/2026-07-13-playframe-design.md) | What we're building and why |
| [Embed research](docs/research/unity-play-embed-research.md) | Unity Play iframe — no self-hosting |
| [Stack research](docs/research/website-stack-research.md) | Framework and hosting comparison |
| [Architecture](docs/architecture/overview.md) | Site structure and data flow |
| [Unity Play guide](docs/guides/unity-play-integration.md) | Publish games and get embed URLs |
| [Adding a game](docs/guides/adding-a-game.md) | Add a new game to the site |
| [Deployment](docs/guides/deployment.md) | Deploy to Vercel |

## Stack

| Layer | Choice |
|-------|--------|
| Framework | [Astro](https://astro.build/) + Content Collections |
| Hosting | **Vercel** |
| Game hosting | **Unity Play** (embedded via iframe) |
| Theme | **Dark-first** |
| Content | Markdown game catalog in git |

## Workflow

```
Unity → WebGL build → Unity Play → copy embed URL → add to Playframe → deploy to Vercel
```

WebGL files stay on Unity Play. Vercel only serves the static site (HTML, CSS, thumbnails, metadata).

## Repository structure (planned)

```
/
├── docs/                  # Project documentation
├── src/                   # Astro site source (to be scaffolded)
├── public/                # Static assets (images, favicon)
├── content/
│   └── games/             # Game metadata (one file per game)
└── README.md
```

## Getting started

1. Read the [design spec](docs/superpowers/specs/2026-07-13-playframe-design.md)
2. Read [Unity Play embed research](docs/research/unity-play-embed-research.md)
3. Review [architecture overview](docs/architecture/overview.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

TBD — add a license before public release.
