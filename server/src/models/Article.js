const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  author: { type: String, required: true, default: 'RoboTech Research Team' },
  category: { 
    type: String, 
    enum: ['Robotics & Autonomous Systems', 'Embedded Firmware & RTOS', 'Hardware Benchmarks', 'IoT & Telemetry'],
    default: 'Robotics & Autonomous Systems'
  },
  readTime: { type: String, default: '8 min read' },
  coverImage: { type: String, default: 'assets/images/raspberry_pi_5.jpg' },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  compatibleSkus: [{ type: String }],
  status: { type: String, enum: ['Draft', 'Published'], default: 'Published' },
  views: { type: Number, default: 120 }
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
