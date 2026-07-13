# Adding a game to Playframe

Checklist: Unity Play publish → embed URL → content file → deploy to Vercel.

---

## Checklist

- [ ] Game published on Unity Play
- [ ] Share URL copied (`unityPlayUrl`)
- [ ] Embed URL copied from Share → Embed (`embedUrl`)
- [ ] Thumbnail prepared (800×450, 16:9)
- [ ] Content file in `content/games/`
- [ ] Build passes locally
- [ ] Pushed to `main` → Vercel deploys

---

## 1. Publish on Unity Play

Follow [Unity Play integration](unity-play-integration.md). You need **both** URLs:

| Field | Source |
|-------|--------|
| `unityPlayUrl` | Browser URL of game page |
| `embedUrl` | Share → Embed → iframe `src` |

**Do not** upload WebGL files anywhere else.

---

## 2. Prepare thumbnail

```
content/games/images/my-game/cover.png
```

---

## 3. Create content file

`content/games/my-game.md`:

```markdown
---
title: "My Game"
slug: "my-game"
description: "One-line pitch for the game card."
unityPlayUrl: "https://play.unity.com/en/games/YOUR-UUID"
embedUrl: "https://play.unity3dusercontent.com/webgl/YOUR-UUID?screenshot=false&embedType=embed"
thumbnail: "./images/my-game/cover.png"
tags:
  - puzzle
status: released
releasedAt: 2026-07-13
---

## About

Full description. The game plays via Unity Play embed above.
```

---

## 4. Verify locally

```bash
npm install
npm run dev
```

Check:

- [ ] Card on home page
- [ ] Detail page embed loads and game is playable
- [ ] "Open on Unity Play" fallback works

```bash
npm run build
```

---

## 5. Deploy

```bash
git add content/games/
git commit -m "Add game: My Game"
git push
```

Vercel rebuilds automatically. No game files go to Vercel — only metadata and thumbnail.

---

## Coming soon

Use `status: coming-soon` — embed optional, play disabled.

---

## Updating builds

Re-upload to Unity Play only. Playframe content unchanged unless title/thumbnail/description changed.
