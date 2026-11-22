/**
 * Prerenders every route to static HTML.
 *
 * Moving to React costs you server-rendered markup, which matters for a site
 * whose traffic comes from GPs and patients searching. This step gets it back:
 * each route becomes a real HTML file with its own title, description and full
 * body copy, and the client hydrates it into a normal SPA on load.
 *
 * Run via `npm run build`: client build -> ssr build -> prerender.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// pathToFileURL matters on Windows: a bare `c:\...` path is not a valid ESM specifier.
const { render, routeMeta, blogRoutes } = await import(
  pathToFileURL(path.join(dist, 'server', 'entry-server.js')).href
);

/**
 * Public origin, used for canonical URLs and the sitemap.
 * Override at build time: `SITE_ORIGIN=https://nexuspharmacy.com.au npm run build`
 */
const origin = (process.env.SITE_ORIGIN ?? 'https://nexuspharmacy.com.au').replace(/\/$/, '');

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Swaps in this route's title, description and canonical, then injects the body. */
function buildPage(route, appHtml, metaOverride) {
  const meta = metaOverride ?? routeMeta[route];
  const canonical = route === '/' ? `${origin}/` : `${origin}${route}`;

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />\n    ` +
        `<link rel="canonical" href="${canonical}" />\n    ` +
        `<meta property="og:type" content="website" />\n    ` +
        `<meta property="og:url" content="${canonical}" />\n    ` +
        `<meta property="og:title" content="${escapeHtml(meta.title)}" />\n    ` +
        `<meta property="og:description" content="${escapeHtml(meta.description)}" />\n    ` +
        `<meta name="twitter:card" content="summary_large_image" />`,
    )
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

// '/404' is metadata for the SPA's catch-all route, not a crawlable page.
const routes = Object.keys(routeMeta).filter((r) => r !== '/404');

// Add blog post routes from the data export.
const allBlogRoutes = typeof blogRoutes === 'function' ? blogRoutes() : [];

const allRoutes = [...routes, ...allBlogRoutes.map((b) => b.path)];

for (const route of routes) {
  const html = buildPage(route, render(route));
  const outDir = route === '/' ? dist : path.join(dist, route.slice(1));

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);

  const rel = path.relative(dist, path.join(outDir, 'index.html')).replace(/\\/g, '/');
  console.log(`  ${route.padEnd(15)} -> dist/${rel.padEnd(26)} ${(html.length / 1024).toFixed(1)} kB`);
}

// Render blog post pages.
for (const blog of allBlogRoutes) {
  const html = buildPage(blog.path, render(blog.path), {
    title: `${blog.title} | Nexus Pharmacy Consultancy`,
    description: blog.excerpt,
  });
  const outDir = path.join(dist, blog.path.slice(1));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);

  const rel = path.relative(dist, path.join(outDir, 'index.html')).replace(/\\/g, '/');
  console.log(`  ${blog.path.padEnd(15)} -> dist/${rel.padEnd(26)} ${(html.length / 1024).toFixed(1)} kB`);
}

/* ---------------------------------------------------- 404, sitemap, robots */

// Most static hosts (Netlify, GitHub Pages, Cloudflare Pages) serve /404.html
// for unmatched paths. Render the app's own NotFound page into it.
const notFound = buildPage('/404', render('/this-route-does-not-exist'));
fs.writeFileSync(path.join(dist, '404.html'), notFound);
console.log(`  ${'(404)'.padEnd(15)} -> dist/${'404.html'.padEnd(26)} ${(notFound.length / 1024).toFixed(1)} kB`);

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  allRoutes
    .map((route) => {
      const loc = route === '/' ? `${origin}/` : `${origin}${route}`;
      const priority = route === '/' ? '1.0' : '0.8';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n') +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
);

// The SSR bundle is a build artefact, not something to deploy.
fs.rmSync(path.join(dist, 'server'), { recursive: true, force: true });

const total = allRoutes.length;
console.log(`\n${total} routes prerendered, plus 404.html, sitemap.xml and robots.txt.`);
console.log(`Canonical origin: ${origin}  (override with SITE_ORIGIN)`);
