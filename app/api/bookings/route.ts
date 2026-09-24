import { NextRequest, NextResponse } from 'next/server';
import { getBookings, createBooking, getRoomById } from '@/lib/db/store';
import { calculateNights } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();

    let bookings = await getBookings();

    if (status && status !== 'ALL') {
      bookings = bookings.filter((b) => b.status === status);
    }

    if (search) {
      bookings = bookings.filter(
        (b) =>
          b.bookingReference.toLowerCase().includes(search) ||
          b.guest?.firstName.toLowerCase().includes(search) ||
          b.guest?.lastName.toLowerCase().includes(search) ||
          b.guest?.email.toLowerCase().includes(search) ||
          b.room?.name.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guest, roomId, checkIn, checkOut, guests, specialRequests } = body;

    if (!guest || !guest.firstName || !guest.lastName || !guest.email || !guest.phone) {
      return NextResponse.json(
        { error: 'Complete guest information is required (First Name, Last Name, Email, Phone)' },
        { status: 400 }
      );
    }

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Room selection and valid stay dates are required' },
        { status: 400 }
      );
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid dates provided for reservation' },
        { status: 400 }
      );
    }

    if (startDate >= endDate) {
      return NextResponse.json(
        { error: 'Check-out date must be strictly after check-in date' },
        { status: 400 }
      );
    }

    const room = await getRoomById(roomId);
    if (!room) {
      return NextResponse.json({ error: 'Selected room does not exist' }, { status: 404 });
    }

    const nights = calculateNights(startDate, endDate);
    // Base amount + 12% luxury hospitality tax & service
    const baseAmount = room.pricePerNight * nights;
    const taxesAndService = Math.round(baseAmount * 0.14);
    const totalAmount = baseAmount + taxesAndService;

    const booking = await createBooking({
      guest: {
        firstName: guest.firstName.trim(),
        lastName: guest.lastName.trim(),
        email: guest.email.trim(),
        phone: guest.phone.trim(),
      },
      roomId,
      checkIn: startDate,
      checkOut: endDate,
      guests: Number(guests) || 2,
      totalAmount,
      specialRequests: specialRequests || null,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your luxury reservation has been confirmed with Jolly Grand',
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process reservation. Please contact concierge.' },
      { status: 500 }
    );
  }
}
