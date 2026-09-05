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
      coverImage,
      type = 'paid',
      price,
      billingCycle = 'monthly',
      billing_cycle,
      monthlyPrice = 0,
      yearlyPrice = 0,
      benefits = [],
      isPopular = false,
      is_popular,
      isActive = true,
      communityAccess = true,
      coursesAccess = false,
      liveSessionsAccess = false,
      badgeText,
      badgeColor,
      inviteCode
    } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Plan name is required' },
        { status: 400 }
      );
    }

    const planSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const finalBillingCycle = billing_cycle || billingCycle || 'monthly';
    const finalPopular = is_popular !== undefined ? is_popular : isPopular;
    const finalCover = coverImage || coverUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
    const finalPrice = price !== undefined ? Number(price) : (finalBillingCycle === 'yearly' ? (yearlyPrice || monthlyPrice * 10) : (monthlyPrice || 799));

    let razorpayPlanIdMonthly: string | undefined;
    let razorpayPlanIdYearly: string | undefined;

    // Create server plans if paid
    if (type === 'paid') {
      try {
        if (finalBillingCycle === 'monthly' || monthlyPrice > 0) {
          const rzpMonthly = await createRazorpaySubscriptionPlanServer({
            name: `${name} (Monthly)`,
            amount: finalBillingCycle === 'monthly' ? finalPrice : (monthlyPrice || Math.round(finalPrice / 10)),
            period: 'monthly',
            description: tagline || description
          });
          razorpayPlanIdMonthly = rzpMonthly.id;
        }

        if (finalBillingCycle === 'yearly' || yearlyPrice > 0) {
          const rzpYearly = await createRazorpaySubscriptionPlanServer({
            name: `${name} (Yearly)`,
            amount: finalBillingCycle === 'yearly' ? finalPrice : (yearlyPrice || finalPrice * 10),
            period: 'yearly',
            description: tagline || description
          });
          razorpayPlanIdYearly = rzpYearly.id;
        }
      } catch (err) {
        console.warn('Razorpay plan creation fallback:', err);
      }
    }

    const newPlan = await SubscriptionPlanModel.create({
      creatorId,
      name,
      slug: planSlug,
      tagline: tagline || description || '',
      description: description || '',
      coverUrl: finalCover,
      coverImage: finalCover,
      type,
      price: finalPrice,
      billingCycle: finalBillingCycle,
      monthlyPrice: finalBillingCycle === 'monthly' ? finalPrice : (monthlyPrice || Math.round(finalPrice / 10)),
      yearlyPrice: finalBillingCycle === 'yearly' ? finalPrice : (yearlyPrice || finalPrice * 10),
      benefits,
      isPopular: finalPopular,
      isActive,
      communityAccess,
      coursesAccess,
      liveSessionsAccess,
      razorpayPlanIdMonthly,
      razorpayPlanIdYearly,
      badgeText: finalPopular ? (badgeText || 'Most Popular') : undefined,
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
