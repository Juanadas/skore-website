// src/app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendWelcomeEmail } from '@/lib/emails/send';
import { supabaseAdmin } from '@/lib/db/supabase';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
});

const subscribeAttempts = new Map<string, number[]>();

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const attempts = subscribeAttempts.get(email) || [];
  const recentAttempts = attempts.filter(t => now - t < 60 * 60 * 1000);
  if (recentAttempts.length >= 3) return false;
  recentAttempts.push(now);
  subscribeAttempts.set(email, recentAttempts);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = subscribeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: result.error.errors },
        { status: 400 }
      );
    }

    const { email, name } = result.data;

    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: 'Too many subscription requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Guardar / actualizar subscriber en Supabase
    const { error: dbError } = await supabaseAdmin
      .from('subscribers')
      .upsert(
        { email, name, status: 'active', source: 'newsletter' },
        { onConflict: 'email' }
      );

    if (dbError) {
      console.error('Failed to save subscriber:', dbError.message);
    }

    // Email de bienvenida
    try {
      await sendWelcomeEmail({ to: email, name });
    } catch (e) {
      console.error('Failed to send welcome email:', e);
      return NextResponse.json({
        success: true,
        warning: 'Subscribed! But confirmation email failed to send.',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email.',
    });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}