// src/app/resources/page.tsx
import { getResources } from '@/lib/api';
import { ResourcesClient } from './ResourcesClient';

export const metadata = {
  title: 'Free HR Resources & Tools - SKORE',
  description: 'Download free evidence-based HR tools and assessments for organizational effectiveness.',
};

export default async function ResourcesPage() {
  const resources = await getResources();
  
  return <ResourcesClient initialResources={resources} />;
}