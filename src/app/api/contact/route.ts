// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactNotification } from '@/lib/emails/send';
import { prisma } from '@/lib/db/prisma';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Rate limiting
const contactAttempts = new Map<string, number[]>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const attempts = contactAttempts.get(identifier) || [];
  const recentAttempts = attempts.filter(time => now - time < 60 * 60 * 1000);
  
  // Máximo 3 mensajes por hora por IP/email
  if (recentAttempts.length >= 3) {
    return false;
  }
  
  recentAttempts.push(now);
  contactAttempts.set(identifier, recentAttempts);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name, email, company, message } = validationResult.data;

    // Rate limiting por IP y email
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const identifier = `${ip}_${email}`;

    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { error: 'Too many contact requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Guardar en base de datos
    try {
      const submission = await prisma.contactSubmission.create({
        data: {
          name,
          email,
          company,
          message,
          status: 'new',
          ipAddress: ip,
          userAgent: request.headers.get('user-agent') || 'unknown',
        },
      });

      console.log('New contact submission saved:', submission.id);
    } catch (dbError) {
      console.error('Failed to save contact submission:', dbError);
      // Continuar aunque falle el guardado en DB
    }

    // Enviar notificación por email
    try {
      await sendContactNotification({
        name,
        email,
        company,
        message,
      });
    } catch (emailError) {
      console.error('Failed to send contact notification:', emailError);
      return NextResponse.json({
        success: true,
        warning: 'Message received, but notification email failed to send',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}