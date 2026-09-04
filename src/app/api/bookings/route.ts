import { NextRequest, NextResponse } from 'next/server';
import { BookingModel } from '@/lib/db-models';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || undefined;

    const services = await BookingModel.getServices(userId);
    return NextResponse.json({ success: true, count: services.length, services });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
