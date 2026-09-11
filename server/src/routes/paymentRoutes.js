const express = require('express');
const router = express.Router();
const { 
  getRazorpayKey, 
  updateRazorpayConfig,
  createRazorpayOrder, 
  verifyPayment,
  handleRazorpayWebhook,
  getPaymentHistory,
  getOrderInvoice
} = require('../controllers/paymentController');

router.get('/key', getRazorpayKey);
router.post('/config', updateRazorpayConfig);
router.post('/create-razorpay-order', createRazorpayOrder);
router.post('/create-order', createRazorpayOrder);
router.post('/verify', verifyPayment);
router.post('/webhook', handleRazorpayWebhook);
router.get('/history', getPaymentHistory);
router.get('/invoice/:orderId', getOrderInvoice);

module.exports = router;

