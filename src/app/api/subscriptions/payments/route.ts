import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionPaymentModel } from '@/lib/db-models';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get('creatorId') || 'creator_aarav';

    const payments = await SubscriptionPaymentModel.getByCreator(creatorId);
    return NextResponse.json({ success: true, payments });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch subscription payments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      subscriptionId,
      subscription_id,
      amount,
      paymentStatus,
      payment_status = 'success',
      paymentMethod,
      payment_method = 'UPI',
      transactionId,
      transaction_id,
      creatorId = 'creator_aarav',
      planName,
      subscriberName,
      subscriberEmail,
      billingCycle = 'monthly'
    } = body;

    const actualSubId = subscriptionId || subscription_id;
    const actualTxId = transactionId || transaction_id || `tx_${Date.now()}`;
    const actualStatus = paymentStatus || payment_status;
    const actualMethod = paymentMethod || payment_method;

    if (!actualSubId || amount === undefined) {
      return NextResponse.json(
        { success: false, error: 'subscription_id and amount are required' },
        { status: 400 }
      );
    }

    const newPayment = await SubscriptionPaymentModel.create({
      subscriptionId: actualSubId,
      amount: Number(amount),
      paymentStatus: actualStatus,
      paymentMethod: actualMethod,
      transactionId: actualTxId,
      creatorId,
      planName: planName || 'Membership Plan',
      subscriberName: subscriberName || 'Subscriber',
      subscriberEmail: subscriberEmail || 'subscriber@example.com',
      billingCycle
    });

    return NextResponse.json({ success: true, payment: newPayment });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to record subscription payment' },
      { status: 500 }
    );
  }
}
