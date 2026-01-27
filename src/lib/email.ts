// src/lib/email.ts
// Para usar con Resend (https://resend.com)
// npm install resend

interface SendDownloadEmailParams {
  to: string;
  firstName: string;
  resourceTitle: string;
  downloadUrl: string;
}

export async function sendDownloadEmail({
  to,
  firstName,
  resourceTitle,
  downloadUrl,
}: SendDownloadEmailParams) {
  // Si estás usando Resend
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'SKORE <recursos@skore.com>',
        to: [to],
        subject: `Tu recurso: ${resourceTitle}`,
        html: getEmailTemplate(firstName, resourceTitle, downloadUrl),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}

function getEmailTemplate(
  firstName: string,
  resourceTitle: string,
  downloadUrl: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resourceTitle}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #2563eb;">
          <h1 style="color: #2563eb; margin: 0; font-size: 28px;">SKORE</h1>
          <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">
            Organizational Science in Practice
          </p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 20px;">
          <h2 style="color: #1e293b; margin: 0 0 20px 0;">
            ¡Hola ${firstName}! 👋
          </h2>
          
          <p style="color: #475569; font-size: 16px; margin: 0 0 20px 0;">
            Gracias por tu interés en nuestros recursos. Tu descarga está lista:
          </p>

          <!-- Resource Card -->
          <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 30px 0;">
            <h3 style="color: #1e293b; margin: 0 0 12px 0; font-size: 20px;">
              ${resourceTitle}
            </h3>
            <p style="color: #64748b; margin: 0 0 20px 0; font-size: 14px;">
              Este recurso te ayudará a implementar mejores prácticas basadas en evidencia científica.
            </p>
            
            <!-- Download Button -->
            <a href="${downloadUrl}" 
               style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              📥 Descargar Recurso
            </a>
          </div>

          <p style="color: #475569; font-size: 16px; margin: 30px 0 20px 0;">
            <strong>💡 Tip:</strong> Guarda este email para tener acceso al recurso cuando lo necesites.
          </p>

          <!-- What's Next -->
          <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 20px; margin: 30px 0;">
            <h4 style="color: #1e293b; margin: 0 0 12px 0; font-size: 18px;">
              ¿Qué sigue?
            </h4>
            <ul style="color: #475569; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Explora nuestra biblioteca completa de recursos</li>
              <li style="margin-bottom: 8px;">Lee nuestros últimos artículos en el blog</li>
              <li style="margin-bottom: 8px;">Suscríbete a nuestro newsletter para más contenido</li>
            </ul>
          </div>

          <!-- CTA Buttons -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="https://skore.com/resources" 
               style="display: inline-block; color: #2563eb; text-decoration: none; padding: 12px 24px; border: 2px solid #2563eb; border-radius: 8px; font-weight: 600; margin: 0 10px;">
              Ver Más Recursos
            </a>
            <a href="https://skore.com/blog" 
               style="display: inline-block; color: #2563eb; text-decoration: none; padding: 12px 24px; border: 2px solid #2563eb; border-radius: 8px; font-weight: 600; margin: 0 10px;">
              Leer el Blog
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #e2e8f0; padding: 30px 20px; text-align: center;">
          <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">
            ¿Tienes preguntas? Responde a este email o contáctanos.
          </p>
          
          <!-- Social Links -->
          <div style="margin: 20px 0;">
            <a href="https://linkedin.com/company/skore" 
               style="color: #2563eb; text-decoration: none; margin: 0 10px;">
              LinkedIn
            </a>
            <a href="https://twitter.com/skore" 
               style="color: #2563eb; text-decoration: none; margin: 0 10px;">
              Twitter
            </a>
          </div>

          <p style="color: #94a3b8; font-size: 12px; margin: 20px 0 0 0;">
            © ${new Date().getFullYear()} SKORE. Todos los derechos reservados.
          </p>
          
          <p style="color: #94a3b8; font-size: 12px; margin: 10px 0 0 0;">
            <a href="https://skore.com/unsubscribe" 
               style="color: #94a3b8; text-decoration: underline;">
              Darse de baja
            </a>
          </p>
        </div>
      </body>
    </html>
  `;
}

// Variante para SendGrid
export async function sendDownloadEmailSendGrid(params: SendDownloadEmailParams) {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: params.to }],
          dynamic_template_data: {
            firstName: params.firstName,
            resourceTitle: params.resourceTitle,
            downloadUrl: params.downloadUrl,
          },
        }],
        from: { email: 'recursos@skore.com', name: 'SKORE' },
        template_id: process.env.SENDGRID_TEMPLATE_ID,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email via SendGrid');
    }

    return { success: true };
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
}