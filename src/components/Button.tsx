import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost' | 'light' | 'outlineLight';

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full text-[0.9375rem] font-medium ' +
  'px-6 py-3.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'active:translate-y-px whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-navy-900 text-bone shadow-[0_1px_2px_rgb(12_26_61_/_0.2)] hover:bg-navy-800 ' +
    'hover:shadow-[0_18px_32px_-14px_rgb(12_26_61_/_0.55)] hover:-translate-y-0.5',
  ghost:
    'border border-navy-900/18 text-navy-900 bg-transparent hover:bg-navy-900/[0.045] ' +
    'hover:border-navy-900/35 hover:-translate-y-0.5',
  light:
    'bg-bone text-navy-950 hover:bg-white hover:-translate-y-0.5 ' +
    'hover:shadow-[0_18px_32px_-14px_rgb(0_0_0_/_0.45)]',
  outlineLight:
    'border border-bone/35 text-bone hover:bg-bone/10 hover:border-bone/60 hover:-translate-y-0.5',
};

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  /** show the sliding arrow affordance */
  arrow?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Button({
  children,
  to,
  href,
  variant = 'primary',
  arrow = false,
  type = 'button',
  disabled,
  onClick,
  className,
}: Props) {
  const cls = cn(base, variants[variant], disabled && 'opacity-55 pointer-events-none', className);

  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/** Inline text link with an animated underline and optional arrow. */
export function TextLink({
  children,
  to,
  href,
  className,
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  className?: string;
}) {
  const cls = cn(
    'group inline-flex items-center gap-1.5 font-medium text-navy-500 link-underline',
    className,
  );
  const inner = (
    <>
      {children}
      <ArrowRight
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </>
  );
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}
