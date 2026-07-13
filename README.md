# Verdacio

A personal game portfolio website for showcasing and linking to WebGL games hosted on [Unity Play](https://play.unity.com/).

Verdacio is the public-facing home for games you create. Each game is built in Unity, published to Unity Play, and linked (or embedded) from this site. The site itself stays fast, simple, and easy to maintain.

## Status

**Phase:** Documentation and planning (implementation not started)

See [docs/README.md](docs/README.md) for the full documentation index.

## Quick links

| Doc | Purpose |
|-----|---------|
| [Design spec](docs/superpowers/specs/2026-07-13-verdacio-design.md) | What we're building and why |
| [Stack research](docs/research/website-stack-research.md) | Framework and hosting comparison |
| [Architecture](docs/architecture/overview.md) | Site structure and data flow |
| [Unity Play guide](docs/guides/unity-play-integration.md) | Publish games and get embed links |
| [Adding a game](docs/guides/adding-a-game.md) | Add a new game to the site |
| [Deployment](docs/guides/deployment.md) | Ship the site to production |

## Recommended stack

After research, the recommended approach is:

- **Framework:** [Astro](https://astro.build/) with Content Collections
- **Hosting:** Cloudflare Pages or Vercel (free tier, global CDN)
- **Game hosting:** Unity Play (WebGL builds)
- **Content:** Markdown/JSON game catalog checked into the repo

See [docs/research/website-stack-research.md](docs/research/website-stack-research.md) for the full comparison.

## Workflow (high level)

```
Unity Editor → WebGL build → zip → Unity Play → get share/embed URL → add entry to Verdacio → deploy site
```

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

Documentation is ready. To begin implementation:

1. Read the [design spec](docs/superpowers/specs/2026-07-13-verdacio-design.md)
2. Review [architecture overview](docs/architecture/overview.md)
3. Follow the implementation plan (to be created after design approval)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

TBD — add a license before public release.
