const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Base price in INR is required'],
    min: [0, 'Price cannot be negative']
  },
  gstRate: {
    type: Number,
    default: 0.18 // 18% standard for microcontrollers/electronics
  },
  hsnCode: {
    type: String,
    required: true,
    trim: true
  },
  stockOnHand: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  stockReserved: {
    type: Number,
    default: 0,
    min: 0
  },
  warehouse: {
    type: String,
    default: 'WH-BLR-01'
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  specs: {
    type: Map,
    of: String,
    default: {}
  },
  datasheetUrl: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 5.0
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual property for Available Stock (FR-INV-101)
ProductSchema.virtual('stockAvailable').get(function () {
  return Math.max(0, this.stockOnHand - this.stockReserved);
});

module.exports = mongoose.model('Product', ProductSchema);
