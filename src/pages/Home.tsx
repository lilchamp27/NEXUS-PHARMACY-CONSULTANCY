import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Clock,
  FileText,
  Home as HomeIcon,
  Shuffle,
  Unlink,
  ShieldCheck,
} from 'lucide-react';
import { Accordion } from '@/components/Accordion';
import { Card, Checklist, Grid, Panel, Quote, StatRow, Steps } from '@/components/Blocks';
import { Button, TextLink } from '@/components/Button';
import { Cta } from '@/components/Cta';
import { PhoneAction } from '@/components/PhoneAction';
import { Reveal } from '@/components/Reveal';
import { Eyebrow, Lede, Section, SectionHead } from '@/components/Section';
import { homeFaqs } from '@/data/faqs';
import { site, trustPoints } from '@/data/site';
import { useMeta } from '@/lib/useMeta';

/* ------------------------------------------------------------------- data */

const heroChecklist = [
  'Uses five or more regular medicines',
  'Receives scripts from multiple prescribers',
  'Recently returned home from a hospital stay',
  'Starting a new medicine or one with complex dosing',
  'Frequently misses doses, or experiences unwanted effects',
] as const;

const problems = [
  {
    icon: <Unlink className="size-5" />,
    title: 'The cupboard tells a different story',
    body: 'What is on file and what is actually in the medicine cabinet rarely match. Expired stock sits alongside new prescriptions, over-the-counter products never appear on the clinical record, and duplicate boxes accumulate unnoticed. A pharmacist in the home reconciles the two pictures.',
  },
  {
    icon: <AlertTriangle className="size-5" />,
    title: 'Risks compound with every addition',
    body: 'Each new medicine added to a regimen increases the chance of an unwanted interaction. Dizziness, confusion, falls and fatigue are often attributed to age when they are actually treatable side effects that a thorough review can identify.',
  },
  {
    icon: <Shuffle className="size-5" />,
    title: 'Practical fixes, genuine improvement',
    body: 'Most findings from a review are straightforward to address: adjusting a dose time, removing a duplication, correcting inhaler technique, or helping a patient understand what each medicine does and why timing matters.',
  },
];

const services = [
  {
    title: 'Home Medicines Review',
    tag: "HMR · In the patient's home",
    body: 'A qualified pharmacist visits the patient at home and examines every medicine in the household — prescribed items, over-the-counter purchases, vitamins, supplements, herbal products, inhalers, patches, creams and drops. Storage, expiry, technique and adherence are all assessed, and a detailed report goes back to the referring GP.',
  },
  {
    title: 'Residential Medication Management Review',
    tag: 'RMMR · Aged care',
    body: 'For people living in aged care facilities, the pharmacist visits on site and discusses the resident’s medicines with them, their family, carers and nursing staff. Recommendations account for how medicines are actually administered on the floor and are reported to the GP and care team together.',
  },
  {
    title: 'Post-discharge medication reconciliation',
    tag: 'Transitions of care',
    body: 'The period immediately after leaving hospital is when medicine lists and reality diverge most rapidly. Doses change, brands change, and the old stock is usually still at home. We prioritise these referrals and reconcile the discharge summary against what is actually in the house.',
  },
  {
    title: 'Medication Management Plan & education',
    tag: 'Patient-facing',
    body: 'Following the GP’s follow-up discussion, the patient receives a clear Medication Management Plan they can share with any clinician. It includes practical education on devices, timing and reminder strategies tailored to their daily routine.',
  },
];

const pathway = [
  {
    title: 'Referral',
    body: 'The GP determines the patient would benefit and sends a referral along with a current medicines list and relevant background.',
  },
  {
    title: 'Home visit',
    body: 'We reach out to the patient, arrange a convenient time, and a qualified pharmacist conducts the review in their home.',
  },
  {
    title: 'Report',
    body: 'A structured report with prioritised findings and clear recommendations is prepared and delivered to the referring GP.',
  },
  {
    title: 'Follow-up',
    body: 'The GP reviews the findings with the patient and agrees on a Medication Management Plan. With consent, the patient’s regular pharmacy receives a copy.',
  },
];

const gpPoints = [
  'We verify eligibility before scheduling, so nothing bounces back',
  'Reports are structured, prioritised, and designed to be actioned in a standard consultation',
  'All recommendations are advisory — every prescribing decision stays with you',
] as const;

const trustIcons = {
  shield: <ShieldCheck className="size-4" />,
  home: <HomeIcon className="size-4" />,
  file: <FileText className="size-4" />,
  clock: <Clock className="size-4" />,
} as const;

/* ------------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden bg-cream pb-20 pt-12 md:pb-28 md:pt-16 lg:pt-20">
      {/* ambient wash */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-48 size-[42rem] rounded-full bg-navy-50 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[30rem] rounded-full bg-sand/60 blur-3xl"
      />

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
        {/* ------------------------------------------------ copy column */}
        <div>
          <Reveal>
            <Eyebrow>Credentialed medication review</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h1>
              Safer medicines,
              <br />
              <em className="font-light italic text-navy-500">reviewed at home.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <Lede className="mt-8 max-w-xl">
              {site.name} works alongside GPs and aged care providers to deliver in-home medication
              reviews — a qualified pharmacist sitting down with the patient, going through every
              medicine they actually use, one at a time.
            </Lede>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/contact#refer" arrow>
                Refer a patient
              </Button>
              <Button to="/for-patients" variant="ghost">
                What happens in a review
              </Button>
            </div>
          </Reveal>

          {/* headline figures */}
          <Reveal delay={0.24}>
            <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-navy-900/10 pt-8">
              {[
                { value: '$0', label: 'No cost for the review' },
                { value: 'In person', label: 'Every review, at home' },
                { value: `${site.turnaroundDays} days`, label: 'Typical report turnaround' },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-xl font-semibold tracking-[-0.02em] text-navy-900 md:text-2xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1.5 text-[0.8125rem] leading-snug text-faint">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ------------------------------------------------ eligibility card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* offset plate behind the card */}
          <span
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-3xl border border-rose/25 sm:block"
          />

          <div className="relative rounded-3xl border border-navy-900/[0.07] bg-paper p-8 shadow-lift md:p-10">
            <h2 className="text-xl md:text-[1.375rem]">A review may help if the patient&hellip;</h2>
            <Checklist items={heroChecklist} className="mt-7" />

            <hr className="my-7 border-t border-navy-900/10" />

            <p className="text-sm leading-relaxed text-muted">
              <strong className="font-semibold text-ink">Not sure?</strong> Send us the details and
              we&rsquo;ll confirm suitability before any appointment is booked.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [...trustPoints, ...trustPoints];
  return (
    <div className="on-dark relative overflow-hidden border-y border-bone/10 bg-navy-900 py-5">
      <div className="flex w-max animate-marquee items-center">
        {items.map((point, i) => (
          <span
            key={`${point.label}-${i}`}
            className="flex shrink-0 items-center gap-3 px-8 text-sm text-bone/75"
          >
            <span className="text-rose-300" aria-hidden="true">
              {trustIcons[point.icon]}
            </span>
            {point.label}
            <span aria-hidden="true" className="ml-8 size-1 rounded-full bg-rose/50" />
          </span>
        ))}
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy-900 to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy-900 to-transparent"
      />
    </div>
  );
}

/* ------------------------------------------------------------------- page */

export function Home() {
  useMeta('/');

  return (
    <>
      <Hero />
      <TrustStrip />

      {/* ------------------------------------------------------ why it matters */}
      <Section>
        <SectionHead
          layout="split"
          eyebrow="Why it matters"
          title={
            <>
              Better outcomes,
              <br />
              fewer emergencies.
            </>
          }
          lede="Medication-related harm is one of the most preventable causes of hospital admission in Australia. The problems almost never surface in a consulting room — they surface at home, in the second box of the same tablet, the inhaler that has not been used correctly in months, or the dose that gets skipped because it causes nausea."
        >
          <p className="mt-6">
            <TextLink to="/services">See how a review works</TextLink>
          </p>
        </SectionHead>

        <Grid cols={3}>
          {problems.map((p, i) => (
            <Card key={p.title} icon={p.icon} title={p.title} delay={i * 0.08}>
              {p.body}
            </Card>
          ))}
        </Grid>
      </Section>

      {/* ------------------------------------------------------------ services */}
      <Section tone="paper" id="services">
        <SectionHead
          eyebrow="Our services"
          title="Clinical review, end to end."
          lede="Each service is delivered by a qualified consultant pharmacist and reported back to the referring practitioner in a format you can act on at the next consultation."
        />

        <ol className="divide-y divide-navy-900/10 border-t border-navy-900/10">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05}>
              <div className="group grid items-start gap-5 py-9 md:grid-cols-[6rem_1fr_1.2fr] md:gap-10 md:py-11">
                <span className="font-display text-2xl font-light tabular-nums text-rose/70 transition-colors duration-500 group-hover:text-rose md:text-3xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[1.375rem] transition-colors duration-500 group-hover:text-navy-500">
                    {s.title}
                  </h3>
                  <span className="mt-2.5 inline-block rounded-full bg-navy-50 px-3 py-1 text-[0.75rem] font-medium text-navy-700">
                    {s.tag}
                  </span>
                </div>
                <p className="leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12">
          <Button to="/services" arrow>
            Explore all services
          </Button>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------- pathway */}
      <Section tone="sage">
        <SectionHead
          layout="center"
          eyebrow="The pathway"
          title="From referral to resolution."
          lede="Four steps, with the GP in control at the start and the end."
        />
        <Steps items={pathway} />
      </Section>

      {/* ---------------------------------------------------------- for GPs */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>For general practitioners</Eyebrow>
            <h2>Designed around your workflow.</h2>
            <Lede className="mt-6">
              Writing a referral should take minutes, not an afternoon. Send it however suits your
              practice — email, our online form or a phone call — and we take care of scheduling,
              travel, the interview and the report.
            </Lede>
            <Checklist items={gpPoints} className="mt-8" />
            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/for-gps" arrow>
                Referral pathways
              </Button>
              <Button to="/contact#refer" variant="ghost">
                Start a referral
              </Button>
            </div>
          </Reveal>

          <Panel
            title="What lands in your inbox"
            lede="A single report, written by a pharmacist who has sat at the patient’s kitchen table and checked what is actually in the cupboard. Findings first, reasoning underneath, references where they matter."
          >
            <StatRow
              items={[
                { value: 'Every medicine', label: 'Scripts, OTC, supplements' },
                { value: 'Prioritised', label: 'Highest risk at the top' },
                { value: 'Plain language', label: 'Patient copy included' },
                { value: 'Your call', label: 'Advisory, not directive' },
              ]}
            />
          </Panel>
        </div>
      </Section>

      {/* --------------------------------------------------------------- quote */}
      <Section tone="paper" tight>
        <Quote cite={site.name}>
          Medication-related problems are among the most preventable causes of hospital admission —
          and nearly everything a review identifies is simpler to address in a living room than an
          emergency department.
        </Quote>
      </Section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Common questions</Eyebrow>
            <h2>The things people ask first.</h2>
            <Lede className="mt-6">
              If your question isn&rsquo;t here, get in touch — we would rather talk it through than
              have a patient miss out on a review they&rsquo;d benefit from.
            </Lede>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/for-patients" variant="ghost">
                More for patients &amp; carers
              </Button>
              <Button to="/blog" variant="ghost">
                Read the blog
              </Button>
            </div>
          </Reveal>

          <Accordion items={homeFaqs} />
        </div>
      </Section>

      <Cta
        eyebrow="Get in touch"
        title="Refer a patient today."
        lede="Send a referral, or call us to talk through a case before you do. We'll take it from there."
      >
        <Button to="/contact#refer" variant="light" arrow>
          Make a referral
        </Button>
        <PhoneAction className="inline-flex items-center justify-center gap-2.5 rounded-full text-[0.9375rem] font-medium px-6 py-3.5 border border-bone/35 text-bone hover:bg-bone/10 hover:border-bone/60 transition-all duration-300">
          Call {site.phone}
        </PhoneAction>
      </Cta>
    </>
  );
}
