const Order = require('../models/order');
const Medicine = require('../models/medicine');

exports.createOrder = async (req, res) => {
  const { items, total, customer, customerPhone, paymentMethod, orderNo } = req.body;

  try {
    // 1. Create the order
    const order = new Order({
      orderNo,
      customer,
      customerPhone,
      items,
      total,
      subtotal: total,
      paid: total,
      change: 0,
      paymentMethod,
    });

    const savedOrder = await order.save();

    // 2. Decrement stock for each item sold
    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.medicineId },
        update: { $inc: { stock: -item.qty } },
      },
    }));

    await Medicine.bulkWrite(bulkOps);

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};