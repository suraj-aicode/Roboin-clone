const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  adjustStock
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, authorize('admin', 'super_admin', 'catalog_manager'), createProduct);
router.patch('/:id/stock', protect, authorize('admin', 'super_admin', 'inventory_manager'), adjustStock);

module.exports = router;
