import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionPlanModel, SubscriptionModel } from '@/lib/db-models';
import { createRazorpaySubscriptionServer } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      planId,
      creatorId = 'creator_aarav',
      billingCycle = 'monthly',
      userName,
      userEmail,
      userPhone,
      userId = `user_${Date.now()}`
    } = body;

    if (!planId || !userEmail || !userName) {
      return NextResponse.json(
        { success: false, error: 'planId, userEmail, and userName are required' },
        { status: 400 }
      );
    }

    const plan = await SubscriptionPlanModel.getById(planId);
    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Subscription plan not found' },
        { status: 404 }
      );
    }

    const amount = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

    // Handle free plans immediately
    if (plan.type === 'free' || amount === 0) {
      const now = new Date();
      const currentStart = now.toISOString().split('T')[0];
      const endDate = new Date(now.setFullYear(now.getFullYear() + 1));
      const currentEnd = endDate.toISOString().split('T')[0];

      const sub = await SubscriptionModel.create({
        creatorId,
        planId: plan.id,
        planName: plan.name,
        planType: 'free',
        userId,
        userName,
        userEmail,
        userPhone: userPhone || '',
        billingCycle: 'monthly',
        amount: 0,
        status: 'active',
        currentPeriodStart: currentStart,
        currentPeriodEnd: currentEnd,
        cancelAtPeriodEnd: false
      });

      return NextResponse.json({
        success: true,
        isFree: true,
        subscription: sub
      });
    }

    // Razorpay Plan selection
    const razorpayPlanId =
      billingCycle === 'yearly'
        ? plan.razorpayPlanIdYearly || `plan_yearly_${plan.id}`
        : plan.razorpayPlanIdMonthly || `plan_monthly_${plan.id}`;

    // Create server subscription on Razorpay
    const rzpSub = await createRazorpaySubscriptionServer({
      planId: razorpayPlanId,
      totalCount: billingCycle === 'yearly' ? 10 : 120,
      customerNotify: true,
      notes: {
        creatorId,
        planId: plan.id,
        planName: plan.name,
        userEmail,
        userName,
        billingCycle
      }
    });

    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_51NgQ1CreatorOS';

    return NextResponse.json({
      success: true,
      isFree: false,
      subscriptionId: rzpSub.id,
      amount,
      currency: 'INR',
      key_id,
      plan: {
        id: plan.id,
        name: plan.name,
        amount,
        billingCycle
      },
      customer: {
        name: userName,
        email: userEmail,
        phone: userPhone
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
