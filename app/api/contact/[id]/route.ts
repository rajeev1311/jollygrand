import { NextRequest, NextResponse } from 'next/server';
import { markContactMessageRead } from '@/lib/db/store';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await markContactMessageRead(id);

    if (!success) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update message status' },
      { status: 500 }
    );
  }
}
