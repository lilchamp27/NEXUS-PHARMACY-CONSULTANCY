export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readMin: number;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: 'what-is-a-home-medicines-review',
    title: 'What exactly is a Home Medicines Review?',
    excerpt:
      'A pharmacist visits your home to check every medicine you take. Here is how it works, who pays for it, and why your GP might suggest one.',
    date: '2026-11-20',
    author: 'Nexus Pharmacy Consultancy',
    readMin: 5,
    body: [
      'A Home Medicines Review (HMR) is a service funded by Medicare where a qualified pharmacist visits you at home and goes through every medicine you currently use. The pharmacist checks that your medicines are appropriate, that you understand how and when to take each one, and that nothing is causing unnecessary side effects or clashing with something else you take.',
      'Your GP initiates the process by writing a referral. Once the pharmacist receives it, they arrange a time to visit that suits you. The visit typically takes around an hour, and you are welcome to have a family member, carer or community nurse present.',
      'During the visit, the pharmacist reviews all your medicines — not just prescription items, but also anything you buy over the counter, any vitamins or supplements, herbal products, and devices such as inhalers, patches, creams or eye drops. They look at expiry dates, storage conditions, whether you are using devices correctly, and how you manage your daily routine around your medicines.',
      'After the visit, the pharmacist writes a report with findings and suggestions, which is sent to your GP. Your GP then discusses the report with you at a follow-up consultation and together you agree on any changes. You receive a Medication Management Plan — a simple summary you can share with any health professional who treats you.',
      'The review itself costs nothing. You may pay the usual fee for the GP appointment where the referral is written and the follow-up consultation, depending on whether your doctor bulk bills.',
      'Most people can have a review once every two years, or sooner if their circumstances change — for example, after a hospital stay or when new medicines are started.',
    ],
  },
  {
    slug: 'five-signs-you-might-benefit-from-a-review',
    title: 'Five signs your medicines could use a second look',
    excerpt:
      'Taking multiple medications, feeling off, or just confused about what does what? These are the situations where a review makes the biggest difference.',
    date: '2026-11-15',
    author: 'Nexus Pharmacy Consultancy',
    readMin: 4,
    body: [
      'Medicine regimens grow over time. A specialist adds something, the hospital changes a dose, and before long you are managing a collection of tablets, capsules and devices that nobody has looked at as a whole. Here are five signs it might be time to ask your doctor about a review.',
      'First, you are taking five or more medicines regularly. The more medicines in a regimen, the higher the chance of an interaction or a duplication that nobody intended. A review catches these before they cause trouble.',
      'Second, you have prescriptions from more than one doctor. When a GP, a specialist and a hospital are all writing scripts, the full picture can fall through the cracks. The reviewing pharmacist pulls every source together into one accurate list.',
      'Third, you have recently come home from hospital. Hospital stays often change doses, swap brands, or start new medicines altogether. The old stock is usually still in the cupboard at home, and mixing old and new is one of the most common causes of medication errors.',
      'Fourth, you feel unwell after taking your medicines — dizziness, nausea, drowsiness, or falls you did not used to have. These may be side effects that can be managed with a timing change, a dose adjustment, or a switch to an alternative.',
      'Fifth, you sometimes forget doses, take them at the wrong time, or are simply unsure what each medicine is for. A review includes practical strategies for getting your routine right, tailored to how your day actually works.',
    ],
  },
  {
    slug: 'how-gps-can-refer-patients',
    title: 'A quick guide for GPs: how to refer a patient for a review',
    excerpt:
      'The referral process is straightforward. Here is what to include, the pathways available, and what to expect back.',
    date: '2026-11-10',
    author: 'Nexus Pharmacy Consultancy',
    readMin: 3,
    body: [
      'Referring a patient for a Home Medicines Review should take no more than a few minutes. The GP assesses that the patient would benefit, and sends a referral to a credentialed pharmacist — either through their usual secure messaging platform, via email, through our online form, or by calling us directly.',
      "The referral should include the patient's name and contact details, a current medicines list (however it prints from your clinical software), relevant medical history, allergies, and a brief note on what prompted the referral. That is enough for us to get started. If anything essential is missing, we will come back to you rather than delay the patient.",
      'We triage referrals the day they arrive. Post-discharge patients and those flagged as urgent are prioritised. We contact the patient, arrange a time that suits them, and conduct the review in their home.',
      'After the visit, you receive a structured report with findings ordered by clinical priority, clear recommendations with supporting evidence, and a plain-language patient copy ready for your follow-up consultation. Every recommendation is advisory — prescribing decisions remain yours.',
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
