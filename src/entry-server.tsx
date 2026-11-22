import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { posts } from './data/blog';

export { routeMeta } from './data/meta';

export function blogRoutes() {
  return posts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: p.title,
    excerpt: p.excerpt,
  }));
}

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
