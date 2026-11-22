# Nexus Pharmacy Consultancy — website

Static front-end. No build step, no dependencies, no backend. Open `index.html` in a browser,
or serve the folder (`python -m http.server 8000`) and visit `http://localhost:8000`.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, why it matters, services overview, pathway, GP panel, FAQ, CTA |
| `services.html` | HMR, RMMR, post-discharge reconciliation, management plans |
| `for-gps.html` | Who to refer, referral pathways, what to include, what the report contains |
| `for-patients.html` | Plain-language explanation for patients and carers, plus FAQ |
| `about.html` | Purpose, principles, registered practice details |
| `contact.html` | Contact details, referral form, general enquiry form |

`assets/css/style.css` — all styling, driven by CSS custom properties in `:root`.
`assets/js/main.js` — mobile nav, sticky header, accordions, scroll reveal, form handling.

## Placeholders to replace before launch

- **Phone** `1300 000 000` (appears in the top bar, CTAs and footer, plus `tel:+611300000000` links)
- **Email** `referrals@nexuspharmacy.com.au` and `hello@nexuspharmacy.com.au`
- **Fax number** — referenced on `for-gps.html` but no number is given yet
- **Turnaround claim** — "typical report turnaround: 7 days" on the home page and contact page
- **Privacy / Terms / Accessibility** footer links currently point at `contact.html`
- Both forms are front-end only; they intercept submit and show a notice. Wire them to an inbox,
  a form service, or your referral system before going live.

Registered details used on `about.html` and in the footer (business name, holder, ABN, address)
come from the ASIC business name extract and are real — check them before publishing anything else.

## Design system

Colours, type scale, spacing and motion are all CSS variables at the top of `style.css`:

- `--teal-900` `#0B3B34` primary / dark surfaces
- `--teal-500` `#1E7A6B` accent, icons, links
- `--gold` `#B9924F` fine detail: rules, step numbers, eyebrow dashes
- `--cream` `#FAF8F4` page background, `--paper` `#FFFFFF` raised surfaces

Type: **Fraunces** (variable serif) for headings, **Inter** for body — both from Google Fonts.
Swap `--font-display` / `--font-body` to rebrand.

Sections alternate between `.section`, `.section--paper`, `.section--sage` and `.section--deep`
to create rhythm. Add `reveal` to any element for the fade-up-on-scroll effect.

No stock photography is used — the visual interest comes from typography, the layered hero card,
gradient panels and line icons. If you add photos later, the obvious spots are the hero right
column and the "for GPs" panel.
