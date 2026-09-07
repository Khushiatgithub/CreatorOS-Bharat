import { renderBaseEmailLayout } from './baseLayout';

export interface BookingConfirmationEmailData {
  studentName: string;
  studentEmail: string;
  creatorName?: string;
  creatorEmail?: string;
  meetingTitle: string;
  meetingDate: string;
  meetingTime: string;
  meetingUrl?: string;
  durationMinutes?: number;
  topic?: string;
  orderId?: string;
  timezone?: string;
}

export function buildBookingConfirmationEmail(data: BookingConfirmationEmailData): { subject: string; html: string; text: string } {
  const {
    studentName,
    creatorName = 'Aarav Sharma',
    creatorEmail = 'aarav.sharma@gmail.com',
    meetingTitle,
    meetingDate,
    meetingTime,
    meetingUrl = 'https://meet.google.com/new',
    durationMinutes = 45,
    topic,
    orderId,
    timezone = 'Asia/Kolkata (IST UTC+05:30)'
  } = data;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://creatoros.in';
  const firstName = studentName.split(' ')[0] || 'Mentee';

  const subject = `🗓️ 1:1 Session Confirmed: ${meetingTitle} on ${meetingDate} at ${meetingTime}`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 15px; color: #F1F5F9;">
      Namaste <strong>${firstName}</strong>,
    </p>
    <p style="margin: 0 0 20px 0; color: #94A3B8; line-height: 1.6;">
      Your 1:1 consultation session with <strong style="color: #FFFFFF;">${creatorName}</strong> has been successfully booked and confirmed on CreatorOS Bharat.
    </p>

    <!-- Meeting Details Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1E293B; border: 1px solid #334155; border-radius: 12px; margin: 20px 0; overflow: hidden;">
      <tr>
        <td colspan="2" style="background-color: #0F172A; padding: 12px 18px; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 700; color: #F59E0B; text-transform: uppercase; letter-spacing: 0.5px;">
          📅 Meeting Schedule & Details
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155; width: 35%;">Session Title</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; font-weight: 600; border-bottom: 1px solid #334155;">${meetingTitle}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Host (Creator)</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; font-weight: 600; border-bottom: 1px solid #334155;">${creatorName} (${creatorEmail})</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Date</td>
        <td style="padding: 12px 18px; color: #10B981; font-size: 13px; font-weight: 700; border-bottom: 1px solid #334155;">${meetingDate}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Time & Duration</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; font-weight: 600; border-bottom: 1px solid #334155;">${meetingTime} (${durationMinutes} mins)</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Timezone</td>
        <td style="padding: 12px 18px; color: #CBD5E1; font-size: 13px; border-bottom: 1px solid #334155;">${timezone}</td>
      </tr>
      ${orderId ? `
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 13px; border-bottom: 1px solid #334155;">Booking Reference</td>
        <td style="padding: 12px 18px; color: #CBD5E1; font-size: 12px; font-family: monospace; border-bottom: 1px solid #334155;">${orderId}</td>
      </tr>
      ` : ''}
    </table>

    <!-- Video Link CTA Box -->
    <div style="background-color: #064E3B; border: 1px solid #059669; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
      <span style="font-size: 24px;">🎥</span>
      <h3 style="margin: 6px 0 4px 0; font-size: 16px; font-weight: 800; color: #FFFFFF;">
        Google Meet Video Conference
      </h3>
      <p style="margin: 0 0 16px 0; font-size: 12px; color: #A7F3D0;">
        Join directly on your browser or phone at the scheduled time.
      </p>
      <a href="${meetingUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFFFFF; font-weight: 800; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
        Join Google Meet Call &rarr;
      </a>
      <div style="margin-top: 10px; font-size: 11px; color: #6EE7B7; word-break: break-all;">
        ${meetingUrl}
      </div>
    </div>

    <!-- Preparation Checklist -->
    <div style="background-color: #1E293B; border: 1px solid #334155; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 12px; color: #94A3B8; line-height: 1.6;">
      <strong style="color: #FFFFFF;">⚡ Quick Preparation Checklist:</strong><br/>
      &bull; Please join 5 minutes prior to the start time.<br/>
      &bull; Ensure your camera and microphone are tested and functional.<br/>
      &bull; Prepare your specific questions or portfolio links in advance.<br/>
      &bull; <em>Free cancellation & reschedule:</em> Available up to 24 hours before the session per our <a href="${appUrl}/refund-policy" target="_blank" style="color: #60A5FA;">Refund Policy</a>.
    </div>
  `;

  const html = renderBaseEmailLayout({
    previewText: `1:1 Session Confirmed with ${creatorName} for ${meetingDate} at ${meetingTime}. Click to join Google Meet.`,
    badge: '1:1 Session Confirmed',
    badgeColor: 'emerald',
    title: meetingTitle,
    subtitle: `${meetingDate} &bull; ${meetingTime} (${timezone})`,
    contentHtml,
    ctaText: 'Join Google Meet Call',
    ctaUrl: meetingUrl,
    secondaryCtaText: 'View in Calendar',
    secondaryCtaUrl: `${appUrl}/dashboard/calendar`,
    appUrl
  });

  const text = `
Namaste ${firstName},

Your 1:1 Session with ${creatorName} has been confirmed!

Meeting: ${meetingTitle}
Date: ${meetingDate}
Time: ${meetingTime} (${timezone})
Duration: ${durationMinutes} minutes

Join Google Meet: ${meetingUrl}

Free cancellations available up to 24h before the session.
Refund Policy: ${appUrl}/refund-policy
  `.trim();

  return { subject, html, text };
}
