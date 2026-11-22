import { useEffect } from 'react';
import { routeMeta } from '@/data/meta';

/**
 * Applies a route's <title> and meta description on client-side navigation.
 * The same strings are baked into the prerendered HTML at build time.
 */
export function useMeta(route: keyof typeof routeMeta | string) {
  useEffect(() => {
    const meta = routeMeta[route] ?? routeMeta['/404'];
    document.title = meta.title;

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'description';
      document.head.appendChild(tag);
    }
    tag.content = meta.description;
  }, [route]);
}
