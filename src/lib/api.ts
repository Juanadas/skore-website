// src/lib/api.ts
import { resources } from '@/lib/data/resources';
import type { Resource, BlogPost, CategoryId } from '@/types';

// Intentar importar blog posts si existe el archivo
let blogPosts: BlogPost[] = [];
try {
  const blogModule = require('@/lib/data/blog');
  blogPosts = blogModule.blogPosts || [];
} catch (e) {
  // El archivo de blog no existe, usar array vacío
  blogPosts = [];
}

// ============================================================================
// RESOURCES
// ============================================================================

export async function getResources(): Promise<Resource[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return resources;
}

export async function getResourceById(id: string): Promise<Resource | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return resources.find(r => r.id === id || r.slug === id) || null;
}

export async function getResourcesByCategory(category: CategoryId): Promise<Resource[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (category === 'all') {
    return resources;
  }
  
  return resources.filter(r => r.category === category);
}

export async function searchResources(query: string): Promise<Resource[]> {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const term = query.toLowerCase().trim();
  
  if (!term) {
    return resources;
  }
  
  return resources.filter(r => 
    r.title.toLowerCase().includes(term) ||
    r.description.toLowerCase().includes(term) ||
    r.tags.some(tag => tag.toLowerCase().includes(term)) ||
    r.type.toLowerCase().includes(term)
  );
}

export async function getFeaturedResources(limit: number = 3): Promise<Resource[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [...resources]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, limit);
}

export async function getRelatedResources(resourceId: string, limit: number = 3): Promise<Resource[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const resource = resources.find(r => r.id === resourceId);
  
  if (!resource) {
    return [];
  }
  
  return resources
    .filter(r => r.id !== resourceId)
    .filter(r => 
      r.category === resource.category || 
      r.tags.some(tag => resource.tags.includes(tag))
    )
    .slice(0, limit);
}

// ============================================================================
// BLOG
// ============================================================================

export async function getBlogPosts(): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return blogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return blogPosts.find(p => p.slug === slug) || null;
}

export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [...blogPosts]
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
}

export async function getRelatedBlogPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const post = blogPosts.find(p => p.id === postId);
  
  if (!post) {
    return [];
  }
  
  return blogPosts
    .filter(p => p.id !== postId)
    .filter(p => 
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    )
    .slice(0, limit);
}

// ============================================================================
// STATISTICS
// ============================================================================

export async function getResourceStats() {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    totalResources: resources.length,
    totalDownloads: resources.reduce((sum, r) => sum + r.downloads, 0),
    categories: {
      assessment: resources.filter(r => r.category === 'assessment').length,
      performance: resources.filter(r => r.category === 'performance').length,
      design: resources.filter(r => r.category === 'design').length,
      learning: resources.filter(r => r.category === 'learning').length,
      change: resources.filter(r => r.category === 'change').length,
    },
    mostDownloaded: [...resources]
      .sort((a, b) => b.downloads - a.downloads)[0],
    recentlyUpdated: [...resources]
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 5),
  };
}

export async function getTotalDownloads(): Promise<number> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return resources.reduce((sum, r) => sum + r.downloads, 0);
}