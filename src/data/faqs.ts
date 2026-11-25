import type { Faq } from '@/components/Accordion';

export const homeFaqs: readonly Faq[] = [
  {
    q: 'Is there a cost to the patient?',
    a: 'The review itself is covered by Medicare at no charge to the patient. They may still pay the usual fee for the GP consultation where the referral is written and the follow-up appointment, unless their doctor bulk bills.',
  },
  {
    q: 'Who determines whether a patient qualifies?',
    a: "The patient's GP assesses whether a review would be beneficial and writes the referral. Patients can raise it with their doctor directly, and we're happy to discuss suitability with a practice before a referral is submitted.",
  },
  {
    q: 'How frequently can a review be conducted?',
    a: 'Generally once every two years, though a new review may be appropriate sooner if circumstances change — such as starting new medicines, returning from hospital, or a significant shift in health status.',
  },
  {
    q: 'What should the patient have ready?',
    a: 'Everything they use: prescription medicines, anything purchased from a pharmacy or shop, vitamins, supplements, herbal remedies, plus any inhalers, patches, creams, or eye and ear drops. Actual containers are more useful than a written list.',
  },
  {
    q: 'Can a carer or family member participate?',
    a: 'Absolutely. Family members, carers and community nurses are welcome and encouraged — they are often the people managing doses daily, and their perspective makes the review considerably more useful.',
  },
] as const;

export const patientFaqs: readonly Faq[] = [
  {
    q: 'How much does it cost?',
    a: "You don't pay for the Home Medicines Review. You may still pay for the appointment with your doctor where the referral is written, unless your doctor bulk bills.",
  },
  {
    q: 'How do I get one?',
    a: "Ask your doctor. They'll assess whether you'd benefit, and if so they'll write a referral to a credentialed pharmacist — usually choosing one for you. You can also ask for Nexus by name.",
  },
  {
    q: 'How often can I have one?',
    a: 'Have a new review if your circumstances change — for example, if you start new medicines. Otherwise you can generally have one every two years.',
  },
  {
    q: 'Will my medicines be changed?',
    a: 'Not by us. The pharmacist makes suggestions to your doctor, and your doctor discusses any change with you at your follow-up appointment. Nothing happens without you.',
  },
  {
    q: 'Can someone be with me?',
    a: 'Absolutely. A partner, family member, carer or community nurse is very welcome — particularly if they help you manage your medicines.',
  },
] as const;
