# Contributing to Playframe

Thanks for contributing. Playframe is a personal game portfolio, but contributions (docs, fixes, features) are welcome.

---

## Getting started

1. Read [docs/README.md](docs/README.md) for documentation index
2. Read the [design spec](docs/superpowers/specs/2026-07-13-playframe-design.md)
3. For local setup (after scaffolding), see [local development](docs/guides/local-development.md)

---

## Adding a game

This is the most common contribution. Follow [Adding a game](docs/guides/adding-a-game.md):

1. Publish on Unity Play
2. Add `content/games/<slug>.md` + images
3. Verify build passes
4. Open a PR

---

## Code changes

### Branch naming

```
cursor/<short-description>-f8fd   # cloud agent branches
feature/<short-description>       # manual feature branches
fix/<short-description>           # bug fixes
docs/<short-description>          # documentation only
```

### Commit messages

Use clear, imperative subject lines:

```
Add game: Neon Drift
Fix game card layout on mobile
Docs: clarify Unity Play embed URL format
```

### Pull requests

- Keep PRs focused — one game or one feature per PR when possible
- Ensure `npm run build` passes (once site is scaffolded)
- Update docs if you change content schema or architecture

---

## Documentation

- Specs go in `docs/superpowers/specs/`
- Guides go in `docs/guides/`
- Update [docs/README.md](docs/README.md) index when adding new docs

---

## Code style (when implemented)

- TypeScript for Astro components and config
- Prefer Astro components (`.astro`) over client frameworks unless interactivity is needed
- Match existing formatting; run formatter if configured
- No unnecessary comments — code should be self-explanatory

---

## Questions

Open a GitHub issue for bugs, feature ideas, or questions.
