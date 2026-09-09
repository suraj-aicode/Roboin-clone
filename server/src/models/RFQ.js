const mongoose = require('mongoose');

const RFQSchema = new mongoose.Schema({
  rfqId: { type: String, required: true, unique: true },
  organizationName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gstin: { type: String, default: '' },
  items: [{
    sku: { type: String, required: true },
    title: { type: String, required: true },
    quantity: { type: Number, required: true, min: 10 },
    targetPricePerUnit: { type: Number, default: 0 }
  }],
  targetDeliveryDate: { type: Date, required: true },
  specialRequirements: { type: String, default: '' },
  quotedAmount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Quoted', 'Accepted', 'Rejected'],
    default: 'Submitted'
  }
}, { timestamps: true });

module.exports = mongoose.model('RFQ', RFQSchema);
