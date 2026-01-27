// src/components/ResourceCard.tsx
'use client';

import { Download, FileText, Users } from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import { DownloadModal } from './DownloadModal';
import type { Resource } from '@/types';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const modal = useModal();

  const handleDownloadSuccess = () => {
    console.log('Download successful for:', resource.title);
    // Aquí puedes agregar analytics, toast notifications, etc.
  };

  return (
    <>
      <article className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
        {/* Header */}
        <header className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
            {resource.type}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Users size={14} />
            <span>{resource.downloads}</span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
            {resource.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {resource.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FileText size={16} />
            <span>{resource.pages} páginas</span>
          </div>
          
          <button
            onClick={modal.open}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <Download size={18} />
            Descargar
          </button>
        </footer>
      </article>

      {/* Modal */}
      <DownloadModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        resource={resource}
        onSuccess={handleDownloadSuccess}
      />
    </>
  );
}