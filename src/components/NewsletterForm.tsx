'use client';

import { useState } from 'react';
import { Mail, Loader2, CheckCircle } from 'lucide-react';
import type { NewsletterFormData } from '@/types';

type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterForm() {
  const [formData, setFormData] = useState<NewsletterFormData>({ email: '' });
  const [status, setStatus] = useState<NewsletterStatus>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing!');
        setFormData({ email: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-400 text-sm">
        <CheckCircle size={16} />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        placeholder="your@email.com"
        required
        disabled={status === 'loading'}
        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === 'loading' || !formData.email}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span className="hidden sm:inline">Subscribing...</span>
          </>
        ) : (
          <>
            <Mail size={16} />
            <span className="hidden sm:inline">Subscribe</span>
          </>
        )}
      </button>
    </form>
  );
}