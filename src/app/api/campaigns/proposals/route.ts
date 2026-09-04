import { NextRequest, NextResponse } from 'next/server';
import { CampaignModel } from '@/lib/db-models';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const proposal = await CampaignModel.createProposal(body);
    return NextResponse.json({ success: true, proposal }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
