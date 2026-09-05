import { NextResponse } from 'next/server';
import { CalendarAvailabilityModel } from '@/lib/db-models';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const creatorId = searchParams.get('creatorId') || 'creator_aarav';

    const result = await CalendarAvailabilityModel.getByCreator(creatorId);
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('Error fetching calendar availability:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch calendar availability' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { creatorId = 'creator_aarav', availability, bufferMinutes = 15 } = body;

    if (!Array.isArray(availability)) {
      return NextResponse.json(
        { success: false, error: 'Availability list is required.' },
        { status: 400 }
      );
    }

    await CalendarAvailabilityModel.save(creatorId, availability, bufferMinutes);

    return NextResponse.json({
      success: true,
      message: 'Weekly availability and buffer saved successfully.',
      data: {
        availability,
        bufferMinutes
      }
    });
  } catch (error: any) {
    console.error('Error saving calendar availability:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save calendar availability' },
      { status: 500 }
    );
  }
}
