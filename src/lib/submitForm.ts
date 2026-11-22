import { site } from '@/data/site';

type Result = { ok: true } | { ok: false; error: string };

export async function submitForm(data: Record<string, string>): Promise<Result> {
  if (site.formAccessKey) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: site.formAccessKey, ...data }),
      });
      const json = await res.json();
      if (json.success) return { ok: true };
      return { ok: false, error: json.message ?? 'Submission failed. Please try again.' };
    } catch {
      return { ok: false, error: 'Network error — please try again or email us directly.' };
    }
  }

  // Fallback: open the user's email client with form data as the body.
  const subject = encodeURIComponent(data.subject ?? 'Website form submission');
  const body = encodeURIComponent(
    Object.entries(data)
      .filter(([k]) => k !== 'subject')
      .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`)
      .join('\n\n'),
  );
  window.location.href = `mailto:${site.emailGeneral}?subject=${subject}&body=${body}`;
  return { ok: true };
}
