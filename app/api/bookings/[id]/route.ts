import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, updateBookingStatus, deleteBooking } from '@/lib/db/store';
import { BookingStatus } from '@/types/hotel';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await getBookingById(id);

    if (!booking) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve reservation details' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses: BookingStatus[] = [
      'PENDING',
      'CONFIRMED',
      'CHECKED_IN',
      'CHECKED_OUT',
      'CANCELLED',
    ];

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Valid values: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const updated = await updateBookingStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Reservation status updated to ${status}`,
      booking: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update reservation' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteBooking(id);

    if (!success) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Reservation record deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete reservation record' },
      { status: 500 }
    );
  }
}
