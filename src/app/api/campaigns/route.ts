import { NextRequest, NextResponse } from 'next/server';
import { CampaignModel } from '@/lib/db-models';

export async function GET() {
  try {
    const campaigns = await CampaignModel.getBriefs();
    return NextResponse.json({ success: true, count: campaigns.length, campaigns });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
