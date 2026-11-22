import { Button } from '@/components/Button';
import { Eyebrow, Lede } from '@/components/Section';
import { site } from '@/data/site';
import { useMeta } from '@/lib/useMeta';

export function NotFound() {
  useMeta('/404');

  return (
    <section className="grain relative isolate flex min-h-[70vh] items-center overflow-hidden bg-cream py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[32rem] rounded-full bg-navy-50 blur-3xl"
      />
      <div className="wrap relative max-w-xl">
        <Eyebrow>Error 404</Eyebrow>
        <h1>That page isn&rsquo;t here.</h1>
        <Lede className="mt-6">
          The link may be out of date. Everything on the site is one step away from the home page —
          or call us and we&rsquo;ll point you to it.
        </Lede>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/" arrow>
            Back to home
          </Button>
          <Button href={site.phoneHref} variant="ghost">
            Call {site.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
