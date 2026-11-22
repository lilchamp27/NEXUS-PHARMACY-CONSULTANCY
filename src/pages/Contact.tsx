import { Mail, Phone } from 'lucide-react';
import { Checklist } from '@/components/Blocks';
import { TextLink } from '@/components/Button';
import { EnquiryForm } from '@/components/EnquiryForm';
import { Note } from '@/components/Form';
import { PageHero } from '@/components/PageHero';
import { PhoneAction } from '@/components/PhoneAction';
import { ReferralForm } from '@/components/ReferralForm';
import { Reveal } from '@/components/Reveal';
import { Eyebrow, Lede, Section } from '@/components/Section';
import { site } from '@/data/site';
import { useMeta } from '@/lib/useMeta';

function ContactCard({
  icon,
  label,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="group flex gap-5 rounded-2xl border border-navy-900/[0.07] bg-paper p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
    >
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-500 transition-colors duration-500 group-hover:bg-navy-900 group-hover:text-bone"
      >
        {icon}
      </span>
      <div>
        <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-faint">
          {label}
        </dt>
        <dd className="mt-2 leading-relaxed">{children}</dd>
      </div>
    </Reveal>
  );
}

const promises = [
  'Triaged the day it arrives',
  'We contact the patient and arrange the visit',
  `Report back to you, typically within ${site.turnaroundDays} days of the visit`,
] as const;

export function Contact() {
  useMeta('/contact');

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact & referrals"
        title="Let's get a patient booked in."
        lede="Referrals are triaged the day they arrive. For anything else, we're happy to talk it through — practices, patients, carers and facilities all welcome."
      />

      {/* ------------------------------------------------------ contact details */}
      <Section tone="paper" tight>
        <dl className="grid gap-5 md:grid-cols-2">
          <ContactCard icon={<Phone className="size-5" />} label="Phone">
            <PhoneAction className="font-medium text-navy-500">
              <span className="link-underline">{site.phone}</span>
            </PhoneAction>
            <p className="mt-1.5 text-xs text-muted">Click to call, text or WhatsApp</p>
          </ContactCard>

          <ContactCard icon={<Mail className="size-5" />} label="Email" delay={0.07}>
            <a
              href={`mailto:${site.emailGeneral}`}
              className="link-underline block break-words font-medium text-navy-500"
            >
              {site.emailGeneral}
            </a>
          </ContactCard>
        </dl>
      </Section>

      {/* -------------------------------------------------------- referral form */}
      <Section id="refer">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-32">
            <Eyebrow>Referral form</Eyebrow>
            <h2>Send a referral.</h2>
            <Lede className="mt-6">
              For practitioners. Fill in what you have — we&rsquo;ll come back to you if anything
              essential is missing, and we&rsquo;ll confirm the patient&rsquo;s suitability before
              booking.
            </Lede>

            <div className="mt-8">
              <Note>
                Prefer another route? Email your referral directly to{' '}
                <TextLink href={`mailto:${site.emailGeneral}`}>{site.emailGeneral}</TextLink>, or
                see the <TextLink to="/for-gps">referral pathways</TextLink>.
              </Note>
            </div>

            <Checklist items={promises} className="mt-9" />
          </Reveal>

          <Reveal
            delay={0.08}
            className="rounded-3xl border border-navy-900/[0.07] bg-paper p-7 shadow-card md:p-9"
          >
            <ReferralForm />
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------------------------------- general form */}
      <Section tone="sage">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal className="lg:order-2">
            <Eyebrow>General enquiries</Eyebrow>
            <h2>Patients, carers &amp; facilities.</h2>
            <Lede className="mt-6">
              Not a practitioner? Ask us anything — whether a review would help, what to say to your
              doctor, or how we work with aged care facilities.
            </Lede>
            <p className="mt-6 leading-relaxed text-muted">
              You can also email us at{' '}
              <TextLink href={`mailto:${site.emailGeneral}`}>{site.emailGeneral}</TextLink> or call{' '}
              <a href={site.phoneHref} className="font-medium text-navy-500">
                {site.phone}
              </a>
              .
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            className="rounded-3xl border border-navy-900/[0.07] bg-paper p-7 shadow-card md:p-9 lg:order-1"
          >
            <EnquiryForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
