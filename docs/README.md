# Playframe documentation

Documentation for the Playframe game portfolio website.

## Index

### Planning and design

| Document | Description |
|----------|-------------|
| [Design spec](superpowers/specs/2026-07-13-playframe-design.md) | Approved direction: Playframe, Vercel, dark theme, Unity Play embeds |
| [Unity Play embed research](research/unity-play-embed-research.md) | Embed from Unity Play without self-hosting WebGL |
| [Stack research](research/website-stack-research.md) | Framework and hosting comparison |

### Architecture

| Document | Description |
|----------|-------------|
| [Overview](architecture/overview.md) | System architecture, pages, and data flow |
| [Content schema](architecture/content-schema.md) | Game metadata fields and validation rules |

### Guides

| Document | Description |
|----------|-------------|
| [Unity Play integration](guides/unity-play-integration.md) | Build, publish, and get embed links |
| [Adding a game](guides/adding-a-game.md) | Step-by-step: new game → live on Playframe |
| [Deployment](guides/deployment.md) | Deploy to Vercel |
| [Local development](guides/local-development.md) | Run the site locally (after scaffolding) |

### Reference

| Document | Description |
|----------|-------------|
| [Glossary](reference/glossary.md) | Terms used across the project |
| [FAQ](reference/faq.md) | Common questions |

## Document conventions

- **Specs** live under `docs/superpowers/specs/` and describe *what* to build.
- **Guides** are procedural — follow them step by step.
- **Architecture** docs explain *how* the system fits together.
- **Research** docs capture decisions and alternatives considered.

## Status legend

| Label | Meaning |
|-------|---------|
| Draft | Written but not yet reviewed |
| Approved | Reviewed and ready to implement |
| Implemented | Matches current codebase |
