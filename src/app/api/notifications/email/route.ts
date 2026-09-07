import { NextRequest, NextResponse } from 'next/server';
import { dispatchNotificationEmail, NotificationEmailType } from '@/lib/email';

export const dynamic = 'force-dynamic';

const VALID_TYPES: NotificationEmailType[] = [
  'welcome',
  'payment_success',
  'gst_invoice',
  'booking_confirmation',
  'calendar_invite',
  'membership_renewal',
  'booking_cancellation'
];

export async function GET() {
  return NextResponse.json({
    success: true,
    service: 'CreatorOS Bharat Resend Email Notifications Engine',
    provider: 'Resend',
    availableTemplates: [
      {
        type: 'welcome',
        description: 'Sent to new creators or buyers upon signup and onboarding',
        requiredFields: ['userName', 'userEmail']
      },
      {
        type: 'payment_success',
        description: 'Sent to buyers after verified Razorpay/UPI payment',
        requiredFields: ['buyerName', 'buyerEmail', 'orderNumber', 'itemTitle', 'amount']
      },
      {
        type: 'gst_invoice',
        description: 'Official SAC 998439 GST Tax Invoice sent to buyer',
        requiredFields: ['buyerName', 'buyerEmail', 'invoiceNumber', 'itemTitle', 'taxableAmount', 'totalAmount']
      },
      {
        type: 'booking_confirmation',
        description: 'Confirmed 1:1 mentorship booking with Google Meet video link',
        requiredFields: ['studentName', 'studentEmail', 'meetingTitle', 'meetingDate', 'meetingTime']
      },
      {
        type: 'calendar_invite',
        description: 'Google Calendar event synchronization notification with Add to Calendar CTA',
        requiredFields: ['recipientName', 'recipientEmail', 'meetingTitle', 'meetingDate', 'meetingTime']
      },
      {
        type: 'membership_renewal',
        description: 'Recurring subscription renewal notice via UPI Autopay / e-Mandate',
        requiredFields: ['subscriberName', 'subscriberEmail', 'planName', 'amount', 'billingCycle', 'renewalDate']
      },
      {
        type: 'booking_cancellation',
        description: '1:1 mentorship session cancellation notice and refund status',
        requiredFields: ['recipientName', 'recipientEmail', 'meetingTitle', 'meetingDate', 'meetingTime']
      }
    ]
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, to, data } = body;

    if (!type || !to) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters: "type" and "to" (recipient email) are required.'
        },
        { status: 400 }
      );
    }

    if (!VALID_TYPES.includes(type as NotificationEmailType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid email type "${type}". Allowed types: ${VALID_TYPES.join(', ')}`
        },
        { status: 400 }
      );
    }

    const emailData = data || {};
    const result = await dispatchNotificationEmail(type as NotificationEmailType, to, emailData);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to dispatch email notification'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Email "${type}" successfully dispatched to ${to}`,
      id: result.id,
      simulated: result.simulated ?? false,
      type,
      recipient: to
    });
  } catch (error: any) {
    console.error('API /api/notifications/email error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
