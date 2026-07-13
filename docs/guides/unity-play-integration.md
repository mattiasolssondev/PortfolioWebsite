# Unity Play integration

How to publish Unity WebGL games to Unity Play and connect them to Verdacio.

---

## Prerequisites

- Unity project with WebGL build support installed
- Unity account ([id.unity.com](https://id.unity.com))
- (Optional) [WebGL Publisher package](https://docs.unity3d.com/Packages/com.unity.connect.share@latest) for in-Editor publish

---

## Step 1: Switch to WebGL platform

1. Open your project in Unity
2. **File → Build Settings**
3. Select **WebGL** → **Switch Platform**
4. Wait for the platform switch to complete

### Build settings tips

- Use **Development Build** only for testing; disable for release
- Enable compression if your host supports it (Unity Play handles this)
- Keep initial load small: optimize textures, use Addressables for large assets

---

## Step 2: Build for WebGL

1. In Build Settings, click **Build** (or **Build And Run**)
2. Choose an output folder (e.g. `Builds/WebGL`)
3. Wait for the build to finish

Output includes `index.html`, `.data`, `.framework.js`, `.loader.js`, and `.wasm` files.

---

## Step 3: Zip the build folder

Unity Play expects a **zip of the build folder contents** (or the folder itself — follow the upload UI).

**Windows:** Right-click folder → Send to → Compressed (zipped) folder  
**macOS:** Right-click folder → Compress  
**Linux:** `zip -r my-game-webgl.zip WebGL/`

---

## Step 4: Upload to Unity Play

### Option A: Web upload

1. Go to [play.unity.com/upload](https://play.unity.com/upload)
2. Sign in with your Unity account
3. Drag and drop the zip file
4. Wait for processing

### Option B: Unity Editor (WebGL Publisher)

1. Install the WebGL Publisher package via Package Manager
2. After building, use **Publish → Unity Play** from the Editor
3. Fill in metadata and publish

---

## Step 5: Configure visibility

| Setting | Recommendation for Verdacio |
|---------|----------------------------|
| **Title** | Match your Verdacio game title |
| **Description** | Can be shorter; full description lives on Verdacio |
| **Visibility** | **Unlisted** if you only want traffic from your site; **Public** if you also want Unity Play discovery |
| **Password** | Leave empty unless you need restricted access |

Click **Publish** or **Save**.

---

## Step 6: Get URLs for Verdacio

### Share URL (required)

From your game's page on Unity Play, copy the browser URL:

```
https://play.unity.com/en/games/<uuid>
```

This goes in `unityPlayUrl` in your game content file.

### Embed URL (optional)

1. On the Unity Play game page, open **Share**
2. Select **Embed**
3. Copy the iframe `src` URL:

```
https://play.unity3dusercontent.com/webgl/<uuid>?screenshot=false&embedType=embed
```

This goes in `embedUrl` in your game content file.

Example iframe (for reference):

```html
<iframe
  frameborder="0"
  allow="autoplay; fullscreen; vr"
  allowfullscreen
  src="https://play.unity3dusercontent.com/webgl/YOUR-GAME-ID?screenshot=false&embedType=embed"
  width="810"
  height="640"
></iframe>
```

---

## Step 7: Add to Verdacio

See [Adding a game](adding-a-game.md).

---

## Updating a published game

1. Make changes in Unity
2. Build WebGL again → new zip
3. Upload to Unity Play (same game entry — **update**, not new upload)
4. Unity Play keeps the same URL — **no Verdacio content change needed** unless title/description/thumbnail changed

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build won't switch to WebGL | Install WebGL module via Unity Hub |
| Upload fails | Check zip size limits; reduce build size |
| Game loads slowly | Optimize assets; check Unity Learn WebGL performance guides |
| Embed doesn't work on mobile | Provide direct Unity Play link as fallback |
| Login required on mobile | Ensure game is Public/Unlisted; known Unity Play issues — test in incognito |
| CORS / iframe blocked | Only use official Unity Play embed URLs |

---

## Resources

- [Unity Play FAQ](https://play.unity.com/en/faq)
- [Unity Learn: Publish to WebGL](https://learn.unity.com/pathway/unity-essentials/unit/publishing-essentials/tutorial/publish-to-webgl-1)
- [Unity Manual: WebGL deployment](https://docs.unity3d.com/Manual/webgl-deploying.html)
