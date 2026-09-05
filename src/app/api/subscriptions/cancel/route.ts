import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionModel } from '@/lib/db-models';
import { cancelRazorpaySubscriptionServer } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscriptionId, immediate = false } = body;

    if (!subscriptionId) {
      return NextResponse.json(
        { success: false, error: 'subscriptionId is required' },
        { status: 400 }
      );
    }

    // Cancel on Razorpay if subscription ID starts with sub_
    await cancelRazorpaySubscriptionServer(subscriptionId, !immediate);

    // Cancel in Database
    await SubscriptionModel.cancel(subscriptionId, immediate);

    return NextResponse.json({
      success: true,
      message: immediate
        ? 'Subscription cancelled immediately'
        : 'Subscription will cancel at the end of the current billing period',
      cancelAtPeriodEnd: !immediate
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
