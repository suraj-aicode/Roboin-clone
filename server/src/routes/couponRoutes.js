const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

// In-memory fallback baseline coupons if DB is not connected
const FALLBACK_COUPONS = [
  {
    _id: 'cpn-000',
    code: 'VOLT10',
    discountType: 'percentage',
    value: 0.10,
    minOrderAmount: 500,
    maxDiscount: 1000,
    maxUses: 500,
    usedCount: 15,
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    isActive: true,
    description: '10% off on all VoltCart Robotics & Electronics boards above ₹500'
  },
  {
    _id: 'cpn-001',
    code: 'ROBO10',
    discountType: 'percentage',
    value: 0.10,
    minOrderAmount: 500,
    maxDiscount: 1000,
    maxUses: 500,
    usedCount: 42,
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    isActive: true,
    description: '10% off on all Robotics & Microcontroller boards above ₹500'
  },
  {
    _id: 'cpn-002',
    code: 'MAKER500',
    discountType: 'fixed',
    value: 500,
    minOrderAmount: 2999,
    maxDiscount: 500,
    maxUses: 200,
    usedCount: 18,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
    description: 'Flat ₹500 discount for orders above ₹2,999'
  },
  {
    _id: 'cpn-003',
    code: 'FREESHIP',
    discountType: 'shipping',
    value: 99,
    minOrderAmount: 0,
    maxDiscount: 99,
    maxUses: 1000,
    usedCount: 88,
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    isActive: true,
    description: 'Free expedited courier shipping anywhere in India'
  }
];

// @route   POST /api/coupons/validate
// @desc    Validate a promo code server-side against cart total (FR-PROMO-101)
router.post('/validate', async (req, res) => {
  try {
    const { code, cartTotal = 0 } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required' });
    }

    const cleanCode = code.trim().toUpperCase();
    let coupon = null;

    try {
      coupon = await Coupon.findOne({ code: cleanCode, isActive: true });
    } catch {
      coupon = FALLBACK_COUPONS.find(c => c.code === cleanCode && c.isActive);
    }

    if (!coupon) {
      coupon = FALLBACK_COUPONS.find(c => c.code === cleanCode && c.isActive);
    }

    if (!coupon) {
      return res.status(404).json({ success: false, message: `Coupon code '${cleanCode}' is invalid or expired.` });
    }

    if (new Date() > new Date(coupon.validUntil)) {
      return res.status(400).json({ success: false, message: `Coupon code '${cleanCode}' has expired.` });
    }

    if (coupon.usedCount >= coupon.maxUses) {
      return res.status(400).json({ success: false, message: `Coupon code '${cleanCode}' has reached its maximum redemption limit.` });
    }

    if (cartTotal < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount of ₹${coupon.minOrderAmount} required for coupon '${cleanCode}'.`
      });
    }

    // Calculate discount amount server-side (FR-PROMO-104)
    let calculatedDiscount = 0;
    if (coupon.discountType === 'percentage') {
      calculatedDiscount = Math.round(cartTotal * coupon.value);
      if (coupon.maxDiscount && calculatedDiscount > coupon.maxDiscount) {
        calculatedDiscount = coupon.maxDiscount;
      }
    } else if (coupon.discountType === 'fixed') {
      calculatedDiscount = Math.min(coupon.value, cartTotal);
    } else if (coupon.discountType === 'shipping') {
      calculatedDiscount = 99; // Standard shipping fee waive
    }

    res.json({
      success: true,
      message: `Coupon '${cleanCode}' applied successfully!`,
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        value: coupon.value,
        calculatedDiscount,
        description: coupon.description
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/coupons
// @desc    List all promotional coupons
router.get('/', async (req, res) => {
  try {
    let coupons = [];
    try {
      coupons = await Coupon.find().sort({ createdAt: -1 });
    } catch {
      coupons = FALLBACK_COUPONS;
    }
    if (!coupons || coupons.length === 0) {
      coupons = FALLBACK_COUPONS;
    }
    res.json({ success: true, count: coupons.length, data: coupons });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/coupons
// @desc    Create a new coupon (MOD-16)
router.post('/', async (req, res) => {
  try {
    const { code, discountType, value, minOrderAmount, maxDiscount, maxUses, description } = req.body;
    if (!code || value === undefined) {
      return res.status(400).json({ success: false, message: 'Code and value are required.' });
    }

    const newCoupon = {
      _id: `cpn-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discountType: discountType || 'percentage',
      value: Number(value),
      minOrderAmount: Number(minOrderAmount || 0),
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
      maxUses: Number(maxUses || 1000),
      usedCount: 0,
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      isActive: true,
      description: description || `Special promo coupon ${code.toUpperCase()}`
    };

    try {
      const created = await Coupon.create(newCoupon);
      return res.status(201).json({ success: true, data: created });
    } catch {
      FALLBACK_COUPONS.unshift(newCoupon);
      return res.status(201).json({ success: true, data: newCoupon });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PATCH /api/coupons/:id/toggle
// @desc    Toggle coupon active status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    let updated = null;
    try {
      const c = await Coupon.findById(id);
      if (c) {
        c.isActive = !c.isActive;
        await c.save();
        updated = c;
      }
    } catch {
      const c = FALLBACK_COUPONS.find(item => item._id === id || item.code === id);
      if (c) {
        c.isActive = !c.isActive;
        updated = c;
      }
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
