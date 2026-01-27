import Link from 'next/link';
import { ArrowRight, Download, BookOpen, Users } from 'lucide-react';
import { getFeaturedResources, getFeaturedBlogPosts, getTotalDownloads } from '@/lib/api';
import { Button } from '@/components/ui/Button';

export default async function HomePage() {
  const [featuredResources, featuredPosts, totalDownloads] = await Promise.all([
    getFeaturedResources(3),
    getFeaturedBlogPosts(3),
    getTotalDownloads(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-900 via-blue-900 to-primary-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Translating Organizational Science into Tools You Can Use{' '}
              <span className="text-primary-400">Monday Morning</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Evidence-based frameworks and templates for organizational effectiveness. 
              No jargon. No fluff. Just practical tools grounded in research.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/resources">
                <Button size="lg" className="w-full sm:w-auto bg-white text-primary-600 hover:bg-blue-50">
                  Explore Free Resources
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary-400">{totalDownloads.toLocaleString()}+</div>
                  <div className="text-blue-200 text-sm mt-1">Downloads</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-400">9</div>
                  <div className="text-blue-200 text-sm mt-1">Free Tools</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-400">100%</div>
                  <div className="text-blue-200 text-sm mt-1">Evidence-Based</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-secondary-900 mb-2">
                Featured Resources
              </h2>
              <p className="text-lg text-secondary-600">
                Our most popular tools for organizational effectiveness
              </p>
            </div>
            <Link href="/resources" className="hidden md:block">
              <Button variant="outline">
                View All
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource) => (
              <article 
                key={resource.id}
                className="bg-white border-2 border-secondary-200 rounded-xl p-6 hover:border-primary-600 hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                    {resource.type}
                  </span>
                  <div className="flex items-center gap-1 text-secondary-500 text-sm">
                    <Download size={16} />
                    <span>{resource.downloads}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  {resource.title}
                </h3>
                
                <p className="text-secondary-600 mb-4 line-clamp-2">
                  {resource.description}
                </p>

                <div className="pt-4 border-t border-secondary-200">
                  <p className="text-sm text-secondary-500 mb-3">{resource.function}</p>
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

          <div className="mt-8 text-center md:hidden">
            <Link href="/resources">
              <Button variant="outline" size="lg">
                View All Resources
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Why SKORE?
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              The gap between organizational science and practice is too wide. We're closing it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                Evidence-Based
              </h3>
              <p className="text-secondary-600">
                Every tool is grounded in peer-reviewed research and validated frameworks, not management fads.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl mb-4">
                <Download size={32} />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                Immediately Useful
              </h3>
              <p className="text-secondary-600">
                No theory without application. Download a template and use it Monday morning.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                Practitioner-Focused
              </h3>
              <p className="text-secondary-600">
                Designed for HR professionals, managers, and leaders who need practical solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-secondary-900 mb-2">
                Latest from the Blog
              </h2>
              <p className="text-lg text-secondary-600">
                Research insights translated for practitioners
              </p>
            </div>
            <Link href="/blog" className="hidden md:block">
              <Button variant="outline">
                View All Posts
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-xl overflow-hidden border-2 border-secondary-200 hover:border-primary-600 hover:shadow-card-hover transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-secondary-500">
                      {post.readTime} min read
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-secondary-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-secondary-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-secondary-200">
                    <div className="flex-1">
                      <p className="font-medium text-secondary-900 text-sm">
                        {post.author.name}
                      </p>
                      <p className="text-xs text-secondary-500">
                        {post.author.role}
                      </p>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button size="sm" variant="ghost">
                        Read More
                        <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View All Posts
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Download your first resource today. No signup required.
          </p>
          <Link href="/resources">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-blue-50">
              Browse Resources
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}