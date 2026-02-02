// src/app/resources/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Download, FileText, Clock, BarChart } from 'lucide-react';
import { getResourceById } from '@/lib/data/resources';
import { DownloadModal } from '@/components/DownloadModal';

interface ResourcePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const resource = getResourceById(params.slug);

  if (!resource) {
    return {
      title: 'Resource Not Found',
    };
  }

  return {
    title: resource.title,
    description: resource.description,
    keywords: resource.tags,
    openGraph: {
      title: resource.title,
      description: resource.description,
      type: 'article',
      images: resource.previewImage ? [resource.previewImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: resource.title,
      description: resource.description,
      images: resource.previewImage ? [resource.previewImage] : [],
    },
  };
}

export default function ResourcePage({ params }: ResourcePageProps) {
  const resource = getResourceById(params.slug);

  if (!resource) {
    notFound();
  }

  // Structured data para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: resource.title,
    description: resource.description,
    author: {
      '@type': 'Organization',
      name: 'SKORE',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://skore-website.vercel.app',
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm font-medium">
              {resource.type}
            </span>
            {resource.featured && (
              <span className="ml-2 inline-block px-3 py-1 bg-yellow-500/20 text-yellow-200 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{resource.title}</h1>
          <p className="text-xl text-blue-100 mb-6">{resource.description}</p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-blue-300" />
              <span>{resource.pages} pages</span>
            </div>
            <div className="flex items-center gap-2">
              <Download size={20} className="text-blue-300" />
              <span>{resource.downloads.toLocaleString()} downloads</span>
            </div>
            {resource.timeToComplete && (
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-blue-300" />
                <span>{resource.timeToComplete}</span>
              </div>
            )}
            {resource.difficulty && (
              <div className="flex items-center gap-2">
                <BarChart size={20} className="text-blue-300" />
                <span>{resource.difficulty}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="md:col-span-2">
              {resource.detailedDescription && (
                <div className="prose max-w-none mb-8">
                  <h2 className="text-2xl font-bold mb-4">About This Resource</h2>
                  <div className="text-gray-600 whitespace-pre-line">
                    {resource.detailedDescription}
                  </div>
                </div>
              )}

              {resource.includes && resource.includes.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                  <ul className="space-y-3">
                    {resource.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {resource.tags && resource.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-20">
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-1">Format</div>
                  <div className="font-semibold">{resource.format}</div>
                </div>

                {resource.fileSize && (
                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-1">File Size</div>
                    <div className="font-semibold">{resource.fileSize}</div>
                  </div>
                )}

                <DownloadModal resource={resource} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}