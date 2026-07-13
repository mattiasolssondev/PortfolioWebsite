# Game content schema

Each game is a content entry validated at build time by Astro Content Collections and Zod.

---

## File location

```
content/games/<slug>.md
```

The filename should match the `slug` field (kebab-case).

---

## Frontmatter schema

### Required fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Display name |
| `slug` | `string` | URL segment, kebab-case, unique |
| `description` | `string` | Short summary (card + meta); 1–2 sentences |
| `unityPlayUrl` | `string` | Public Unity Play page URL (`https://play.unity.com/...`) |
| `thumbnail` | `string` | Path to image, relative to `content/games/` or `public/` |
| `status` | `enum` | `released` \| `coming-soon` \| `archived` |
| `releasedAt` | `date` | ISO date (`2026-07-01`) |

### Optional fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `embedUrl` | `string` | — | Unity Play iframe src URL |
| `tags` | `string[]` | `[]` | e.g. `["puzzle", "3d", "webgl"]` |
| `featured` | `boolean` | `false` | Show in home hero |
| `screenshots` | `string[]` | `[]` | Gallery image paths |
| `engine` | `string` | `"Unity"` | Shown in metadata |
| `platform` | `string` | `"WebGL"` | Shown in metadata |
| `unityVersion` | `string` | — | e.g. `"6000.0.34f1"` |
| `playTime` | `string` | — | e.g. `"5–10 min"` |

---

## Example entry

```markdown
---
title: "Neon Drift"
slug: "neon-drift"
description: "A fast arcade racer through a neon city. Dodge traffic and beat your best time."
unityPlayUrl: "https://play.unity.com/en/games/00000000-0000-0000-0000-000000000000"
embedUrl: "https://play.unity3dusercontent.com/webgl/00000000-0000-0000-0000-000000000000?screenshot=false&embedType=embed"
thumbnail: "./images/neon-drift-cover.png"
screenshots:
  - "./images/neon-drift-1.png"
  - "./images/neon-drift-2.png"
tags:
  - arcade
  - racing
  - webgl
status: released
featured: true
releasedAt: 2026-06-15
unityVersion: "6000.0.34f1"
---

## About

Longer description in markdown. Supports **bold**, lists, and more.

### How to play

- Arrow keys or WASD to steer
- Space to boost

### Credits

Music by …
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
      embedUrl: z.string().url().optional(),
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

## Status behavior

| Status | On home grid | Detail page | Play CTA |
|--------|--------------|-------------|----------|
| `released` | Visible | Full | Active |
| `coming-soon` | Visible (badge) | Teaser only | Disabled |
| `archived` | Hidden | Accessible via URL | Link may still work |

---

## Image guidelines

| Asset | Recommended size | Format |
|-------|------------------|--------|
| Thumbnail | 800×450 (16:9) | PNG or WebP |
| Screenshots | 1280×720 | PNG or WebP |

Store game images alongside the markdown file under `content/games/images/<slug>/` or in `public/images/games/<slug>/`.

---

## Validation rules

- `slug` must be unique across all game files
- `unityPlayUrl` must use `https://play.unity.com/` domain
- `embedUrl` if present must use `https://play.unity3dusercontent.com/` domain
- `releasedAt` cannot be in the future for `status: released` (warning only)
