const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

// @desc Get Admin Dashboard KPIs (MOD-22)
// @route GET /api/admin/kpis
exports.getAdminKPIs = async (req, res) => {
  try {
    const products = await Product.find();
    const orders = await Order.find();
    const usersCount = await User.countDocuments();

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalOrders = orders.length;
    const lowStockCount = products.filter(p => (p.stockOnHand - p.stockReserved) < 20).length;
    const totalReservedStock = products.reduce((sum, p) => sum + (p.stockReserved || 0), 0);

    res.status(200).json({
      success: true,
      kpis: {
        totalRevenue,
        totalOrders,
        lowStockCount,
        totalReservedStock,
        totalProducts: products.length,
        totalUsers: usersCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get Audit Logs (MOD-23 & FR-PLAT-003)
// @route GET /api/admin/audit-logs
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
