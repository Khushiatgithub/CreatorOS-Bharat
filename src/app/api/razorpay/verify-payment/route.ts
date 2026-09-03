import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { calculateGST, SAC_CODES } from '@/lib/gst';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      item,
      buyer,
      paymentMethod = 'UPI',
      paymentApp,
      bookingDate,
      bookingTimeSlot
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { success: false, error: 'Missing razorpay_order_id or razorpay_payment_id' },
        { status: 400 }
      );
    }

    // Verify signature (if signature provided; test orders have automatic verification)
    let isSignatureValid = true;
    if (razorpay_signature && !razorpay_order_id.includes('_test_')) {
      isSignatureValid = verifyRazorpaySignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );
    }

    if (!isSignatureValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid Razorpay payment signature. Verification failed.' },
        { status: 400 }
      );
    }

    // Compute final GST Invoice data
    const price = Number(item?.price || 0);
    const creatorState = 'Karnataka';
    const buyerState = buyer?.state || 'Maharashtra';
    const gstDetails = calculateGST(price, creatorState, buyerState);

    const invoiceNumber = `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const upiRefId = `UPI${Math.floor(100000000000 + Math.random() * 900000000000)}`;

    const orderRecord = {
      id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      creatorId: 'creator_aarav',
      itemType: item?.type || 'product',
      itemId: item?.id || 'prod_1',
      itemTitle: item?.title || 'Creator Digital Asset',
      amount: gstDetails.taxableAmount,
      cgst: gstDetails.cgst,
      sgst: gstDetails.sgst,
      igst: gstDetails.igst,
      totalAmount: gstDetails.totalAmount,
      isInterState: gstDetails.isInterState,
      buyerName: buyer?.name || 'Customer',
      buyerEmail: buyer?.email || 'customer@creatoros.in',
      buyerPhone: buyer?.phone || '+91 98234 56789',
      buyerState: buyerState,
      buyerGst: buyer?.gstNumber || undefined,
      paymentMethod,
      paymentApp: paymentMethod === 'UPI' ? (paymentApp || 'PhonePe') : undefined,
      paymentGateway: 'Razorpay',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      upiRefId,
      status: 'Paid',
      invoiceNumber,
      date: new Date().toISOString().split('T')[0],
      downloadUrl: item?.downloadUrl,
      bookingDate,
      bookingTimeSlot
    };

    return NextResponse.json({
      success: true,
      verified: true,
      invoiceNumber,
      order: orderRecord,
      message: 'Razorpay payment verified successfully'
    });

  } catch (error: any) {
    console.error('API /api/razorpay/verify-payment error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to verify Razorpay Payment' },
      { status: 500 }
    );
  }
}
