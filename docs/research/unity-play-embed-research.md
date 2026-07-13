# Unity Play embed research

**Date:** 2026-07-13  
**Status:** Approved  
**Question:** Can we embed games on our website from Unity Play without uploading WebGL builds to our own hosting (Vercel)?

---

## Short answer

**Yes.** Unity Play officially supports third-party embedding via iframe. You upload the WebGL build to **Unity Play only** — your Vercel site never hosts `.wasm`, `.data`, or other build files. The site stores metadata, thumbnails, and an embed URL; the game runs inside Unity Play's iframe player.

---

## What you upload where

| Asset | Where it goes | Who hosts it |
|-------|---------------|--------------|
| WebGL build (zip) | Unity Play | Unity (`play.unity3dusercontent.com`) |
| Thumbnails, screenshots | Your git repo → Vercel | You (static files) |
| Game descriptions, tags | `content/games/*.md` | You (static site) |
| The actual game runtime | Nowhere on Vercel | Unity Play iframe |

**You do not** FTP, S3-upload, or deploy WebGL binaries to Vercel. That is intentional — WebGL builds are large (often 50–200+ MB), need special MIME/compression headers, and consume bandwidth.

---

## How Unity Play embedding works

### Official embed flow

1. Build WebGL in Unity Editor
2. Zip and upload to [play.unity.com/upload](https://play.unity.com/upload)
3. On your game's Unity Play page: **Share → Embed**
4. Copy the iframe `src` URL (or full iframe snippet)
5. Paste the `embedUrl` into your Playframe game content file
6. Playframe renders an `<iframe>` pointing at Unity's CDN

### Confirmed by Unity

Unity Play team confirmed third-party embedding in [Unity Discussions](https://discussions.unity.com/t/how-can-i-make-an-embed-code-that-looks-exactly-like-on-play-unity/838018/5):

> "There is a Shared → Embed option that can be used, and the width & height should be configurable there."

Example embed URL pattern:

```
https://play.unity3dusercontent.com/webgl/<game-uuid>?screenshot=false&embedType=embed
```

Example iframe:

```html
<iframe
  id="webgl_iframe"
  frameborder="0"
  allow="autoplay; fullscreen; vr"
  allowfullscreen
  src="https://play.unity3dusercontent.com/webgl/<game-uuid>?screenshot=false&embedType=embed"
  width="810"
  height="640"
></iframe>
```

The game files are served from `play.unity3dusercontent.com` — not from your domain.

---

## Playframe embed strategy

### Game detail page (primary playback)

- **Embedded player** front and center — visitors play without leaving your site
- **"Open on Unity Play"** link as fallback (new tab) for mobile issues or iframe problems
- Lazy-load iframe (`loading="lazy"`) or load on "Play" click to keep initial page load fast

### Home page

- **No iframes** — thumbnail cards only
- Clicking a card goes to the game detail page where the embed lives

### What Playframe stores per game

```yaml
unityPlayUrl: "https://play.unity.com/en/games/<uuid>"   # fallback link
embedUrl: "https://play.unity3dusercontent.com/webgl/<uuid>?screenshot=false&embedType=embed"  # iframe src
```

`embedUrl` is required for released games (not optional).

---

## Limitations and caveats

| Topic | Detail |
|-------|--------|
| **Upload target** | WebGL still must be uploaded to Unity Play — you cannot skip that step |
| **iframe styling** | Unity injects wrapper CSS (`game-wrapper_*` classes); limited control over player chrome |
| **Mobile** | WebGL on mobile is inconsistent; always provide Unity Play link fallback |
| **Login quirks** | Historical issues with mobile requiring login — test on real devices |
| **Visibility** | Use **Unlisted** on Unity Play if you want traffic primarily from Playframe |
| **Updates** | Re-upload zip to Unity Play; embed URL stays the same |
| **Offline** | If Unity Play is down, embed fails — fallback link is essential |
| **X-Frame-Options** | Unity Play embed URLs are designed for iframes; self-hosted builds may block embedding |

---

## Alternatives considered

| Approach | Self-host WebGL? | Embed on your site? | Verdict |
|----------|------------------|---------------------|---------|
| **Unity Play embed** | No | Yes (iframe) | **Chosen** — matches requirements |
| Unity Play link only | No | No (redirect) | Worse UX; visitors leave your site |
| Self-host on Vercel | Yes | Yes (iframe to your domain) | Rejected — large files, bandwidth, MIME config |
| itch.io embed | No (host on itch) | Yes | Viable alternative, not Unity-native |
| Simmer.io embed | No | Yes | Viable alternative, extra platform |

---

## Decision

**Use Unity Play as the sole game host. Embed via official iframe on game detail pages. Do not upload WebGL builds to Vercel.**

This gives you:
- Zero game hosting cost on Vercel
- Play-in-place UX on your portfolio
- Simple updates (re-upload to Unity Play only)
- Stable embed URLs across build updates

---

## Sources

- [Unity Play FAQ](https://play.unity.com/en/faq)
- [Unity Discussions: Unity Play embed iframe](https://discussions.unity.com/t/how-can-i-make-an-embed-code-that-looks-exactly-like-on-play-unity/838018/5)
- [Unity Learn: Publish to WebGL](https://learn.unity.com/pathway/unity-essentials/unit/publishing-essentials/tutorial/publish-to-webgl-1)
