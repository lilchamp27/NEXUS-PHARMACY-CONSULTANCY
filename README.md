# Nexus Pharmacy Consultancy — website

React + TypeScript single-page site, built with Vite and Tailwind CSS v4, **prerendered to static
HTML at build time** so crawlers and no-JS visitors still get full content.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck -> client build -> SSR build -> prerender into dist/
npm run preview  # serve dist/
```

## Scripts

| Script | What it does |
| --- | --- |
| `dev` | Vite dev server with HMR |
| `build` | `tsc -b`, then the client bundle, then an SSR bundle, then `scripts/prerender.mjs` |
| `build:spa` | Client bundle only — no prerendering (faster, for quick checks) |
| `typecheck` | Types only, no emit |
| `preview` | Serves the built `dist/` |

Set the public origin so canonical URLs and the sitemap are right:

```bash
SITE_ORIGIN=https://nexuspharmacy.com.au npm run build
```

It defaults to `https://nexuspharmacy.com.au`.

## Structure

```
src/
  main.tsx            Client entry — hydrates prerendered HTML, or renders fresh in dev
  entry-server.tsx    Render-to-string entry used only by the prerender step
  App.tsx             Routes, plus scroll/hash restoration on navigation
  index.css           The whole design system: tokens in @theme, base styles, custom utilities
  data/
    site.ts           Business details, nav, trust points — all placeholders live here
    meta.ts           Per-route <title> and description (used by the hook AND the prerenderer)
  lib/
    cn.ts             Tiny className joiner
    useMeta.ts        Applies route metadata on client navigation
  components/         Design-system primitives (see below)
  pages/              One file per route
scripts/
  prerender.mjs       Writes dist/<route>/index.html, 404.html, sitemap.xml, robots.txt
legacy/               The previous hand-written static site, kept for reference
```

### Components

| Component | Purpose |
| --- | --- |
| `Section`, `Eyebrow`, `SectionHead`, `Lede` | Page scaffolding and the four section tones |
| `Blocks` | `Card`, `Grid`, `Checklist`, `Steps`, `Panel`, `StatRow`, `Quote` |
| `Button`, `TextLink` | Four button variants with a sliding-arrow affordance |
| `Header`, `Footer`, `Logo` | Site chrome: scroll-aware sticky header, full-screen mobile sheet |
| `PageHero`, `Cta` | Shared top-of-page and bottom-of-page bands |
| `Accordion` | FAQ, single-open, animated height |
| `Form`, `ReferralForm`, `EnquiryForm` | Field primitives plus the two forms |
| `Reveal` | Fade-and-rise on scroll, honours `prefers-reduced-motion` |

## Design system

Everything is defined as tokens in the `@theme` block at the top of `src/index.css` — change it
there and the whole site follows.

- **Teal** `--color-teal-900` `#0B3B34` primary and dark surfaces, `--color-teal-500` `#1E7A6B` accent
- **Gold** `--color-gold` `#B9924F` fine detail only: rules, step numbers, eyebrow dashes, active nav
- **Neutrals** `--color-cream` `#FAF8F4` page, `--color-paper` `#FFFFFF` raised, `--color-bone` `#E8DCC4` on dark
- **Type** Fraunces (variable serif, optical sizing on) for display, Inter for body
- **Fluid display scale** `--text-display`, `--text-display-lg` etc. use `clamp()`, so headings scale
  with the viewport rather than stepping at breakpoints

Sections alternate between the `cream`, `paper`, `sage` and `deep` tones to create rhythm. The
`deep` tone adds an `.on-dark` class, and a few cascade rules near the bottom of `index.css`
retune the neutral text tokens for dark surfaces — so you don't thread colour props through
children.

Custom utilities: `wrap` (page gutter), `grain` (subtle paper noise over flat areas),
`link-underline` (animated underline).

No stock photography. Visual interest comes from typography, the layered hero card, gradient
panels, the marquee trust strip and line icons (`lucide-react`). If you add photos later, the
obvious spots are the hero right column and the "For GPs" panel.

## Accessibility

Skip link, one `<h1>` per page, visible focus rings (gold on dark surfaces), `aria-expanded` /
`aria-controls` on the nav toggle and accordion, inline form errors wired via `aria-describedby`
with focus moved to the first invalid field, and `prefers-reduced-motion` respected throughout.

Accordion panels stay in the DOM when collapsed — clipped to zero height and `aria-hidden` — so
every FAQ answer is in the served HTML for crawlers.

## Before launch

**Placeholders** — all in `src/data/site.ts`:

- **Phone** `1300 000 000` (plus the `tel:+611300000000` links)
- **Email** `referrals@nexuspharmacy.com.au` and `hello@nexuspharmacy.com.au`
- **Fax number** — referenced as a referral pathway on `/for-gps`, but no number is given yet
- **Turnaround claim** — `turnaroundDays: 7` appears on the home and contact pages

**Other work:**

- **Both forms are front-end only.** They validate and show a confirmation, but nothing is
  transmitted. Wire them to an inbox, a form service or your referral system — and add
  server-side validation — before accepting real patient information. Each form shows a visible
  notice saying so; remove it once connected.
- **Privacy / Terms / Accessibility** footer links currently point at `/contact`.
- Add an Open Graph share image (`og:image`) in `scripts/prerender.mjs` once you have artwork.

Registered details on `/about` and in the footer (business name, holder, ABN, address) come from
the ASIC business name extract and are real — check them before publishing anything else.

## Hosting

`npm run build` emits a plain static `dist/`, including an `index.html` per route, so any static
host works. Two things to configure:

- Serve `404.html` for unmatched paths (Netlify, Cloudflare Pages and GitHub Pages do this by
  default). The app also has a client-side catch-all route, so a `/* -> /index.html 200` rewrite
  works too — existing files are served first either way.
- Don't force-redirect `/about` to `/about/` or vice versa; both resolve to the same prerendered
  file on standard hosts.
