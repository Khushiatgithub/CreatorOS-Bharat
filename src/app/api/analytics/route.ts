import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsModel } from '@/lib/db-models';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'creator_aarav';

    const analytics = await AnalyticsModel.getSummary(userId);
    return NextResponse.json({ success: true, analytics });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
