import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const imagesDir = fileURLToPath(new URL('../public/images/games/', import.meta.url));

const targets = [
  { file: 'cozy-forest.png', width: 800, height: 450 },
  { file: 'cozy-forest-moonlit.png', width: 1280 },
  { file: 'cozy-forest-diary.png', width: 1280 },
  { file: 'cozy-forest-finds.png', width: 1280 },
];

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

for (const { file, width, height } of targets) {
  const filePath = path.join(imagesDir, file);
  const before = (await fs.stat(filePath)).size;

  let pipeline = sharp(filePath).resize({
    width,
    height,
    fit: height ? 'cover' : 'inside',
    withoutEnlargement: true,
  });

  pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 80 });

  const output = await pipeline.toBuffer();
  await fs.writeFile(filePath, output);

  console.log(`${file}: ${formatKb(before)} -> ${formatKb(output.length)}`);
}
