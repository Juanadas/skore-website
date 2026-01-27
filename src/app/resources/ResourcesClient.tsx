'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Download, Filter } from 'lucide-react';
import type { Resource, CategoryId } from '@/types';
import { Button } from '@/components/ui/Button';

interface ResourcesClientProps {
  initialResources: Resource[];
}

const categories = [
  { id: 'all' as CategoryId, label: 'All Resources' },
  { id: 'assessment' as CategoryId, label: 'Assessment' },
  { id: 'performance' as CategoryId, label: 'Performance' },
  { id: 'design' as CategoryId, label: 'Design' },
  { id: 'learning' as CategoryId, label: 'Learning' },
  { id: 'change' as CategoryId, label: 'Change' },
];

export function ResourcesClient({ initialResources }: ResourcesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter resources
  const filteredResources = useMemo(() => {
    let filtered = initialResources;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term) ||
          r.tags.some((tag) => tag.toLowerCase().includes(term)) ||
          r.function.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [initialResources, selectedCategory, searchTerm]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Resource Library</h1>
            <p className="text-xl text-blue-100">
              Free, evidence-based tools for organizational effectiveness. Download and use immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section - Sticky */}
      <section className="sticky top-16 z-40 bg-white border-b border-secondary-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" 
                size={20} 
              />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <Filter size={20} className="text-secondary-400 flex-shrink-0 hidden lg:block" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 bg-secondary-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-secondary-600">
              Showing <span className="font-semibold text-secondary-900">{filteredResources.length}</span>{' '}
              resource{filteredResources.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Resources Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <article
                  key={resource.id}
                  className="bg-white border-2 border-secondary-200 rounded-xl p-6 hover:border-primary-600 hover:shadow-card-hover transition-all"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                      {resource.type}
                    </span>
                    <div className="flex items-center gap-1 text-secondary-500 text-sm">
                      <Download size={16} />
                      <span>{resource.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-secondary-900 mb-3">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-secondary-600 mb-4 line-clamp-3">
                    {resource.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-secondary-200">
                    <p className="text-sm text-secondary-500 mb-3">
                      {resource.function}
                    </p>
                    <Link href={`/resources/${resource.slug}`}>
                      <Button className="w-full">
                        Download Free
                        <Download size={16} />
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
                <Search size={32} className="text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                No resources found
              </h3>
              <p className="text-secondary-600 mb-6">
                Try adjusting your search or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}