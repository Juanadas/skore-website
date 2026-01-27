// src/app/resources/[slug]/ResourceDetailClient.tsx
'use client';

import { Download, FileText, Clock, CheckCircle2 } from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import { DownloadModal } from '@/components/DownloadModal';
import type { Resource } from '@/types';

interface ResourceDetailClientProps {
  resource: Resource;
}

export function ResourceDetailClient({ resource }: ResourceDetailClientProps) {
  const modal = useModal();

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                {resource.type}
              </span>
              <span className="text-blue-200">{resource.category}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {resource.title}
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              {resource.description}
            </p>

            <button
              onClick={modal.open}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg transition-all flex items-center gap-3 text-lg shadow-xl hover:shadow-2xl"
            >
              <Download size={24} />
              Descargar Gratis
            </button>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* What's Included */}
              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <h2 className="text-2xl font-bold mb-6">¿Qué incluye?</h2>
                <ul className="space-y-3">
                  {resource.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Function */}
              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <h2 className="text-2xl font-bold mb-4">¿Para qué sirve?</h2>
                <p className="text-gray-700 leading-relaxed">
                  {resource.function}
                </p>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <h2 className="text-2xl font-bold mb-4">Temas relacionados</h2>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border sticky top-24">
                <h3 className="font-bold text-lg mb-4">Información rápida</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FileText className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Páginas</p>
                      <p className="font-semibold">{resource.pages}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Download className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Formato</p>
                      <p className="font-semibold">{resource.format}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Tiempo de lectura</p>
                      <p className="font-semibold">~15 minutos</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={modal.open}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Descargar Ahora
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Gratis • Sin tarjeta de crédito
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      <DownloadModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        resource={resource}
      />
    </>
  );
}