# Progress

Done: scaffold, tokens and palette (ink/forest/ivory/brass), intro and hero, home page, navbar fix,
all inner pages (rooms + 4 room pages, experiences, dining, gallery, plan your stay, contact,
enquiry form, about, packages, 404), footer, floating WhatsApp, custom cursor, page template fade.

Open items:
- Restore the 17 deleted photos (gallery + dining) from the WhatsApp originals, then
  `node scripts/rename-photos.cjs && npm run images`.
- Stock video clips in public/videos (hero-mist.mp4 + .webm), then they play automatically.
- Fill in: developer.url, reviewer profileUrl values, Google Maps URL (mapsUrl), OG image, room rates.
- Confirm "Mekeri" vs "Makeri" spelling.
- Real delivery for /api/enquiry and /api/contact (email / WhatsApp API).
- Lighthouse pass on a deployed build; check 1024 px layout by eye.
