const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  sku: { type: String, required: true },
  authorName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  isVerifiedPurchase: { type: Boolean, default: true },
  hardwareSetup: { type: String, default: '' }, // e.g. "Tested with ESP-IDF v5.1 & PlatformIO"
  status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Approved' }
}, { timestamps: true });

const QuestionAnswerSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  sku: { type: String, required: true },
  question: { type: String, required: true },
  askedBy: { type: String, required: true },
  answer: { type: String, default: '' },
  answeredBy: { type: String, default: '' },
  status: { type: String, enum: ['Answered', 'Pending'], default: 'Answered' }
}, { timestamps: true });

module.exports = {
  Review: mongoose.model('Review', ReviewSchema),
  QuestionAnswer: mongoose.model('QuestionAnswer', QuestionAnswerSchema)
};
