// src/app/api/download/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/db/prisma';

// Validation schema
const downloadSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').optional(),
  company: z.string().optional(),
  resourceId: z.string().min(1, 'Resource ID is required'),
  subscribe: z.boolean().default(false),
});

// Rate limiting simple (en producción usar Upstash/Redis)
const downloadAttempts = new Map<string, number[]>();

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const attempts = downloadAttempts.get(email) || [];
  
  // Limpiar intentos más antiguos de 1 hora
  const recentAttempts = attempts.filter(time => now - time < 60 * 60 * 1000);
  
  // Máximo 5 descargas por hora
  if (recentAttempts.length >= 5) {
    return false;
  }
  
  recentAttempts.push(now);
  downloadAttempts.set(email, recentAttempts);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos
    const validationResult = downloadSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { email, name, company, resourceId, subscribe } = validationResult.data;

    // Rate limiting
    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: 'Too many download requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Obtener información del recurso
    const { getResourceById } = await import('@/lib/data/resources');
    const resource = getResourceById(resourceId);

    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    // Verificar que el archivo existe
    const filePath = path.join(process.cwd(), 'public', resource.filePath);
    try {
      await fs.access(filePath);
    } catch {
      console.error(`File not found: ${filePath}`);
      return NextResponse.json(
        { error: 'File not found on server' },
        { status: 404 }
      );
    }

    // Guardar en base de datos
    try {
      const download = await prisma.download.create({
        data: {
          email,
          name,
          company,
          resourceId: resource.id,
          ipAddress:
            request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown',
          subscribe,
        },
      });
      
      console.log('Download saved to database:', download.id);
    } catch (dbError) {
      console.error('Failed to save download to database:', dbError);
      // Continuar aunque falle el guardado en DB
    }
    
    console.log('Download request:', { email, name, resourceId: resource.id });

    // Enviar email con link de descarga
    try {
      const { sendDownloadEmail } = await import('@/lib/emails/send');
      await sendDownloadEmail({
        to: email,
        name,
        resource,
      });
      console.log('Download email sent to:', email);
    } catch (emailError) {
      console.error('Failed to send download email:', emailError);
      // No fallar la request si el email falla
    }

    // Si subscribe=true, guardar subscriber y enviar email de bienvenida
    if (subscribe) {
      // Guardar subscriber
      try {
        await prisma.subscriber.upsert({
          where: { email },
          update: {
            name,
            status: 'active',
            source: 'download',
          },
          create: {
            email,
            name,
            source: 'download',
            status: 'active',
            tags: [],
          },
        });
        
        console.log('Subscriber saved:', email);
      } catch (dbError) {
        console.error('Failed to save subscriber:', dbError);
      }

      console.log('New subscriber:', { email, name, source: 'download' });
      
      // Enviar email de bienvenida
      try {
        const { sendWelcomeEmail } = await import('@/lib/emails/send');
        await sendWelcomeEmail({
          to: email,
          name,
        });
        console.log('Welcome email sent to:', email);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
      }
    }

    // Retornar éxito con información del archivo
    return NextResponse.json({
      success: true,
      message: 'Download link sent to your email',
      download: {
        resourceTitle: resource.title,
        downloadUrl: resource.filePath, // En producción sería un link firmado
        expiresIn: '24 hours',
      },
    });

  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint para descarga directa (después de validar email)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const resourceId = searchParams.get('resourceId');
  const token = searchParams.get('token'); // Token de validación

  if (!resourceId) {
    return NextResponse.json(
      { error: 'Resource ID required' },
      { status: 400 }
    );
  }

  // TODO: Validar token (generado al capturar email)
  // Por ahora permitimos descarga directa para desarrollo

  try {
    const { getResourceById } = await import('@/lib/data/resources');
    const resource = getResourceById(resourceId);

    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    const filePath = path.join(process.cwd(), 'public', resource.filePath);
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resource.slug}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });

  } catch (error) {
    console.error('File download error:', error);
    return NextResponse.json(
      { error: 'File not found or cannot be read' },
      { status: 500 }
    );
  }
}