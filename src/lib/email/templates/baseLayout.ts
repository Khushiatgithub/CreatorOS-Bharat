export interface EmailLayoutOptions {
  previewText?: string;
  badge?: string;
  badgeColor?: 'gold' | 'emerald' | 'blue' | 'purple' | 'rose';
  title: string;
  subtitle?: string;
  contentHtml: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  appUrl?: string;
}

export function renderBaseEmailLayout(options: EmailLayoutOptions): string {
  const appUrl = options.appUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://creatoros.in';
  const previewText = options.previewText || options.title;

  const badgeColors = {
    gold: { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' },
    emerald: { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' },
    blue: { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' },
    purple: { bg: '#EDE9FE', text: '#5B21B6', border: '#C4B5FD' },
    rose: { bg: '#FFE4E6', text: '#9F1239', border: '#FDA4AF' },
  };

  const badgeTheme = badgeColors[options.badgeColor || 'gold'];

  return `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>${options.title}</title>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #07090E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .email-container { max-width: 600px; margin: 0 auto; }
    .btn-gradient { background: linear-gradient(135deg, #F59E0B 0%, #EA580C 100%); text-decoration: none; display: inline-block; font-weight: 700; border-radius: 8px; color: #FFFFFF !important; }
    .btn-secondary { background-color: #1E293B; border: 1px solid #334155; text-decoration: none; display: inline-block; font-weight: 600; border-radius: 8px; color: #E2E8F0 !important; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .content-padding { padding: 24px 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #07090E; color: #E2E8F0;">
  <!-- Preview Text Hidden Hack -->
  <div style="display: none; font-size: 1px; color: #07090E; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${previewText}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #07090E; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 24px 12px;">
        <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto;">
          
          <!-- Header / Brand Logo -->
          <tr>
            <td align="center" style="padding: 16px 0 24px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="${appUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding-right: 8px; vertical-align: middle;">
                            <span style="font-size: 24px;">👑</span>
                          </td>
                          <td style="vertical-align: middle; text-align: left;">
                            <span style="font-size: 20px; font-weight: 900; letter-spacing: 0.5px; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                              CREATOR<span style="color: #F59E0B;">OS</span> <span style="font-size: 12px; background: linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; border: 1px solid #334155; padding: 2px 6px; border-radius: 4px;">BHARAT</span>
                            </span>
                            <div style="font-size: 10px; color: #94A3B8; letter-spacing: 0.5px; margin-top: 2px;">India's #1 Creator Economy Engine</div>
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card Container -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0F172A; border: 1px solid #1E293B; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
                
                <!-- Card Header Accent Bar -->
                <tr>
                  <td height="4" style="background: linear-gradient(90deg, #F59E0B, #EA580C, #10B981); line-height: 4px; font-size: 4px;">&nbsp;</td>
                </tr>

                <!-- Content Area -->
                <tr>
                  <td class="content-padding" style="padding: 36px 32px;">
                    
                    ${options.badge ? `
                    <!-- Badge -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                      <tr>
                        <td style="background-color: ${badgeTheme.bg}; color: ${badgeTheme.text}; border: 1px solid ${badgeTheme.border}; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; padding: 4px 10px; border-radius: 9999px;">
                          ${options.badge}
                        </td>
                      </tr>
                    </table>
                    ` : ''}

                    <!-- Title -->
                    <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #FFFFFF; line-height: 1.3;">
                      ${options.title}
                    </h1>

                    ${options.subtitle ? `
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #94A3B8; line-height: 1.5;">
                      ${options.subtitle}
                    </p>
                    ` : '<div style="margin-bottom: 24px;"></div>'}

                    <!-- Dynamic HTML Content -->
                    <div style="font-size: 14px; color: #CBD5E1; line-height: 1.6;">
                      ${options.contentHtml}
                    </div>

                    ${(options.ctaText && options.ctaUrl) || (options.secondaryCtaText && options.secondaryCtaUrl) ? `
                    <!-- Action Buttons -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px; border-top: 1px solid #1E293B; padding-top: 24px;">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              ${options.ctaText && options.ctaUrl ? `
                              <td style="padding-right: 12px; padding-bottom: 8px;">
                                <a href="${options.ctaUrl}" target="_blank" class="btn-gradient" style="padding: 12px 24px; font-size: 14px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 8px; display: inline-block;">
                                  ${options.ctaText} &rarr;
                                </a>
                              </td>
                              ` : ''}
                              ${options.secondaryCtaText && options.secondaryCtaUrl ? `
                              <td style="padding-bottom: 8px;">
                                <a href="${options.secondaryCtaUrl}" target="_blank" class="btn-secondary" style="padding: 12px 20px; font-size: 14px; font-weight: 600; color: #E2E8F0; text-decoration: none; border-radius: 8px; display: inline-block;">
                                  ${options.secondaryCtaText}
                                </a>
                              </td>
                              ` : ''}
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    ` : ''}

                  </td>
                </tr>

                <!-- Direct UPI & Trust Banner -->
                <tr>
                  <td style="background-color: #0B1120; padding: 14px 32px; border-top: 1px solid #1E293B;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="left" style="font-size: 11px; color: #64748B;">
                          ⚡ <span style="color: #94A3B8; font-weight: 600;">Direct UPI 0% Fee Settlements</span> &bull; 🔒 256-bit Encrypted
                        </td>
                        <td align="right" style="font-size: 11px; color: #10B981; font-weight: 700;">
                          🇮🇳 Made for Bharat
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer Area -->
          <tr>
            <td style="padding: 28px 16px; text-align: center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="font-size: 12px; color: #64748B; line-height: 1.6;">
                    <p style="margin: 0 0 8px 0;">
                      <a href="${appUrl}/privacy" target="_blank" style="color: #94A3B8; text-decoration: underline; margin: 0 6px;">Privacy Policy</a> &bull;
                      <a href="${appUrl}/terms" target="_blank" style="color: #94A3B8; text-decoration: underline; margin: 0 6px;">Terms of Service</a> &bull;
                      <a href="${appUrl}/refund-policy" target="_blank" style="color: #94A3B8; text-decoration: underline; margin: 0 6px;">Refund Policy</a> &bull;
                      <a href="mailto:support@creatoros.in" style="color: #94A3B8; text-decoration: underline; margin: 0 6px;">Support</a>
                    </p>
                    <p style="margin: 0 0 6px 0; font-size: 11px; color: #475569;">
                      CreatorOS Bharat Inc. &bull; Indiranagar, Bengaluru, Karnataka 560038, India
                    </p>
                    <p style="margin: 0; font-size: 10px; color: #334155;">
                      You received this automated notification because of your account activity on CreatorOS Bharat.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
