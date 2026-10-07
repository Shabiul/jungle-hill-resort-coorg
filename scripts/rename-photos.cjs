// One-off: rename the original WhatsApp-named photos to descriptive lowercase names.
// Order matches the contact sheets reviewed on 2026-10-07 (default JS sort of filenames).
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const root = path.join(process.cwd(), "public", "images");

const plans = {
  dining: ["restaurant-hall-01", "restaurant-hall-02"],
  gallery: [
    "grounds-building-garden", "pool-main-01", "pool-with-kids-pool", "pool-deck-kids-pool", "grounds-paver-driveway",
    "grounds-valley-view", "grounds-paver-path-01", "grounds-paver-path-02", "grounds-paver-path-03", "grounds-pavilion-green-roof",
    "grounds-misty-valley", "grounds-tiled-roof-cottages", "grounds-two-storey-block-01", "pool-water-closeup", "reception-exterior",
    "grounds-cottages-garden", "grounds-two-storey-block-02", "grounds-rooms-and-stairs", "games-table-tennis", "dining-restaurant-entrance",
    "reception-entrance-path", "games-foosball", "dining-glasses-detail",
  ],
  "rooms/deluxe-ac-rooms": [
    "bedroom-01", "bedroom-02", "coffee-kettle-01", "bedroom-03", "bathroom-01", "bedroom-04", "balcony-01", "bathroom-02", "exterior-01", "exterior-02", "MOVE:family-ac-room:bedroom-08",
  ],
  "rooms/family-ac-room": [
    "bedroom-01", "bedroom-02", "seating-01", "bedroom-03", "seating-02", "bedroom-04", "bedroom-05", "bathroom-01", "bedroom-06", "bedroom-07", "bathroom-02", "bathroom-03",
  ],
  "rooms/standard-non-ac-cottage": [
    "balcony-01", "balcony-02", "exterior-01", "bedroom-01", "bedroom-02", "bedroom-03", "bedroom-04", "bedroom-05", "bedroom-06", "bedroom-07", "bedroom-08",
    "bathroom-01", "bedroom-09", "bedroom-10", "exterior-02", "bathroom-02", "bathroom-03",
  ],
  "rooms/standard-non-ac-room": [
    "bedroom-01", "bedroom-02", "bedroom-03", "bedroom-04", "bedroom-05", "bedroom-06", "bedroom-07", "bedroom-08", "view-01", "bathroom-01", "balcony-01",
    "balcony-02", "view-02", "balcony-03", "balcony-04", "balcony-05", "entrance-a2", "balcony-06", "balcony-07", "balcony-08", "entrance-a6", "balcony-09",
  ],
};

(async () => {
  for (const [dir, names] of Object.entries(plans)) {
    const full = path.join(root, dir);
    const files = fs.readdirSync(full).filter((f) => /^WhatsApp.*\.jpe?g$/i.test(f)).sort();
    if (!files.length) continue;
    if (!files.length) continue;
    if (files.length !== names.length) throw new Error(`${dir}: ${files.length} files vs ${names.length} names`);
    for (let i = 0; i < files.length; i++) {
      let [target, name] = [dir, names[i]];
      if (name.startsWith("MOVE:")) [, target, name] = name.split(":"), (target = "rooms/" + target);
      const src = path.join(full, files[i]);
      const out = path.join(root, target, name + ".jpg");
      if (out === src) continue; // never delete a file we did not copy elsewhere
      const size = fs.statSync(src).size;
      let img = sharp(src).rotate();
      if (size > 400 * 1024) img = img.resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 72, mozjpeg: true });
      else img = null;
      if (img) await img.toFile(out + ".tmp"), fs.renameSync(out + ".tmp", out);
      else fs.copyFileSync(src, out);
      fs.unlinkSync(src);
    }
  }
})();
