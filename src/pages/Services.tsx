import { Card, Checklist, Grid, Panel, Steps } from '@/components/Blocks';
import { Button } from '@/components/Button';
import { Cta } from '@/components/Cta';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Eyebrow, Lede, Section, SectionHead } from '@/components/Section';
import { useMeta } from '@/lib/useMeta';

const hmrChecks = [
  'Prescription medicines, including those from other prescribers',
  'Over-the-counter products, vitamins, supplements and herbal remedies',
  'Inhalers, patches, creams, eye and ear drops',
  'Expiry dates, storage conditions and leftover stock',
  'Device technique — inhalers, blood pressure and glucose monitors',
] as const;

const dischargeSteps = [
  {
    title: 'Discharge summary',
    body: 'We start from what the hospital sent, alongside the pre-admission list held by the practice.',
  },
  {
    title: 'Home check',
    body: 'Every container in the house is matched against both lists, including what was stopped.',
  },
  {
    title: 'Discrepancies',
    body: 'Duplications, omissions and dose mismatches are flagged clearly, with the likely cause.',
  },
  {
    title: 'Back to you',
    body: 'A short, prioritised report so the next consult starts from an accurate list.',
  },
];

const planCards = [
  {
    title: 'Reminder strategies',
    body: 'Practical systems that fit the household — not a generic pamphlet.',
  },
  { title: 'Device coaching', body: 'Inhalers, monitors and injectables, demonstrated and checked back.' },
  { title: 'Carer briefing', body: 'Family and carers included, with their questions answered directly.' },
  {
    title: 'One shareable plan',
    body: 'A single document the patient can hand to any clinician they see.',
  },
];

export function Services() {
  useMeta('/services');

  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="What we do"
        title="Medication review, done properly."
        lede="Four services, one principle: the only way to know what a patient is really taking is to sit with them and look."
      />

      {/* ------------------------------------------------------------------ HMR */}
      <Section id="hmr">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Service 01</Eyebrow>
            <h2>Home Medicines Review</h2>
            <Lede className="mt-6">
              A credentialed pharmacist visits the patient in their own home and reviews every
              medicine they take — checking that each one is safe, is being taken correctly, and is
              still working for them.
            </Lede>
            <p className="mt-6 leading-relaxed text-muted">
              It is a different exercise from a review in your rooms. At home we can see the dose
              administration aid, the duplicate boxes, the inhaler technique, the expired cream at
              the back of the drawer, and the note on the fridge that explains why a dose keeps
              getting missed.
            </p>
            <div className="mt-10">
              <Button to="/contact#refer" arrow>
                Refer for an HMR
              </Button>
            </div>
          </Reveal>

          <Panel
            title="What the pharmacist checks"
            lede="Everything in the house that the patient takes or applies — not just what's on the script list."
          >
            <Checklist items={hmrChecks} light className="mt-8" />
          </Panel>
        </div>
      </Section>

      {/* ----------------------------------------------------------------- RMMR */}
      <Section tone="paper" id="rmmr">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <Eyebrow>Service 02</Eyebrow>
            <h2>Residential Medication Management Review</h2>
            <Lede className="mt-6">
              The equivalent service for residents of aged care homes, where a doctor&rsquo;s
              referral is required.
            </Lede>
            <p className="mt-6 leading-relaxed text-muted">
              The pharmacist attends the facility and discusses the resident&rsquo;s medicines with
              them and, where appropriate, their family, carers and nursing staff. The report goes
              back to the GP and the care team together, with practical suggestions that account for
              how medicines are actually administered on the floor.
            </p>
            <div className="mt-10">
              <Button to="/contact" variant="ghost">
                Talk to us about facility coverage
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:order-1">
            <Card title="Resident-centred" delay={0.05}>
              The resident is part of the conversation wherever they are able to be — not reviewed at
              a distance from a chart.
            </Card>
            <Card title="Team-aware" delay={0.12}>
              Recommendations consider nursing routines, swallowing difficulties, PRN use and
              administration rounds.
            </Card>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ discharge */}
      <Section id="discharge">
        <SectionHead
          layout="split"
          eyebrow="Service 03"
          title="Post-discharge reconciliation."
          lede="The fortnight after a hospital stay is when medicine lists and reality diverge the fastest. Doses change, brands change, and the old box is usually still in the cupboard. We prioritise these referrals."
        />
        <Steps items={dischargeSteps} />
      </Section>

      {/* ----------------------------------------------------------------- plan */}
      <Section tone="deep" id="plan">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Service 04</Eyebrow>
            <h2 className="text-bone">Medication Management Plans &amp; education.</h2>
            <Lede className="mt-6 text-bone/70">
              After the GP has discussed the report with the patient, the patient receives a
              Medication Management Plan — a plain-language summary they can share with any
              healthcare provider. With their agreement, a copy also goes to their local pharmacy.
            </Lede>
            <div className="mt-10">
              <Button to="/for-patients" variant="light" arrow>
                What patients receive
              </Button>
            </div>
          </Reveal>

          <Grid cols={2}>
            {planCards.map((c, i) => (
              <Card key={c.title} title={c.title} variant="outlineLight" delay={i * 0.07}>
                {c.body}
              </Card>
            ))}
          </Grid>
        </div>
      </Section>

      <Cta
        eyebrow="Get started"
        title="Send us a referral."
        lede="We'll confirm suitability, contact the patient, and book a time that works for them."
      >
        <Button to="/contact#refer" variant="light" arrow>
          Make a referral
        </Button>
        <Button to="/for-gps" variant="outlineLight">
          Referral pathways
        </Button>
      </Cta>
    </>
  );
}
