const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  manufacturer: { type: String },
  stock: { type: Number, required: true, default: 0 },
  minStock: { type: Number, required: true, default: 20 },
  price: { type: Number, required: true }, // Selling price
  buyPrice: { type: Number, required: true }, // Cost price
  expiryDate: { type: Date, required: true },
  batch: { type: String },
  unit: { type: String, default: 'Tablet' },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);