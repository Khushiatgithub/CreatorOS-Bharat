import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionModel } from '@/lib/db-models';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get('creatorId') || 'creator_aarav';

    const subscriptions = await SubscriptionModel.getByCreator(creatorId);
    return NextResponse.json({ success: true, subscriptions });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      user_id,
      planId,
      plan_id,
      status = 'active',
      startDate,
      start_date,
      renewalDate,
      renewal_date,
      razorpaySubscriptionId,
      razorpay_subscription_id,
      billingCycle = 'monthly',
      amount = 0,
      userName,
      userEmail,
      userPhone
    } = body;

    const actualPlanId = planId || plan_id;
    const actualUserId = userId || user_id || `user_${Date.now()}`;

    if (!actualPlanId) {
      return NextResponse.json(
        { success: false, error: 'plan_id is required' },
        { status: 400 }
      );
    }

    const newSub = await SubscriptionModel.create({
      userId: actualUserId,
      planId: actualPlanId,
      creatorId: body.creatorId || 'creator_aarav',
      planName: body.planName || 'Membership Plan',
      planType: body.planType || (amount === 0 ? 'free' : 'paid'),
      userName: userName || 'Subscriber User',
      userEmail: userEmail || 'subscriber@example.com',
      userPhone: userPhone || '+91 98000 00000',
      billingCycle,
      amount,
      status,
      startDate: startDate || start_date,
      renewalDate: renewalDate || renewal_date,
      razorpaySubscriptionId: razorpaySubscriptionId || razorpay_subscription_id,
      currentPeriodStart: (startDate || start_date || new Date().toISOString()).split('T')[0],
      currentPeriodEnd: (renewalDate || renewal_date || new Date(Date.now() + 30 * 86400000).toISOString()).split('T')[0],
      cancelAtPeriodEnd: false
    });

    return NextResponse.json({ success: true, subscription: newSub });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
