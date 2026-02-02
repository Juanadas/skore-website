// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skore-website.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // No indexar API routes
          '/_next/',      // No indexar archivos de Next.js
          '/admin/',      // No indexar admin (si lo añades)
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}