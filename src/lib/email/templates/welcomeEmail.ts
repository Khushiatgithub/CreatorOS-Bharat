import { renderBaseEmailLayout } from './baseLayout';

export interface WelcomeEmailData {
  userName: string;
  userEmail: string;
  creatorHandle?: string;
  storeUrl?: string;
}

export function buildWelcomeEmail(data: WelcomeEmailData): { subject: string; html: string; text: string } {
  const { userName, creatorHandle = 'aarav' } = data;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://creatoros.in';
  const firstName = userName.split(' ')[0] || 'Creator';
  const storeUrl = data.storeUrl || `${appUrl}/${creatorHandle}`;

  const subject = `🚀 Welcome to CreatorOS Bharat, ${firstName}! Let's build your creator empire`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 15px; color: #F1F5F9;">
      Namaste <strong>${firstName}</strong>,
    </p>
    <p style="margin: 0 0 20px 0; color: #94A3B8; line-height: 1.6;">
      Welcome to <strong>CreatorOS Bharat</strong> — India's first all-in-one platform built specifically for Indian digital creators, educators, coaches, and consultants. We're thrilled to have you onboard.
    </p>

    <!-- Quick Start Card -->
    <div style="background-color: #1E293B; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <h3 style="margin: 0 0 14px 0; font-size: 14px; font-weight: 700; color: #F59E0B; text-transform: uppercase; letter-spacing: 0.5px;">
        ⚡ 4-Step Quick Launch Checklist
      </h3>
      
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 8px 0; vertical-align: top; width: 24px; font-size: 16px;">1️⃣</td>
          <td style="padding: 8px 0 8px 8px; vertical-align: top;">
            <strong style="color: #FFFFFF;">Add Your UPI VPA:</strong> Receive 100% instant, direct payouts straight to PhonePe, Google Pay, or Paytm with 0% platform commissions.
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top; width: 24px; font-size: 16px;">2️⃣</td>
          <td style="padding: 8px 0 8px 8px; vertical-align: top;">
            <strong style="color: #FFFFFF;">Publish Your First Asset:</strong> Upload digital ebooks, video courses, Notion templates, or private memberships.
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top; width: 24px; font-size: 16px;">3️⃣</td>
          <td style="padding: 8px 0 8px 8px; vertical-align: top;">
            <strong style="color: #FFFFFF;">Connect Google Calendar:</strong> Enable 1:1 mentorship bookings with auto-generated Google Meet video conference links.
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top; width: 24px; font-size: 16px;">4️⃣</td>
          <td style="padding: 8px 0 8px 8px; vertical-align: top;">
            <strong style="color: #FFFFFF;">Activate AI Business Coach:</strong> Get weekly revenue forecasts, dynamic price optimization, and best-time-to-post heatmaps.
          </td>
        </tr>
      </table>
    </div>

    <!-- Storefront Link Box -->
    <div style="background-color: #0B132B; border: 1px dashed #3B82F6; border-radius: 8px; padding: 14px 16px; margin: 20px 0; font-size: 13px;">
      <span style="color: #94A3B8;">Your Public Storefront URL:</span><br/>
      <a href="${storeUrl}" target="_blank" style="color: #60A5FA; font-weight: 700; word-break: break-all; text-decoration: none;">
        ${storeUrl}
      </a>
    </div>

    <p style="margin: 20px 0 0 0; font-size: 13px; color: #94A3B8; line-height: 1.5;">
      If you need any assistance getting your storefront configured or connecting your GST billing preferences, reply directly to this email or visit our creator community.
    </p>
  `;

  const html = renderBaseEmailLayout({
    previewText: `Welcome to CreatorOS Bharat! Start monetizing your content with 0% UPI fees and automated GST invoicing.`,
    badge: 'Welcome to Bharat Creator Economy',
    badgeColor: 'gold',
    title: `Welcome to CreatorOS Bharat, ${firstName}!`,
    subtitle: 'Your modern creator operating system is now active.',
    contentHtml,
    ctaText: 'Open Creator Studio Dashboard',
    ctaUrl: `${appUrl}/dashboard`,
    secondaryCtaText: 'View Your Storefront',
    secondaryCtaUrl: storeUrl,
    appUrl
  });

  const text = `
Namaste ${firstName},

Welcome to CreatorOS Bharat!

Your account is now ready. Start setting up your digital storefront:
1. Add your UPI VPA for 0% instant settlements
2. Publish your first digital product or course
3. Connect Google Calendar for 1:1 mentorship
4. Launch your AI Business Coach

Access your Dashboard: ${appUrl}/dashboard
Your Storefront: ${storeUrl}

Need help? Contact support@creatoros.in
  `.trim();

  return { subject, html, text };
}
