import { renderBaseEmailLayout } from './baseLayout';

export interface BookingCancellationEmailData {
  recipientName: string;
  recipientEmail: string;
  creatorName?: string;
  studentName?: string;
  meetingTitle: string;
  meetingDate: string;
  meetingTime: string;
  reason?: string;
  refundEligible?: boolean;
  refundAmount?: number;
  isCreator?: boolean;
  storeUrl?: string;
}

export function buildBookingCancellationEmail(data: BookingCancellationEmailData): { subject: string; html: string; text: string } {
  const {
    recipientName,
    creatorName = 'Aarav Sharma',
    studentName = 'Student',
    meetingTitle,
    meetingDate,
    meetingTime,
    reason = 'Cancelled upon request',
    refundEligible = true,
    refundAmount = 2499,
    isCreator = false,
    storeUrl
  } = data;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://creatoros.in';
  const firstName = recipientName.split(' ')[0] || 'Member';
  const bookingPageUrl = storeUrl || `${appUrl}/aarav`;

  const subject = `❌ Session Cancelled: ${meetingTitle} on ${meetingDate}`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 15px; color: #F1F5F9;">
      Hello <strong>${firstName}</strong>,
    </p>
    <p style="margin: 0 0 20px 0; color: #94A3B8; line-height: 1.6;">
      This email is to confirm that your 1:1 mentorship session <strong style="color: #FFFFFF;">"${meetingTitle}"</strong> has been cancelled.
    </p>

    <!-- Cancellation Summary Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1E293B; border: 1px solid #334155; border-radius: 12px; margin: 20px 0; overflow: hidden;">
      <tr>
        <td colspan="2" style="background-color: #0F172A; padding: 12px 18px; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 700; color: #EF4444; text-transform: uppercase; letter-spacing: 0.5px;">
          🚫 Cancelled Meeting Summary
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155; width: 35%;">Session Title</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; font-weight: 600; border-bottom: 1px solid #334155;">${meetingTitle}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Participants</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; font-weight: 600; border-bottom: 1px solid #334155;">${creatorName} & ${studentName}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Original Slot</td>
        <td style="padding: 12px 18px; color: #EF4444; font-size: 13px; font-weight: 600; text-decoration: line-through; border-bottom: 1px solid #334155;">${meetingDate} &bull; ${meetingTime}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px;">Reason</td>
        <td style="padding: 12px 18px; color: #CBD5E1; font-size: 13px;">${reason}</td>
      </tr>
    </table>

    <!-- Calendar Slot Status -->
    <div style="background-color: #0F172A; border: 1px solid #1E293B; border-radius: 10px; padding: 16px; margin: 20px 0; font-size: 12px; color: #94A3B8; line-height: 1.6;">
      📅 <strong>Calendar Sync Status:</strong> The corresponding Google Calendar event has been automatically removed from both participants' calendars and the time slot is now freed.
    </div>

    ${!isCreator ? `
    <!-- Refund Status Box -->
    <div style="background-color: ${refundEligible ? '#064E3B' : '#451A03'}; border: 1px solid ${refundEligible ? '#059669' : '#D97706'}; border-radius: 10px; padding: 18px; margin: 20px 0;">
      <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: #FFFFFF;">
        ${refundEligible ? '💰 100% Refund Status: Approved' : '⚠️ Refund Notice'}
      </h4>
      <p style="margin: 0; font-size: 12px; color: ${refundEligible ? '#A7F3D0' : '#FDE68A'}; line-height: 1.5;">
        ${refundEligible
          ? `Per our Refund & Cancellation Policy (free cancellation >24 hours), a full refund of <strong>₹${refundAmount.toLocaleString('en-IN')}</strong> is being processed to your original UPI/bank account within <strong>5 business days</strong>.`
          : `This cancellation occurred less than 24 hours prior to the session start time and is subject to our <a href="${appUrl}/refund-policy" target="_blank" style="color: #60A5FA;">non-refundable policy</a>.`
        }
      </p>
    </div>
    ` : ''}

    <p style="margin: 20px 0 0 0; font-size: 13px; color: #94A3B8; line-height: 1.5;">
      Would you like to reschedule or pick another available slot? You can browse upcoming open openings anytime on the creator storefront.
    </p>
  `;

  const html = renderBaseEmailLayout({
    previewText: `Session Cancelled: ${meetingTitle} on ${meetingDate}. Calendar slot freed.`,
    badge: '1:1 Booking Cancelled',
    badgeColor: 'rose',
    title: `Booking Cancelled: ${meetingTitle}`,
    subtitle: `Original slot: ${meetingDate} at ${meetingTime}`,
    contentHtml,
    ctaText: 'Browse Available Slots',
    ctaUrl: bookingPageUrl,
    secondaryCtaText: 'Review Refund Policy',
    secondaryCtaUrl: `${appUrl}/refund-policy`,
    appUrl
  });

  const text = `
Hello ${firstName},

Your 1:1 session "${meetingTitle}" on ${meetingDate} at ${meetingTime} has been cancelled.

Google Calendar event removed and slot freed.
${!isCreator && refundEligible ? `Refund: ₹${refundAmount.toLocaleString('en-IN')} is being processed within 5 business days.` : ''}

Rebook a new slot: ${bookingPageUrl}
Refund Policy: ${appUrl}/refund-policy
  `.trim();

  return { subject, html, text };
}
