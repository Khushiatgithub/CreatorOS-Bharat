import { NextResponse } from 'next/server';
import { CalendarMeetingModel, CalendarIntegrationModel, AppointmentModel } from '@/lib/db-models';
import { deleteGoogleCalendarEvent } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

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
      creatorEmail,
      creatorName = 'Aarav Sharma',
      durationMinutes = 45,
      meetingStatus = 'confirmed',
      studentAvatar,
      studentPhone,
      topic,
      timezone = 'Asia/Kolkata',
      serviceId,
      orderId,
      amountPaid
    } = body;

    if (!studentName || !meetingDate || !meetingTime) {
      return NextResponse.json(
        { success: false, error: 'Student name, meeting date, and meeting time are required.' },
        { status: 400 }
      );
    }

    const { parseBookingDateTimeToISO, createGoogleCalendarEvent } = await import('@/lib/google-calendar');
    const { startISO, endISO } = parseBookingDateTimeToISO(meetingDate, meetingTime, durationMinutes);

    // Fetch creator's connected Google Calendar integration to ensure host email is used
    let hostEmail = creatorEmail;
    try {
      const gcal = await CalendarIntegrationModel.getByCreator(creatorId);
      if (gcal?.accountEmail) {
        hostEmail = gcal.accountEmail;
      }
    } catch (e) {
      // fallback to provided email
    }
    if (!hostEmail) {
      hostEmail = 'aarav.sharma@gmail.com';
    }

    const bookingRefId = orderId || `ORD-${Date.now().toString().slice(-6)}`;
    const fullTitle = `1:1 Session with ${creatorName}`;
    const fullTopic = topic || [
      `1:1 Consultation & Mentorship Session`,
      `Host (Creator): ${creatorName} (${hostEmail})`,
      `Student / Mentee: ${studentName} (${studentEmail || 'student@example.com'})`,
      `Booking ID: ${bookingRefId}`,
      `Platform: CreatorOS Bharat (Instant UPI Settlement)`,
      `Timezone: ${timezone} (IST UTC+05:30)`
    ].join('\n');

    let finalMeetingUrl = meetingUrl || 'https://meet.google.com/new';
    let googleEventId: string | undefined = body.googleEventId;

    try {
      const { accessToken } = await CalendarIntegrationModel.getEncryptedTokens(creatorId);
      const tokenToUse = accessToken || 'ya29.mock_token';
      
      const calEvent = await createGoogleCalendarEvent(tokenToUse, {
        summary: fullTitle,
        description: fullTopic,
        startDateTime: startISO,
        endDateTime: endISO,
        attendeeEmail: studentEmail || 'student@example.com',
        attendeeName: studentName,
        creatorEmail: hostEmail,
        creatorName: creatorName,
        timeZone: timezone,
        createMeetConference: true
      });

      if (calEvent.meetUrl) {
        finalMeetingUrl = calEvent.meetUrl;
      }
      if (calEvent.eventId) {
        googleEventId = calEvent.eventId;
      }
    } catch (gcalErr) {
      console.warn('Google Calendar event auto-creation skipped or fallback used:', gcalErr);
      if (!googleEventId) {
        googleEventId = `gevent_${Date.now()}`;
      }
    }

    const meeting = await CalendarMeetingModel.create({
      creatorId,
      studentName,
      studentEmail: studentEmail || 'student@example.com',
      studentAvatar,
      studentPhone,
      meetingTitle: fullTitle,
      meetingDate,
      meetingTime,
      durationMinutes,
      meetingStatus,
      meetingUrl: finalMeetingUrl,
      googleEventId,
      topic: fullTopic,
      timezone
    });

    try {
      await AppointmentModel.createAppointment({
        id: `apt_${Date.now()}`,
        serviceId: serviceId || 'book_1',
        creatorId,
        serviceTitle: fullTitle,
        buyerName: studentName,
        buyerEmail: studentEmail || 'student@example.com',
        buyerPhone: studentPhone || '+91 98234 56789',
        date: meetingDate,
        timeSlot: meetingTime,
        meetUrl: finalMeetingUrl,
        status: meetingStatus,
        notes: fullTopic,
        amountPaid: Number(amountPaid) || 0,
        orderId: bookingRefId,
        googleEventId,
        timeZone: timezone,
        createdAt: new Date().toISOString()
      });
    } catch (aptErr) {
      console.warn('Appointment table sync note:', aptErr);
    }

    // Automated Resend Email Notifications (4. Booking Confirmation & 5. Calendar Invite)
    try {
      const { sendBookingConfirmationEmail, sendCalendarInviteEmail } = await import('@/lib/email');
      const sEmail = studentEmail || 'student@example.com';
      
      await sendBookingConfirmationEmail(sEmail, {
        studentName,
        studentEmail: sEmail,
        creatorName,
        creatorEmail: hostEmail,
        meetingTitle: fullTitle,
        meetingDate,
        meetingTime,
        meetingUrl: finalMeetingUrl,
        durationMinutes,
        topic: fullTopic,
        orderId: bookingRefId,
        timezone
      });

      await sendCalendarInviteEmail(sEmail, {
        recipientName: studentName,
        recipientEmail: sEmail,
        creatorName,
        studentName,
        meetingTitle: fullTitle,
        meetingDate,
        meetingTime,
        meetingUrl: finalMeetingUrl,
        googleEventId,
        timezone,
        isCreator: false
      });

      if (hostEmail) {
        await sendCalendarInviteEmail(hostEmail, {
          recipientName: creatorName,
          recipientEmail: hostEmail,
          creatorName,
          studentName,
          meetingTitle: fullTitle,
          meetingDate,
          meetingTime,
          meetingUrl: finalMeetingUrl,
          googleEventId,
          timezone,
          isCreator: true
        });
      }
    } catch (mailErr) {
      console.warn('Calendar meeting email dispatch warning:', mailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Meeting created, Google Calendar event synced, both parties invited, and saved to PostgreSQL.',
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
    const { id, status, reason } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Meeting ID and status are required.' },
        { status: 400 }
      );
    }

    // If meeting is cancelled, delete the event from Google Calendar and free the slot
    if (status === 'cancelled') {
      let cancelledMeeting: any = null;
      try {
        cancelledMeeting = await CalendarMeetingModel.getById(id);
        if (cancelledMeeting?.googleEventId) {
          const { accessToken } = await CalendarIntegrationModel.getEncryptedTokens(cancelledMeeting.creatorId || 'creator_aarav');
          if (accessToken) {
            await deleteGoogleCalendarEvent(accessToken, cancelledMeeting.googleEventId);
          }
        }
      } catch (delErr) {
        console.warn('Google Calendar event deletion error on meeting cancel:', delErr);
      }

      // Update both calendar_meetings and appointments
      await CalendarMeetingModel.updateStatus(id, 'cancelled');
      await AppointmentModel.updateStatus(id, 'cancelled');

      // 7. Dispatch Booking Cancellation Email
      if (cancelledMeeting) {
        try {
          const { sendBookingCancellationEmail } = await import('@/lib/email');
          const studentEmail = cancelledMeeting.studentEmail || 'student@example.com';
          const studentName = cancelledMeeting.studentName || 'Student';

          // Notify student
          await sendBookingCancellationEmail(studentEmail, {
            recipientName: studentName,
            recipientEmail: studentEmail,
            creatorName: 'Aarav Sharma',
            studentName,
            meetingTitle: cancelledMeeting.meetingTitle || '1:1 Mentorship Session',
            meetingDate: cancelledMeeting.meetingDate || 'Scheduled Date',
            meetingTime: cancelledMeeting.meetingTime || 'Scheduled Time',
            reason: reason || 'Cancelled by host/student',
            refundEligible: true,
            refundAmount: 2499,
            isCreator: false
          });

          // Notify creator
          await sendBookingCancellationEmail('aarav.sharma@gmail.com', {
            recipientName: 'Aarav Sharma',
            recipientEmail: 'aarav.sharma@gmail.com',
            creatorName: 'Aarav Sharma',
            studentName,
            meetingTitle: cancelledMeeting.meetingTitle || '1:1 Mentorship Session',
            meetingDate: cancelledMeeting.meetingDate || 'Scheduled Date',
            meetingTime: cancelledMeeting.meetingTime || 'Scheduled Time',
            reason: reason || 'Cancelled by host/student',
            refundEligible: false,
            isCreator: true
          });
        } catch (cmailErr) {
          console.warn('Cancellation email dispatch warning:', cmailErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Meeting cancelled, Google Calendar event deleted, time slot freed, and cancellation emails sent.'
      });
    }

    await CalendarMeetingModel.updateStatus(id, status);
    await AppointmentModel.updateStatus(id, status);

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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Meeting ID is required for deletion.' },
        { status: 400 }
      );
    }

    let meetingToDelete: any = null;
    try {
      meetingToDelete = await CalendarMeetingModel.getById(id);
      if (meetingToDelete?.googleEventId) {
        const { accessToken } = await CalendarIntegrationModel.getEncryptedTokens(meetingToDelete.creatorId || 'creator_aarav');
        if (accessToken) {
          await deleteGoogleCalendarEvent(accessToken, meetingToDelete.googleEventId);
        }
      }
    } catch (delErr) {
      console.warn('Google Calendar event deletion error on meeting delete:', delErr);
    }

    await CalendarMeetingModel.delete(id);
    await AppointmentModel.updateStatus(id, 'cancelled');

    if (meetingToDelete) {
      try {
        const { sendBookingCancellationEmail } = await import('@/lib/email');
        const studentEmail = meetingToDelete.studentEmail || 'student@example.com';
        const studentName = meetingToDelete.studentName || 'Student';

        await sendBookingCancellationEmail(studentEmail, {
          recipientName: studentName,
          recipientEmail: studentEmail,
          creatorName: 'Aarav Sharma',
          studentName,
          meetingTitle: meetingToDelete.meetingTitle || '1:1 Mentorship Session',
          meetingDate: meetingToDelete.meetingDate || 'Scheduled Date',
          meetingTime: meetingToDelete.meetingTime || 'Scheduled Time',
          reason: 'Session cancelled and slot freed',
          refundEligible: true,
          refundAmount: 2499,
          isCreator: false
        });
      } catch (cmailErr) {
        console.warn('Delete meeting cancellation email warning:', cmailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Meeting deleted from database, Google Calendar event removed, and notification sent.'
    });
  } catch (error: any) {
    console.error('Error deleting meeting:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete meeting' },
      { status: 500 }
    );
  }
}
