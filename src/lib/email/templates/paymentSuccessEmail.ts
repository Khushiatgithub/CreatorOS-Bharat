import { renderBaseEmailLayout } from './baseLayout';

export interface PaymentSuccessEmailData {
  buyerName: string;
  buyerEmail: string;
  orderNumber: string;
  itemTitle: string;
  itemType?: string;
  amount: number;
  paymentMethod?: string;
  upiRefId?: string;
  downloadUrl?: string;
  creatorName?: string;
  date?: string;
}

export function buildPaymentSuccessEmail(data: PaymentSuccessEmailData): { subject: string; html: string; text: string } {
  const {
    buyerName,
    orderNumber,
    itemTitle,
    itemType = 'product',
    amount,
    paymentMethod = 'UPI',
    upiRefId,
    downloadUrl,
    creatorName = 'Aarav Sharma',
    date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } = data;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://creatoros.in';
  const firstName = buyerName.split(' ')[0] || 'Customer';
  const formattedAmount = Number(amount).toLocaleString('en-IN');

  const subject = `✅ Payment Confirmed (₹${formattedAmount}): ${itemTitle} | CreatorOS Bharat`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 15px; color: #F1F5F9;">
      Hello <strong>${firstName}</strong>,
    </p>
    <p style="margin: 0 0 20px 0; color: #94A3B8; line-height: 1.6;">
      Thank you for your purchase! Your payment of <strong style="color: #10B981; font-size: 16px;">₹${formattedAmount}</strong> has been successfully processed and verified.
    </p>

    <!-- Receipt Details Table -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1E293B; border: 1px solid #334155; border-radius: 12px; margin: 20px 0; overflow: hidden;">
      <tr>
        <td colspan="2" style="background-color: #0F172A; padding: 12px 18px; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 700; color: #F59E0B; text-transform: uppercase; letter-spacing: 0.5px;">
          🧾 Order Summary (${orderNumber})
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155; width: 40%;">Item Purchased</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; font-weight: 600; border-bottom: 1px solid #334155;">${itemTitle}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Creator / Instructor</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; border-bottom: 1px solid #334155;">${creatorName}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Payment Method</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; border-bottom: 1px solid #334155;">${paymentMethod} ${upiRefId ? `<span style="color: #64748B; font-size: 11px;">(Ref: ${upiRefId})</span>` : ''}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Transaction Date</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; border-bottom: 1px solid #334155;">${date}</td>
      </tr>
      <tr>
        <td style="padding: 14px 18px; color: #F1F5F9; font-size: 14px; font-weight: 700; background-color: #0F172A;">Total Paid (Inc. GST)</td>
        <td style="padding: 14px 18px; color: #10B981; font-size: 16px; font-weight: 800; background-color: #0F172A;">₹${formattedAmount}</td>
      </tr>
    </table>

    ${downloadUrl ? `
    <!-- Download Box -->
    <div style="background-color: #064E3B; border: 1px solid #059669; border-radius: 10px; padding: 18px; margin: 24px 0; text-align: center;">
      <h3 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 700; color: #FFFFFF;">
        📥 Your Digital Asset is Ready
      </h3>
      <p style="margin: 0 0 14px 0; font-size: 12px; color: #A7F3D0;">
        Click below to immediately access or download your content.
      </p>
      <a href="${downloadUrl}" target="_blank" style="display: inline-block; background-color: #10B981; color: #FFFFFF; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 6px; text-decoration: none;">
        Download / Access Content Now &rarr;
      </a>
    </div>
    ` : ''}

    <p style="margin: 20px 0 0 0; font-size: 12px; color: #64748B; line-height: 1.5;">
      💡 A separate official GST Tax Invoice has been generated for your records. For any support or inquiries regarding this order, please reach out to <a href="mailto:support@creatoros.in" style="color: #94A3B8;">support@creatoros.in</a>.
    </p>
  `;

  const html = renderBaseEmailLayout({
    previewText: `Payment Confirmed: ₹${formattedAmount} for ${itemTitle}. Your order is complete!`,
    badge: 'Payment Verified & Confirmed',
    badgeColor: 'emerald',
    title: `Payment Successful (₹${formattedAmount})`,
    subtitle: `Order ${orderNumber} has been verified and settled instantly.`,
    contentHtml,
    ctaText: downloadUrl ? 'Access Content' : 'View Order Details',
    ctaUrl: downloadUrl || `${appUrl}/dashboard`,
    secondaryCtaText: 'Download GST Invoice',
    secondaryCtaUrl: `${appUrl}/dashboard/gst-invoices`,
    appUrl
  });

  const text = `
Hello ${firstName},

Your payment of ₹${formattedAmount} for "${itemTitle}" was successful!

Order ID: ${orderNumber}
Payment Method: ${paymentMethod} ${upiRefId ? `(Ref: ${upiRefId})` : ''}
Date: ${date}
Total Paid: ₹${formattedAmount}

${downloadUrl ? `Access content here: ${downloadUrl}` : `View details on CreatorOS: ${appUrl}/dashboard`}

Thank you for choosing CreatorOS Bharat!
  `.trim();

  return { subject, html, text };
}
