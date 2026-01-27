// src/app/resources/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getResourceById } from '@/lib/api';
import { ResourceDetailClient } from './ResourceDetailClient';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const resource = await getResourceById(params.slug);
  
  if (!resource) {
    return {
      title: 'Recurso no encontrado',
    };
  }

  return {
    title: `${resource.title} - SKORE`,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      type: 'article',
    },
  };
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const resource = await getResourceById(params.slug);

  if (!resource) {
    notFound();
  }

  return <ResourceDetailClient resource={resource} />;
}