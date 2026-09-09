const Product = require('../models/Product');
const AuditLog = require('../models/AuditLog');

// @desc Get all products with search & filters (MOD-03 & MOD-05)
// @route GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const { category, brand, search, inStock, sort } = req.query;
    let query = { isActive: true };

    if (category && category !== 'all' && category !== 'cat-all') {
      query.category = category;
    }

    if (brand) {
      query.brand = brand;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { title: regex },
        { sku: regex },
        { description: regex },
        { brand: regex }
      ];
    }

    let productsQuery = Product.find(query);

    // Sorting
    if (sort === 'price-low') {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (sort === 'price-high') {
      productsQuery = productsQuery.sort({ price: -1 });
    } else if (sort === 'rating') {
      productsQuery = productsQuery.sort({ rating: -1 });
    } else {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    }

    let products = await productsQuery;

    // Filter inStock in memory or query
    if (inStock === 'true') {
      products = products.filter(p => (p.stockOnHand - p.stockReserved) > 0);
    }

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single product
// @route GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    let product = null;
    try {
      product = await Product.findById(req.params.id);
    } catch (e) {}

    if (!product) {
      product = await Product.findOne({ sku: req.params.id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create product (Admin / Catalog Manager)
// @route POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const { title, sku, category, brand, price, hsnCode, stockOnHand, description, specs, image, warehouse } = req.body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const product = await Product.create({
      title,
      slug,
      sku: sku.toUpperCase(),
      category,
      brand,
      price,
      hsnCode: hsnCode || '85423190',
      stockOnHand: stockOnHand || 0,
      description,
      specs: specs || {},
      image: image || '',
      warehouse: warehouse || 'WH-BLR-01'
    });

    // Create Audit Log (FR-PLAT-003)
    await AuditLog.create({
      logId: `LOG-${Date.now().toString().slice(-6)}`,
      actor: req.user ? req.user.name : 'System Admin',
      role: req.user ? req.user.role : 'admin',
      action: 'CREATE_PRODUCT',
      entity: product.sku,
      details: `Created new product ${product.title} with price ₹${product.price}`
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Adjust stock with audit note (MOD-06 & FR-INV-103)
// @route PATCH /api/products/:id/stock
exports.adjustStock = async (req, res) => {
  try {
    const { stockOnHand, reason } = req.body;
    let product = null;
    try {
      product = await Product.findById(req.params.id);
    } catch (e) {}

    if (!product) {
      product = await Product.findOne({ sku: req.params.id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const oldStock = product.stockOnHand;
    product.stockOnHand = Math.max(0, parseInt(stockOnHand, 10));
    await product.save();

    // Create Audit Log
    await AuditLog.create({
      logId: `LOG-${Date.now().toString().slice(-6)}`,
      actor: req.user ? req.user.name : 'Inventory Manager',
      role: req.user ? req.user.role : 'inventory_manager',
      action: 'ADJUST_STOCK',
      entity: product.sku,
      details: `Adjusted on-hand stock from ${oldStock} to ${product.stockOnHand}. Reason: ${reason || 'Manual count'}`
    });

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: product
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
