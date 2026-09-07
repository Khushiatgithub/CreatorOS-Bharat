import { renderBaseEmailLayout } from './baseLayout';

export interface CalendarInviteEmailData {
  recipientName: string;
  recipientEmail: string;
  creatorName?: string;
  studentName?: string;
  meetingTitle: string;
  meetingDate: string;
  meetingTime: string;
  meetingUrl?: string;
  googleEventId?: string;
  timezone?: string;
  isCreator?: boolean;
}

export function buildCalendarInviteEmail(data: CalendarInviteEmailData): { subject: string; html: string; text: string } {
  const {
    recipientName,
    creatorName = 'Aarav Sharma',
    studentName = 'Student',
    meetingTitle,
    meetingDate,
    meetingTime,
    meetingUrl = 'https://meet.google.com/new',
    timezone = 'Asia/Kolkata (IST UTC+05:30)',
    isCreator = false
  } = data;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://creatoros.in';
  const firstName = recipientName.split(' ')[0] || 'Member';

  const subject = `📅 Google Calendar Event Synced: ${meetingTitle} (${meetingDate})`;

  // Construct Google Calendar Direct Web URL
  const gcalTitle = encodeURIComponent(meetingTitle);
  const gcalDetails = encodeURIComponent(`1:1 Mentorship Session on CreatorOS Bharat.\nHost: ${creatorName}\nAttendee: ${studentName}\nVideo Call: ${meetingUrl}`);
  const gcalLocation = encodeURIComponent(meetingUrl);
  const addToCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&details=${gcalDetails}&location=${gcalLocation}`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 15px; color: #F1F5F9;">
      Hello <strong>${firstName}</strong>,
    </p>
    <p style="margin: 0 0 20px 0; color: #94A3B8; line-height: 1.6;">
      Your session <strong style="color: #FFFFFF;">"${meetingTitle}"</strong> is synchronized with <strong>Google Calendar</strong>. An official Google Calendar invitation has been attached to your Google account.
    </p>

    <!-- Calendar Sync Status Box -->
    <div style="background-color: #1E293B; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin: 20px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="width: 48px; vertical-align: top;">
            <div style="background-color: #0F172A; border: 1px solid #3B82F6; border-radius: 10px; width: 42px; height: 42px; text-align: center; line-height: 42px; font-size: 20px;">
              📅
            </div>
          </td>
          <td style="vertical-align: top; padding-left: 12px;">
            <span style="font-size: 11px; font-weight: 700; color: #3B82F6; text-transform: uppercase; letter-spacing: 0.5px;">Google Calendar 2-Way Sync</span>
            <h3 style="margin: 2px 0 6px 0; font-size: 15px; font-weight: 700; color: #FFFFFF;">${meetingTitle}</h3>
            <p style="margin: 0; font-size: 13px; color: #10B981; font-weight: 600;">
              🗓️ ${meetingDate} &bull; ⏰ ${meetingTime}
            </p>
          </td>
        </tr>
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 16px; border-top: 1px solid #334155; padding-top: 14px;">
        <tr>
          <td style="font-size: 12px; color: #94A3B8; width: 35%;">Participants:</td>
          <td style="font-size: 12px; color: #FFFFFF; font-weight: 600;">
            ${creatorName} (Host) &bull; ${studentName} (Mentee)
          </td>
        </tr>
        <tr>
          <td style="font-size: 12px; color: #94A3B8; padding-top: 6px;">Video Link:</td>
          <td style="font-size: 12px; color: #60A5FA; padding-top: 6px; font-weight: 600;">
            <a href="${meetingUrl}" target="_blank" style="color: #60A5FA; text-decoration: underline;">${meetingUrl}</a>
          </td>
        </tr>
        <tr>
          <td style="font-size: 12px; color: #94A3B8; padding-top: 6px;">Timezone:</td>
          <td style="font-size: 12px; color: #CBD5E1; padding-top: 6px;">${timezone}</td>
        </tr>
      </table>
    </div>

    <!-- Add to Calendar Button -->
    <div style="text-align: center; margin: 24px 0;">
      <a href="${addToCalendarUrl}" target="_blank" style="display: inline-block; background-color: #2563EB; color: #FFFFFF; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);">
        ➕ Add / Verify in Google Calendar &rarr;
      </a>
    </div>

    <p style="margin: 20px 0 0 0; font-size: 12px; color: #64748B; line-height: 1.5;">
      💡 Google will automatically dispatch a pop-up and email reminder 15 minutes before the call starts. To manage your meeting slots or availability, visit the <a href="${appUrl}/dashboard/calendar" style="color: #94A3B8;">CreatorOS Calendar Studio</a>.
    </p>
  `;

  const html = renderBaseEmailLayout({
    previewText: `Google Calendar invitation for ${meetingTitle} on ${meetingDate} at ${meetingTime}.`,
    badge: 'Calendar Event Synced',
    badgeColor: 'blue',
    title: 'Google Calendar Event Confirmed',
    subtitle: `${meetingTitle} &bull; ${meetingDate}`,
    contentHtml,
    ctaText: 'Open Google Meet',
    ctaUrl: meetingUrl,
    secondaryCtaText: 'Add to Calendar',
    secondaryCtaUrl: addToCalendarUrl,
    appUrl
  });

  const text = `
Hello ${firstName},

Your session has been synced with Google Calendar!

Event: ${meetingTitle}
Date & Time: ${meetingDate} at ${meetingTime} (${timezone})
Participants: ${creatorName} & ${studentName}

Google Meet Link: ${meetingUrl}
Add to Calendar: ${addToCalendarUrl}

CreatorOS Calendar Studio: ${appUrl}/dashboard/calendar
  `.trim();

  return { subject, html, text };
}
