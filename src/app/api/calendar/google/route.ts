import { NextResponse } from 'next/server';
import { CalendarIntegrationModel } from '@/lib/db-models';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const creatorId = searchParams.get('creatorId') || 'creator_aarav';

    const integration = await CalendarIntegrationModel.getByCreator(creatorId);
    
    // Sanitize sensitive tokens before sending to client
    const sanitizedData = {
      id: integration.id,
      creatorId: integration.creatorId,
      provider: integration.provider,
      accountEmail: integration.accountEmail,
      isConnected: integration.isConnected,
      syncStatus: integration.syncStatus,
      lastSyncedAt: integration.lastSyncedAt,
      googleCalendarId: integration.googleCalendarId,
      autoGenerateMeet: integration.autoGenerateMeet,
      createdAt: integration.createdAt,
      updatedAt: integration.updatedAt
    };

    return NextResponse.json({
      success: true,
      data: sanitizedData
    });
  } catch (error: any) {
    console.error('Error fetching calendar integration:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch calendar integration' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { creatorId = 'creator_aarav', accountEmail, isConnected, syncStatus } = body;

    if (!accountEmail && isConnected) {
      return NextResponse.json(
        { success: false, error: 'Google Account Email is required to connect.' },
        { status: 400 }
      );
    }

    const updated = await CalendarIntegrationModel.save({
      creatorId,
      accountEmail: accountEmail || 'creator.aarav@gmail.com',
      isConnected: Boolean(isConnected),
      syncStatus: syncStatus || (isConnected ? 'synced' : 'disconnected')
    });

    const sanitizedData = {
      id: updated.id,
      creatorId: updated.creatorId,
      provider: updated.provider,
      accountEmail: updated.accountEmail,
      isConnected: updated.isConnected,
      syncStatus: updated.syncStatus,
      lastSyncedAt: updated.lastSyncedAt,
      googleCalendarId: updated.googleCalendarId,
      autoGenerateMeet: updated.autoGenerateMeet,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    };

    return NextResponse.json({
      success: true,
      message: isConnected ? 'Google Calendar connected successfully.' : 'Google Calendar disconnected.',
      data: sanitizedData
    });
  } catch (error: any) {
    console.error('Error updating calendar integration:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update calendar integration' },
      { status: 500 }
    );
  }
}
