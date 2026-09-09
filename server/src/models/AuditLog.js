const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  logId: {
    type: String,
    required: true,
    unique: true
  },
  actor: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true // 'CREATE_PRODUCT', 'UPDATE_STOCK', 'ORDER_STATUS_TRANSITION', 'PRICE_CHANGE'
  },
  entity: {
    type: String,
    required: true // e.g. SKU-ARD-R4-WIFI, ORD-2026-8941
  },
  details: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    default: '127.0.0.1'
  }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
