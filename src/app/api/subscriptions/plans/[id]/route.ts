import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionPlanModel } from '@/lib/db-models';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const plan = await SubscriptionPlanModel.getById(params.id);
    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Subscription plan not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, plan });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch plan' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      billing_cycle,
      billingCycle,
      cover_image,
      coverImage,
      coverUrl,
      benefits,
      is_popular,
      isPopular,
      monthlyPrice,
      yearlyPrice,
      type
    } = body;

    const updated = await SubscriptionPlanModel.update(params.id, {
      name,
      description,
      price: price !== undefined ? price : (monthlyPrice || yearlyPrice),
      billingCycle: billing_cycle || billingCycle,
      coverImage: cover_image || coverImage || coverUrl,
      benefits,
      isPopular: is_popular !== undefined ? is_popular : isPopular,
      monthlyPrice,
      yearlyPrice,
      type
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Subscription plan not found or update failed' },
        { status: 404 }
      );
    }

    const plan = await SubscriptionPlanModel.getById(params.id);
    return NextResponse.json({ success: true, plan });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update plan' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const deleted = await SubscriptionPlanModel.delete(params.id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Subscription plan not found or delete failed' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete plan' },
      { status: 500 }
    );
  }
}
