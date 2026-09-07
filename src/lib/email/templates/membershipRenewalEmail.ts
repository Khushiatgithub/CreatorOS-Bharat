import { renderBaseEmailLayout } from './baseLayout';

export interface MembershipRenewalEmailData {
  subscriberName: string;
  subscriberEmail: string;
  planName: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly';
  renewalDate: string;
  creatorName?: string;
  paymentMethod?: string;
  subscriptionId?: string;
}

export function buildMembershipRenewalEmail(data: MembershipRenewalEmailData): { subject: string; html: string; text: string } {
  const {
    subscriberName,
    planName,
    amount,
    billingCycle,
    renewalDate,
    creatorName = 'Aarav Sharma',
    paymentMethod = 'UPI Autopay / e-Mandate',
    subscriptionId
  } = data;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://creatoros.in';
  const firstName = subscriberName.split(' ')[0] || 'Member';
  const formattedAmount = Number(amount).toLocaleString('en-IN');
  const manageUrl = `${appUrl}/dashboard/memberships`;

  const subject = `🔔 Upcoming Membership Renewal: ${planName} on ${renewalDate}`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 15px; color: #F1F5F9;">
      Hello <strong>${firstName}</strong>,
    </p>
    <p style="margin: 0 0 20px 0; color: #94A3B8; line-height: 1.6;">
      This is a friendly reminder that your recurring membership for <strong style="color: #FFFFFF;">${planName}</strong> with <strong style="color: #FFFFFF;">${creatorName}</strong> is scheduled to renew on <strong style="color: #F59E0B;">${renewalDate}</strong>.
    </p>

    <!-- Renewal Summary Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1E293B; border: 1px solid #334155; border-radius: 12px; margin: 20px 0; overflow: hidden;">
      <tr>
        <td colspan="2" style="background-color: #0F172A; padding: 12px 18px; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 700; color: #F59E0B; text-transform: uppercase; letter-spacing: 0.5px;">
          💳 Subscription Renewal Details
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155; width: 40%;">Membership Tier</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; font-weight: 600; border-bottom: 1px solid #334155;">${planName}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Billing Frequency</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; text-transform: capitalize; border-bottom: 1px solid #334155;">${billingCycle}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Renewal Date</td>
        <td style="padding: 12px 18px; color: #F59E0B; font-size: 13px; font-weight: 700; border-bottom: 1px solid #334155;">${renewalDate}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Renewal Amount</td>
        <td style="padding: 12px 18px; color: #10B981; font-size: 15px; font-weight: 800; border-bottom: 1px solid #334155;">₹${formattedAmount}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Auto-Debit Method</td>
        <td style="padding: 12px 18px; color: #CBD5E1; font-size: 12px; border-bottom: 1px solid #334155;">${paymentMethod}</td>
      </tr>
      ${subscriptionId ? `
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px;">Subscription ID</td>
        <td style="padding: 12px 18px; color: #CBD5E1; font-size: 11px; font-family: monospace;">${subscriptionId}</td>
      </tr>
      ` : ''}
    </table>

    <!-- Active Perks Box -->
    <div style="background-color: #0F172A; border: 1px solid #1E293B; border-radius: 10px; padding: 16px; margin: 20px 0;">
      <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #FFFFFF;">
        ✨ Your Active Membership Perks:
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #94A3B8; line-height: 1.8;">
        <li>Full access to private creator community channels & discussions</li>
        <li>Exclusive masterclasses, workshops, and downloadable project templates</li>
        <li>Priority access to monthly Q&A group mentorship office hours</li>
      </ul>
    </div>

    <!-- Cancellation / Control Policy Notice -->
    <div style="background-color: #1E293B; border: 1px dashed #475569; border-radius: 8px; padding: 14px; margin: 20px 0; font-size: 12px; color: #94A3B8; line-height: 1.5;">
      ⚙️ <strong>Subscription Control:</strong> No action is required if you want your membership to continue seamlessly. If you wish to pause or cancel your subscription, you can do so with 1 click in your account before ${renewalDate} without any cancellation fees, as outlined in our <a href="${appUrl}/refund-policy" target="_blank" style="color: #60A5FA;">Refund Policy</a>.
    </div>
  `;

  const html = renderBaseEmailLayout({
    previewText: `Upcoming renewal notice for ${planName} (₹${formattedAmount}) on ${renewalDate}.`,
    badge: 'Membership Renewal Notice',
    badgeColor: 'gold',
    title: `Renewal Reminder: ${planName}`,
    subtitle: `Scheduled for auto-debit on ${renewalDate}`,
    contentHtml,
    ctaText: 'Manage Subscription',
    ctaUrl: manageUrl,
    secondaryCtaText: 'View Membership Perks',
    secondaryCtaUrl: `${appUrl}/dashboard/community`,
    appUrl
  });

  const text = `
Hello ${firstName},

Your membership for ${planName} is scheduled to renew on ${renewalDate}.

Plan: ${planName}
Billing: ${billingCycle}
Amount: ₹${formattedAmount}
Payment Method: ${paymentMethod}

Manage or cancel anytime with 1 click: ${manageUrl}
Refund Policy: ${appUrl}/refund-policy
  `.trim();

  return { subject, html, text };
}
