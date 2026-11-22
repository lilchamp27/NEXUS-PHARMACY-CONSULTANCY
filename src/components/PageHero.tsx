import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Eyebrow, Lede } from './Section';
import { Reveal } from './Reveal';

/** Shared hero for every page except Home, which has its own composition. */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumb,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  crumb: string;
}) {
  return (
    <section className="grain relative isolate overflow-hidden border-b border-navy-900/[0.07] bg-paper pb-16 pt-14 md:pb-24 md:pt-20">
      {/* soft sand wash behind the type */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-sand/70 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 size-80 rounded-full bg-navy-50 blur-3xl"
      />

      <div className="wrap relative">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 text-[0.8125rem] text-faint">
              <li>
                <Link to="/" className="transition-colors hover:text-navy-500">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="font-medium text-muted">
                {crumb}
              </li>
            </ol>
          </nav>

          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-4xl">{title}</h1>
          <Lede className="mt-7 max-w-2xl">{lede}</Lede>
        </Reveal>
      </div>
    </section>
  );
}
