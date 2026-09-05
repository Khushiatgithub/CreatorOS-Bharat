import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionModel } from '@/lib/db-models';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const subscription = await SubscriptionModel.getById(params.id);
    if (!subscription) {
      return NextResponse.json(
        { success: false, error: 'Subscription not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, subscription });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const body = await request.json();
    const { status, planId, plan_id, immediate } = body;

    let updated = false;

    if (planId || plan_id) {
      updated = await SubscriptionModel.updatePlan(params.id, planId || plan_id);
    }

    if (status) {
      if (status === 'cancelled') {
        updated = await SubscriptionModel.cancel(params.id, !!immediate);
      } else {
        // Can add other status updates
        updated = true;
      }
    }

    const subscription = await SubscriptionModel.getById(params.id);
    return NextResponse.json({ success: true, subscription });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update subscription' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const deleted = await SubscriptionModel.delete(params.id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Subscription not found or delete failed' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: 'Subscription deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete subscription' },
      { status: 500 }
    );
  }
}
