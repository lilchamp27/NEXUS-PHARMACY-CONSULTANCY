import { site } from './site';

export type RouteMeta = { title: string; description: string };

/**
 * Per-route <title> and meta description.
 *
 * Read in two places: useMeta() applies it on client navigation, and the
 * prerender script bakes it into each static HTML file at build time. Keep the
 * keys in sync with the routes in src/App.tsx.
 */
export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: `${site.name} — Home Medicines Reviews across Australia`,
    description:
      'Nexus Pharmacy Consultancy delivers credentialed, in-home Home Medicines Reviews (HMR) and Residential Medication Management Reviews (RMMR) — supporting GPs and protecting patients from medicine-related harm.',
  },
  '/services': {
    title: `Services — HMR, RMMR & post-discharge review | ${site.name}`,
    description:
      'Home Medicines Reviews, Residential Medication Management Reviews, post-discharge reconciliation and Medication Management Plans, delivered by credentialed consultant pharmacists.',
  },
  '/for-gps': {
    title: `For GPs — referral pathways | ${site.name}`,
    description:
      'How to refer a patient for a Home Medicines Review: who to refer, four referral pathways, what to include, and what the report contains.',
  },
  '/for-patients': {
    title: `For patients & carers — what a Home Medicines Review involves | ${site.name}`,
    description:
      'A plain-language guide to Home Medicines Reviews for patients and carers: what it is, what it costs, what happens before, during and after the visit.',
  },
  '/about': {
    title: `About — purpose, principles & practice details | ${site.name}`,
    description:
      'Nexus Pharmacy Consultancy is a registered Australian practice delivering credentialed medication reviews. Our purpose, our principles, and our registered details.',
  },
  '/blog': {
    title: `Blog — medication safety insights | ${site.name}`,
    description:
      'Practical articles on Home Medicines Reviews, medication management and pharmacy consultancy — written by credentialed pharmacists for patients, carers and GPs.',
  },
  '/contact': {
    title: `Contact & referrals | ${site.name}`,
    description:
      'Send a referral or ask us a question. Referrals are triaged the day they arrive — practices, patients, carers and aged care facilities all welcome.',
  },
  '/404': {
    title: `Page not found | ${site.name}`,
    description: 'That page does not exist.',
  },
};
