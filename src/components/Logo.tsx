import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <Link
      to="/"
      aria-label={`Nexus Pharmacy Consultancy — home`}
      className={cn('group inline-flex items-center gap-3', className)}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="size-10 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-4deg]"
      >
        <rect x="1" y="1" width="46" height="46" rx="11" fill={tone === 'dark' ? '#0c1a3d' : '#163170'} />
        <path d="M24 10v28M10 24h28" stroke="#2256b0" strokeWidth="1.1" opacity=".55" />
        <path
          d="M20.5 14.5h7v6h6v7h-6v6h-7v-6h-6v-7h6z"
          stroke="#e2e6f0"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="24" r="2.6" fill="#c05062" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.35rem] font-semibold tracking-[-0.02em]',
            tone === 'dark' ? 'text-navy-900' : 'text-bone',
          )}
        >
          Nexus
        </span>
        <span
          className={cn(
            'mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em]',
            tone === 'dark' ? 'text-faint' : 'text-bone/55',
          )}
        >
          Pharmacy Consultancy
        </span>
      </span>
    </Link>
  );
}
