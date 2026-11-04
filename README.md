<<<<<<< HEAD
# SalonX – Premium Salon & Beauty Booking Marketplace

> **Tagline:** *Your Style. Your Salon. Your Time.*

SalonX is an uber-luxe salon and beauty-service booking marketplace engineered for modern beauty consumers, salon owners, and master stylists. The platform works like Uber/Rapido, but specifically tailored to beauty and grooming services: discover nearby salons, compare prices and ratings, select services and stylists, verify real-time chair availability, book appointments, and make payments online via Razorpay.

---

## 💎 Design Direction & Brand Identity

**Aesthetic:** Luxury Editorial + Modern Beauty Technology (No generic e-commerce templates).

### Color Palette:
- **Charcoal (`#171613`):** Deep editorial background for dark mode, luxurious contrast.
- **Warm Ivory (`#F5F0E8`):** Editorial parchment tone for light mode and gentle typography.
- **Burnt Orange (`#D97736`):** Signature primary accent for CTA buttons, badges, and highlights.
- **Sand (`#B9A58C`):** Elegant neutral for subtle borders, metadata, and secondary accents.
- **Pure White (`#FFFFFF`):** High clarity for modal elements and badges.

### Typography:
- **Headings:** `Manrope` (clean, contemporary, geometric authority)
- **Body:** `Inter` (optimal screen readability)

---

## 🌟 Key Platform Features

### 1. Consumer Experience
- **Editorial Homepage:** Hero search for location and services, trending categories (Haircut, Balayage, Hydra Facial, Gentlemen's Grooming, Nails, Spa), curated luxury salons, limited-time promotions, and real-time chair guarantee.
- **Explore & Discover:**
  - Search by salon name, service, or locality.
  - Switch between **Grid View**, **List View**, and **Interactive Vector Map View** with GPS distance calculation.
  - Multi-parameter filters: Distance radius, gender classification (Unisex, Women, Men), minimum ratings (4.0+, 4.5+, 4.8+), open right now, and premier luxe certification.
  - Dynamic sorting: Most Popular, Highest Rated, Distance, and Price (Low to High).
- **Salon Atelier Profile:**
  - High-resolution gallery preview.
  - Verified badges, operating hours, exact map location, amenities (VIP suites, espresso bar, valet).
  - Categorized service menus with durations and prices.
  - Master stylist roster with credentials, specialties, and ratings.
  - Verified customer reviews and cancellation policy.
- **Guided 6-Step Booking Journey:**
  1. **Select Services:** Multi-service selection with dynamic duration and bill accumulation.
  2. **Select Stylist:** Choose a specific specialist or opt for "Any Available Master Stylist" smart match.
  3. **Select Date:** Interactive 7-day calendar.
  4. **Available Time Slots:** Real-time morning, afternoon, and evening slots with live availability flags.
  5. **Review Details:** Summary with custom notes for stylist.
  6. **Payment & Confirmation:** Razorpay checkout modal (UPI / QR, Cards, Netbanking) or Pay at Salon.
  - **Double Booking Prevention:** Validates slot availability on backend.
- **VIP Boarding Pass Confirmation:** Printable/downloadable check-in pass with reference ID, contactless QR code, calendar sync, and salon directions.
- **Customer Dashboard:** Manage upcoming appointments (instant reschedule/cancel), past history, saved salons, coupons, and 24/7 VIP concierge support.

### 2. Salon Owner Dashboard (SalonX OS)
- **Business KPI Metrics:** Today's bookings, total GMV revenue, average ticket size, and customer satisfaction.
- **Interactive Revenue Trends:** Weekly revenue analytics bar chart.
- **Appointment Queue:** Live table of bookings with real-time status transitions (`CONFIRMED`, `COMPLETED`, `CANCELLED`).
- **Service Menu Management:** Add, edit, or delete services, categories, prices, and durations.
- **Staff / Stylist Management:** Add stylists, assign specialties, and track chair utilization.
- **Direct Settlements:** Razorpay automated payout tracking.

### 3. Super Admin Dashboard
- **Platform Analytics:** Total platform GMV, platform commission (12% take rate), active salon count, and user directory.
- **Salon Verification & Approvals:** Review new salon partner applications, verify licenses, and approve/reject with one click.
- **Marketplace Governance:** Commission controls and dispute handling.

### 4. Authentication & Role Switcher
- Roles: `CUSTOMER`, `SALON_OWNER`, `STAFF`, `ADMIN`.
- **Instant 1-Click Role Switcher:** In the top navigation bar, testers can instantly toggle between Priya Sharma (Customer), Alexander Wright (Salon Owner), Rajesh Varma (Staff), and Victoria Vance (Super Admin) to evaluate all 4 perspectives.

---

## 🛠 Technology Stack

### Frontend:
- **React.js 19** with **Vite**
- **Tailwind CSS v4** with `@tailwindcss/vite`
- **React Router DOM v7**
- **Framer Motion** for micro-interactions and transitions
- **Lucide React** for icons
- **Axios** for API communication
- **Canvas Confetti** for booking celebration effects
- Dual Theme Engine (Light / Dark mode persisted in `localStorage`)

### Backend:
- **Java 21 / 23**
- **Spring Boot 3.3.4**
- **Spring Security** with stateless **JWT Authentication**
- **Spring Data JPA / Hibernate**
- **Dual Database Architecture:**
  - Embedded **H2 Database** for immediate zero-config plug-and-play local execution.
  - Production-ready **MySQL 8** profile (`--spring.profiles.active=mysql`).
- **Database Seeder:** Auto-seeds demo users, salons, stylists, services, and promo coupons.

---

## 🚀 Getting Started

### 1. Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Running the Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
```
Backend API runs at [http://localhost:8080](http://localhost:8080)
H2 Database Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:mem:salonxdb`, User: `sa`, Password: empty)

---

## 🔑 Pre-Configured Demo Credentials

| Role | Name | Email | Password | Pre-Assigned Salon |
| :--- | :--- | :--- | :--- | :--- |
| **Customer** | Priya Sharma | `priya@example.com` | `salonx123` | N/A |
| **Salon Owner** | Alexander Wright | `owner@luxe.com` | `salonx123` | The Luxe Atelier |
| **Stylist / Staff** | Rajesh Varma | `rajesh@luxe.com` | `salonx123` | The Luxe Atelier |
| **Super Admin** | Victoria Vance | `admin@salonx.com` | `salonx123` | Platform-wide |

*Tip: You can also use the **Demo Role Switcher pill** in the navbar to switch personas instantly with zero typing!*

---

## 🎟 Promotional Coupons to Test at Checkout
- `SALONX50`: 50% OFF up to ₹500 (Min. booking ₹800)
- `LUXE20`: 20% OFF up to ₹800 on Premier Luxe salons (Min. booking ₹1500)
- `GLOWUP`: Flat ₹300 OFF (Min. booking ₹1200)
=======
# SalonX
>>>>>>> b7426df227da61d6c98e3c7586551a2b32bde556
