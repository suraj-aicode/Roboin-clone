const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(cors());

// Mount Route Handlers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/shipping', require('./routes/shippingRoutes'));

// Root API status endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'RoboTech Commerce API Server',
    message: 'Backend is running successfully on Render! Use this URL in Netlify as VITE_API_URL.',
    health: '/api/health',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Robotics & Electronics Commerce Platform API v1.0',
    compliance: 'India GST, Razorpay & RBAC Compliant'
  });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[Express] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
