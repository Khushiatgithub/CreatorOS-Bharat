import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionModel, SubscriptionPaymentModel, SubscriptionPlanModel } from '@/lib/db-models';
import { verifyRazorpaySubscriptionSignature } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
      planId,
      creatorId = 'creator_aarav',
      billingCycle = 'monthly',
      userName,
      userEmail,
      userPhone = '',
      userId = `user_${Date.now()}`
    } = body;

    if (!razorpay_payment_id || !razorpay_subscription_id) {
      return NextResponse.json(
        { success: false, error: 'Missing required Razorpay payment parameters' },
        { status: 400 }
      );
    }

    // In production with real Razorpay credentials, verify signature
    if (process.env.RAZORPAY_KEY_SECRET && razorpay_signature) {
      const isValid = verifyRazorpaySubscriptionSignature(
        razorpay_subscription_id,
        razorpay_payment_id,
        razorpay_signature
      );
      if (!isValid) {
        return NextResponse.json(
          { success: false, error: 'Invalid Razorpay payment signature' },
          { status: 400 }
        );
      }
    }

    const plan = await SubscriptionPlanModel.getById(planId);
    const amount = billingCycle === 'yearly' ? plan?.yearlyPrice || 7999 : plan?.monthlyPrice || 799;
    const planName = plan?.name || 'VIP Subscription';

    const now = new Date();
    const currentStart = now.toISOString().split('T')[0];
    const daysToAdd = billingCycle === 'yearly' ? 365 : 30;
    const endDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    const currentEnd = endDate.toISOString().split('T')[0];

    // Create Subscription record
    const subscription = await SubscriptionModel.create({
      creatorId,
      planId: planId || 'plan_vip_pro',
      planName,
      planType: plan?.type || 'paid',
      userId,
      userName,
      userEmail,
      userPhone,
      billingCycle,
      amount,
      status: 'active',
      razorpaySubscriptionId: razorpay_subscription_id,
      razorpayPaymentId: razorpay_payment_id,
      currentPeriodStart: currentStart,
      currentPeriodEnd: currentEnd,
      cancelAtPeriodEnd: false
    });

    // Create Subscription Payment record & GST Invoice reference
    const invoiceNumber = `INV-SUB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const payment = await SubscriptionPaymentModel.create({
      subscriptionId: subscription.id,
      creatorId,
      planName,
      subscriberName: userName,
      subscriberEmail: userEmail,
      amount,
      currency: 'INR',
      status: 'paid',
      paymentMethod: 'Razorpay Autopay',
      razorpayPaymentId: razorpay_payment_id,
      razorpayInvoiceId: `inv_${razorpay_payment_id.slice(-8)}`,
      invoiceNumber,
      billingCycle,
      createdAt: new Date().toLocaleString('en-IN')
    });

    return NextResponse.json({
      success: true,
      subscription,
      payment
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify subscription' },
      { status: 500 }
    );
  }
}
