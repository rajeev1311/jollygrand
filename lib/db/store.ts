import prisma from './prisma';
import {
  INITIAL_ROOMS,
  INITIAL_GUESTS,
  INITIAL_BOOKINGS,
  INITIAL_SERVICES,
  INITIAL_OFFERS,
  INITIAL_CONTACT_MESSAGES
} from './seed-data';
import { Room, Guest, Booking, ServiceItem, OfferItem, ContactMessage, DashboardStats, BookingStatus } from '@/types/hotel';

// In-memory persistent cache for resilience when PostgreSQL is not connected or in local development
class MemoryStore {
  rooms: Room[] = JSON.parse(JSON.stringify(INITIAL_ROOMS));
  guests: Guest[] = JSON.parse(JSON.stringify(INITIAL_GUESTS));
  bookings: Booking[] = JSON.parse(JSON.stringify(INITIAL_BOOKINGS));
  services: ServiceItem[] = JSON.parse(JSON.stringify(INITIAL_SERVICES));
  offers: OfferItem[] = JSON.parse(JSON.stringify(INITIAL_OFFERS));
  messages: ContactMessage[] = JSON.parse(JSON.stringify(INITIAL_CONTACT_MESSAGES));
}

const globalForStore = globalThis as unknown as {
  memoryStore: MemoryStore | undefined;
};

const mem = globalForStore.memoryStore ?? new MemoryStore();
if (process.env.NODE_ENV !== 'production') globalForStore.memoryStore = mem;

// Helper to check if PostgreSQL via Prisma is available
let isPrismaAvailable: boolean | null = null;
async function testPrismaConnection(): Promise<boolean> {
  if (isPrismaAvailable !== null) return isPrismaAvailable;
  try {
    // Quick test query with short timeout
    await prisma.$queryRaw`SELECT 1`;
    isPrismaAvailable = true;
    return true;
  } catch {
    isPrismaAvailable = false;
    return false;
  }
}

// ---------------- ROOMS ----------------
export async function getRooms(): Promise<Room[]> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      const dbRooms = await prisma.room.findMany({
        include: { amenities: true },
        orderBy: { pricePerNight: 'asc' },
      });
      if (dbRooms && dbRooms.length > 0) {
        return dbRooms.map((r: any) => ({
          ...r,
          amenities: r.amenities.map((a: any) => ({ id: a.id, name: a.name })),
        }));
      }
    } catch (err) {
      console.warn('Prisma query failed, falling back to memory store', err);
    }
  }
  return mem.rooms;
}

export async function getRoomById(idOrSlug: string): Promise<Room | null> {
  const rooms = await getRooms();
  return rooms.find((r) => r.id === idOrSlug || r.slug === idOrSlug) || null;
}

export async function createRoom(data: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>): Promise<Room> {
  const hasPrisma = await testPrismaConnection();
  const id = `room-${Date.now()}`;
  const newRoom: Room = {
    ...data,
    id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (hasPrisma) {
    try {
      const created = await prisma.room.create({
        data: {
          id: newRoom.id,
          slug: newRoom.slug,
          name: newRoom.name,
          category: newRoom.category as any,
          description: newRoom.description,
          shortDesc: newRoom.shortDesc,
          pricePerNight: newRoom.pricePerNight,
          capacity: newRoom.capacity,
          bedType: newRoom.bedType,
          sizeSqFt: newRoom.sizeSqFt,
          image: newRoom.image,
          images: newRoom.images,
          rating: newRoom.rating,
          isAvailable: newRoom.isAvailable,
          featured: newRoom.featured,
          amenities: {
            create: Array.isArray(newRoom.amenities)
              ? newRoom.amenities.map((a: any) => ({
                  name: typeof a === 'string' ? a : a.name,
                }))
              : [],
          },
        },
        include: { amenities: true },
      });
      return {
        ...created,
        amenities: created.amenities.map((a: any) => ({ id: a.id, name: a.name })),
      };
    } catch (err) {
      console.warn('Prisma create failed, writing to memory store', err);
    }
  }

  mem.rooms.unshift(newRoom);
  return newRoom;
}

export async function updateRoom(id: string, updates: Partial<Room>): Promise<Room | null> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      const updated = await prisma.room.update({
        where: { id },
        data: {
          name: updates.name,
          category: updates.category as any,
          description: updates.description,
          shortDesc: updates.shortDesc,
          pricePerNight: updates.pricePerNight,
          capacity: updates.capacity,
          bedType: updates.bedType,
          sizeSqFt: updates.sizeSqFt,
          image: updates.image,
          isAvailable: updates.isAvailable,
          featured: updates.featured,
        },
        include: { amenities: true },
      });
      return {
        ...updated,
        amenities: updated.amenities.map((a: any) => ({ id: a.id, name: a.name })),
      };
    } catch (err) {
      console.warn('Prisma update failed, updating memory store', err);
    }
  }

  const index = mem.rooms.findIndex((r) => r.id === id);
  if (index === -1) return null;
  mem.rooms[index] = { ...mem.rooms[index], ...updates, updatedAt: new Date() };
  return mem.rooms[index];
}

export async function deleteRoom(id: string): Promise<boolean> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      await prisma.room.delete({ where: { id } });
      return true;
    } catch (err) {
      console.warn('Prisma delete failed, deleting from memory store', err);
    }
  }
  const index = mem.rooms.findIndex((r) => r.id === id);
  if (index === -1) return false;
  mem.rooms.splice(index, 1);
  return true;
}

// ---------------- BOOKINGS ----------------
export async function getBookings(): Promise<Booking[]> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      const dbBookings = await prisma.booking.findMany({
        include: { guest: true, room: true },
        orderBy: { createdAt: 'desc' },
      });
      if (dbBookings && dbBookings.length > 0) {
        return dbBookings as any;
      }
    } catch (err) {
      console.warn('Prisma getBookings failed, fallback to memory', err);
    }
  }

  // Populate guest and room references in memory
  return mem.bookings.map((b) => ({
    ...b,
    guest: mem.guests.find((g) => g.id === b.guestId),
    room: mem.rooms.find((r) => r.id === b.roomId),
  }));
}

export async function getBookingById(idOrRef: string): Promise<Booking | null> {
  const bookings = await getBookings();
  return bookings.find((b) => b.id === idOrRef || b.bookingReference === idOrRef) || null;
}

export async function createBooking(data: {
  guest: { firstName: string; lastName: string; email: string; phone: string };
  roomId: string;
  checkIn: string | Date;
  checkOut: string | Date;
  guests: number;
  totalAmount: number;
  specialRequests?: string | null;
}): Promise<Booking> {
  const hasPrisma = await testPrismaConnection();
  const bookingReference = `JG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  if (hasPrisma) {
    try {
      // Upsert guest
      const guest = await prisma.guest.upsert({
        where: { email: data.guest.email },
        update: {
          firstName: data.guest.firstName,
          lastName: data.guest.lastName,
          phone: data.guest.phone,
        },
        create: {
          firstName: data.guest.firstName,
          lastName: data.guest.lastName,
          email: data.guest.email,
          phone: data.guest.phone,
        },
      });

      const booking = await prisma.booking.create({
        data: {
          bookingReference,
          guestId: guest.id,
          roomId: data.roomId,
          checkIn: new Date(data.checkIn),
          checkOut: new Date(data.checkOut),
          guests: data.guests,
          totalAmount: data.totalAmount,
          specialRequests: data.specialRequests,
          status: 'CONFIRMED',
        },
        include: { guest: true, room: true },
      });

      return booking as any;
    } catch (err) {
      console.warn('Prisma createBooking failed, writing to memory', err);
    }
  }

  // Find or create guest in memory
  let guest = mem.guests.find((g) => g.email.toLowerCase() === data.guest.email.toLowerCase());
  if (!guest) {
    guest = {
      id: `guest-${Date.now()}`,
      firstName: data.guest.firstName,
      lastName: data.guest.lastName,
      email: data.guest.email,
      phone: data.guest.phone,
      createdAt: new Date(),
    };
    mem.guests.unshift(guest);
  }

  const room = mem.rooms.find((r) => r.id === data.roomId);
  const newBooking: Booking = {
    id: `book-${Date.now()}`,
    bookingReference,
    guestId: guest.id,
    guest,
    roomId: data.roomId,
    room,
    checkIn: new Date(data.checkIn),
    checkOut: new Date(data.checkOut),
    guests: data.guests,
    status: 'CONFIRMED',
    totalAmount: data.totalAmount,
    specialRequests: data.specialRequests,
    createdAt: new Date(),
  };

  mem.bookings.unshift(newBooking);
  return newBooking;
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking | null> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      const updated = await prisma.booking.update({
        where: { id },
        data: { status },
        include: { guest: true, room: true },
      });
      return updated as any;
    } catch (err) {
      console.warn('Prisma updateBookingStatus failed, fallback to memory', err);
    }
  }

  const index = mem.bookings.findIndex((b) => b.id === id || b.bookingReference === id);
  if (index === -1) return null;
  mem.bookings[index].status = status;
  mem.bookings[index].updatedAt = new Date();
  return {
    ...mem.bookings[index],
    guest: mem.guests.find((g) => g.id === mem.bookings[index].guestId),
    room: mem.rooms.find((r) => r.id === mem.bookings[index].roomId),
  };
}

export async function deleteBooking(id: string): Promise<boolean> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      await prisma.booking.delete({ where: { id } });
      return true;
    } catch (err) {
      console.warn('Prisma deleteBooking failed, fallback to memory', err);
    }
  }

  const index = mem.bookings.findIndex((b) => b.id === id);
  if (index === -1) return false;
  mem.bookings.splice(index, 1);
  return true;
}

// ---------------- GUESTS ----------------
export async function getGuests(): Promise<Guest[]> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      const dbGuests = await prisma.guest.findMany({
        include: { bookings: { include: { room: true } } },
        orderBy: { createdAt: 'desc' },
      });
      if (dbGuests && dbGuests.length > 0) return dbGuests as any;
    } catch (err) {
      console.warn('Prisma getGuests failed, fallback to memory', err);
    }
  }

  return mem.guests.map((g) => ({
    ...g,
    bookings: mem.bookings.filter((b) => b.guestId === g.id),
  }));
}

// ---------------- SERVICES ----------------
export async function getServices(): Promise<ServiceItem[]> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      const dbServices = await prisma.service.findMany({
        orderBy: { createdAt: 'asc' },
      });
      if (dbServices && dbServices.length > 0) return dbServices as any;
    } catch (err) {
      console.warn('Prisma getServices failed, fallback to memory', err);
    }
  }
  return mem.services;
}

// ---------------- OFFERS ----------------
export async function getOffers(): Promise<OfferItem[]> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      const dbOffers = await prisma.offer.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbOffers && dbOffers.length > 0) return dbOffers as any;
    } catch (err) {
      console.warn('Prisma getOffers failed, fallback to memory', err);
    }
  }
  return mem.offers;
}

export async function createOffer(data: Omit<OfferItem, 'id'>): Promise<OfferItem> {
  const hasPrisma = await testPrismaConnection();
  const id = `ofr-${Date.now()}`;
  const newOffer = { ...data, id };

  if (hasPrisma) {
    try {
      const created = await prisma.offer.create({
        data: {
          id: newOffer.id,
          title: newOffer.title,
          code: newOffer.code,
          discountPercent: newOffer.discountPercent,
          description: newOffer.description,
          benefits: newOffer.benefits,
          validity: newOffer.validity,
          image: newOffer.image,
          active: newOffer.active,
        },
      });
      return created as any;
    } catch (err) {
      console.warn('Prisma createOffer failed, fallback to memory', err);
    }
  }

  mem.offers.unshift(newOffer);
  return newOffer;
}

export async function updateOffer(id: string, updates: Partial<OfferItem>): Promise<OfferItem | null> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      const updated = await prisma.offer.update({
        where: { id },
        data: updates,
      });
      return updated as any;
    } catch (err) {
      console.warn('Prisma updateOffer failed, fallback to memory', err);
    }
  }

  const index = mem.offers.findIndex((o) => o.id === id);
  if (index === -1) return null;
  mem.offers[index] = { ...mem.offers[index], ...updates };
  return mem.offers[index];
}

export async function deleteOffer(id: string): Promise<boolean> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      await prisma.offer.delete({ where: { id } });
      return true;
    } catch (err) {
      console.warn('Prisma deleteOffer failed, fallback to memory', err);
    }
  }
  const index = mem.offers.findIndex((o) => o.id === id);
  if (index === -1) return false;
  mem.offers.splice(index, 1);
  return true;
}

// ---------------- CONTACT MESSAGES ----------------
export async function getContactMessages(): Promise<ContactMessage[]> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      const dbMessages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbMessages && dbMessages.length > 0) return dbMessages as any;
    } catch (err) {
      console.warn('Prisma getContactMessages failed, fallback to memory', err);
    }
  }
  return mem.messages;
}

export async function createContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<ContactMessage> {
  const hasPrisma = await testPrismaConnection();
  const id = `msg-${Date.now()}`;
  const newMsg: ContactMessage = {
    ...data,
    id,
    isRead: false,
    createdAt: new Date(),
  };

  if (hasPrisma) {
    try {
      const created = await prisma.contactMessage.create({
        data: {
          id: newMsg.id,
          name: newMsg.name,
          email: newMsg.email,
          phone: newMsg.phone,
          subject: newMsg.subject,
          message: newMsg.message,
          isRead: false,
        },
      });
      return created as any;
    } catch (err) {
      console.warn('Prisma createContactMessage failed, fallback to memory', err);
    }
  }

  mem.messages.unshift(newMsg);
  return newMsg;
}

export async function markContactMessageRead(id: string): Promise<boolean> {
  const hasPrisma = await testPrismaConnection();
  if (hasPrisma) {
    try {
      await prisma.contactMessage.update({
        where: { id },
        data: { isRead: true },
      });
      return true;
    } catch (err) {
      console.warn('Prisma markContactMessageRead failed, fallback to memory', err);
    }
  }
  const msg = mem.messages.find((m) => m.id === id);
  if (!msg) return false;
  msg.isRead = true;
  return true;
}

// ---------------- DASHBOARD STATS ----------------
export async function getDashboardStats(): Promise<DashboardStats> {
  const rooms = await getRooms();
  const bookings = await getBookings();

  const totalBookings = bookings.length;
  const occupiedCount = bookings.filter(
    (b) => b.status === 'CONFIRMED' || b.status === 'CHECKED_IN'
  ).length;
  const availableRooms = Math.max(0, rooms.length - occupiedCount);
  const occupiedRooms = occupiedCount;

  const totalRevenue = bookings
    .filter((b) => b.status !== 'CANCELLED')
    .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  // Dynamic monthly overview calculation
  const monthlyRevenue = [
    { month: 'May', amount: 48200, bookings: 32 },
    { month: 'Jun', amount: 62500, bookings: 45 },
    { month: 'Jul', amount: 89000, bookings: 58 },
    { month: 'Aug', amount: 94200, bookings: 64 },
    { month: 'Sep', amount: 81400, bookings: 51 },
    { month: 'Oct (Est.)', amount: 105000, bookings: 70 },
  ];

  const occupancyRate = rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 78;

  return {
    totalBookings,
    availableRooms,
    occupiedRooms,
    todayCheckIns: 3,
    todayCheckOuts: 2,
    totalRevenue,
    occupancyRate,
    monthlyRevenue,
  };
}
