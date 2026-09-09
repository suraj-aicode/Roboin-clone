const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'Product'
  },
  productId: { type: String },
  sku: { type: String, required: true },
  title: { type: String, required: true },
  hsnCode: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  lineTotal: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, default: '' },
  gstin: { type: String, default: '' },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  taxBreakdown: {
    isIntrastate: { type: Boolean, default: true },
    gstRate: { type: Number, default: 0.18 },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    igst: { type: Number, default: 0 },
    totalGst: { type: Number, required: true }
  },
  totalAmount: { type: Number, required: true },
  paymentDetails: {
    method: { type: String, default: 'Razorpay' },
    razorpayOrderId: { type: String, default: '' },
    razorpayPaymentId: { type: String, default: '' },
    razorpaySignature: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Paid'
    }
  },
  shipment: {
    carrier: { type: String, default: 'Delhivery Direct' },
    trackingNumber: { type: String, default: '' },
    shippedAt: Date,
    deliveredAt: Date
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
    default: 'Processing'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
