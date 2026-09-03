import Razorpay from 'razorpay';
import crypto from 'crypto';

/**
 * Server-side Razorpay Client Instance
 */
export function getRazorpayServerClient() {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_51NgQ1CreatorOS';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'Secret_Key_For_Razorpay_Production_Verification';

  return new Razorpay({
    key_id,
    key_secret,
  });
}

/**
 * Verify HMAC SHA256 Signature for Razorpay Payments
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  try {
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'Secret_Key_For_Razorpay_Production_Verification';
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body)
      .digest('hex');

    return expectedSignature === signature;
  } catch (error) {
    console.error('Error verifying Razorpay signature:', error);
    return false;
  }
}

/**
 * Client-side script loader for Razorpay Checkout JS SDK
 */
export function loadRazorpayClientSDK(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    // Check if script already loaded
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay Checkout SDK');
      resolve(false);
    };

    document.body.appendChild(script);
  });
}
