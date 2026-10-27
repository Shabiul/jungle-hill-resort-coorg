// Uploads every file in public/images and public/videos to the Supabase "media" bucket and registers
// it in the media table. Safe to re-run (upserts by path). Run: node scripts/import-assets-to-supabase.cjs
// Needs SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { createClient } = require("@supabase/supabase-js");

const root = process.cwd();
const envFile = fs.readFileSync(path.join(root, ".env.local"), "utf8");
const env = Object.fromEntries(
  envFile
    .split("\n")
    .filter((line) => line.includes("=") && !line.startsWith("#"))
    .map((line) => line.split(/=(.*)/s).slice(0, 2)),
);
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

(async () => {
  const publicDir = path.join(root, "public");
  const files = [...walk(path.join(publicDir, "images")), ...walk(path.join(publicDir, "videos"))]
    .filter((file) => MIME[path.extname(file).toLowerCase()])
    .sort();

  let done = 0;
  for (const file of files) {
    const rel = path.relative(publicDir, file).split(path.sep).join("/"); // images/rooms/x.jpg
    const mime = MIME[path.extname(file).toLowerCase()];
    const bytes = fs.readFileSync(file);

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(rel, bytes, { contentType: mime, upsert: true, cacheControl: "31536000" });
    if (uploadError) {
      console.error("upload failed", rel, uploadError.message);
      continue;
    }

    let width = null;
    let height = null;
    let blur = null;
    if (mime.startsWith("image/") && mime !== "image/svg+xml") {
      const meta = await sharp(bytes).rotate().toBuffer({ resolveWithObject: true });
      width = meta.info.width;
      height = meta.info.height;
      const tiny = await sharp(bytes).rotate().resize(12).blur().jpeg({ quality: 40 }).toBuffer();
      blur = "data:image/jpeg;base64," + tiny.toString("base64");
    }

    const { data: pub } = supabase.storage.from("media").getPublicUrl(rel);
    const folder = path.posix.dirname(rel).replace(/^(images|videos)\/?/, "$1/").replace(/\/$/, "");
    const { error } = await supabase.from("media").upsert(
      {
        path: rel,
        url: pub.publicUrl,
        folder,
        mime,
        width,
        height,
        blur,
        size_bytes: bytes.length,
        original_name: path.basename(file),
      },
      { onConflict: "path", ignoreDuplicates: false },
    );
    if (error) {
      console.error("register failed", rel, error.message);
      continue;
    }
    done += 1;
    if (done % 20 === 0) console.log(`${done}/${files.length}`);
  }
  console.log(`Imported ${done} of ${files.length} files.`);
})();
