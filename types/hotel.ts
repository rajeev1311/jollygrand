export type RoomCategory = 
  | 'DELUXE'
  | 'GRAND_DELUXE'
  | 'EXECUTIVE_SUITE'
  | 'PRESIDENTIAL_SUITE';

export type BookingStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'CANCELLED';

export interface RoomAmenity {
  id: string;
  name: string;
  icon?: string;
  roomId?: string;
}

export interface Room {
  id: string;
  slug: string;
  name: string;
  category: RoomCategory;
  description: string;
  shortDesc: string;
  pricePerNight: number;
  capacity: number;
  bedType: string;
  sizeSqFt: number;
  image: string;
  images: string[];
  rating: number;
  isAvailable: boolean;
  featured: boolean;
  amenities: RoomAmenity[] | string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bookings?: Booking[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Booking {
  id: string;
  bookingReference: string;
  guestId: string;
  guest?: Guest;
  roomId: string;
  room?: Room;
  checkIn: string | Date;
  checkOut: string | Date;
  guests: number;
  status: BookingStatus;
  totalAmount: number;
  specialRequests?: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  price?: number;
  duration?: string;
  image: string;
}

export interface OfferItem {
  id: string;
  title: string;
  code: string;
  discountPercent: number;
  description: string;
  benefits: string[];
  validity: string;
  image: string;
  active: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string | Date;
}

export interface DashboardStats {
  totalBookings: number;
  availableRooms: number;
  occupiedRooms: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  totalRevenue: number;
  occupancyRate: number;
  monthlyRevenue: { month: string; amount: number; bookings: number }[];
}

export interface UserSession {
  id: string;
  username: string;
  name: string;
  email?: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
}
