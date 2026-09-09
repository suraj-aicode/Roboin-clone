# Roboin-clone

A full-stack Robotics & Electronics E-Commerce platform inspired by Robu.in. Built with modern React 19 + Vite, Redux Toolkit, Node.js/Express, MongoDB/Mongoose, and official Razorpay payment integration.

## 🚀 Features

- **Storefront & Tech Catalog**: Rich product specs, datasheets, category hierarchy, faceted filter by brand & operating voltage, full-text search.
- **Cart & Dynamic Animations**: Interactive slide-in Cart Drawer with Free Express Delivery progress tracker, tactile stepper, instant coupon system (`ROBO10`, `FREESHIP`, `MAKER500`), and floating "Added to Cart" toast with bounce feedback.
- **GST Compliance (MOD-08)**: Real-time Intrastate (CGST 9% + SGST 9%) vs Interstate (IGST 18%) calculation based on destination Indian state.
- **Payment Integration**: Official Razorpay Standard Checkout (`checkout.js`) with UPI, QR, Debit/Credit Cards, Net Banking, plus signature verification.
- **Admin Dashboard & RBAC**: Role-based access control (Super Admin, Inventory Manager, Catalog Manager), live inventory stock adjustments, and order lifecycle management.
- **Logistics & Invoicing**: Automated Delhivery consignment tracking generation and printable GST Tax Invoice with Razorpay transaction reference.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Redux Toolkit, Lucide React, Vanilla CSS.
- **Backend**: Node.js, Express, MongoDB, Mongoose, Razorpay SDK, Crypto.

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/suraj-aicode/Roboin-clone.git
cd Roboin-clone
```

### 2. Install dependencies
```bash
npm --prefix client install
npm --prefix server install
```

### 3. Environment Configuration
Copy `server/.env.example` to `server/.env` and update credentials if needed:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/robo_ecommerce
JWT_SECRET=your_jwt_secret_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 4. Seed database
```bash
npm run seed
```

### 5. Run the Project
In separate terminals:
```bash
# Terminal 1: Backend API (Port 5000)
npm run server

# Terminal 2: Frontend App (Port 5173)
npm run client
```
