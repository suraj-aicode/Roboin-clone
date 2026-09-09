const mongoose = require('mongoose');

const ReturnRequestSchema = new mongoose.Schema({
  returnId: { type: String, required: true, unique: true },
  orderNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  sku: { type: String, required: true },
  productTitle: { type: String, required: true },
  returnType: {
    type: String,
    enum: ['Replacement', 'Refund'],
    default: 'Replacement'
  },
  reason: {
    type: String,
    enum: [
      'Damaged in Transit / Physical Defect',
      'Dead on Arrival (DOA) / Component Does Not Power On',
      'Missing Header Pins or Cables',
      'Incompatible Voltage / Architecture Requirements'
    ],
    required: true
  },
  evidenceNote: { type: String, required: true },
  status: {
    type: String,
    enum: ['Requested', 'Approved', 'Pickup Scheduled', 'Inspected', 'Resolved', 'Rejected'],
    default: 'Requested'
  },
  disposition: { type: String, default: 'Pending Warehouse Inspection' }
}, { timestamps: true });

module.exports = mongoose.model('ReturnRequest', ReturnRequestSchema);
