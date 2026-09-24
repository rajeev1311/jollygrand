import { NextRequest, NextResponse } from 'next/server';
import { getContactMessages, createContactMessage } from '@/lib/db/store';

export async function GET() {
  try {
    const messages = await getContactMessages();
    return NextResponse.json({ success: true, count: messages.length, messages });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve enquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide your name, email, and message' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const newMsg = await createContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      subject: subject ? subject.trim() : 'General Hospitality Inquiry',
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out to Jolly Grand. Our Chief Concierge will respond promptly.',
        data: newMsg,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please call our 24/7 reception desk directly.' },
      { status: 500 }
    );
  }
}
