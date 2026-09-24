# 🏨 JOLLY GRAND — Luxury 5-Star Hotel & Management Web Application

> **“Where Every Stay Becomes A Story”**

A production-quality, luxury 5-star hotel web application and executive management portal built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**.

---

## 🌟 Highlights & Features

### 👑 Guest Experience
- **Cinematic Visual Identity**: Deep charcoal, champagne gold accents, and editorial typography (Playfair Display & Plus Jakarta Sans).
- **Interactive Home Page**: Fullscreen hero with slow-zoom animation, floating availability booking bar, hotel heritage narrative, residence showcases, Michelin dining spotlights, and guest testimonials.
- **Suite Catalog & Details (`/rooms`, `/rooms/[id]`)**: High-resolution imagery, guest capacities, bedding details, square footage, house policies, and direct booking CTAs.
- **5-Step Booking Flow (`/booking`)**: Interactive booking wizard with real-time night and tax calculation, guest profile capture, and instant confirmation generating unique booking references (e.g., `JG-2026-5117`).
- **Michelin Gastronomy (`/dining`)**: Spotlights on *L’Étoile*, *Aetheria Rooftop Caviar Lounge*, *The Palm Orangery*, and 24-hour in-suite silver service.
- **Royal Privileges & Spa (`/services`)**: Comprehensive amenities catalog with duration and pricing details.
- **Masonry Lightbox Gallery (`/gallery`)**: Categorized photo albums with full-screen zoom and keyboard navigation.
- **Curated Offers (`/offers`)**: Seasonal luxury packages with promo codes.
- **Concierge Desk (`/contact`)**: 24/7 reception desk coordinates, map preview, and functional inquiry submission form.
- **Privacy & Discretion Charter (`/privacy`)**: High-society privacy and data encryption disclosure.

### 🔐 Executive Management Portal (`/dashboard`)
- **Split-Screen Luxury Login (`/login`)**: Full-height architectural imagery with inline credentials validation.
- **Live Operations Telemetry**: Real-time stats cards for Total Bookings, Available Rooms, Occupied Rooms, Today's Check-ins, Today's Check-outs, and Total Revenue.
- **Interactive Revenue Chart**: Visual monthly booking volume and occupancy rate trends.
- **Inventory Control**: Add new suites, toggle availability, update nightly rates, and manage inventory.
- **Reservation Control**: Real-time status updates (`PENDING`, `CONFIRMED`, `CHECKED_IN`, `CHECKED_OUT`, `CANCELLED`), search, and filtering.
- **Guest Registry**: Profiles, contact details, and historical stay records.
- **Inquiry Management**: Review incoming guest messages and mark inquiries as handled.
- **Promotions Manager**: Create, modify, and delete promotional packages.

---

## 🔑 Demo Credentials

To access the Management Portal:

- **Portal URL**: `/login` (or `/dashboard`)
- **Username**: `jolly`
- **Password**: `Abc@123`

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), Custom Glassmorphism, CSS Gradients
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & ORM**: PostgreSQL + [Prisma ORM](https://www.prisma.io/)
- **Persistence Layer**: Robust dual-mode data layer (connects seamlessly to PostgreSQL via Prisma, with in-memory fallback for local development and preview deployments)
- **Deployment**: Vercel-ready

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rajeev1311/jollygrand.git
cd jollygrand
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Default demo configuration:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jollygrand_db?schema=public"
AUTH_USERNAME=jolly
AUTH_PASSWORD=Abc@123
USERNAME=jolly
PASSWORD=Abc@123
NEXTAUTH_SECRET="jolly_grand_luxury_secret_jwt_key_2026_production"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup (Optional)
If running a local PostgreSQL instance:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```
*(Note: If PostgreSQL is not connected, the application automatically operates using the built-in resilient state store with luxury demo data).*

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 REST API Architecture

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/login` | POST | Authenticate manager session |
| `/api/auth/logout` | POST | Clear active session |
| `/api/auth/me` | GET | Verify current session |
| `/api/rooms` | GET, POST | Retrieve or create luxury suites |
| `/api/rooms/[id]` | GET, PATCH, DELETE | Manage individual room details |
| `/api/bookings` | GET, POST | Search or create reservations |
| `/api/bookings/[id]` | GET, PATCH, DELETE | Update reservation status or cancel |
| `/api/guests` | GET | Retrieve VIP guest registry |
| `/api/services` | GET | Retrieve hotel services catalog |
| `/api/offers` | GET, POST | Retrieve or create promotional packages |
| `/api/offers/[id]` | PATCH, DELETE | Update or remove promotional packages |
| `/api/contact` | GET, POST | Retrieve or submit guest inquiries |
| `/api/contact/[id]` | PATCH | Mark inquiry as handled |
| `/api/dashboard/stats` | GET | Live telemetry and revenue analytics |

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub (`rajeev1311/jollygrand`).
2. Import the project in the [Vercel Dashboard](https://vercel.com).
3. Set the environment variables from `.env.example`.
4. Deploy!

---

## 📄 License

© 2026 Jolly Grand. All Rights Reserved.
