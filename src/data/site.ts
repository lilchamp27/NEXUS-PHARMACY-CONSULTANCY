/**
 * Single source of truth for business details, navigation and reusable copy.
 * Replace the PLACEHOLDER values before launch — see README.
 */

export const site = {
  name: 'Nexus Pharmacy Consultancy',
  shortName: 'Nexus',
  tagline: 'Credentialed medication review services for general practice, aged care and the people they look after.',

  phone: '0467 471 093',
  phoneHref: 'tel:+61467471093',
  whatsapp: 'https://wa.me/61467471093',
  sms: 'sms:+61467471093',
  emailReferrals: 'Nexuspharmacyservice@gmail.com',
  emailGeneral: 'Nexuspharmacyservice@gmail.com',

  /** Get a free access key at https://web3forms.com — paste it here to make forms send. */
  formAccessKey: 'b4c7dc76-d80e-419a-936d-5d8d7ab4aa10',

  /** From the ASIC business name extract — verify before publishing */
  holder: 'Olutobi Tolulope Oduneye',

  /** PLACEHOLDER claim — confirm operationally before launch */
  turnaroundDays: 7,
} as const;

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'For GPs', to: '/for-gps' },
  { label: 'For Patients', to: '/for-patients' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
] as const;

export const footerServices = [
  { label: 'Home Medicines Review', to: '/services#hmr' },
  { label: 'Residential review', to: '/services#rmmr' },
  { label: 'Post-discharge review', to: '/services#discharge' },
  { label: 'Management plans', to: '/services#plan' },
] as const;

export const trustPoints = [
  { icon: 'shield', label: 'Credentialed pharmacists' },
  { icon: 'home', label: "Reviews in the patient's home" },
  { icon: 'file', label: 'Structured reports back to the GP' },
  { icon: 'clock', label: 'Appointments arranged directly with the patient' },
] as const;
