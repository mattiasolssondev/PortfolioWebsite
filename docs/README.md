# Verdacio documentation

Documentation for the Verdacio game portfolio website.

## Index

### Planning and design

| Document | Description |
|----------|-------------|
| [Design spec](superpowers/specs/2026-07-13-verdacio-design.md) | Approved direction, pages, content model, and tech choices |
| [Stack research](research/website-stack-research.md) | Framework, hosting, and Unity Play integration research |

### Architecture

| Document | Description |
|----------|-------------|
| [Overview](architecture/overview.md) | System architecture, pages, and data flow |
| [Content schema](architecture/content-schema.md) | Game metadata fields and validation rules |

### Guides

| Document | Description |
|----------|-------------|
| [Unity Play integration](guides/unity-play-integration.md) | Build, publish, and embed games from Unity Play |
| [Adding a game](guides/adding-a-game.md) | Step-by-step: new game → live on Verdacio |
| [Deployment](guides/deployment.md) | Build and deploy the static site |
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
