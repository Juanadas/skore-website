// src/lib/emails/send.ts
import { Resend } from 'resend';
import type { Resource } from '@/types';
import { 
  getDownloadEmailHTML, 
  getDownloadEmailText,
  getWelcomeEmailHTML 
} from './templates';

console.log('RESEND_API_KEY from env:', process.env.RESEND_API_KEY);
const apiKey = process.env.RESEND_API_KEY;
console.log('API Key being used:', apiKey ? 'EXISTS' : 'MISSING');

const resend = new Resend(apiKey);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

interface SendDownloadEmailParams {
  to: string;
  name?: string;
  resource: Resource;
}

export async function sendDownloadEmail({ 
  to, 
  name, 
  resource 
}: SendDownloadEmailParams) {
  try {
    const downloadUrl = `${SITE_URL}${resource.filePath}`;

    const { data, error } = await resend.emails.send({
      from: `SKORE <${FROM_EMAIL}>`,
      to: [to],
      subject: `Your Download: ${resource.title}`,
      html: getDownloadEmailHTML({ 
        recipientName: name, 
        resource, 
        downloadUrl 
      }),
      text: getDownloadEmailText({ 
        recipientName: name, 
        resource, 
        downloadUrl 
      }),
      headers: {
        'X-Entity-Ref-ID': resource.id,
      },
      
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };

  } catch (error) {
    console.error('Send email error:', error);
    throw error;
  }
}

interface SendWelcomeEmailParams {
  to: string;
  name?: string;
}

export async function sendWelcomeEmail({ to, name }: SendWelcomeEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: `SKORE <${FROM_EMAIL}>`,
      to: [to],
      subject: 'Welcome to SKORE! 🎉',
      html: getWelcomeEmailHTML({ 
        recipientName: name, 
        recipientEmail: to 
      }),
      tags: [
        {
          name: 'category',
          value: 'welcome',
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Failed to send welcome email: ${error.message}`);
    }

    console.log('Welcome email sent successfully:', data);
    return { success: true, data };

  } catch (error) {
    console.error('Send welcome email error:', error);
    throw error;
  }
}

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
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@skore.com';

    const { data, error } = await resend.emails.send({
      from: `SKORE Contact Form <${FROM_EMAIL}>`,
      to: [adminEmail],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Reply directly to this email to respond to ${name}</small></p>
      `,
      tags: [
        {
          name: 'category',
          value: 'contact',
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Failed to send notification: ${error.message}`);
    }

    await resend.emails.send({
      from: `SKORE <${FROM_EMAIL}>`,
      to: [email],
      subject: 'Thanks for reaching out to SKORE',
      html: `
        <h2>Thanks for contacting us, ${name}!</h2>
        <p>We've received your message and will get back to you shortly.</p>
        <p>In the meantime, feel free to explore our <a href="${SITE_URL}/resources">free resources</a>.</p>
        <hr>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log('Contact notification sent successfully:', data);
    return { success: true, data };

  } catch (error) {
    console.error('Send contact notification error:', error);
    throw error;
  }
}