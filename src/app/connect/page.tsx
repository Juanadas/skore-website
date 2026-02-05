'use client';

import { useState } from 'react';
import { Mail, Linkedin, Twitter, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ConnectPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Let's Connect</h1>
            <p className="text-xl text-blue-100">
              Have questions? Want to suggest a resource? Looking for collaboration opportunities? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Send us a message
              </h2>
              <p className="text-secondary-600 mb-8">
                Whether you have feedback on a resource, ideas for new tools, or just want to 
                connect, we're here to listen.
              </p>

              {isSubmitted ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-green-700">
                    Thanks for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                  />

                  <Input
                    label="Company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your organization (optional)"
                  />

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-secondary-700 mb-1.5"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      required
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send size={20} />
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              {/* Direct Contact */}
              <div className="bg-secondary-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                  Other Ways to Connect
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-2 flex items-center gap-2">
                      <Mail size={20} className="text-primary-600" />
                      Email
                    </h4>
                    <a
                      href="mailto:skoreframeworks@gmail.com"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      skoreframeworks@gmail.com
                    </a>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-2 flex items-center gap-2">
                      <Linkedin size={20} className="text-primary-600" />
                      LinkedIn
                    </h4>
                    <a
                      href="https://linkedin.com/company/skoreframeworks"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      @skoreframeworks
                    </a>
                  </div>

                  
                </div>
              </div>

              {/* Common Questions */}
              <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-8">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  Common Questions
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-secondary-900 mb-1">
                      Can I suggest a resource topic?
                    </p>
                    <p className="text-secondary-700">
                      Absolutely! We're always looking for ideas. Tell us what you need.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-900 mb-1">
                      Do you offer consulting services?
                    </p>
                    <p className="text-secondary-700">
                      No, we focus solely on creating free resources. However, we're happy to 
                      point you toward evidence-based consultants.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-900 mb-1">
                      Can I contribute?
                    </p>
                    <p className="text-secondary-700">
                      We're exploring ways to involve practitioners in resource development. 
                      Reach out if you're interested.
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white border-2 border-secondary-200 rounded-xl p-6">
                <p className="text-secondary-600 text-sm">
                  <strong className="text-secondary-900">Response time:</strong> We typically 
                  respond within 2-3 business days. If your question is urgent, please mention 
                  that in your message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary-600 to-blue-700 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get notified when we release new resources and articles.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-secondary-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button size="lg" className="bg-white text-primary-600 hover:bg-blue-50">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}