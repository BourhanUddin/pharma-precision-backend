const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  buyPriceAtSale: { type: Number, required: true } // Crucial for accurate historical P&L
});

const orderSchema = new mongoose.Schema({
  orderNo: { type: String, required: true, unique: true },
  customer: { type: String, default: 'Walk-in' },
  customerPhone: { type: String },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paid: { type: Number, required: true },
  change: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'Completed' },
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Tracks which pharmacist made the sale
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);