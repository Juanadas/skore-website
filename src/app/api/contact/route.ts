// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactNotification } from '@/lib/emails/send';
import { supabaseAdmin } from '@/lib/db/supabase';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const contactAttempts = new Map<string, number[]>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const attempts = contactAttempts.get(identifier) || [];
  const recentAttempts = attempts.filter(t => now - t < 60 * 60 * 1000);
  if (recentAttempts.length >= 3) return false;
  recentAttempts.push(now);
  contactAttempts.set(identifier, recentAttempts);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: result.error.errors },
        { status: 400 }
      );
    }

    const { name, email, company, message } = result.data;

    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';
    
    if (!checkRateLimit(`${ip}_${email}`)) {
      return NextResponse.json(
        { error: 'Too many contact requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Guardar en Supabase
    const { error: dbError } = await supabaseAdmin
      .from('contact_submissions')
      .insert({
        name,
        email,
        company,
        message,
        status: 'new',
        ip_address: ip,
        user_agent: request.headers.get('user-agent') || 'unknown',
      });

    if (dbError) {
      console.error('Failed to save contact submission:', dbError.message);
    }

    // Notificación por email
    try {
      await sendContactNotification({ name, email, company, message });
    } catch (e) {
      console.error('Failed to send contact notification:', e);
      return NextResponse.json({
        success: true,
        warning: "Message received, but notification email failed to send.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Message sent! We'll get back to you soon.",
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}