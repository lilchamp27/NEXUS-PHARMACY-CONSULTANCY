import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Reveal } from './Reveal';

export type Faq = { q: string; a: string };

/**
 * Single-open accordion.
 *
 * Panels stay mounted and animate their height rather than unmounting, so every
 * answer is present in the served HTML for crawlers — the collapsed ones are
 * clipped to zero height and removed from the accessibility tree. (Panels hold
 * text only; nothing focusable is hidden this way.)
 */
export function Accordion({ items }: { items: readonly Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Reveal className="divide-y divide-navy-900/10 border-y border-navy-900/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors duration-300 hover:text-navy-500 md:text-lg"
              >
                {item.q}
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-navy-900/15 text-navy-500 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-navy-500/50"
                  style={{ transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)' }}
                >
                  <Plus className="size-3.5" strokeWidth={2.4} />
                </span>
              </button>
            </h3>

            <motion.div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              aria-hidden={!isOpen}
              initial={false}
              animate={
                reduce
                  ? { height: isOpen ? 'auto' : 0 }
                  : { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }
              }
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-6 pr-10 leading-relaxed text-muted">{item.a}</p>
            </motion.div>
          </div>
        );
      })}
    </Reveal>
  );
}
