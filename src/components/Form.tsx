import { AlertCircle, Info } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

const control =
  'w-full rounded-xl border bg-paper px-4 py-3 text-[0.9375rem] text-ink placeholder:text-faint/70 ' +
  'transition-all duration-300 focus:outline-none focus:ring-4';

const ok = 'border-navy-900/14 focus:border-navy-500 focus:ring-navy-500/12';
const bad = 'border-red-400/70 bg-red-50/40 focus:border-red-500 focus:ring-red-500/12';

/** Label + control + inline error, wired up for screen readers. */
export function Field({
  id,
  label,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-[0.8125rem] font-semibold text-ink">
        {label}
        {hint && <span className="mt-1 block font-normal text-faint">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-[0.8125rem] text-red-600">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

type BaseProps = {
  id: string;
  name: string;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
};

export function Input({
  type = 'text',
  error,
  id,
  ...rest
}: BaseProps & { type?: 'text' | 'email' | 'tel' }) {
  return (
    <input
      id={id}
      type={type}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(control, error ? bad : ok)}
      {...rest}
    />
  );
}

export function Textarea({ error, id, rows = 4, ...rest }: BaseProps & { rows?: number }) {
  return (
    <textarea
      id={id}
      rows={rows}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(control, 'resize-y', error ? bad : ok)}
      {...rest}
    />
  );
}

export function Select({
  id,
  name,
  options,
  error,
}: {
  id: string;
  name: string;
  options: readonly string[];
  error?: string;
}) {
  return (
    <select
      id={id}
      name={name}
      aria-invalid={error ? true : undefined}
      className={cn(control, 'cursor-pointer appearance-none bg-no-repeat pr-10', error ? bad : ok)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2355665f' stroke-width='2.2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundPosition: 'right 1rem center',
      }}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

export function Checkbox({
  id,
  name,
  error,
  children,
}: {
  id: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-muted">
        <input
          id={id}
          name={name}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'mt-0.5 size-5 shrink-0 cursor-pointer rounded-md border accent-navy-900',
            error ? 'border-red-400' : 'border-navy-900/25',
          )}
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-[0.8125rem] text-red-600">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export function FormRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

/** Amber advisory box — used for the demo-form warning and routing notes. */
export function Note({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warn' }) {
  return (
    <div
      className={cn(
        'flex gap-3 rounded-xl border p-4 text-[0.875rem] leading-relaxed',
        tone === 'warn'
          ? 'border-rose/35 bg-rose-100/45 text-ink/80'
          : 'border-navy-500/20 bg-navy-50 text-ink/80',
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-rose" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
