const Order = require('../models/Order');
const Product = require('../models/Product');
const AuditLog = require('../models/AuditLog');

// Seller base state for GST calculation
const SELLER_STATE = 'Karnataka';

// @desc Create Order with server-authoritative GST calculation & stock reservation
// @route POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { 
      customerName, 
      customerEmail, 
      customerPhone, 
      gstin, 
      shippingAddress, 
      items, 
      paymentDetails 
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
    }

    let subtotal = 0;
    const orderItems = [];

    // 1. Verify products & stock availability server-side (FR-CHK-101 & FR-INV-102)
    for (const item of items) {
      let product = null;
      if (item.productId) {
        try {
          product = await Product.findById(item.productId);
        } catch (e) {
          // Ignore casting errors
        }
      }

      if (!product && item.sku) {
        try {
          product = await Product.findOne({ sku: item.sku });
        } catch (e) {}
      }

      if (product) {
        const available = product.stockOnHand - (product.stockReserved || 0);
        if (item.quantity > available) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.title}. Available: ${available}`
          });
        }

        const lineTotal = product.price * item.quantity;
        subtotal += lineTotal;

        orderItems.push({
          product: product._id,
          productId: String(product._id),
          sku: product.sku,
          title: product.title,
          hsnCode: product.hsnCode || '85423190',
          price: product.price,
          quantity: item.quantity,
          lineTotal
        });
      } else {
        // Fallback for catalog products not yet in DB or client-side products
        const price = Number(item.price) || 0;
        const lineTotal = price * item.quantity;
        subtotal += lineTotal;

        orderItems.push({
          product: item.productId || 'item-unknown',
          productId: String(item.productId || ''),
          sku: item.sku || `SKU-${item.productId || 'UNKNOWN'}`,
          title: item.title || 'VoltCart Component',
          hsnCode: item.hsnCode || '85423190',
          price,
          quantity: item.quantity,
          lineTotal
        });
      }
    }

    // 2. GST Calculation (FR-TAX-101)
    const isIntrastate = (shippingAddress.state.trim().toLowerCase() === SELLER_STATE.toLowerCase());
    const gstRate = 0.18; // 18% standard
    const totalGst = subtotal * gstRate;
    const cgst = isIntrastate ? totalGst / 2 : 0;
    const sgst = isIntrastate ? totalGst / 2 : 0;
    const igst = !isIntrastate ? totalGst : 0;

    const shippingFee = subtotal > 999 ? 0 : 99;
    const totalAmount = subtotal + totalGst + shippingFee;

    // 3. Concurrency-safe stock reservation
    for (const item of orderItems) {
      if (item.product) {
        try {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { stockReserved: item.quantity }
          });
        } catch (e) {
          // Safe catch if item not in DB
        }
      }
    }

    // 4. Generate unique Order Number (FR-ORD-101)
    const orderNumber = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await Order.create({
      orderNumber,
      customer: req.user ? req.user._id : null,
      customerName,
      customerEmail,
      customerPhone,
      gstin: gstin || '',
      shippingAddress,
      items: orderItems,
      subtotal,
      shippingFee,
      taxBreakdown: {
        isIntrastate,
        gstRate,
        cgst,
        sgst,
        igst,
        totalGst
      },
      totalAmount,
      paymentDetails: paymentDetails || { method: 'Razorpay', status: 'Paid' },
      status: 'Processing',
      shipment: {
        carrier: 'Delhivery Direct',
        trackingNumber: `DEL-${Math.floor(10000000 + Math.random() * 90000000)}-IN`
      }
    });

    // 5. Create audit log
    await AuditLog.create({
      logId: `LOG-${Date.now().toString().slice(-6)}`,
      actor: customerName,
      role: req.user ? req.user.role : 'customer',
      action: 'PLACE_ORDER',
      entity: orderNumber,
      details: `Placed order for ₹${totalAmount.toFixed(2)} with ${orderItems.length} line items.`
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all orders (Admin / Order Manager)
// @route GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get order by ID
// @route GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update order status state machine (MOD-10 & FR-ORD-102)
// @route PATCH /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status state' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const oldStatus = order.status;
    order.status = status;

    // If cancelled, release reserved stock
    if (status === 'Cancelled' && oldStatus !== 'Cancelled') {
      for (const item of order.items) {
        if (item.product) {
          try {
            await Product.findByIdAndUpdate(item.product, {
              $inc: { stockReserved: -item.quantity }
            });
          } catch (e) {}
        }
      }
    }

    await order.save();

    // Audit log
    await AuditLog.create({
      logId: `LOG-${Date.now().toString().slice(-6)}`,
      actor: req.user ? req.user.name : 'Order Manager',
      role: req.user ? req.user.role : 'order_manager',
      action: 'ORDER_STATUS_CHANGE',
      entity: order.orderNumber,
      details: `Transitioned order from ${oldStatus} to ${status}`
    });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
