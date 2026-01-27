import Link from 'next/link';
import { Mail, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Connect', href: '/connect' },
  ],
  resources: [
    { label: 'All Resources', href: '/resources' },
    { label: 'Assessment Tools', href: '/resources?category=assessment' },
    { label: 'Performance', href: '/resources?category=performance' },
    { label: 'Learning', href: '/resources?category=learning' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { 
    label: 'Email', 
    href: 'mailto:hello@skore.com', 
    icon: Mail 
  },
  { 
    label: 'LinkedIn', 
    href: 'https://linkedin.com/company/skore', 
    icon: Linkedin 
  },
  { 
    label: 'Twitter', 
    href: 'https://twitter.com/skore', 
    icon: Twitter 
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link 
              href="/" 
              className="text-2xl font-bold text-white hover:text-primary-400 transition-colors inline-block mb-4"
            >
              SKORE
            </Link>
            <p className="text-secondary-400 mb-6 max-w-sm">
              Translating organizational science into practical tools you can use Monday morning.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary-800 text-secondary-400 hover:bg-secondary-700 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-400">
              © {currentYear} SKORE. All rights reserved.
            </p>
            <p className="text-sm text-secondary-400">
              Built with evidence-based practices in mind.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}