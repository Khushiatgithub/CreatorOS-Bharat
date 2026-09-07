import { Resend } from 'resend';

// Resend client configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

// Default verified sender in CreatorOS domain, fallback to Resend testing domain
export const DEFAULT_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'CreatorOS Bharat <notifications@creatoros.in>';
export const FALLBACK_FROM_EMAIL = 'CreatorOS Bharat <onboarding@resend.dev>';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content?: Buffer | string;
    path?: string;
  }>;
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  simulated?: boolean;
  error?: string;
}

/**
 * Initializes and returns the Resend client if configured
 */
export function getResendClient(): Resend | null {
  if (!RESEND_API_KEY || RESEND_API_KEY.includes('placeholder') || RESEND_API_KEY.startsWith('re_mock')) {
    return null;
  }
  try {
    return new Resend(RESEND_API_KEY);
  } catch (err) {
    console.warn('[Resend Client] Failed to initialize Resend:', err);
    return null;
  }
}

/**
 * Enterprise Email Sender with Resend SDK and intelligent dev/fallback simulator
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const { to, subject, html, text, from = DEFAULT_FROM_EMAIL, replyTo, attachments } = options;
  const resend = getResendClient();

  // If live Resend API key is present, send live email
  if (resend) {
    try {
      const response = await resend.emails.send({
        from: from.includes('@creatoros.in') && !process.env.RESEND_DOMAIN_VERIFIED ? FALLBACK_FROM_EMAIL : from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text: text || subject,
        replyTo: replyTo || 'support@creatoros.in',
        attachments: attachments as any
      });

      if (response.error) {
        console.error('[Resend Error]', response.error);
        return {
          success: false,
          error: response.error.message || 'Resend failed to deliver email'
        };
      }

      console.log(`[Resend Success] Email "${subject}" sent to ${Array.isArray(to) ? to.join(', ') : to} (ID: ${response.data?.id})`);
      return {
        success: true,
        id: response.data?.id
      };
    } catch (error: any) {
      console.error('[Resend Exception]', error);
      return {
        success: false,
        error: error.message || 'Error occurred while sending email via Resend'
      };
    }
  }

  // Simulator mode for local development, staging, or before live API keys are provided
  const mockId = `resend_sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  console.log(`\n================== [RESEND EMAIL SIMULATION] ==================`);
  console.log(`To: ${Array.isArray(to) ? to.join(', ') : to}`);
  console.log(`From: ${from}`);
  console.log(`Subject: ${subject}`);
  console.log(`Simulation ID: ${mockId}`);
  console.log(`===============================================================\n`);

  return {
    success: true,
    id: mockId,
    simulated: true
  };
}
