import type { ReactNode } from 'react';
import { Eyebrow, Lede } from './Section';
import { Reveal } from './Reveal';

/**
 * The closing call-to-action band. Every page ends with one, so it lives here
 * rather than being copied six times.
 */
export function Cta({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <section className="on-dark grain relative isolate overflow-hidden bg-navy-900 py-24 text-bone md:py-32">
      {/* radial glow + rose horizon line */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 size-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-500/25 blur-[100px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent"
      />

      <div className="wrap relative text-center">
        <Reveal>
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mx-auto max-w-2xl text-bone">{title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <Lede className="mx-auto mt-6 max-w-xl text-bone/70">{lede}</Lede>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
