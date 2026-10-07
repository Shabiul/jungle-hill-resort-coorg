# Jungle Hill Resort, Coorg

Website for Jungle Hill Resort, a nature resort in Coorg, Karnataka, India.

**Status:** design tokens, layout and the home page are built. Inner pages are still placeholders.

Photos: add files under `public/images`, run `npm run images`, then reference them from `src/data/*` with `photo()` / `photos()` (missing files are skipped, not errors).

## Tech stack

- Next.js (App Router, Turbopack), React, TypeScript (strict)
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- motion, GSAP + ScrollTrigger, Lenis
- clsx, tailwind-merge, class-variance-authority, lucide-react
- react-hook-form, zod, @hookform/resolvers
- ESLint, Prettier (with prettier-plugin-tailwindcss)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

| Script              | Purpose                                                                          |
| ------------------- | -------------------------------------------------------------------------------- |
| `npm run dev`       | Dev server (Turbopack)                                                           |
| `npm run build`     | Production build                                                                 |
| `npm run start`     | Serve the production build                                                       |
| `npm run lint`      | ESLint                                                                           |
| `npm run format`    | Prettier                                                                         |
| `npm run typecheck` | TypeScript check                                                                 |
| `npm run images`    | Rebuild the image manifest (sizes + blur) after adding photos in `public/images` |

## Structure

```
src/
  app/          Routes, layout, metadata, sitemap, robots, API routes
  components/
    layout/     Header, Footer, MobileMenu, Container
    sections/   Home page sections
    ui/         Primitives (Button, Input, Modal, ...)
    forms/      Contact, Enquiry, Booking forms
    animations/ SmoothScroll (Lenis), Reveal, Parallax, Marquee, PageTransition
    shared/     Logo, SectionHeader, WhatsAppButton, JsonLd, PagePlaceholder
  lib/          cn helper, constants, motion variants, GSAP setup, zod schemas, metadata builder
  hooks/        useMediaQuery, useScrollPosition, useReducedMotion
  data/         Typed content (rooms, experiences, dining, gallery, testimonials, faqs, navigation)
  types/        Shared types
  config/       site.config.ts (name, contact, socials)
public/         images, videos, icons, fonts
```

## Conventions

- Server Components by default; `"use client"` only for animation, forms and menus.
- Animation helpers respect `prefers-reduced-motion`.
- Every page uses `buildMetadata`; titles follow `%s | Jungle Hill Resort, Coorg`.
- Content lives in `src/data` and `src/config`, not inside components.
