const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'fa-star'
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: String,
    enum: ['government', 'financial', 'consulting', 'other'],
    default: 'other'
  },
  featured: {
    type: Boolean,
    default: false
  },
  details: {
    type: String
  },
  requirements: [String],
  benefits: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
