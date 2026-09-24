import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createSession } from '@/lib/auth/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const session = await verifyCredentials(username, password);

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid username or password. Please verify your luxury access credentials.' },
        { status: 401 }
      );
    }

    await createSession(session);

    return NextResponse.json({
      success: true,
      user: {
        id: session.id,
        username: session.username,
        name: session.name,
        role: session.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred' },
      { status: 500 }
    );
  }
}
