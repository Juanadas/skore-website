// src/app/resources/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getResourceById } from '@/lib/data/resources';
import { ResourceDetailClient } from './ResourceDetailClient';

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceById(slug);

  if (!resource) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: resource.title,
    description: resource.description,
    author: {
      '@type': 'Organization',
      name: 'SKORE',
      url:
        process.env.NEXT_PUBLIC_SITE_URL ||
        'https://skore-website.vercel.app',
    },
    datePublished: resource.createdAt.toISOString(),
    dateModified: resource.updatedAt.toISOString(),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    keywords: resource.tags.join(', '),
    fileFormat: 'application/pdf',
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ResourceDetailClient resource={resource} />
    </>
  );
}