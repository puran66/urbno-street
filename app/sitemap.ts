import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://urbno.com';
  
  const routes = [
    '',
    '/shop',
    '/collections',
    '/refer',
    '/offers',
    '/about',
    // Product routes - Add your product slugs here or fetch dynamically
    '/products/shadow-pack-backpack',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}

