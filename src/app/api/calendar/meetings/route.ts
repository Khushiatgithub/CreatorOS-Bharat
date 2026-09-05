import { NextResponse } from 'next/server';
import { CalendarMeetingModel, CalendarIntegrationModel } from '@/lib/db-models';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const creatorId = searchParams.get('creatorId') || 'creator_aarav';

    const meetings = await CalendarMeetingModel.getByCreator(creatorId);
    return NextResponse.json({
      success: true,
      data: meetings
    });
  } catch (error: any) {
    console.error('Error fetching calendar meetings:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch calendar meetings' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      studentName,
      studentEmail,
      meetingTitle,
      meetingDate,
      meetingTime,
      meetingUrl,
      creatorId = 'creator_aarav',
      durationMinutes = 45,
      meetingStatus = 'upcoming',
      studentAvatar,
      studentPhone,
      topic
    } = body;

    if (!studentName || !meetingDate || !meetingTime) {
      return NextResponse.json(
        { success: false, error: 'Student name, meeting date, and meeting time are required.' },
        { status: 400 }
      );
    }

    // Check if creator has connected Google Calendar with tokens
    let finalMeetingUrl = meetingUrl || 'https://meet.google.com/new';
    let googleEventId: string | undefined;

    try {
      const { accessToken } = await CalendarIntegrationModel.getEncryptedTokens(creatorId);
      if (accessToken) {
        const { createGoogleCalendarEvent } = await import('@/lib/google-calendar');
        const now = new Date();
        const startISO = new Date(now.getTime() + 86400000).toISOString();
        const endISO = new Date(now.getTime() + 86400000 + durationMinutes * 60000).toISOString();

        const calEvent = await createGoogleCalendarEvent(accessToken, {
          summary: meetingTitle || `1:1 Session with ${studentName}`,
          description: topic || 'CreatorOS Bharat 1:1 Mentorship Meeting',
          startDateTime: startISO,
          endDateTime: endISO,
          attendeeEmail: studentEmail || 'student@example.com',
          attendeeName: studentName,
          createMeetConference: true
        });

        if (calEvent.meetUrl) {
          finalMeetingUrl = calEvent.meetUrl;
        }
        googleEventId = calEvent.eventId;
      }
    } catch (gcalErr) {
      console.warn('Google Calendar event auto-creation skipped:', gcalErr);
    }

    const meeting = await CalendarMeetingModel.create({
      creatorId,
      studentName,
      studentEmail: studentEmail || 'student@example.com',
      studentAvatar,
      studentPhone,
      meetingTitle: meetingTitle || '1:1 Creator Mentorship Session',
      meetingDate,
      meetingTime,
      durationMinutes,
      meetingStatus,
      meetingUrl: finalMeetingUrl,
      googleEventId,
      topic
    });

    return NextResponse.json({
      success: true,
      message: 'Meeting created successfully.',
      data: meeting
    });
  } catch (error: any) {
    console.error('Error creating meeting:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create meeting' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Meeting ID and status are required.' },
        { status: 400 }
      );
    }

    await CalendarMeetingModel.updateStatus(id, status);

    return NextResponse.json({
      success: true,
      message: `Meeting status updated to ${status}.`
    });
  } catch (error: any) {
    console.error('Error updating meeting status:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update meeting status' },
      { status: 500 }
    );
  }
}
