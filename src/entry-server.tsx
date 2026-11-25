import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { posts } from './data/blog';
import { homeFaqs, patientFaqs } from './data/faqs';
import { site } from './data/site';

export { routeMeta } from './data/meta';

export function blogRoutes() {
  return posts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: p.title,
    excerpt: p.excerpt,
  }));
}

const origin = (process.env.SITE_ORIGIN ?? 'https://nexuspharmacyconsultancy.com.au').replace(/\/$/, '');

function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Returns the JSON-LD object(s) to embed for a given route, or null for none. */
export function structuredData(route: string): unknown[] | null {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: site.name,
    description: site.tagline,
    telephone: '+61467471093',
    email: site.emailGeneral,
    url: `${origin}/`,
    areaServed: { '@type': 'Country', name: 'Australia' },
    medicalSpecialty: 'Pharmacy',
  };

  if (route === '/') return [organization, faqSchema(homeFaqs)];
  if (route === '/for-patients') return [faqSchema(patientFaqs)];

  const post = posts.find((p) => `/blog/${p.slug}` === route);
  if (post) {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { '@type': 'Organization', name: post.author },
        publisher: { '@type': 'Organization', name: site.name },
        mainEntityOfPage: `${origin}/blog/${post.slug}`,
      },
    ];
  }

  return null;
}

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
