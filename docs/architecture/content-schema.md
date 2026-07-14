# Game content schema

Each game is a content entry validated at build time by Astro Content Collections and Zod.

---

## File location

```
content/games/<slug>.md
```

---

## Frontmatter schema

### Required fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Display name |
| `slug` | `string` | URL segment, kebab-case, unique |
| `description` | `string` | Short summary (card + meta); 1–2 sentences |
| `unityPlayUrl` | `string` | Unity Play page URL — fallback link |
| `embedUrl` | `string` | Unity Play iframe src — **primary playback** |
| `thumbnail` | `string` | Path to cover image |
| `poster` | `string` | Optional embed play-screen image (falls back to `thumbnail`) |
| `accentColor` | `string` | Optional hex color for embed chrome, e.g. `"#c9a96e"` |
| `status` | `enum` | `released` \| `coming-soon` \| `archived` |
| `releasedAt` | `date` | ISO date (`2026-07-01`) |

### Optional fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tags` | `string[]` | `[]` | e.g. `["puzzle", "3d", "webgl"]` |
| `featured` | `boolean` | `false` | Show in home hero |
| `screenshots` | `string[]` | `[]` | Gallery image paths |
| `engine` | `string` | `"Unity"` | Shown in metadata |
| `platform` | `string` | `"WebGL"` | Shown in metadata |
| `unityVersion` | `string` | — | e.g. `"6000.0.34f1"` |
| `playTime` | `string` | — | e.g. `"5–10 min"` |

### `embedUrl` requirement

For `status: released`, `embedUrl` is **required**. The build fails without it. Coming-soon games may omit it.

---

## Example entry

```markdown
---
title: "Neon Drift"
slug: "neon-drift"
description: "A fast arcade racer through a neon city."
unityPlayUrl: "https://play.unity.com/en/games/00000000-0000-0000-0000-000000000000"
embedUrl: "https://play.unity3dusercontent.com/webgl/00000000-0000-0000-0000-000000000000?screenshot=false&embedType=embed"
thumbnail: "./images/neon-drift-cover.png"
tags:
  - arcade
  - racing
status: released
featured: true
releasedAt: 2026-06-15
---

## About

Longer description in markdown.
```

---

## Zod schema (reference for implementation)

```typescript
import { z, defineCollection } from 'astro:content';

const games = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      description: z.string().max(300),
      unityPlayUrl: z.string().url(),
      embedUrl: z.string().url(),
      thumbnail: image(),
      screenshots: z.array(image()).optional(),
      tags: z.array(z.string()).default([]),
      status: z.enum(['released', 'coming-soon', 'archived']),
      featured: z.boolean().default(false),
      releasedAt: z.coerce.date(),
      engine: z.string().default('Unity'),
      platform: z.string().default('WebGL'),
      unityVersion: z.string().optional(),
      playTime: z.string().optional(),
    }),
});

export const collections = { games };
```

---

## URL validation

- `unityPlayUrl` must use `https://play.unity.com/` domain
- `embedUrl` must use `https://play.unity3dusercontent.com/` domain

---

## Image guidelines

| Asset | Size | Format |
|-------|------|--------|
| Thumbnail | 800×450 (16:9) | PNG or WebP |
| Screenshots | 1280×720 | PNG or WebP |

Store under `content/games/images/<slug>/` or `public/images/games/<slug>/`.
