# Eventora — An Event Booking Platform

Eventora is a **event booking web app** where users can discover events, request bookings with **OTP verification**, and manage tickets from a dashboard.
Admins can **create events** and **confirm/reject booking requests**.

---

## Features

### User features
- **Search events by title** (debounced search on Home page)
- **View event details** (single event page)
- **Register / Login**
- **2-step verification with OTP**
  - Account verification OTP during registration/login
  - Booking OTP verification before creating a booking request
- **Request event booking**
  - Booking starts as `pending`
  - Prevents duplicate booking per event (unless cancelled)
- **View and manage your bookings**
  - Cancel your booking 
- **Ticket access screens**
  - Payment success page & payment failed page

### Admin features
- **Admin login** (role-based authorization)
- **Create events**
- **Delete events**
- **See all booking requests**
- **Confirm bookings**
  - Sets booking `status = confirmed`
  - Updates `paymentStatus` (e.g., `paid` / `not_paid`)
  - Decrements available seats
  - Sends confirmation email
- **Reject/Cancel booking requests**



---

## Tech Stack
- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Authentication:** JWT
- **OTP:** MongoDB model + email via Nodemailer

---

## Project Structure
- `client/` — React frontend
- `server/` — Express API + MongoDB

---

## Prerequisites
- Node.js installed
- MongoDB connection available (MongoDB Atlas or local)

---

## Setup & Installation

### 1) Backend (server)
1. Go to `server/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside `server/` with required variables:
   ```env
   PORT=your_local_port
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

   # Email 
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email
   EMAIL_PASS=your_app_password
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

**Server dependencies**
- `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, `dotenv`, `nodemailer`

---

### 2) Frontend (client)
1. Go to `client/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

**Client dependencies**
- Runtime: `react`, `react-dom`, `react-router-dom`, `axios`, `react-icons`
- Dev: `vite`, `tailwindcss`, `postcss`, `eslint`, `@vitejs/plugin-react`

---

## Running the App
1. Start MongoDB (or ensure your MongoDB URI is reachable)
2. Start backend (`server`) using `npm run dev`
3. Start frontend (`client`) using `npm run dev`
4. Open the frontend in your browser

---

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/verify-otp`

---

## OTP / Booking Flow (Specific requirement)

### Account verification flow
1. User registers with `name`, `email`, `password`
2. Server generates an OTP and emails it to the user
3. User submits OTP to `POST /api/auth/verify-otp`
4. Account becomes `isVerified=true`

### Booking verification flow
1. User must be logged in (JWT required)
2. Frontend calls:
   - `POST /api/bookings/send-otp`
3. User submits booking request using:
   - `POST /api/bookings` with `{ eventId, otp }`
4. Server validates OTP for action `event_booking`
5. Server creates booking with:
   - `status: "pending"`
   - `paymentStatus: "not_paid"`
6. Admin confirms via:
   - `PUT /api/bookings/:id/confirm`
7. Seats are updated and confirmation email is sent

---

## Database Models (summary)
- `User` (name, email, hashed password, role, isVerified)
- `Event` (title, description, date, location, category, totalSeats, availableSeats, ticketPrice, image)
- `Booking` (userId, eventId, status, paymentStatus, amount)
- `OTP` (email, otp, action)

---

## Postman Collection
A Postman collection file is included at the project root:
- `Eventora_Postman_Collection.json`

Import it into Postman to test authentication, events, and booking endpoints.


---

## Author
Aditya Jaiswal

