# VoltCart ⚡

An enterprise full-stack Robotics, IoT & Electronics E-Commerce platform. Built with React 19 + Vite, Redux Toolkit, Node.js/Express, MongoDB/Mongoose, and official Razorpay payment integration.

- **Live Storefront (Netlify):** [https://volt-cart.netlify.app/](https://volt-cart.netlify.app/)
- **Live REST API (Render):** [https://roboin-clone.onrender.com/](https://roboin-clone.onrender.com/)

---

## 📁 Clean Monorepo Structure

```
volt-cart/
├── client/                     # Frontend Application (React 19 + Vite)
│   ├── public/                 # Static Assets, SVGs, Favicon, Images
│   │   ├── assets/images/      # Product images
│   │   └── _redirects          # Netlify SPA routing rules
│   ├── src/
│   │   ├── components/         # 25+ Modular UI, Navbar, Footer & Feature Modals
│   │   ├── config/             # Dynamic API URL (Local vs Render Production)
│   │   ├── data/               # 12-Category Technical Specs & Product Catalogs
│   │   ├── redux/              # Redux Toolkit Slices (Cart, Order, Auth, Wishlist)
│   │   ├── services/           # Razorpay SDK Checkout & Order API Handlers
│   │   ├── styles/             # CSS Design System & Theme Tokens
│   │   ├── App.jsx             # Root Component with Dedicated Category Routing
│   │   └── main.jsx            # React 19 Entrypoint
│   ├── index.html              # HTML5 Template with SEO Metadata
│   ├── package.json            # Frontend Dependencies & Scripts
│   └── vite.config.js          # Vite Bundler Configuration
│
├── server/                     # Backend REST API (Node.js + Express)
│   ├── src/
│   │   ├── config/             # MongoDB Atlas Connection & Config
│   │   ├── controllers/        # Payment, Order, Product, Auth & Shipping Handlers
│   │   ├── data/               # Full Database Seeding Catalog
│   │   ├── middleware/         # JWT Auth, RBAC & Global Error Handlers
│   │   ├── models/             # Mongoose Schemas (Product, Order, User, Coupon, Audit)
│   │   ├── routes/             # Express API Endpoints
│   │   ├── seed.js             # Initial Database Seeder
│   │   └── server.js           # Express App Entrypoint & Health Endpoints
│   ├── .env.example            # Environment Variables Template
│   └── package.json            # Backend Dependencies & Scripts
│
├── docs/                       # Project Documentation & Specifications
│   ├── SRS-Document.pdf        # System Requirements Specification Document
│   └── legacy-php-reference/   # Reference PHP Payment Implementations
│
├── netlify.toml                # Netlify CI/CD & SPA Redirects Configuration
├── render.yaml                 # Render Blueprint for Automated Backend Deployments
├── package.json                # Root Monorepo Scripts (Concurrent Dev & Build)
├── .gitignore                  # Git Ignore Rules
└── README.md                   # Project Documentation
```

---

## 🚀 Key Features

- **12 Comprehensive Hardware Categories:**
  - Development Boards (Arduino, Raspberry Pi, ESP32, STM32, RP2040)
  - IoT & Wireless (LoRaWAN, 4G LTE/GPS, Zigbee, Wi-Fi 6, Bluetooth 5.2, RFID)
  - Electronic Modules & Displays (OLEDs, LCDs, Buck/Boost DC Converters, RTC)
  - DIY & Maker Kits (STEM Robotics, 4WD Smart Robot Cars, 37-in-1 Sensor Packs)
  - Electric Vehicle Parts (1000W BLDC Hub Motors, Sine Wave Controllers, Smart BMS)
  - Drone Parts & UAV Hardware (Brushless Motors, 4-in-1 ESCs, Pixhawk Autopilot)
  - Batteries & Power Supplies (High-Discharge LiPo, 18650 Cells, Mean Well SMPS)
  - 3D Printers & Filaments (Bambu Lab, Creality, eSUN PLA+, All-metal hotends)
  - Sensors & Sensor Modules (Ultrasonic, IMUs, BME280, Load Cells, MQ-Series)
  - Electronic Components (Power MOSFETs, 555 Timers, Relays, Breadboards)
  - Motors, Drivers & Actuators (NEMA 17 Steppers, TMC2209 Drivers, Servos)
  - Tools & Testing Instruments (True RMS Multimeters, Oscilloscopes, Soldering Stations)

- **Official Razorpay Checkout Integration:**
  - Direct integration with Razorpay Standard Checkout SDK (`checkout.js`).
  - Server-authoritative HMAC-SHA256 signature verification.
  - Test mode with UPI/QR code and domestic test cards support.

- **Indian GST Compliance Engine:**
  - Automated 18% GST calculation (Intrastate CGST 9% + SGST 9% vs Interstate IGST 18%).
  - HSN code classification and B2B Input Tax Credit (ITC) validation.
  - Instant printable Tax Invoice download.

- **Role-Based Access Control (RBAC):**
  - Roles: `Super Admin`, `Admin`, `Catalog Manager`, `Inventory Manager`, `Customer`, `Guest`.
  - Secure back-office admin dashboard with live inventory stock management and order status updates.

- **Cart & Instant Coupons:**
  - Slide-in Cart Drawer with live free delivery progress bar.
  - Coupon discount engine (`VOLT10`, `MAKER500`, `FREESHIP`).

---

## 📦 Getting Started Locally

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

### 3. Configure Environment Variables
Create a `server/.env` file:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 4. Run Locally
```bash
# Terminal 1: Backend API (Port 5000)
npm run server

# Terminal 2: Frontend App (Port 5173)
npm run client
```

---

## 🌐 Cloud Deployment Architecture

- **Frontend:** Automatically deployed on **Netlify** from `client/` directory with automatic SPA redirects.
- **Backend:** Deployed on **Render** from `server/` directory connecting to **MongoDB Atlas**.
