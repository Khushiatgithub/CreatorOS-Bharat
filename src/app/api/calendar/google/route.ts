import { NextResponse } from 'next/server';
import { CalendarIntegrationModel } from '@/lib/db-models';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const creatorId = searchParams.get('creatorId') || 'creator_aarav';

    const integration = await CalendarIntegrationModel.getByCreator(creatorId);
    return NextResponse.json({
      success: true,
      data: integration
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

    return NextResponse.json({
      success: true,
      message: isConnected ? 'Google Calendar connected successfully.' : 'Google Calendar disconnected.',
      data: updated
    });
  } catch (error: any) {
    console.error('Error updating calendar integration:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update calendar integration' },
      { status: 500 }
    );
  }
}
