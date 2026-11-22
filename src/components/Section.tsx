import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

type Tone = 'cream' | 'paper' | 'sage' | 'deep';

const tones: Record<Tone, string> = {
  cream: 'bg-cream text-ink',
  paper: 'bg-paper text-ink',
  sage: 'bg-navy-50 text-ink',
  deep: 'on-dark bg-navy-900 text-bone',
};

export function Section({
  children,
  tone = 'cream',
  tight = false,
  id,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  tight?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'grain relative scroll-mt-28',
        tones[tone],
        tight ? 'py-16 md:py-20' : 'py-20 md:py-28 lg:py-32',
        className,
      )}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'mb-4 inline-flex items-center gap-2.5 font-sans text-[0.6875rem] font-semibold',
        'uppercase tracking-[0.18em] text-rose',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-rose/70" />
      {children}
    </p>
  );
}

/**
 * Section heading. `layout="split"` puts the heading and the lede in two
 * columns on wide screens — the editorial rhythm the whole site runs on.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  layout = 'stack',
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  layout?: 'stack' | 'split' | 'center';
  children?: ReactNode;
}) {
  if (layout === 'split') {
    return (
      <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <Reveal>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2>{title}</h2>
        </Reveal>
        {(lede || children) && (
          <Reveal delay={0.08} className="md:pt-3">
            {lede && <Lede>{lede}</Lede>}
            {children}
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <Reveal
      className={cn(
        'mb-14 md:mb-20',
        layout === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl',
      )}
    >
      {eyebrow && <Eyebrow className={layout === 'center' ? 'justify-center' : ''}>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {lede && <Lede className="mt-6">{lede}</Lede>}
      {children}
    </Reveal>
  );
}

export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-lg leading-relaxed text-muted md:text-[1.1875rem]', className)}>
      {children}
    </p>
  );
}
