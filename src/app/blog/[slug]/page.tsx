import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowLeft, Tag, Linkedin, Twitter } from 'lucide-react';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params; 
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(post.id, 3);

  return (
    <div>
      {/* Back Navigation */}
      <section className="bg-secondary-50 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <article>
        <header className="bg-gradient-to-br from-secondary-900 to-primary-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category & Read Time */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-blue-100">
                <Clock size={16} />
                <span className="text-sm">{post.readTime} min read</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-blue-100 mb-8">
              {post.excerpt}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4 pb-6 border-b border-white/20">
              <div className="w-12 h-12 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold text-lg">
                {post.author.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{post.author.name}</p>
                <p className="text-sm text-blue-200">{post.author.role}</p>
              </div>
              <time className="text-sm text-blue-200">
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div 
                  className="prose-custom max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-secondary-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={20} className="text-secondary-400" />
                    <span className="font-semibold text-secondary-900">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-12 p-6 bg-secondary-50 rounded-xl">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary-900 mb-1">
                        About {post.author.name}
                      </h3>
                      <p className="text-secondary-600 mb-3">
                        {post.author.bio || post.author.role}
                      </p>
                      {post.author.social && (
                        <div className="flex gap-3">
                          {post.author.social.linkedin && (
                            <a
                              href={post.author.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-secondary-500 hover:text-primary-600 transition-colors"
                            >
                              <Linkedin size={20} />
                            </a>
                          )}
                          {post.author.social.twitter && (
                            <a
                              href={post.author.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-secondary-500 hover:text-primary-600 transition-colors"
                            >
                              <Twitter size={20} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Share */}
                  <div className="bg-secondary-50 rounded-xl p-6">
                    <h3 className="font-bold text-secondary-900 mb-4">Share Article</h3>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Twitter size={16} />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Linkedin size={16} />
                        LinkedIn
                      </Button>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6">
                    <h3 className="font-bold text-secondary-900 mb-2">
                      Want Practical Tools?
                    </h3>
                    <p className="text-sm text-secondary-600 mb-4">
                      Download free resources you can use immediately.
                    </p>
                    <Link href="/resources">
                      <Button size="sm" className="w-full">
                        Browse Resources
                      </Button>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <article
                  key={related.id}
                  className="bg-white rounded-xl overflow-hidden border-2 border-secondary-200 hover:border-primary-600 hover:shadow-card-hover transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                        {related.category}
                      </span>
                      <span className="text-sm text-secondary-500 flex items-center gap-1">
                        <Clock size={14} />
                        {related.readTime} min
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-3 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-secondary-600 mb-4 line-clamp-2">
                      {related.excerpt}
                    </p>
                    <Link href={`/blog/${related.slug}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Read Article
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}