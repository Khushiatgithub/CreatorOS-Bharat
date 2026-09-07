import { sendEmail, SendEmailResult } from './client';
import { buildWelcomeEmail, WelcomeEmailData } from './templates/welcomeEmail';
import { buildPaymentSuccessEmail, PaymentSuccessEmailData } from './templates/paymentSuccessEmail';
import { buildGSTInvoiceEmail, GSTInvoiceEmailData } from './templates/gstInvoiceEmail';
import { buildBookingConfirmationEmail, BookingConfirmationEmailData } from './templates/bookingConfirmationEmail';
import { buildCalendarInviteEmail, CalendarInviteEmailData } from './templates/calendarInviteEmail';
import { buildMembershipRenewalEmail, MembershipRenewalEmailData } from './templates/membershipRenewalEmail';
import { buildBookingCancellationEmail, BookingCancellationEmailData } from './templates/bookingCancellationEmail';

export * from './client';
export * from './templates/baseLayout';
export * from './templates/welcomeEmail';
export * from './templates/paymentSuccessEmail';
export * from './templates/gstInvoiceEmail';
export * from './templates/bookingConfirmationEmail';
export * from './templates/calendarInviteEmail';
export * from './templates/membershipRenewalEmail';
export * from './templates/bookingCancellationEmail';

export type NotificationEmailType =
  | 'welcome'
  | 'payment_success'
  | 'gst_invoice'
  | 'booking_confirmation'
  | 'calendar_invite'
  | 'membership_renewal'
  | 'booking_cancellation';

/**
 * 1. Send Welcome Email after signup
 */
export async function sendWelcomeEmail(
  to: string,
  data: WelcomeEmailData
): Promise<SendEmailResult> {
  const { subject, html, text } = buildWelcomeEmail(data);
  return sendEmail({ to, subject, html, text });
}

/**
 * 2. Send Payment Successful Email
 */
export async function sendPaymentSuccessEmail(
  to: string,
  data: PaymentSuccessEmailData
): Promise<SendEmailResult> {
  const { subject, html, text } = buildPaymentSuccessEmail(data);
  return sendEmail({ to, subject, html, text });
}

/**
 * 3. Send GST Invoice Email
 */
export async function sendGstInvoiceEmail(
  to: string,
  data: GSTInvoiceEmailData
): Promise<SendEmailResult> {
  const { subject, html, text } = buildGSTInvoiceEmail(data);
  return sendEmail({ to, subject, html, text });
}

/**
 * 4. Send Booking Confirmation Email
 */
export async function sendBookingConfirmationEmail(
  to: string,
  data: BookingConfirmationEmailData
): Promise<SendEmailResult> {
  const { subject, html, text } = buildBookingConfirmationEmail(data);
  return sendEmail({ to, subject, html, text });
}

/**
 * 5. Send Google Calendar Invite Confirmation Email
 */
export async function sendCalendarInviteEmail(
  to: string,
  data: CalendarInviteEmailData
): Promise<SendEmailResult> {
  const { subject, html, text } = buildCalendarInviteEmail(data);
  return sendEmail({ to, subject, html, text });
}

/**
 * 6. Send Membership Renewal Reminder Email
 */
export async function sendMembershipRenewalEmail(
  to: string,
  data: MembershipRenewalEmailData
): Promise<SendEmailResult> {
  const { subject, html, text } = buildMembershipRenewalEmail(data);
  return sendEmail({ to, subject, html, text });
}

/**
 * 7. Send Booking Cancellation Email
 */
export async function sendBookingCancellationEmail(
  to: string,
  data: BookingCancellationEmailData
): Promise<SendEmailResult> {
  const { subject, html, text } = buildBookingCancellationEmail(data);
  return sendEmail({ to, subject, html, text });
}

/**
 * Unified Email Dispatcher for any notification type
 */
export async function dispatchNotificationEmail(
  type: NotificationEmailType,
  to: string,
  data: any
): Promise<SendEmailResult> {
  switch (type) {
    case 'welcome':
      return sendWelcomeEmail(to, data);
    case 'payment_success':
      return sendPaymentSuccessEmail(to, data);
    case 'gst_invoice':
      return sendGstInvoiceEmail(to, data);
    case 'booking_confirmation':
      return sendBookingConfirmationEmail(to, data);
    case 'calendar_invite':
      return sendCalendarInviteEmail(to, data);
    case 'membership_renewal':
      return sendMembershipRenewalEmail(to, data);
    case 'booking_cancellation':
      return sendBookingCancellationEmail(to, data);
    default:
      return {
        success: false,
        error: `Unknown notification email type: ${type}`
      };
  }
}
