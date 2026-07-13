# Unity Play integration

Publish Unity WebGL games to Unity Play and get embed URLs for Playframe. **You do not upload WebGL to Vercel.**

---

## Prerequisites

- Unity project with WebGL build support
- Unity account ([id.unity.com](https://id.unity.com))
- (Optional) [WebGL Publisher package](https://docs.unity3d.com/Packages/com.unity.connect.share@latest) for in-Editor publish

---

## Step 1: Build for WebGL

1. **File → Build Settings** → select **WebGL** → **Switch Platform**
2. Click **Build** → choose output folder
3. Wait for build to complete

---

## Step 2: Zip the build

**Windows:** Right-click folder → Send to → Compressed folder  
**macOS:** Right-click → Compress  
**Linux:** `zip -r my-game.zip WebGL/`

---

## Step 3: Upload to Unity Play

1. Go to [play.unity.com/upload](https://play.unity.com/upload)
2. Sign in → drag and drop zip
3. Fill in title, description, thumbnail
4. Set visibility:
   - **Unlisted** — recommended if Playframe is the main entry point
   - **Public** — also discoverable on Unity Play
5. Click **Publish**

The WebGL files are now hosted by Unity — not on your machine or Vercel.

---

## Step 4: Get URLs for Playframe

### Share URL (fallback link)

```
https://play.unity.com/en/games/<uuid>
```

Used for "Open on Unity Play" when embed has issues.

### Embed URL (required — primary playback)

1. On your Unity Play game page → **Share → Embed**
2. Copy the iframe `src`:

```
https://play.unity3dusercontent.com/webgl/<uuid>?screenshot=false&embedType=embed
```

This is what Playframe uses in the `<iframe>` on game detail pages. Unity serves the game from their CDN — you paste a URL, not upload files.

Official iframe example from Unity Play team:

```html
<iframe
  frameborder="0"
  allow="autoplay; fullscreen; vr"
  allowfullscreen
  src="https://play.unity3dusercontent.com/webgl/<uuid>?screenshot=false&embedType=embed"
  width="810"
  height="640"
></iframe>
```

See [Unity Play embed research](../research/unity-play-embed-research.md) for full details.

---

## Step 5: Add to Playframe

See [Adding a game](adding-a-game.md). You need both `unityPlayUrl` and `embedUrl`.

---

## Updating a published game

1. Rebuild in Unity → new zip
2. Re-upload to Unity Play (update existing game)
3. **Embed URL stays the same** — no Playframe change unless metadata/thumbnail changed

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No Embed option | Ensure game is published (not draft) |
| Embed doesn't load | Check `embedUrl` domain is `play.unity3dusercontent.com` |
| Mobile issues | Use "Open on Unity Play" fallback link |
| Slow load | Optimize Unity build size; lazy-load iframe on Playframe |

---

## Resources

- [Unity Play FAQ](https://play.unity.com/en/faq)
- [Unity Learn: Publish to WebGL](https://learn.unity.com/pathway/unity-essentials/unit/publishing-essentials/tutorial/publish-to-webgl-1)
- [Unity Discussions: embed iframe](https://discussions.unity.com/t/how-can-i-make-an-embed-code-that-looks-exactly-like-on-play-unity/838018/5)
