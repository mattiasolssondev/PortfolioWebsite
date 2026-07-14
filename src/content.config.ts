import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const games = defineCollection({
  loader: glob({ base: './src/content/games', pattern: '**/*.md' }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      description: z.string().max(300),
      unityPlayUrl: z.string().url(),
      embedUrl: z.string().url().optional(),
      thumbnail: z.string(),
      poster: z.string().optional(),
      accentColor: z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/, 'accentColor must be a hex color like #8b7cf7')
        .optional(),
      screenshots: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      status: z.enum(['released', 'coming-soon', 'archived']),
      featured: z.boolean().default(false),
      releasedAt: z.coerce.date(),
      engine: z.string().default('Unity'),
      platform: z.string().default('WebGL'),
      unityVersion: z.string().optional(),
      playTime: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.status === 'released' && !data.embedUrl) {
        ctx.addIssue({
          code: 'custom',
          message: 'embedUrl is required for released games',
          path: ['embedUrl'],
        });
      }

      if (!data.unityPlayUrl.startsWith('https://play.unity.com/')) {
        ctx.addIssue({
          code: 'custom',
          message: 'unityPlayUrl must use https://play.unity.com/',
          path: ['unityPlayUrl'],
        });
      }

      if (data.embedUrl && !isValidEmbedUrl(data.embedUrl)) {
        ctx.addIssue({
          code: 'custom',
          message:
            'embedUrl must be a Unity Play embed URL (play.unity3dusercontent.com or play-prod.struckd.com frame API)',
          path: ['embedUrl'],
        });
      }
    }),
});

function isValidEmbedUrl(url: string): boolean {
  return (
    url.startsWith('https://play.unity3dusercontent.com/') ||
    url.startsWith('https://play-prod.struckd.com/api/v1/games/game/')
  );
}

export const collections = { games };
