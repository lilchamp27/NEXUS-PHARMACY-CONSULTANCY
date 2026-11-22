import { FileText, Mail, Phone, Printer } from 'lucide-react';
import { Card, Checklist, Grid, Steps } from '@/components/Blocks';
import { Button, TextLink } from '@/components/Button';
import { Cta } from '@/components/Cta';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Eyebrow, Lede, Section, SectionHead } from '@/components/Section';
import { site } from '@/data/site';
import { useMeta } from '@/lib/useMeta';

const whoToRefer = [
  'They take a number of medicines regularly, particularly five or more',
  'Medicines are coming from several doctors or specialists',
  'They are starting a new medicine, or one with a narrow therapeutic index',
  'They have recently been discharged from hospital',
  'They report feeling unwell after taking their medicines',
  'Doses are being missed, doubled or confused',
  'The patient or their family is simply worried about the medicines',
] as const;

const pathways = [
  {
    icon: <Mail className="size-5" />,
    title: 'Secure messaging',
    body: 'Send through your usual secure messaging provider with the current medicines list attached.',
  },
  {
    icon: <Printer className="size-5" />,
    title: 'Fax',
    body: 'Still the fastest option in many practices. Cover sheet optional — the referral is enough.',
  },
  {
    icon: <FileText className="size-5" />,
    title: 'Online form',
    body: 'Our referral form captures everything we need in one pass, with no account required.',
    link: true,
  },
  {
    icon: <Phone className="size-5" />,
    title: 'Call us',
    body: 'Prefer to discuss a case first? Speak to a consultant pharmacist before you refer.',
  },
];

const include = [
  {
    title: 'Patient details',
    body: 'Name, date of birth, address and the best contact number for arranging the visit.',
  },
  { title: 'Current medicines', body: 'Your current list, however it prints from your software.' },
  {
    title: 'Relevant history',
    body: 'Conditions, allergies, recent admissions and recent pathology where relevant.',
  },
  {
    title: 'Reason for referral',
    body: 'One line is plenty — it tells the pharmacist what to look hardest at.',
  },
];

const reportCards = [
  { title: 'Reconciled list', body: 'What the patient is actually taking, against what is on file.' },
  {
    title: 'Risk findings',
    body: 'Interactions, duplications, dose concerns and adherence barriers.',
  },
  {
    title: 'Recommendations',
    body: 'Specific, prioritised, and justified — with the evidence cited.',
  },
  { title: 'Patient copy', body: 'A plain-language plan ready for your follow-up consultation.' },
];

export function ForGps() {
  useMeta('/for-gps');

  return (
    <>
      <PageHero
        crumb="For GPs"
        eyebrow="For general practitioners"
        title="A referral should take a minute."
        lede="You identify the patient and write the referral. We handle contact, scheduling, travel, the interview and the report — and every prescribing decision comes back to you."
      />

      {/* ----------------------------------------------------------- who to refer */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Who to refer</Eyebrow>
            <h2>Consider a review when&hellip;</h2>
            <Lede className="mt-6">
              There is no fixed checklist — you assess whether the patient would benefit. In
              practice, these are the patterns that most often turn up something worth acting on.
            </Lede>
          </Reveal>

          <Reveal delay={0.08} className="rounded-2xl border border-navy-900/[0.07] bg-paper p-8 shadow-card md:p-9">
            <Checklist items={whoToRefer} />
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------------------- pathways */}
      <Section tone="paper">
        <SectionHead
          layout="center"
          eyebrow="Referral pathways"
          title="Send it however suits your practice."
          lede="All four routes reach the same intake queue and are triaged the same day."
        />

        <Grid cols={4}>
          {pathways.map((p, i) => (
            <Card key={p.title} icon={p.icon} title={p.title} delay={i * 0.07}>
              {p.body}
              {p.link && (
                <span className="mt-4 block">
                  <TextLink to="/contact#refer">Open the form</TextLink>
                </span>
              )}
            </Card>
          ))}
        </Grid>
      </Section>

      {/* ------------------------------------------------------- what to include */}
      <Section tone="sage">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <Eyebrow>What to include</Eyebrow>
            <h2>Four things, and we can start.</h2>
            <Lede className="mt-6">
              Anything beyond this is welcome but not required — we&rsquo;ll come back to you if
              something essential is missing.
            </Lede>
            <div className="mt-10">
              <Button to="/contact#refer" arrow>
                Start a referral
              </Button>
            </div>
          </Reveal>

          <Steps items={include} cols={2} />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- report */}
      <Section tone="deep">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>The report</Eyebrow>
            <h2 className="text-bone">Written to be actioned, not filed.</h2>
            <Lede className="mt-6 text-bone/70">
              Findings are prioritised by clinical risk and written in the order you would want to
              raise them. Reasoning and references sit underneath each recommendation, so you can
              accept, modify or set aside any of it in seconds.
            </Lede>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-bone/55">
              Recommendations are advisory. {site.name} does not prescribe, and no change is made to
              a patient&rsquo;s regimen without your decision.
            </p>
          </Reveal>

          <Grid cols={2}>
            {reportCards.map((c, i) => (
              <Card key={c.title} title={c.title} variant="outlineLight" delay={i * 0.07}>
                {c.body}
              </Card>
            ))}
          </Grid>
        </div>
      </Section>

      <Cta
        eyebrow="Next step"
        title="Refer your first patient."
        lede="Or call and talk a case through with a consultant pharmacist first — there's no obligation either way."
      >
        <Button to="/contact#refer" variant="light" arrow>
          Make a referral
        </Button>
        <Button href={site.phoneHref} variant="outlineLight">
          Call {site.phone}
        </Button>
      </Cta>
    </>
  );
}
