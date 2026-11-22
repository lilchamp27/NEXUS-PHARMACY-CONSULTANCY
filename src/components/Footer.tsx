import { Link } from 'react-router-dom';
import { footerServices, nav, site } from '@/data/site';
import { Logo } from './Logo';

const explore = nav.filter((n) => n.to !== '/');

function ColumnHeading({ children }: { children: string }) {
  return (
    <h4 className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-rose">
      {children}
    </h4>
  );
}

export function Footer() {
  return (
    <footer className="on-dark grain relative bg-navy-950 text-bone/70">
      {/* top hairline */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose/35 to-transparent"
      />

      <div className="wrap py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:gap-10">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="mt-6 text-sm leading-relaxed text-bone/55">{site.tagline}</p>
          </div>

          <nav aria-label="Services">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="flex flex-col gap-3 text-sm">
              {footerServices.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="link-underline transition-colors hover:text-bone">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="flex flex-col gap-3 text-sm">
              {explore.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-underline transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a href={site.phoneHref} className="link-underline transition-colors hover:text-bone">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.emailReferrals}`}
                  className="link-underline break-words transition-colors hover:text-bone"
                >
                  {site.emailReferrals}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-bone/10 pt-7 text-[0.8125rem] text-bone/45 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <nav aria-label="Legal" className="flex gap-6">
            {/* TODO: point these at real policy pages before launch */}
            <Link to="/contact" className="transition-colors hover:text-bone">
              Privacy
            </Link>
            <Link to="/contact" className="transition-colors hover:text-bone">
              Terms
            </Link>
            <Link to="/contact" className="transition-colors hover:text-bone">
              Accessibility
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
