import { CalendarDays, FileText, Home as HomeIcon } from 'lucide-react';
import { Accordion, type Faq } from '@/components/Accordion';
import { Card, Grid, Panel, StatRow } from '@/components/Blocks';
import { Button } from '@/components/Button';
import { Cta } from '@/components/Cta';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Eyebrow, Lede, Section, SectionHead } from '@/components/Section';
import { site } from '@/data/site';
import { useMeta } from '@/lib/useMeta';

const reasons = [
  {
    title: 'You take a lot of medicines',
    body: 'Especially five or more regularly, or medicines that have been added one at a time over the years.',
  },
  {
    title: 'They come from different doctors',
    body: 'When a GP, a specialist and a hospital are all prescribing, nobody automatically sees the whole picture.',
  },
  {
    title: "You've just left hospital",
    body: 'Doses and brands often change during an admission, and the old boxes are usually still at home.',
  },
  {
    title: 'Something new has started',
    body: 'A new medicine is the most common moment for an unexpected interaction or side effect.',
  },
  {
    title: 'You feel unwell after taking them',
    body: 'Dizziness, drowsiness, nausea or falls are worth investigating, not putting up with.',
  },
  {
    title: "You forget doses — or you're worried",
    body: 'Both are common, both are fixable, and neither is anything to be embarrassed about.',
  },
];

const timeline = [
  {
    icon: <CalendarDays className="size-5" />,
    title: 'Before the visit',
    body: 'Gather everything you take and put it on the table — prescription medicines, anything you buy over the counter, vitamins, supplements, herbal remedies, and any inhalers, patches, creams, or eye and ear drops. Bring the actual boxes and bottles rather than a list.',
  },
  {
    icon: <HomeIcon className="size-5" />,
    title: 'During the visit',
    body: "The pharmacist goes through each medicine with you — what it's for, how and when you take it, whether it's still in date, and how it's stored. They'll check how you use any devices, and talk through ways to remember doses that actually fit your routine.",
  },
  {
    icon: <FileText className="size-5" />,
    title: 'After the visit',
    body: "The pharmacist writes a report and sends it to your doctor. Book a follow-up appointment — your doctor will go through the report with you and may change some medicines. You'll receive a Medication Management Plan you can share with any health professional you see.",
  },
];

const faqs: readonly Faq[] = [
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
];

export function ForPatients() {
  useMeta('/for-patients');

  return (
    <>
      <PageHero
        crumb="For Patients"
        eyebrow="For patients & carers"
        title="Someone to go through your medicines with you."
        lede="A Home Medicines Review is a free visit from a credentialed pharmacist who checks that your medicines are safe, that you're taking them correctly, and that they're working for you."
      />

      {/* -------------------------------------------------------------- what it is */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>What it is</Eyebrow>
            <h2>A conversation, at your kitchen table.</h2>
            <Lede className="mt-6">
              Your doctor refers you. A pharmacist comes to your home at a time that suits you, and
              goes through everything you take — one medicine at a time, at your pace, with as many
              questions as you want to ask.
            </Lede>
            <p className="mt-6 leading-relaxed text-muted">
              Your community pharmacy is part of the process too, and your carer, family member or
              community nurse is welcome to sit in. It is different from the review your doctor does
              in their rooms: that one looks at whether you&rsquo;re on the right medicines for your
              condition, while this one looks at how those medicines work in your actual day.
            </p>
          </Reveal>

          <Panel title="The short version">
            <StatRow
              single
              items={[
                { value: "It's free", label: 'No cost for the review itself' },
                { value: 'At home', label: "You don't have to travel anywhere" },
                { value: 'About an hour', label: 'Longer if you have questions' },
                {
                  value: 'Nothing changes without your doctor',
                  label: 'We report back; they decide with you',
                },
              ]}
            />
          </Panel>
        </div>
      </Section>

      {/* ------------------------------------------------------------ who it's for */}
      <Section tone="paper">
        <SectionHead
          layout="center"
          eyebrow="Who it's for"
          title="It might be worth asking your doctor if…"
          lede="There's no strict list. Your doctor decides whether you'd benefit — but these are good reasons to raise it."
        />

        <Grid cols={3}>
          {reasons.map((r, i) => (
            <Card key={r.title} title={r.title} delay={i * 0.06}>
              {r.body}
            </Card>
          ))}
        </Grid>
      </Section>

      {/* ---------------------------------------------------------- what happens */}
      <Section tone="sage">
        <SectionHead eyebrow="What happens" title="Before, during and after." />

        <Grid cols={3}>
          {timeline.map((t, i) => (
            <Card key={t.title} icon={t.icon} title={t.title} delay={i * 0.08}>
              {t.body}
            </Card>
          ))}
        </Grid>
      </Section>

      {/* -------------------------------------------------- aged care + questions */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>In aged care</Eyebrow>
            <h2>If you live in an aged care home.</h2>
            <Lede className="mt-6">
              The service is called a Residential Medication Management Review, and your doctor needs
              to refer you for it.
            </Lede>
            <p className="mt-6 leading-relaxed text-muted">
              The pharmacist visits you at the home and talks about your medicines with you and — if
              you&rsquo;d like — your family, carers and the staff who look after you. They then
              report back to your doctor and your care team with suggestions for improving how your
              medicines are managed.
            </p>
          </Reveal>

          <Accordion items={faqs} />
        </div>
      </Section>

      <Cta
        eyebrow="Talk to us"
        title="Not sure if it's for you?"
        lede="Call and ask. We'll explain how it works and what to say to your doctor — there's no cost and no obligation."
      >
        <Button href={site.phoneHref} variant="light">
          Call {site.phone}
        </Button>
        <Button to="/contact" variant="outlineLight">
          Send a message
        </Button>
      </Cta>
    </>
  );
}
