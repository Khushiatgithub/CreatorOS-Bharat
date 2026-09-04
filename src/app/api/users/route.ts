import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '@/lib/db-models';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (username) {
      const user = await UserModel.getByUsername(username);
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, user });
    }

    const users = await UserModel.getAll();
    return NextResponse.json({ success: true, users });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
