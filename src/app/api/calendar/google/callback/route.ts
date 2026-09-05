import { NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/google-calendar';
import { CalendarIntegrationModel } from '@/lib/db-models';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const simulation = searchParams.get('simulation');
    const state = searchParams.get('state') || 'creator_aarav';
    const error = searchParams.get('error');

    if (error) {
      console.warn('Google OAuth denied or failed:', error);
      return NextResponse.redirect(`${appUrl}/dashboard/calendar?google_auth=error&reason=${encodeURIComponent(error)}`);
    }

    const redirectUri = `${appUrl}/api/calendar/google/callback`;
    const authCode = code || (simulation ? 'simulation' : '');

    if (!authCode) {
      return NextResponse.redirect(`${appUrl}/dashboard/calendar?google_auth=error&reason=no_code`);
    }

    // Exchange code for tokens and user profile
    const { tokens, user } = await exchangeCodeForTokens(authCode, redirectUri);

    // Save tokens securely in PostgreSQL
    await CalendarIntegrationModel.save({
      creatorId: state,
      accountEmail: user.email || 'creator.aarav@gmail.com',
      isConnected: true,
      syncStatus: 'synced',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenExpiry: tokens.tokenExpiry,
      scope: tokens.scope,
      googleCalendarId: 'primary',
      autoGenerateMeet: true
    });

    return NextResponse.redirect(`${appUrl}/dashboard/calendar?google_auth=success&email=${encodeURIComponent(user.email || 'creator.aarav@gmail.com')}`);
  } catch (error: any) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(`${appUrl}/dashboard/calendar?google_auth=error&reason=${encodeURIComponent(error.message || 'callback_failed')}`);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, creatorId = 'creator_aarav', redirectUri } = body;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const callbackUri = redirectUri || `${appUrl}/api/calendar/google/callback`;

    const { tokens, user } = await exchangeCodeForTokens(code || 'simulation', callbackUri);

    const saved = await CalendarIntegrationModel.save({
      creatorId,
      accountEmail: user.email || 'creator.aarav@gmail.com',
      isConnected: true,
      syncStatus: 'synced',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenExpiry: tokens.tokenExpiry,
      scope: tokens.scope,
      googleCalendarId: 'primary',
      autoGenerateMeet: true
    });

    return NextResponse.json({
      success: true,
      message: 'Google Calendar OAuth connected successfully.',
      data: saved
    });
  } catch (error: any) {
    console.error('Google OAuth POST callback error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Token exchange failed' },
      { status: 500 }
    );
  }
}
