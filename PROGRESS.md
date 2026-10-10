# Progress

## Done

- Design system: Cormorant Garamond (display) + Jost (body and small uppercase labels), ink / forest / ivory /
  brass palette, fluid type scale, one section-spacing token (`--space-section`), cooler photo grade, grain.
- Real logo as transparent PNGs (`public/images/logo`), used in header, footer, intro and favicon.
- Home (seven parts): preloader, hero with booking bar, retreat, stays in boxes, resort plan, guest notes, closing CTA.
- Stay pages with bento gallery, lightbox, glass facts panel, amenity boxes, sticky enquire card and prefilled form.
- Three-step enquiry wizard (`EnquiryWizard`) on /contact, /booking and every stay page.
- Pages: about, rooms, experiences, dining, gallery, testimonials, plan-your-stay, contact, booking, packages, 404.
- VideoBackground slots: `public/videos/hero-mist`, `coffee-estate`, `rain-leaves` (.mp4 / .webm). Photos show until they exist.

## Next

- Add the stock clips above (10-15 s, 1080p, under 5 MB, MP4 + WebM).
- Fill: `developer.url`, reviewer `profileUrl`s, OG image, Google Maps URL, real plan positions
  (`src/data/resortPlan.ts`), room rates, email provider keys (`/api/enquiry`, `/api/contact`).
- Confirm "Mekeri" vs "Makeri".
- Lighthouse on a deployed build.

## Handy scripts

- `npm run images` rebuilds the image manifest after adding photos.
- `node scripts/import-photos.cjs "<gallery originals folder>" "<other originals folder>"` copies and names originals.
- `node scripts/process-logo.cjs "<logo.jpg>"` rebuilds the transparent logo PNGs.
