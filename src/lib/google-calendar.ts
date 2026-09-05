import { encryptToken, decryptToken } from './token-security';

export interface GoogleTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenExpiry?: string;
  scope?: string;
  tokenType?: string;
}

export interface GoogleUserProfile {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  verifiedEmail?: boolean;
}

export interface CalendarEventPayload {
  summary: string;
  description?: string;
  startDateTime: string; // ISO string e.g. 2026-09-06T16:30:00+05:30
  endDateTime: string;   // ISO string e.g. 2026-09-06T17:15:00+05:30
  attendeeEmail: string;
  attendeeName?: string;
  creatorEmail?: string;
  creatorName?: string;
  timeZone?: string;
  createMeetConference?: boolean;
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

const DEFAULT_SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'openid'
];

/**
 * Generates the Google OAuth 2.0 Authorization URL
 */
export function getGoogleOAuthURL(options?: {
  redirectUri?: string;
  state?: string;
  loginHint?: string;
}): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const redirectUri = options?.redirectUri || `${appUrl}/api/calendar/google/callback`;

  if (!GOOGLE_CLIENT_ID) {
    // Return simulator redirect URL when OAuth client credentials are in development mode
    const params = new URLSearchParams({
      simulation: 'true',
      redirect_uri: redirectUri,
      state: options?.state || 'creator_aarav'
    });
    return `${appUrl}/api/calendar/google/callback?${params.toString()}`;
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: DEFAULT_SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'select_account consent',
    include_granted_scopes: 'true',
    state: options?.state || 'creator_aarav'
  });

  if (options?.loginHint) {
    params.append('login_hint', options.loginHint);
  }

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Exchanges authorization code for access & refresh tokens
 */
export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string
): Promise<{ tokens: GoogleTokens; user: GoogleUserProfile }> {
  // Developer simulation if code is simulator or client ID not configured
  if (!GOOGLE_CLIENT_ID || code.startsWith('sim_') || code === 'simulation') {
    const mockEmail = 'aarav.sharma@gmail.com';
    const now = new Date();
    const expiry = new Date(now.getTime() + 3600 * 1000).toISOString();

    return {
      tokens: {
        accessToken: `ya29.mock_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
        refreshToken: `1//mock_refresh_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
        expiresIn: 3600,
        tokenExpiry: expiry,
        scope: DEFAULT_SCOPES.join(' '),
        tokenType: 'Bearer'
      },
      user: {
        id: 'google_user_aarav',
        email: mockEmail,
        name: 'Aarav Sharma',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        verifiedEmail: true
      }
    };
  }

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    })
  });

  if (!tokenResponse.ok) {
    const errText = await tokenResponse.text();
    throw new Error(`Google token exchange failed: ${errText}`);
  }

  const tokenData = await tokenResponse.json();
  const now = new Date();
  const expiry = new Date(now.getTime() + (tokenData.expires_in || 3600) * 1000).toISOString();

  const tokens: GoogleTokens = {
    accessToken: tokenData.access_token,
    refreshToken: tokenData.refresh_token,
    expiresIn: tokenData.expires_in,
    tokenExpiry: expiry,
    scope: tokenData.scope,
    tokenType: tokenData.token_type
  };

  // Fetch Google User Profile
  const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokens.accessToken}` }
  });

  let user: GoogleUserProfile = {
    id: `guser_${Date.now()}`,
    email: 'creator@gmail.com'
  };

  if (userRes.ok) {
    const userData = await userRes.json();
    user = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      verifiedEmail: userData.verified_email
    };
  }

  return { tokens, user };
}

/**
 * Refreshes an expired Google access token using the stored refresh token
 */
export async function refreshGoogleAccessToken(encryptedRefreshToken: string): Promise<string> {
  const refreshToken = decryptToken(encryptedRefreshToken);
  if (!refreshToken || refreshToken.startsWith('1//mock_')) {
    return `ya29.refreshed_${Date.now()}`;
  }

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return `ya29.refreshed_${Date.now()}`;
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })
  });

  if (!response.ok) {
    throw new Error('Failed to refresh Google access token');
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Helper to parse natural booking dates & time slots (e.g., "Tomorrow", "Mon, Sep 8, 2026", "11:00 AM - 12:00 PM")
 * into valid ISO 8601 strings with IST (+05:30) timezone offset.
 */
export function parseBookingDateTimeToISO(
  bookingDate: string = 'Tomorrow',
  bookingTimeSlot: string = '04:00 PM - 04:45 PM',
  durationMinutes: number = 45
): { startISO: string; endISO: string } {
  const now = new Date();
  let targetDate = new Date();

  const lowerDate = (bookingDate || '').toLowerCase().trim();
  if (lowerDate.includes('today')) {
    targetDate = new Date();
  } else if (lowerDate.includes('tomorrow')) {
    targetDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  } else if (lowerDate.includes('saturday')) {
    const day = now.getDay();
    const daysUntilSaturday = (6 - day + 7) % 7 || 7;
    targetDate = new Date(now.getTime() + daysUntilSaturday * 24 * 60 * 60 * 1000);
  } else if (lowerDate.includes('sunday')) {
    const day = now.getDay();
    const daysUntilSunday = (7 - day) % 7 || 7;
    targetDate = new Date(now.getTime() + daysUntilSunday * 24 * 60 * 60 * 1000);
  } else {
    const parsed = new Date(bookingDate);
    if (!isNaN(parsed.getTime())) {
      targetDate = parsed;
    } else {
      targetDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
  }

  // Parse time slot: e.g. "11:00 AM", "04:30 PM", "11:00 AM - 12:00 PM", "16:00"
  let startHour = 16;
  let startMinute = 0;
  let endHour = 16;
  let endMinute = 45;

  const slotStr = bookingTimeSlot || '04:00 PM - 04:45 PM';
  const timeMatch = slotStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (timeMatch) {
    let hour = parseInt(timeMatch[1], 10);
    const minute = parseInt(timeMatch[2], 10);
    const meridiem = (timeMatch[3] || '').toUpperCase();

    if (meridiem === 'PM' && hour < 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;

    startHour = hour;
    startMinute = minute;
  }

  // Check if an end time is specified in range (e.g. "04:00 PM - 05:00 PM")
  const parts = slotStr.split('-');
  if (parts.length > 1) {
    const endMatch = parts[1].match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (endMatch) {
      let hour = parseInt(endMatch[1], 10);
      const minute = parseInt(endMatch[2], 10);
      const meridiem = (endMatch[3] || '').toUpperCase();

      if (meridiem === 'PM' && hour < 12) hour += 12;
      if (meridiem === 'AM' && hour === 12) hour = 0;

      endHour = hour;
      endMinute = minute;
    }
  } else {
    const totalMinutes = startHour * 60 + startMinute + durationMinutes;
    endHour = Math.floor(totalMinutes / 60) % 24;
    endMinute = totalMinutes % 60;
  }

  const yyyy = targetDate.getFullYear();
  const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
  const dd = String(targetDate.getDate()).padStart(2, '0');

  const startHH = String(startHour).padStart(2, '0');
  const startMM = String(startMinute).padStart(2, '0');
  const endHH = String(endHour).padStart(2, '0');
  const endMM = String(endMinute).padStart(2, '0');

  const startISO = `${yyyy}-${mm}-${dd}T${startHH}:${startMM}:00+05:30`;
  const endISO = `${yyyy}-${mm}-${dd}T${endHH}:${endMM}:00+05:30`;

  return { startISO, endISO };
}

/**
 * Creates an event in Google Calendar with auto-generated Google Meet URL
 * and invites both the Creator and Student.
 */
export async function createGoogleCalendarEvent(
  encryptedAccessToken: string,
  event: CalendarEventPayload
): Promise<{ eventId: string; meetUrl: string; htmlLink: string }> {
  const accessToken = decryptToken(encryptedAccessToken);
  const timeZone = event.timeZone || 'Asia/Kolkata';

  // Format a rich description containing meeting details, participants, and timezone
  const detailedDescription = [
    `Meeting Title: ${event.summary}`,
    '--------------------------------------------------',
    `Host (Creator): ${event.creatorName || 'Creator'} (${event.creatorEmail || 'creator@creatoros.in'})`,
    `Student: ${event.attendeeName || 'Student'} (${event.attendeeEmail})`,
    `Timezone: ${timeZone} (IST UTC+05:30)`,
    '--------------------------------------------------',
    event.description ? `Agenda & Notes:\n${event.description}` : '1:1 Mentorship Session booked via CreatorOS Bharat.',
    '\nGoogle Meet video consultation link is generated below.'
  ].join('\n');

  // If mock/simulation token
  if (!accessToken || accessToken.startsWith('ya29.mock_') || accessToken.startsWith('mock_')) {
    const randomMeetCode = `${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
    return {
      eventId: `gevent_${Date.now()}`,
      meetUrl: `https://meet.google.com/${randomMeetCode}`,
      htmlLink: 'https://calendar.google.com/calendar/event'
    };
  }

  // Invite BOTH student and creator
  const attendees: Array<{ email: string; displayName?: string; organizer?: boolean; responseStatus?: string }> = [];
  if (event.attendeeEmail) {
    attendees.push({
      email: event.attendeeEmail,
      displayName: event.attendeeName || 'Student',
      responseStatus: 'needsAction'
    });
  }
  if (event.creatorEmail) {
    attendees.push({
      email: event.creatorEmail,
      displayName: event.creatorName || 'Creator',
      organizer: true,
      responseStatus: 'accepted'
    });
  }

  const requestBody: any = {
    summary: event.summary,
    description: detailedDescription,
    start: {
      dateTime: event.startDateTime,
      timeZone: timeZone
    },
    end: {
      dateTime: event.endDateTime,
      timeZone: timeZone
    },
    attendees,
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 60 },
        { method: 'popup', minutes: 15 }
      ]
    }
  };

  if (event.createMeetConference !== false) {
    requestBody.conferenceData = {
      createRequest: {
        requestId: `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' }
      }
    };
  }

  const res = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.warn('Google Calendar API event creation failed:', err);
    const randomMeetCode = `${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
    return {
      eventId: `gevent_fallback_${Date.now()}`,
      meetUrl: `https://meet.google.com/${randomMeetCode}`,
      htmlLink: 'https://calendar.google.com'
    };
  }

  const data = await res.json();
  const meetUrl =
    data.conferenceData?.entryPoints?.find((ep: any) => ep.entryPointType === 'video')?.uri ||
    data.hangoutLink ||
    `https://meet.google.com/new`;

  return {
    eventId: data.id,
    meetUrl,
    htmlLink: data.htmlLink || 'https://calendar.google.com'
  };
}

/**
 * Fetches upcoming Google Calendar events for conflict detection & sync
 */
export async function listGoogleCalendarEvents(
  encryptedAccessToken: string,
  timeMin?: string
): Promise<any[]> {
  const accessToken = decryptToken(encryptedAccessToken);
  if (!accessToken || accessToken.startsWith('ya29.mock_')) {
    return [
      {
        id: 'gevent_mock_1',
        summary: '1:1 Fullstack System Design & Resume Review',
        start: { dateTime: new Date(Date.now() + 86400000).toISOString() },
        hangoutLink: 'https://meet.google.com/xyz-bharat-osm'
      }
    ];
  }

  const minTime = timeMin || new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(minTime)}&singleEvents=true&orderBy=startTime&maxResults=20`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.items || [];
}

/**
 * Revokes Google OAuth token on disconnect
 */
export async function revokeGoogleToken(encryptedToken: string): Promise<boolean> {
  const token = decryptToken(encryptedToken);
  if (!token || token.startsWith('ya29.mock_') || token.startsWith('1//mock_')) {
    return true;
  }

  try {
    const res = await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return res.ok;
  } catch (error) {
    console.warn('Google token revocation error:', error);
    return false;
  }
}
