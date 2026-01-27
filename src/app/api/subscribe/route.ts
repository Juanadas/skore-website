// src/app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendWelcomeEmail } from '@/lib/emails/send';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
});

// Rate limiting
const subscribeAttempts = new Map<string, number[]>();

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const attempts = subscribeAttempts.get(email) || [];
  const recentAttempts = attempts.filter(time => now - time < 60 * 60 * 1000);
  
  if (recentAttempts.length >= 3) {
    return false;
  }
  
  recentAttempts.push(now);
  subscribeAttempts.set(email, recentAttempts);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validationResult = subscribeSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { email, name } = validationResult.data;

    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: 'Too many subscription requests. Please try again later.' },
        { status: 429 }
      );
    }

    // TODO: Guardar en base de datos
    const subscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
      source: 'newsletter',
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    console.log('New subscriber:', subscriber);

    // Enviar email de bienvenida
    try {
      await sendWelcomeEmail({ to: email, name });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // No fallar si el email falla, pero informar al usuario
      return NextResponse.json({
        success: true,
        warning: 'Subscribed successfully, but confirmation email failed to send',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
    });

  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}