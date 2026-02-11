// src/app/api/download/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/db/supabase';

const downloadSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').optional(),
  company: z.string().optional(),
  resourceId: z.string().min(1, 'Resource ID is required'),
  subscribe: z.boolean().default(false),
});

// Rate limiting en memoria (suficiente para un solo servidor / Vercel)
const downloadAttempts = new Map<string, number[]>();

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const attempts = downloadAttempts.get(email) || [];
  const recentAttempts = attempts.filter(t => now - t < 60 * 60 * 1000);
  if (recentAttempts.length >= 5) return false;
  recentAttempts.push(now);
  downloadAttempts.set(email, recentAttempts);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = downloadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: result.error.errors },
        { status: 400 }
      );
    }

    const { email, name, company, resourceId, subscribe } = result.data;

    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: 'Too many download requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Obtener información del recurso (desde datos estáticos)
    const { getResourceById } = await import('@/lib/data/resources');
    const resource = getResourceById(resourceId);

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Guardar descarga en Supabase
    const { error: dbError } = await supabaseAdmin
      .from('downloads')
      .insert({
        email,
        name,
        company,
        resource_id: resource.id,
        ip_address: ip,
        user_agent: request.headers.get('user-agent') || 'unknown',
        subscribe,
      });

    if (dbError) {
      console.error('Failed to save download:', dbError.message);
      // Continuamos aunque falle el guardado
    }

    // Si quiere suscribirse, upsert en subscribers
    if (subscribe) {
      const { error: subError } = await supabaseAdmin
        .from('subscribers')
        .upsert(
          { email, name, status: 'active', source: 'download' },
          { onConflict: 'email' }
        );

      if (subError) {
        console.error('Failed to save subscriber:', subError.message);
      }

      // Email de bienvenida
      try {
        const { sendWelcomeEmail } = await import('@/lib/emails/send');
        await sendWelcomeEmail({ to: email, name });
      } catch (e) {
        console.error('Failed to send welcome email:', e);
      }
    }

    // Email con link de descarga
    try {
      const { sendDownloadEmail } = await import('@/lib/emails/send');
      await sendDownloadEmail({ to: email, name, resource });
    } catch (e) {
      console.error('Failed to send download email:', e);
      // No bloqueamos la respuesta si falla el email
    }

    return NextResponse.json({
      success: true,
      message: 'Check your email for the download link!',
      download: {
        resourceTitle: resource.title,
        // Cuando tengas PDFs reales en Supabase Storage,
        // aquí irá la signed URL. Por ahora es un placeholder.
        downloadUrl: resource.filePath,
      },
    });
  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}