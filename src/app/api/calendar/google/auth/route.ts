import { NextResponse } from 'next/server';
import { getGoogleOAuthURL } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const creatorId = searchParams.get('creatorId') || 'creator_aarav';
    const redirectUri = searchParams.get('redirectUri') || undefined;
    const loginHint = searchParams.get('loginHint') || undefined;

    const authUrl = getGoogleOAuthURL({
      state: creatorId,
      redirectUri,
      loginHint
    });

    // If client requested JSON URL response
    const format = searchParams.get('format');
    if (format === 'json') {
      return NextResponse.json({
        success: true,
        authUrl
      });
    }

    // Otherwise direct redirect to Google OAuth
    return NextResponse.redirect(authUrl);
  } catch (error: any) {
    console.error('Error generating Google OAuth URL:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate OAuth URL' },
      { status: 500 }
    );
  }
}
