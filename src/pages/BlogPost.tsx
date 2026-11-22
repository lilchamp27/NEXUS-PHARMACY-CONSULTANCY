import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { Section, Eyebrow } from '@/components/Section';
import { Button } from '@/components/Button';
import { Cta } from '@/components/Cta';
import { getPost, posts } from '@/data/blog';
import { useMeta } from '@/lib/useMeta';
import { useEffect } from 'react';

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Nexus Pharmacy Consultancy`;
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = 'description';
        document.head.appendChild(tag);
      }
      tag.content = post.excerpt;
    }
  }, [post]);

  useMeta(post ? '/blog' : '/404');

  if (!post) return <Navigate to="/blog" replace />;

  const related = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="grain relative isolate overflow-hidden border-b border-navy-900/[0.07] bg-paper pb-16 pt-14 md:pb-20 md:pt-20">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-sand/70 blur-3xl"
        />
        <div className="wrap relative">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-1.5 text-[0.8125rem] text-faint">
                <li>
                  <Link to="/" className="transition-colors hover:text-navy-500">Home</Link>
                </li>
                <li aria-hidden="true" className="text-faint">/</li>
                <li>
                  <Link to="/blog" className="transition-colors hover:text-navy-500">Blog</Link>
                </li>
                <li aria-hidden="true" className="text-faint">/</li>
                <li aria-current="page" className="font-medium text-muted line-clamp-1">
                  {post.title}
                </li>
              </ol>
            </nav>

            <Eyebrow>Blog</Eyebrow>
            <h1 className="max-w-3xl">{post.title}</h1>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <User className="size-4" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {post.readMin} min read
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <article className="mx-auto max-w-2xl">
          {post.body.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <p className="mb-6 text-[1.0625rem] leading-[1.8] text-ink/85">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="mt-12 border-t border-navy-900/10 pt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-navy-500 transition-colors hover:text-navy-700"
              >
                <ArrowLeft className="size-4" />
                Back to all articles
              </Link>
            </div>
          </Reveal>
        </article>
      </Section>

      {related.length > 0 && (
        <Section tone="paper">
          <Reveal>
            <h2 className="mb-10 text-center">More from the blog</h2>
          </Reveal>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.06} as="article">
                <Link
                  to={`/blog/${r.slug}`}
                  className="group flex flex-col rounded-2xl border border-navy-900/[0.07] bg-paper p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <h3 className="text-lg transition-colors duration-300 group-hover:text-navy-500">
                    {r.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{r.excerpt}</p>
                  <span className="mt-4 text-sm font-medium text-navy-500">Read more →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Cta
        eyebrow="Need help?"
        title="Talk to us about your medicines."
        lede="Whether it's a question about a review or general advice — we're here to help."
      >
        <Button to="/contact" variant="light" arrow>
          Contact us
        </Button>
        <Button to="/for-patients" variant="outlineLight">
          Patient information
        </Button>
      </Cta>
    </>
  );
}
