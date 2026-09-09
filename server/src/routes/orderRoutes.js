const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// Allow guest/customer order placement or authenticated placement
router.post('/', createOrder);
router.get('/', (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return protect(req, res, () => getOrders(req, res, next));
  }
  return getOrders(req, res, next);
});
router.get('/:id', getOrderById);
router.patch('/:id/status', protect, authorize('admin', 'super_admin', 'order_manager'), updateOrderStatus);

module.exports = router;
