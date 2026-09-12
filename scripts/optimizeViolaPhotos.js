/**
 * Shrinks the Viola page images in place so a Lightroom export can be dropped
 * straight into src/assets/viola/ without bloating the bundle.
 *
 *   npm run viola:optimize
 *
 * Safe to re-run: already-small files are skipped.
 */
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PHOTO_DIR = path.join(ROOT, 'src/assets/viola');
const ASSET_DIR = path.join(ROOT, 'src/assets');

const IMAGE_RE = /\.(jpe?g|png|webp)$/i;
const PHOTO_MAX_EDGE = 1600;
const BADGE_MAX_EDGE = 700;
const QUALITY = 82;

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

async function optimize(file, maxEdge) {
  const before = (await stat(file)).size;
  const meta = await sharp(file).metadata();
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);

  if (longest <= maxEdge && before < 400 * 1024) {
    console.log(`  skip  ${path.basename(file)} (${longest}px, ${kb(before)})`);
    return { saved: 0, touched: false };
  }

  // sharp cannot safely write back to the file it is reading
  const tmp = `${file}.tmp`;
  await sharp(file)
    .rotate() // honour EXIF orientation, then strip it
    .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tmp);

  const after = (await stat(tmp)).size;

  if (after >= before) {
    await unlink(tmp);
    console.log(`  keep  ${path.basename(file)} (already smaller)`);
    return { saved: 0, touched: false };
  }

  await rename(tmp, file);
  console.log(`  ok    ${path.basename(file)}  ${kb(before)} → ${kb(after)}`);
  return { saved: before - after, touched: true };
}

async function listImages(dir, predicate = () => true) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && IMAGE_RE.test(e.name) && predicate(e.name))
      .map((e) => path.join(dir, e.name))
      .sort();
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function main() {
  const photos = await listImages(PHOTO_DIR);
  const badges = await listImages(ASSET_DIR, (n) => /^viola-(badge|memoji)\./i.test(n));

  if (photos.length === 0 && badges.length === 0) {
    console.log('No Viola images found yet.');
    console.log(`  photos → ${path.relative(ROOT, PHOTO_DIR)}/`);
    console.log(`  badge  → ${path.relative(ROOT, ASSET_DIR)}/viola-badge.jpg`);
    return;
  }

  let saved = 0;

  if (photos.length) {
    console.log(`\nPhotos (${photos.length}) — max ${PHOTO_MAX_EDGE}px`);
    for (const f of photos) saved += (await optimize(f, PHOTO_MAX_EDGE)).saved;
  }

  if (badges.length) {
    console.log(`\nBadge / memoji (${badges.length}) — max ${BADGE_MAX_EDGE}px`);
    for (const f of badges) saved += (await optimize(f, BADGE_MAX_EDGE)).saved;
  }

  console.log(`\nDone. Saved ${kb(saved)}.\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
