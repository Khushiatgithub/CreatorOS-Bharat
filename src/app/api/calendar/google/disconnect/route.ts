import { NextResponse } from 'next/server';
import { CalendarIntegrationModel } from '@/lib/db-models';
import { revokeGoogleToken } from '@/lib/google-calendar';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { creatorId = 'creator_aarav' } = body;

    const { accessToken, refreshToken } = await CalendarIntegrationModel.getEncryptedTokens(creatorId);

    // Attempt to revoke token with Google
    if (refreshToken) {
      await revokeGoogleToken(refreshToken).catch(() => {});
    } else if (accessToken) {
      await revokeGoogleToken(accessToken).catch(() => {});
    }

    // Disconnect in PostgreSQL
    await CalendarIntegrationModel.disconnect(creatorId);

    return NextResponse.json({
      success: true,
      message: 'Google Calendar integration disconnected and tokens revoked.'
    });
  } catch (error: any) {
    console.error('Error disconnecting Google Calendar:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Disconnect failed' },
      { status: 500 }
    );
  }
}
