import { Clock, Lock, PencilLine, ShieldCheck, Shuffle, Users } from 'lucide-react';
import { Card, Grid, Panel, Quote, StatRow } from '@/components/Blocks';
import { Button } from '@/components/Button';
import { Cta } from '@/components/Cta';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Eyebrow, Lede, Section, SectionHead } from '@/components/Section';
import { site } from '@/data/site';
import { useMeta } from '@/lib/useMeta';

const principles = [
  {
    icon: <ShieldCheck className="size-5" />,
    title: 'Credentialed clinicians only',
    body: 'Reviews are conducted by pharmacists credentialed to perform them — never delegated, never desk-based.',
  },
  {
    icon: <Users className="size-5" />,
    title: 'The patient is the expert',
    body: 'Nobody knows more about how a regimen actually plays out than the person living with it. We start by listening.',
  },
  {
    icon: <PencilLine className="size-5" />,
    title: 'Reports people read',
    body: "Clear, prioritised and short enough to be read between patients — because a report that isn't read changes nothing.",
  },
  {
    icon: <Lock className="size-5" />,
    title: 'Privacy as standard',
    body: 'Health information is handled in line with Australian privacy law, shared only with the people the patient has agreed to.',
  },
  {
    icon: <Clock className="size-5" />,
    title: 'Responsive turnaround',
    body: 'Referrals triaged the day they arrive, with post-discharge patients prioritised ahead of the queue.',
  },
  {
    icon: <Shuffle className="size-5" />,
    title: 'Continuity, not transactions',
    body: "With consent, the plan goes to the patient's regular pharmacy so the work doesn't stop at our report.",
  },
];

export function About() {
  useMeta('/about');

  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About us"
        title="The connection between the script and the cupboard."
        lede="Nexus exists because the most important medication information in a patient's life isn't in a file. It's at home, and someone has to go and look."
      />

      {/* -------------------------------------------------------------- purpose */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Our purpose</Eyebrow>
            <h2>Medication safety, one household at a time.</h2>
            <Lede className="mt-6">
              We partner with general practice, aged care providers and community pharmacy to
              deliver credentialed medication reviews that are thorough, unhurried and genuinely
              useful to the person who has to take the medicines.
            </Lede>
            <p className="mt-6 leading-relaxed text-muted">
              The name is the idea: a nexus is a connection point. A medication review only works
              when the prescriber, the pharmacist, the carer and the patient are all looking at the
              same accurate picture — and our job is to build that picture and hand it back to the
              people who can act on it.
            </p>
          </Reveal>

          <Panel
            title="What we hold ourselves to"
            lede="Four commitments that shape every review we accept."
          >
            <StatRow
              single
              items={[
                { value: 'Face to face', label: 'Every review in person' },
                { value: 'Unhurried', label: 'As long as the patient needs' },
                { value: 'Evidence-led', label: 'Recommendations you can check' },
                { value: 'Advisory', label: 'The prescriber decides' },
              ]}
            />
          </Panel>
        </div>
      </Section>

      {/* ----------------------------------------------------------- principles */}
      <Section tone="paper">
        <SectionHead layout="center" eyebrow="How we work" title="Principles, not slogans." />

        <Grid cols={3}>
          {principles.map((p, i) => (
            <Card key={p.title} icon={p.icon} title={p.title} delay={i * 0.06}>
              {p.body}
            </Card>
          ))}
        </Grid>
      </Section>

      {/* ------------------------------------------------------- practice details */}
      <Section tone="deep">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <Eyebrow>The practice</Eyebrow>
            <h2 className="text-bone">Registered, regulated, accountable.</h2>
            <Lede className="mt-6 text-bone/70">
              {site.name} is a registered Australian business name, held by its principal consultant
              pharmacist and regulated by the Australian Securities and Investments Commission.
            </Lede>
            <div className="mt-10">
              <Button to="/contact" variant="light" arrow>
                Get in touch
              </Button>
            </div>
          </Reveal>

          <dl className="grid gap-5 sm:grid-cols-2 lg:order-1">
            {[
              { k: 'Business name', v: site.name },
              { k: 'Holder', v: site.holder },
            ].map((row, i) => (
              <Reveal
                key={row.k}
                delay={i * 0.07}
                className="rounded-2xl border border-bone/18 bg-white/[0.045] p-7"
              >
                <dt className="font-display text-lg font-semibold text-bone">{row.k}</dt>
                <dd className="mt-2 leading-relaxed text-bone/70">{row.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- quote */}
      <Section tight>
        <Quote cite={site.name}>
          Prevention is the whole point. Almost everything a review finds is easier to fix in a
          living room than in an emergency department.
        </Quote>
      </Section>

      <Cta
        eyebrow="Work with us"
        title="Let's start with one patient."
        lede="Send a referral, or ask us anything about how the service runs in your area."
      >
        <Button to="/contact#refer" variant="light" arrow>
          Make a referral
        </Button>
        <Button to="/contact" variant="outlineLight">
          Contact us
        </Button>
      </Cta>
    </>
  );
}
