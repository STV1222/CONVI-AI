/**
 * Crop away transparent padding around the wordmark (tight bounding box).
 */
import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = join(__dirname, "..", "public", "light-logo-white.png");

const buf = await sharp(path).trim({ threshold: 0 }).png().toBuffer();
await sharp(buf).png().toFile(path);

console.log("Trimmed", path);
