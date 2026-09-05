import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionModel, SubscriptionPlanModel } from '@/lib/db-models';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscriptionId, newPlanId, newBillingCycle = 'monthly' } = body;

    if (!subscriptionId || !newPlanId) {
      return NextResponse.json(
        { success: false, error: 'subscriptionId and newPlanId are required' },
        { status: 400 }
      );
    }

    const newPlan = await SubscriptionPlanModel.getById(newPlanId);
    if (!newPlan) {
      return NextResponse.json(
        { success: false, error: 'Target subscription plan not found' },
        { status: 404 }
      );
    }

    const newAmount = newBillingCycle === 'yearly' ? newPlan.yearlyPrice : newPlan.monthlyPrice;

    await SubscriptionModel.updatePlan(
      subscriptionId,
      newPlan.id
    );

    return NextResponse.json({
      success: true,
      message: `Plan successfully updated to ${newPlan.name} (${newBillingCycle})`,
      planName: newPlan.name,
      amount: newAmount,
      billingCycle: newBillingCycle
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update subscription plan' },
      { status: 500 }
    );
  }
}
