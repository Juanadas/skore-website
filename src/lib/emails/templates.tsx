// src/lib/emails/templates.tsx
import type { Resource } from '@/types';

interface DownloadEmailProps {
  recipientName?: string;
  resource: Resource;
  downloadUrl: string;
}

export function getDownloadEmailHTML({ recipientName, resource, downloadUrl }: DownloadEmailProps): string {
  const name = recipientName || 'there';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Download: ${resource.title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                SKORE
              </h1>
              <p style="margin: 10px 0 0; color: #bfdbfe; font-size: 14px;">
                Evidence-Based Organizational Tools
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #111827; font-size: 24px; font-weight: bold;">
                Hi ${name}! 👋
              </h2>
              
              <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Thanks for downloading <strong style="color: #111827;">${resource.title}</strong>. 
                We hope this ${resource.type.toLowerCase()} helps you translate organizational 
                science into action.
              </p>

              <!-- Resource Info Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; margin: 30px 0; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                      ${resource.type}
                    </p>
                    <h3 style="margin: 0 0 12px; color: #111827; font-size: 18px; font-weight: bold;">
                      ${resource.title}
                    </h3>
                    <p style="margin: 0 0 20px; color: #6b7280; font-size: 14px; line-height: 1.5;">
                      ${resource.description}
                    </p>
                    
                    <!-- Stats -->
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right: 24px;">
                          <p style="margin: 0; color: #9ca3af; font-size: 12px;">Pages</p>
                          <p style="margin: 4px 0 0; color: #111827; font-size: 16px; font-weight: 600;">${resource.pages}</p>
                        </td>
                        <td style="padding-right: 24px;">
                          <p style="margin: 0; color: #9ca3af; font-size: 12px;">Format</p>
                          <p style="margin: 4px 0 0; color: #111827; font-size: 16px; font-weight: 600;">${resource.format}</p>
                        </td>
                        <td>
                          <p style="margin: 0; color: #9ca3af; font-size: 12px;">Size</p>
                          <p style="margin: 4px 0 0; color: #111827; font-size: 16px; font-weight: 600;">${resource.fileSize || 'N/A'}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${downloadUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Download ${resource.title}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                This download link will expire in <strong>7 days</strong>. If you need help or have 
                questions, just reply to this email – we're here to help!
              </p>

              <!-- What's Included -->
              ${resource.includes && resource.includes.length > 0 ? `
              <div style="margin: 30px 0; padding: 20px; background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 4px;">
                <p style="margin: 0 0 12px; color: #1e40af; font-weight: 600; font-size: 14px;">
                  📋 What's Included:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px; line-height: 1.8;">
                  ${resource.includes.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px; color: #111827; font-weight: 600; font-size: 14px;">
                Want more resources like this?
              </p>
              <p style="margin: 0 0 20px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Browse our complete library of free, evidence-based organizational tools and templates.
              </p>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://skore.com'}/resources" style="display: inline-block; color: #2563eb; text-decoration: none; font-weight: 600; font-size: 14px;">
                Browse Resources →
              </a>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
              
              <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.6;">
                You're receiving this email because you downloaded a resource from SKORE.
                <br />
                © ${new Date().getFullYear()} SKORE. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getDownloadEmailText({ recipientName, resource, downloadUrl }: DownloadEmailProps): string {
  const name = recipientName || 'there';
  
  return `
Hi ${name}!

Thanks for downloading "${resource.title}" from SKORE.

RESOURCE DETAILS:
- Type: ${resource.type}
- Pages: ${resource.pages}
- Format: ${resource.format}
- Size: ${resource.fileSize || 'N/A'}

DOWNLOAD YOUR RESOURCE:
${downloadUrl}

(This link will expire in 7 days)

${resource.includes && resource.includes.length > 0 ? `
WHAT'S INCLUDED:
${resource.includes.map((item, i) => `${i + 1}. ${item}`).join('\n')}
` : ''}

Want more free resources? Visit: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://skore.com'}/resources

Questions? Just reply to this email – we're here to help!

Best,
The SKORE Team

---
© ${new Date().getFullYear()} SKORE - Evidence-Based Organizational Tools
  `.trim();
}

// Welcome email para nuevos subscribers
interface WelcomeEmailProps {
  recipientName?: string;
  recipientEmail: string;
}

export function getWelcomeEmailHTML({ recipientName }: WelcomeEmailProps): string {
  const name = recipientName || 'there';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SKORE</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">
                Welcome to SKORE! 🎉
              </h1>
              <p style="margin: 15px 0 0; color: #bfdbfe; font-size: 16px;">
                Thanks for joining our community
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #111827; font-size: 24px; font-weight: bold;">
                Hi ${name}! 👋
              </h2>
              
              <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                We're excited to have you here. SKORE is all about translating organizational science 
                into practical tools you can use Monday morning.
              </p>

              <p style="margin: 0 0 30px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Here's what you can expect from us:
              </p>

              <!-- Benefits -->
              <div style="margin: 0 0 30px;">
                <div style="display: flex; margin-bottom: 20px;">
                  <div style="flex-shrink: 0; width: 40px; height: 40px; background-color: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">📚</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 8px; color: #111827; font-size: 16px; font-weight: 600;">
                      Free Evidence-Based Resources
                    </h3>
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                      Templates, assessments, and frameworks grounded in organizational science research
                    </p>
                  </div>
                </div>

                <div style="display: flex; margin-bottom: 20px;">
                  <div style="flex-shrink: 0; width: 40px; height: 40px; background-color: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">✍️</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 8px; color: #111827; font-size: 16px; font-weight: 600;">
                      Practical Insights
                    </h3>
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                      Research-backed articles on engagement, performance, culture, and more
                    </p>
                  </div>
                </div>

                <div style="display: flex;">
                  <div style="flex-shrink: 0; width: 40px; height: 40px; background-color: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">🎯</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 8px; color: #111827; font-size: 16px; font-weight: 600;">
                      No Fluff, Just Value
                    </h3>
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                      We respect your time. Only relevant, actionable content (and not too often!)
                    </p>
                  </div>
                </div>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://skore.com'}/resources" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Explore Free Resources
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Have questions or feedback? Hit reply – we'd love to hear from you!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.6;">
                © ${new Date().getFullYear()} SKORE. All rights reserved.
                <br />
                <a href="#" style="color: #2563eb; text-decoration: none;">Unsubscribe</a> | 
                <a href="#" style="color: #2563eb; text-decoration: none;">Update Preferences</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}