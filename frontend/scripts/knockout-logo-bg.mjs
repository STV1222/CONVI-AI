/**
 * Make near-black / near-navy logo matting transparent (removes visible "frame" on dark UI).
 */
import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const path = join(publicDir, "light-logo-white.png");

// Pixels this dark are treated as background (pure black + dark matting).
const MAX_CHANNEL = 42;
const MAX_LUMA = 48;

const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
if (channels !== 4) throw new Error(`Expected RGBA, got ${channels} channels`);

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  if (max <= MAX_CHANNEL && luma <= MAX_LUMA) {
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(path);

console.log("Updated", path);
