import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { Cta } from '@/components/Cta';
import { Button } from '@/components/Button';
import { posts } from '@/data/blog';
import { useMeta } from '@/lib/useMeta';

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function Blog() {
  useMeta('/blog');

  return (
    <>
      <PageHero
        crumb="Blog"
        eyebrow="Insights & updates"
        title="Practical advice on medication safety."
        lede="Articles for patients, carers and practitioners — written by credentialed pharmacists who do this work every day."
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} as="article" delay={i * 0.06}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-navy-900/[0.07] bg-paper p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift md:p-8"
              >
                <div className="flex items-center gap-4 text-[0.75rem] text-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {post.readMin} min read
                  </span>
                </div>

                <h3 className="mt-4 text-lg transition-colors duration-300 group-hover:text-navy-500">
                  {post.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-navy-500">
                  Read more
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Cta
        eyebrow="Have a question?"
        title="We're happy to help."
        lede="Whether you're a patient, carer or practitioner — reach out and we'll point you in the right direction."
      >
        <Button to="/contact" variant="light" arrow>
          Get in touch
        </Button>
        <Button to="/for-patients" variant="outlineLight">
          Patient guide
        </Button>
      </Cta>
    </>
  );
}
