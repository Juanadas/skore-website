// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { resources } from '@/lib/data/resources';
import { blogPosts } from '@/lib/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skore-website.vercel.app';

  // Páginas estáticas
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/connect`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Páginas de recursos dinámicas
  const resourceUrls = resources.map((resource) => ({
    url: `${baseUrl}/resources/${resource.slug}`,
    lastModified: resource.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Páginas de blog dinámicas
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...resourceUrls, ...blogUrls];
}