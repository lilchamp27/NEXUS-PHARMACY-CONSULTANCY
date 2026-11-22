import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button, TextLink } from './Button';
import { Field, FormRow, Input, Note, Select, Textarea } from './Form';
import { submitForm } from '@/lib/submitForm';
import { site } from '@/data/site';

const types = [
  'Patient',
  'Family member or carer',
  'Aged care facility',
  'Community pharmacy',
  'Other',
] as const;

export function EnquiryForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};

    if (!String(data.get('name') ?? '').trim()) next.name = 'Please tell us your name.';
    if (!String(data.get('contact') ?? '').trim())
      next.contact = 'An email or phone number, so we can reply.';
    if (!String(data.get('message') ?? '').trim()) next.message = 'What would you like to ask?';

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
      subject: `Enquiry from ${String(data.get('name'))}`,
      Name: String(data.get('name')),
      'Contact details': String(data.get('contact')),
      Type: String(data.get('type')),
      Message: String(data.get('message')),
    });

    setSending(false);

    if (result.ok) {
      setDone(true);
    } else {
      setSubmitError(result.error);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        role="status"
        className="rounded-2xl border border-navy-500/25 bg-paper p-8 text-center md:p-10"
      >
        <CheckCircle2 className="mx-auto size-10 text-navy-500" aria-hidden="true" />
        <h3 className="mt-5">Message sent.</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          Thanks for reaching out. We&rsquo;ll get back to you as soon as we can.
        </p>
        <div className="mt-7">
          <Button variant="ghost" type="button" onClick={() => setDone(false)}>
            Send another
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <FormRow>
        <Field id="g-name" label="Your name" error={errors.name}>
          <Input id="g-name" name="name" autoComplete="name" placeholder="Name" error={errors.name} />
        </Field>
        <Field id="g-contact" label="Email or phone" error={errors.contact}>
          <Input
            id="g-contact"
            name="contact"
            placeholder="How we reach you"
            error={errors.contact}
          />
        </Field>
      </FormRow>

      <Field id="g-type" label="I am a…">
        <Select id="g-type" name="type" options={types} />
      </Field>

      <Field id="g-msg" label="Your message" error={errors.message}>
        <Textarea
          id="g-msg"
          name="message"
          rows={5}
          placeholder="How can we help?"
          error={errors.message}
        />
      </Field>

      {!site.formAccessKey && (
        <Note>
          Submitting opens your email client. You can also email us directly at{' '}
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
            'Send message'
          )}
        </Button>
      </div>
    </form>
  );
}
