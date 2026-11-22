import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Mail, Menu, Phone, X } from 'lucide-react';
import { nav, site } from '@/data/site';
import { cn } from '@/lib/cn';
import { Button } from './Button';
import { Logo } from './Logo';

/** Thin reading-progress bar pinned to the top of the viewport. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-navy-500 via-rose to-navy-500"
    />
  );
}

function TopBar() {
  return (
    <div className="hidden border-b border-bone/10 bg-navy-950 text-bone/70 lg:block">
      <div className="wrap flex h-10 items-center justify-between text-[0.8125rem]">
        <span></span>
        <div className="flex items-center gap-7">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-bone"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.emailReferrals}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-bone"
          >
            <Mail className="size-3.5" aria-hidden="true" />
            {site.emailReferrals}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the sheet on navigation, and lock scrolling while it is open.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <ScrollProgress />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:text-bone"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50">
        <TopBar />

        <div
          className={cn(
            'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            scrolled
              ? 'border-b border-navy-900/[0.08] bg-cream/85 backdrop-blur-xl'
              : 'border-b border-transparent bg-cream',
          )}
        >
          <div
            className={cn(
              'wrap flex items-center justify-between transition-all duration-500',
              scrolled ? 'h-16' : 'h-20 md:h-24',
            )}
          >
            <Logo />

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-300',
                      isActive ? 'text-navy-900' : 'text-muted hover:text-navy-900',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden="true"
                          className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-rose"
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button to="/contact#refer" arrow className="hidden sm:inline-flex">
                Make a referral
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label="Open navigation"
                className="grid size-11 place-items-center rounded-full border border-navy-900/12 text-navy-900 transition-colors hover:bg-navy-900/5 lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------- mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="on-dark fixed inset-0 z-[55] flex flex-col bg-navy-950 lg:hidden"
          >
            <div className="wrap flex h-20 shrink-0 items-center justify-between">
              <Logo tone="light" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation"
                className="grid size-11 place-items-center rounded-full border border-bone/20 text-bone transition-colors hover:bg-bone/10"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Primary"
              className="wrap flex flex-1 flex-col justify-center gap-1 overflow-y-auto pb-16"
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block border-b border-bone/10 py-4 font-display text-3xl font-semibold tracking-[-0.025em] transition-colors',
                        isActive ? 'text-rose-300' : 'text-bone hover:text-rose-300',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.45 }}
                className="mt-10 flex flex-col gap-3"
              >
                <Button to="/contact#refer" variant="light" arrow>
                  Make a referral
                </Button>
                <Button href={site.phoneHref} variant="outlineLight">
                  Call {site.phone}
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
