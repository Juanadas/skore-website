'use client';

import Link from 'next/link';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/images/logo-dark.svg" 
                alt="SKORE" 
                className="h-8 w-auto brightness-0 invert"
              />
              <span className="text-xl font-bold">SKORE</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Evidence-based organizational tools for HR professionals and leaders.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white transition-colors text-sm">
                  All Resources
                </Link>
              </li>
              <li>
                <Link href="/resources?category=assessment" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Assessment Tools
                </Link>
              </li>
              <li>
                <Link href="/resources?category=performance" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Performance
                </Link>
              </li>
              <li>
                <Link href="/resources?category=design" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Org Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/connect" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get new resources and insights delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} SKORE. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}