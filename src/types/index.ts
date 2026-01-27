// src/types/index.ts

export type CategoryId = 'all' | 'assessment' | 'performance' | 'design' | 'learning' | 'change';

export interface Resource {
  id: string;
  title: string;
  slug: string;
  category: Exclude<CategoryId, 'all'>;
  type: 'Survey Template' | 'Script Guide' | 'Assessment Tool' | 'Template' | 'Workbook' | 'Checklist' | 'Framework';
  description: string;
  detailedDescription?: string; // Para la página de detalle
  function: string;
  downloads: number;
  pages: number;
  format: string;
  fileSize?: string; // e.g., "2.4 MB"
  filePath: string; // Ruta al archivo: "/downloads/assessment/employee-engagement.pdf"
  previewImage?: string; // Imagen de preview del recurso
  includes: string[];
  tags: string[];
  featured?: boolean; // Para destacar en home
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToComplete?: string; // e.g., "30 minutes"
  relatedResources?: string[]; // IDs de recursos relacionados
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: number;
  excerpt: string;
  content: string;
  coverImage?: string;
  image?: string; // Alias para coverImage
  author: Author;
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
  featured?: boolean;
  relatedPosts?: string[];
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Download {
  id: string;
  email: string;
  name?: string;
  resourceId: string;
  resourceTitle: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  source?: 'newsletter' | 'download' | 'contact';
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

// Form Data Types
export interface DownloadFormData {
  email: string;
  name?: string;
  company?: string;
  subscribe?: boolean;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}