// Turns the supplied logo JPEG (dark artwork on white) into transparent PNGs:
//   jungle-hill-logo-dark.png  graphite on transparent (for pearl and vapour backgrounds)
//   jungle-hill-logo-light.png pearl artwork on transparent (for dark backgrounds)
//   jungle-hill-mark-dark.png / -light.png  the peak only (favicon, compact uses)
// Usage: node scripts/process-logo.cjs "<logo.jpg>"
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src = process.argv[2];
const outDir = path.join(process.cwd(), "public", "images", "logo");
const PEARL = [244, 242, 238];
const GRAPHITE = [43, 54, 64];

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const dark = Buffer.alloc(w * h * 4);
  const light = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    let a = 1 - Math.min(r, g, b) / 255;
    a = a < 0.04 ? 0 : Math.min(1, a * 1.08);
    const un = (c) => (a > 0 ? Math.max(0, Math.min(255, Math.round((c - 255 * (1 - a)) / a))) : 0);
    void un;
    dark.set([...GRAPHITE, Math.round(a * 255)], i * 4);
    light.set([...PEARL, Math.round(a * 255)], i * 4);
  }
  // bounding box + the gap between the peak and the wordmark
  const rowSum = new Array(h).fill(0);
  let minX = w, maxX = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (dark[(y * w + x) * 4 + 3] > 30) { rowSum[y]++; if (x < minX) minX = x; if (x > maxX) maxX = x; }
  }
  const ys = rowSum.map((v, y) => (v > 0 ? y : -1)).filter((y) => y >= 0);
  const minY = ys[0], maxY = ys[ys.length - 1];
  let markEnd = minY;
  for (let y = minY; y < maxY; y++) {
    if (rowSum[y] === 0) { markEnd = y; break; }
  }
  const pad = 6;
  const box = { left: Math.max(0, minX - pad), top: Math.max(0, minY - pad), width: Math.min(w, maxX + pad) - Math.max(0, minX - pad), height: Math.min(h, maxY + pad) - Math.max(0, minY - pad) };
  const mark = { left: box.left, top: box.top, width: box.width, height: markEnd - box.top + pad };
  // mark: tighten horizontally to the peak itself
  let mMin = w, mMax = 0;
  for (let y = minY; y < markEnd; y++) for (let x = 0; x < w; x++) if (dark[(y * w + x) * 4 + 3] > 30) { if (x < mMin) mMin = x; if (x > mMax) mMax = x; }
  mark.left = Math.max(0, mMin - pad); mark.width = Math.min(w, mMax + pad) - mark.left;

  const raw = { raw: { width: w, height: h, channels: 4 } };
  for (const [name, buf] of [["dark", dark], ["light", light]]) {
    await sharp(buf, raw).extract(box).png({ compressionLevel: 9 }).toFile(path.join(outDir, `jungle-hill-logo-${name}.png`));
    await sharp(buf, raw).extract(mark).png({ compressionLevel: 9 }).toFile(path.join(outDir, `jungle-hill-mark-${name}.png`));
  }
  console.log("logo box", box, "mark box", mark);
})();
