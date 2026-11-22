import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Phone, MessageSquare } from 'lucide-react';
import { site } from '@/data/site';

const actions = [
  { label: 'Call', href: site.phoneHref, icon: <Phone className="size-4" /> },
  { label: 'SMS', href: site.sms, icon: <MessageSquare className="size-4" /> },
  { label: 'WhatsApp', href: site.whatsapp, icon: <MessageCircle className="size-4" /> },
] as const;

export function PhoneAction({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function escape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative inline-flex ${className ?? ''}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-2"
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-navy-900/10 bg-paper shadow-lift"
          >
            {actions.map((a) => (
              <a
                key={a.label}
                href={a.href}
                target={a.label === 'WhatsApp' ? '_blank' : undefined}
                rel={a.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-navy-50"
              >
                <span className="text-navy-500">{a.icon}</span>
                {a.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
