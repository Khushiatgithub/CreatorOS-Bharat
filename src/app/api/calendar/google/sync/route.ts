import { NextResponse } from 'next/server';
import { CalendarIntegrationModel, CalendarMeetingModel } from '@/lib/db-models';
import { listGoogleCalendarEvents } from '@/lib/google-calendar';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { creatorId = 'creator_aarav' } = body;

    // Get current calendar integration
    const integration = await CalendarIntegrationModel.getByCreator(creatorId);

    if (!integration.isConnected) {
      return NextResponse.json(
        { success: false, error: 'Google Calendar is not connected.' },
        { status: 400 }
      );
    }

    // Get encrypted tokens
    const { accessToken } = await CalendarIntegrationModel.getEncryptedTokens(creatorId);

    // Call Google Calendar API to fetch events
    let googleEvents = [];
    if (accessToken) {
      googleEvents = await listGoogleCalendarEvents(accessToken);
    }

    // Update integration lastSyncedAt timestamp in PostgreSQL
    const updated = await CalendarIntegrationModel.save({
      creatorId,
      accountEmail: integration.accountEmail,
      isConnected: true,
      syncStatus: 'synced',
      googleCalendarId: integration.googleCalendarId || 'primary',
      autoGenerateMeet: integration.autoGenerateMeet !== false
    });

    const meetings = await CalendarMeetingModel.getByCreator(creatorId);

    return NextResponse.json({
      success: true,
      message: 'Google Calendar synced successfully.',
      data: {
        integration: updated,
        eventsCount: googleEvents.length,
        meetingsCount: meetings.length,
        lastSyncedAt: updated.lastSyncedAt
      }
    });
  } catch (error: any) {
    console.error('Google Calendar sync error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Sync failed' },
      { status: 500 }
    );
  }
}
