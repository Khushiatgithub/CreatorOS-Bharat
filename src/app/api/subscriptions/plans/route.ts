import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionPlanModel } from '@/lib/db-models';
import { createRazorpaySubscriptionPlanServer } from '@/lib/razorpay';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get('creatorId') || 'creator_aarav';

    const plans = await SubscriptionPlanModel.getAll(creatorId);
    return NextResponse.json({ success: true, plans });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch subscription plans' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      creatorId = 'creator_aarav',
      name,
      slug,
      tagline,
      description,
      coverUrl,
      type = 'paid',
      monthlyPrice = 0,
      yearlyPrice = 0,
      benefits = [],
      isPopular = false,
      isActive = true,
      badgeText,
      badgeColor,
      inviteCode
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    let razorpayPlanIdMonthly: string | undefined;
    let razorpayPlanIdYearly: string | undefined;

    // Create server plans if paid
    if (type === 'paid') {
      if (monthlyPrice > 0) {
        const rzpMonthly = await createRazorpaySubscriptionPlanServer({
          name: `${name} (Monthly)`,
          amount: monthlyPrice,
          period: 'monthly',
          description: tagline || description
        });
        razorpayPlanIdMonthly = rzpMonthly.id;
      }

      if (yearlyPrice > 0) {
        const rzpYearly = await createRazorpaySubscriptionPlanServer({
          name: `${name} (Yearly)`,
          amount: yearlyPrice,
          period: 'yearly',
          description: tagline || description
        });
        razorpayPlanIdYearly = rzpYearly.id;
      }
    }

    const newPlan = await SubscriptionPlanModel.create({
      creatorId,
      name,
      slug,
      tagline: tagline || '',
      description: description || '',
      coverUrl,
      type,
      monthlyPrice,
      yearlyPrice,
      benefits,
      isPopular,
      isActive,
      razorpayPlanIdMonthly,
      razorpayPlanIdYearly,
      badgeText,
      badgeColor,
      inviteCode
    });

    return NextResponse.json({ success: true, plan: newPlan });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create subscription plan' },
      { status: 500 }
    );
  }
}
