// src/components/DownloadModal.tsx
'use client';

import { useState } from 'react';
import { X, Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Resource, DownloadFormData } from '@/types';

const downloadFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional().or(z.literal('')),
  company: z.string().optional(),
  subscribe: z.boolean().default(true),
});

interface DownloadModalProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type DownloadStatus = 'idle' | 'loading' | 'success' | 'error';

export function DownloadModal({ resource, isOpen, onClose, onSuccess }: DownloadModalProps) {
  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadFormSchema),
    defaultValues: {
      subscribe: true,
    },
  });

  const onSubmit = async (data: DownloadFormData) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          resourceId: resource.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Download failed');
      }

      setStatus('success');

      // Llamar callback de éxito si existe
      if (onSuccess) {
        onSuccess();
      }

      // Auto-iniciar descarga
      if (result.download?.downloadUrl) {
        const link = document.createElement('a');
        link.href = result.download.downloadUrl;
        link.download = `${resource.slug}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Cerrar modal después de 3 segundos
      setTimeout(() => {
        handleClose();
      }, 3000);

    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const handleClose = () => {
    reset();
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-8">
          {status === 'success' ? (
            // Success state
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Check Your Email!</h3>
              <p className="text-gray-600 mb-4">
                We've sent you a download link for <strong>{resource.title}</strong>
              </p>
              <p className="text-sm text-gray-500">
                The download should start automatically. If not, check your email for the link.
              </p>
            </div>
          ) : (
            // Form state
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Download size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-1">
                      {resource.type}
                    </span>
                    <h3 className="text-xl font-bold">{resource.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Enter your email to download this free resource. We'll also send you occasional 
                  updates with new tools and insights.
                </p>
              </div>

              {/* Resource info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Pages</p>
                    <p className="font-semibold">{resource.pages}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Format</p>
                    <p className="font-semibold">{resource.format}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Size</p>
                    <p className="font-semibold">{resource.fileSize || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Name (optional) */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name (Optional)
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Company (optional) */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    id="company"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company"
                  />
                </div>

                {/* Subscribe checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    {...register('subscribe')}
                    type="checkbox"
                    id="subscribe"
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="subscribe" className="text-sm text-gray-600">
                    Send me occasional emails with new resources, tools, and organizational science insights. 
                    (You can unsubscribe anytime.)
                  </label>
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      Download Now
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500">
                  By downloading, you agree to our terms and privacy policy
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}