// Copies the owner's original photos (WhatsApp exports) into public/images with descriptive names.
// Usage: node scripts/import-photos.cjs "<folder with the 46 gallery originals>" "<folder with dining + lounge originals>"
// Safe to re-run: it only writes new files and never deletes anything.
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const [galleryDir, otherDir] = process.argv.slice(2);
const out = path.join(process.cwd(), "public", "images");

const gallery = [
  "grounds-paver-path-hills", "grounds-building-garden", "grounds-valley-tree-view", "grounds-building-facade",
  "grounds-driveway-palms", "pool-palms", "pool-with-kids-pool", "pool-kids-pool-float", "pool-deck-kids-pool",
  "grounds-white-building-windows", "grounds-paver-court", "grounds-cottage-roofs-path", "pool-long-view",
  "grounds-hill-view-green-roof", "pool-deck-float", "grounds-path-palms-hedge", "grounds-path-blue-sky",
  "grounds-sunset-palms", "grounds-paver-court-buildings", "grounds-valley-green-roof", "grounds-path-balcony-block",
  "grounds-path-trees", "grounds-two-storey-modern", "grounds-clouds-palms", "grounds-valley-path",
  "grounds-path-trees-building", "grounds-path-shade", "grounds-pavilion-green-roof", "grounds-misty-valley",
  "grounds-tiled-roof-cottages", "grounds-two-storey-block-01", "pool-water-closeup", "reception-exterior",
  "grounds-cottages-garden", "grounds-yellow-flowers", "grounds-two-storey-block-02", "kids-park-sign-play",
  "grounds-rooms-and-stairs", "games-table-tennis", "dining-restaurant-entrance", "reception-entrance-path",
  "games-foosball", "dining-glasses-detail", "games-carrom", "dining-terrace-table", "grounds-waterfall",
];

async function put(src, rel) {
  const dest = path.join(out, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let img = sharp(src).rotate();
  const meta = await img.metadata();
  if (fs.statSync(src).size > 400 * 1024 || meta.width > 1600) {
    img = img.resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 74, mozjpeg: true });
  } else {
    img = img.jpeg({ quality: 88, mozjpeg: true });
  }
  fs.writeFileSync(dest + ".tmp", await img.toBuffer());
  fs.renameSync(dest + ".tmp", dest);
}

(async () => {
  const files = fs.readdirSync(galleryDir).filter((f) => /\.jpe?g$/i.test(f)).sort();
  if (files.length !== gallery.length) throw new Error(`${files.length} gallery originals, expected ${gallery.length}`);
  for (let i = 0; i < files.length; i++) await put(path.join(galleryDir, files[i]), `gallery/${gallery[i]}.jpg`);
  if (otherDir) {
    const map = {
      "WhatsApp Image 2026-10-07 at 4.29.58 PM.jpeg": "dining/restaurant-hall-01.jpg",
      "ce40b31c-2c6c-4ef8-90ac-c675292fd677.jpeg": "dining/restaurant-hall-02.jpg",
      "67a0ca77-c977-41f9-b369-eb562665d356.jpeg": "gallery/lounge-sofa-seating.jpg",
    };
    for (const [file, rel] of Object.entries(map)) {
      const src = path.join(otherDir, file);
      if (fs.existsSync(src)) await put(src, rel);
    }
  }
  console.log("imported");
})();
