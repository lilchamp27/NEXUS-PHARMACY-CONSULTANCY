import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button, TextLink } from './Button';
import { Checkbox, Field, FormRow, Input, Note, Select, Textarea } from './Form';
import { submitForm } from '@/lib/submitForm';
import { site } from '@/data/site';

type Errors = Record<string, string>;

const services = [
  'Home Medicines Review (HMR)',
  'Residential Medication Management Review (RMMR)',
  'Post-discharge reconciliation',
  'Not sure — please advise',
] as const;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Success({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-navy-500/25 bg-navy-50 p-8 text-center md:p-10"
      role="status"
    >
      <CheckCircle2 className="mx-auto size-10 text-navy-500" aria-hidden="true" />
      <h3 className="mt-5">Referral sent.</h3>
      <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
        We&rsquo;ve received your referral and will triage it today. If anything is missing
        we&rsquo;ll be in touch.
      </p>
      <div className="mt-7">
        <Button variant="ghost" type="button" onClick={onReset}>
          Submit another
        </Button>
      </div>
    </motion.div>
  );
}

export function ReferralForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};

    const required: Array<[string, string]> = [
      ['practitioner', 'Tell us who is referring.'],
      ['patient', "The patient's name is required."],
      ['patient_phone', 'We need a number to arrange the visit.'],
      ['address', 'We visit the patient at home, so we need an address.'],
    ];
    for (const [key, message] of required) {
      if (!String(data.get(key) ?? '').trim()) next[key] = message;
    }

    const email = String(data.get('email') ?? '').trim();
    if (!email) next.email = 'We send the report back here.';
    else if (!emailRe.test(email)) next.email = 'That does not look like an email address.';

    if (!data.get('consent')) next.consent = 'We cannot proceed without patient consent.';

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0];
      const el = form.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      el?.focus();
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSending(true);
    setSubmitError('');

    const result = await submitForm({
      subject: `Referral from ${String(data.get('practitioner'))}`,
      'Referring practitioner': String(data.get('practitioner')),
      Practice: String(data.get('practice')),
      'Practice email': email,
      'Practice phone': String(data.get('phone')),
      'Patient name': String(data.get('patient')),
      'Patient DOB': String(data.get('dob')),
      'Patient phone': String(data.get('patient_phone')),
      'Service requested': String(data.get('service')),
      'Patient address': String(data.get('address')),
      'Reason for referral': String(data.get('reason')),
    });

    setSending(false);

    if (result.ok) {
      setDone(true);
    } else {
      setSubmitError(result.error);
    }
  }

  if (done) return <Success onReset={() => setDone(false)} />;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <FormRow>
        <Field id="ref-name" label="Referring practitioner" error={errors.practitioner}>
          <Input
            id="ref-name"
            name="practitioner"
            autoComplete="name"
            placeholder="Dr A. Example"
            error={errors.practitioner}
          />
        </Field>
        <Field id="ref-practice" label="Practice">
          <Input id="ref-practice" name="practice" placeholder="Practice name" />
        </Field>
      </FormRow>

      <FormRow>
        <Field id="ref-email" label="Practice email" error={errors.email}>
          <Input
            id="ref-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="reception@practice.com.au"
            error={errors.email}
          />
        </Field>
        <Field id="ref-phone" label="Practice phone">
          <Input
            id="ref-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(08) 0000 0000"
          />
        </Field>
      </FormRow>

      <hr className="my-1 border-t border-navy-900/10" />

      <FormRow>
        <Field id="pt-name" label="Patient name" error={errors.patient}>
          <Input id="pt-name" name="patient" placeholder="Full name" error={errors.patient} />
        </Field>
        <Field id="pt-dob" label="Patient date of birth">
          <Input id="pt-dob" name="dob" placeholder="DD / MM / YYYY" />
        </Field>
      </FormRow>

      <FormRow>
        <Field id="pt-phone" label="Patient contact number" error={errors.patient_phone}>
          <Input
            id="pt-phone"
            name="patient_phone"
            type="tel"
            placeholder="Best number for booking"
            error={errors.patient_phone}
          />
        </Field>
        <Field id="svc" label="Service requested">
          <Select id="svc" name="service" options={services} />
        </Field>
      </FormRow>

      <Field id="pt-address" label="Patient address" error={errors.address}>
        <Input
          id="pt-address"
          name="address"
          placeholder="Street, suburb, state, postcode"
          error={errors.address}
        />
      </Field>

      <Field
        id="reason"
        label="Reason for referral & relevant history"
        hint="Conditions, allergies, recent admissions, what you'd like looked at closely."
      >
        <Textarea id="reason" name="reason" placeholder="One or two lines is plenty." />
      </Field>

      <Checkbox id="consent" name="consent" error={errors.consent}>
        I confirm the patient has consented to this referral and to their health information being
        shared with Nexus Pharmacy Consultancy for the purpose of the review.
      </Checkbox>

      {!site.formAccessKey && (
        <Note>
          Submitting opens your email client with the referral details pre-filled. Alternatively,
          email us directly at{' '}
          <TextLink href={`mailto:${site.emailGeneral}`}>{site.emailGeneral}</TextLink>.
        </Note>
      )}

      {submitError && <Note tone="warn">{submitError}</Note>}

      <div>
        <Button type="submit" arrow disabled={sending}>
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            'Submit referral'
          )}
        </Button>
      </div>
    </form>
  );
}
