import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

/* -------------------------------------------------------------------- card */

export function Card({
  icon,
  title,
  children,
  variant = 'default',
  delay = 0,
  className,
}: {
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  variant?: 'default' | 'outlineLight';
  delay?: number;
  className?: string;
}) {
  const light = variant === 'outlineLight';
  return (
    <Reveal
      as="article"
      delay={delay}
      className={cn(
        'group relative flex flex-col rounded-2xl p-7 transition-all duration-500',
        'ease-[cubic-bezier(0.16,1,0.3,1)] md:p-8',
        light
          ? 'border border-bone/18 bg-white/[0.045] hover:border-bone/35 hover:bg-white/[0.08]'
          : 'border border-navy-900/[0.07] bg-paper shadow-card hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
    >
      {/* hairline that warms up on hover */}
      {!light && (
        <span
          aria-hidden="true"
          className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-rose/0 via-rose/60 to-rose/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      {icon && (
        <span
          className={cn(
            'mb-6 inline-grid size-12 shrink-0 place-items-center rounded-xl transition-colors duration-500',
            light
              ? 'bg-bone/10 text-rose-300'
              : 'bg-navy-50 text-navy-500 group-hover:bg-navy-900 group-hover:text-bone',
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      {title && <h3 className={cn(light && 'text-bone')}>{title}</h3>}
      {children && (
        <div className={cn('mt-3 leading-relaxed', light ? 'text-bone/70' : 'text-muted')}>
          {children}
        </div>
      )}
    </Reveal>
  );
}

export function Grid({
  cols = 3,
  children,
  className,
}: {
  cols?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}) {
  const map = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  } as const;
  return <div className={cn('grid gap-5 md:gap-6', map[cols], className)}>{children}</div>;
}

/* --------------------------------------------------------------- checklist */

export function Checklist({
  items,
  light = false,
  className,
}: {
  items: readonly string[];
  light?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3.5">
          <span
            aria-hidden="true"
            className={cn(
              'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full',
              light ? 'bg-rose-300/20 text-rose-300' : 'bg-navy-500/12 text-navy-500',
            )}
          >
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className={cn('leading-relaxed', light ? 'text-bone/80' : 'text-ink/85')}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------- steps */

export function Steps({
  items,
  cols = 4,
}: {
  items: readonly { title: string; body: string }[];
  cols?: 2 | 4;
}) {
  return (
    <ol
      className={cn(
        'grid gap-x-8 gap-y-10',
        cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2',
      )}
    >
      {items.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 0.07} className="relative">
          {/* connector line into the next step */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-rose/45 to-transparent"
          />
          <span className="mt-5 block font-display text-sm font-semibold tabular-nums text-rose">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-3">{step.title}</h3>
          <p className="mt-2.5 leading-relaxed text-muted">{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------- panel */

/** Dark, glowing feature panel — the counterweight to a text column. */
export function Panel({
  title,
  lede,
  children,
  className,
}: {
  title: string;
  lede?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'on-dark relative isolate overflow-hidden rounded-3xl bg-navy-900 p-8 text-bone md:p-10',
        'shadow-float',
        className,
      )}
    >
      {/* layered radial glows */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-navy-500/30 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 size-64 rounded-full bg-rose/12 blur-3xl"
      />
      <div className="relative">
        <h3 className="text-2xl text-bone">{title}</h3>
        {lede && <p className="mt-3 leading-relaxed text-bone/70">{lede}</p>}
        {children}
      </div>
    </Reveal>
  );
}

/** Key/value stat rows used inside Panel. */
export function StatRow({
  items,
  single = false,
}: {
  items: readonly { value: string; label: string }[];
  single?: boolean;
}) {
  return (
    <dl className={cn('mt-8 grid gap-6', single ? 'grid-cols-1' : 'sm:grid-cols-2')}>
      {items.map((s) => (
        <div key={s.value} className="border-l border-rose/40 pl-4">
          <dt className="font-display text-lg font-semibold leading-tight text-bone">{s.value}</dt>
          <dd className="mt-1 text-sm leading-snug text-bone/60">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------- quote */

export function Quote({ children, cite }: { children: ReactNode; cite: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <span aria-hidden="true" className="block font-display text-6xl leading-none text-rose/35">
        &ldquo;
      </span>
      <blockquote className="-mt-4 font-display text-[1.5rem] italic leading-[1.4] tracking-[-0.015em] text-ink md:text-[1.875rem]">
        {children}
      </blockquote>
      <cite className="mt-7 block text-[0.8125rem] font-semibold uppercase not-italic tracking-[0.14em] text-faint">
        {cite}
      </cite>
    </Reveal>
  );
}
