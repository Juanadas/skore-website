import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Research insights and practical guidance on organizational effectiveness, translated for practitioners.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-blue-100">
              Research insights and evidence-based practices for organizational effectiveness, 
              translated into language practitioners can use.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post (First Post) */}
          {posts.length > 0 && (
            <article className="bg-white rounded-2xl overflow-hidden border-2 border-secondary-200 hover:border-primary-600 hover:shadow-card-hover transition-all mb-12">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                      {posts[0].category}
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                    {posts[0].title}
                  </h2>

                  <p className="text-lg text-secondary-600 mb-6">
                    {posts[0].excerpt}
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-secondary-500">
                      <Clock size={16} />
                      <span className="text-sm">{posts[0].readTime} min read</span>
                    </div>
                    <span className="text-sm text-secondary-500">
                      {formatDate(posts[0].publishedAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-secondary-900">
                        {posts[0].author.name}
                      </p>
                      <p className="text-sm text-secondary-600">
                        {posts[0].author.role}
                      </p>
                    </div>
                    <Link href={`/blog/${posts[0].slug}`}>
                      <Button size="lg">
                        Read Article
                        <ArrowRight size={20} />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <p className="text-secondary-700 font-medium">Featured Article</p>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* All Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl overflow-hidden border-2 border-secondary-200 hover:border-primary-600 hover:shadow-card-hover transition-all flex flex-col"
              >
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-secondary-500 flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime} min
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-secondary-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-secondary-600 mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Author & Date */}
                  <div className="pt-4 border-t border-secondary-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-secondary-900 text-sm">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-secondary-500">
                          {formatDate(post.publishedAt)}
                        </p>
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Read More
                        <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State (if no posts) */}
          {posts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                No posts yet
              </h3>
              <p className="text-secondary-600">
                Check back soon for research insights and practical guidance.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Want more practical insights?
          </h2>
          <p className="text-lg text-secondary-600 mb-8">
            Download our free resources for evidence-based tools you can use immediately.
          </p>
          <Link href="/resources">
            <Button size="lg">
              Explore Resources
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}