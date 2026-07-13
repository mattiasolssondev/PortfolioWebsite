# Adding a game to Verdacio

End-to-end checklist: from Unity build to live on your portfolio site.

---

## Checklist

- [ ] Game built and published on Unity Play
- [ ] Share URL copied
- [ ] Embed URL copied (optional)
- [ ] Thumbnail image prepared (800×450, 16:9)
- [ ] Screenshots prepared (optional)
- [ ] Content file created in `content/games/`
- [ ] Site built locally and verified
- [ ] Changes committed and deployed

---

## 1. Publish on Unity Play

Follow [Unity Play integration](unity-play-integration.md) if you haven't already.

You need at minimum:

- **unityPlayUrl** — e.g. `https://play.unity.com/en/games/abc-123`

---

## 2. Prepare images

Create a folder for the game's images:

```
content/games/images/my-game/
├── cover.png          # Thumbnail (required)
├── screenshot-1.png   # Optional
└── screenshot-2.png
```

Or use `public/images/games/my-game/` if you prefer static public paths.

---

## 3. Create the content file

Create `content/games/my-game.md`:

```markdown
---
title: "My Game"
slug: "my-game"
description: "One-line pitch that appears on the game card."
unityPlayUrl: "https://play.unity.com/en/games/YOUR-UUID-HERE"
embedUrl: "https://play.unity3dusercontent.com/webgl/YOUR-UUID-HERE?screenshot=false&embedType=embed"
thumbnail: "./images/my-game/cover.png"
screenshots:
  - "./images/my-game/screenshot-1.png"
tags:
  - puzzle
  - 3d
status: released
featured: false
releasedAt: 2026-07-13
---

## About

Longer description here. What the game is about, what makes it interesting.

## Controls

- WASD — move
- Mouse — look
```

See [content schema](../architecture/content-schema.md) for all fields.

---

## 4. Verify locally

After the Astro site is scaffolded:

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) and check:

- [ ] Game appears on home grid
- [ ] Card thumbnail loads
- [ ] Detail page at `/games/my-game` renders
- [ ] "Play on Unity Play" opens the correct game
- [ ] Embed works (if included)

```bash
npm run build
```

Build must pass with no schema validation errors.

---

## 5. Deploy

```bash
git add content/games/my-game.md content/games/images/my-game/
git commit -m "Add game: My Game"
git push
```

Hosting (Cloudflare Pages / Vercel) rebuilds automatically on push to `main`.

---

## Coming soon entries

For games not yet released, use `status: coming-soon`:

```yaml
status: coming-soon
unityPlayUrl: "https://play.unity.com/en/games/..."  # optional if unlisted private build
```

The card shows a "Coming soon" badge; play buttons are disabled.

---

## Removing or archiving a game

Set `status: archived` — the game disappears from the home grid but the detail URL can remain for old links.

To remove entirely, delete the markdown file and images, then redeploy.
