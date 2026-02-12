// src/lib/emails/send.ts
import { Resend } from 'resend';
import type { Resource } from '@/types';
import {
  getDownloadEmailHTML,
  getDownloadEmailText,
  getWelcomeEmailHTML,
} from './templates';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@skore.com';

// ─── Download email ───────────────────────────────────────────────────────────

interface SendDownloadEmailParams {
  to: string;
  name?: string;
  resource: Resource;
}

export async function sendDownloadEmail({
  to,
  name,
  resource,
}: SendDownloadEmailParams) {
  const downloadUrl = `${SITE_URL}${resource.filePath}`;

  const { error } = await resend.emails.send({
    from: `SKORE <${FROM_EMAIL}>`,
    to: [to],
    subject: `Your Download: ${resource.title}`,
    html: getDownloadEmailHTML({ recipientName: name, resource, downloadUrl }),
    text: getDownloadEmailText({ recipientName: name, resource, downloadUrl }),
    headers: { 'X-Entity-Ref-ID': resource.id },
  });

  if (error) {
    throw new Error(`Failed to send download email: ${error.message}`);
  }

  return { success: true };
}

// ─── Welcome email ────────────────────────────────────────────────────────────

interface SendWelcomeEmailParams {
  to: string;
  name?: string;
}

export async function sendWelcomeEmail({ to, name }: SendWelcomeEmailParams) {
  const { error } = await resend.emails.send({
    from: `SKORE <${FROM_EMAIL}>`,
    to: [to],
    subject: 'Welcome to SKORE! 🎉',
    html: getWelcomeEmailHTML({ recipientName: name, recipientEmail: to }),
    tags: [{ name: 'category', value: 'welcome' }],
  });

  if (error) {
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }

  return { success: true };
}

// ─── Contact notification ─────────────────────────────────────────────────────

interface SendContactNotificationParams {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function sendContactNotification({
  name,
  email,
  company,
  message,
}: SendContactNotificationParams) {
  // Notificación al admin
  const { error: adminError } = await resend.emails.send({
    from: `SKORE Contact Form <${FROM_EMAIL}>`,
    to: [ADMIN_EMAIL],
    replyTo: email,
    subject: `New contact from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${message}</p>
      <hr/>
      <small>Reply to this email to respond directly to ${name}.</small>
    `,
    tags: [{ name: 'category', value: 'contact' }],
  });

  if (adminError) {
    throw new Error(`Failed to send contact notification: ${adminError.message}`);
  }

  // Confirmación al usuario
  const { error: userError } = await resend.emails.send({
    from: `SKORE <${FROM_EMAIL}>`,
    to: [email],
    subject: `Thanks for reaching out, ${name}!`,
    html: `
      <h2>Thanks for contacting us, ${name}!</h2>
      <p>We've received your message and will get back to you shortly.</p>
      <p>In the meantime, feel free to explore our
        <a href="${SITE_URL}/resources">free resources</a>.
      </p>
      <hr/>
      <p><strong>Your message:</strong></p>
      <p style="white-space:pre-wrap">${message}</p>
    `,
  });

  if (userError) {
    // No lanzamos error — el admin ya fue notificado, esto es secundario
    console.error('Failed to send contact confirmation to user:', userError.message);
  }

  return { success: true };
}