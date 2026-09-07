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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, username, phone, bio } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const user = await UserModel.create({
      name: name || 'Creator',
      username: username || email.split('@')[0],
      bio
    });

    // Send Welcome Email
    try {
      const { sendWelcomeEmail } = await import('@/lib/email');
      await sendWelcomeEmail(email, {
        userName: name || 'Creator',
        userEmail: email,
        creatorHandle: username || email.split('@')[0]
      });
    } catch (mailErr) {
      console.warn('Welcome email error:', mailErr);
    }

    return NextResponse.json({ success: true, user, message: 'User created and welcome email sent.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

