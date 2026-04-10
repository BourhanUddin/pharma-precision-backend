const Order = require('../models/order');
const Medicine = require('../models/medicine');

// @route   GET /api/reports/sales
// @desc    Get daily, monthly, or yearly sales & profit
const getSalesReport = async (req, res) => {
  try {
    // Aggregation to calculate total revenue and total cost
    const salesData = await Order.aggregate([
      { $match: { status: 'Completed' } },
      { $unwind: "$items" },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalRevenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } },
          totalCost: { $sum: { $multiply: ["$items.buyPriceAtSale", "$items.qty"] } },
          totalOrders: { $addToSet: "$_id" }
        }
      },
      {
        $project: {
          date: "$_id",
          totalRevenue: 1,
          totalCost: 1,
          profit: { $subtract: ["$totalRevenue", "$totalCost"] },
          orderCount: { $size: "$totalOrders" },
          _id: 0
        }
      },
      { $sort: { date: -1 } }
    ]);

    res.json(salesData);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @route   GET /api/reports/expiry
// @desc    Get medicines expiring within 30, 60, 90 days
const getExpiryReport = async (req, res) => {
  try {
    const today = new Date();
    const thirtyDays = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    const ninetyDays = new Date(today.getTime() + (90 * 24 * 60 * 60 * 1000));

    const expiringMedicines = await Medicine.find({
      expiry: { $gte: today, $lte: ninetyDays },
      stock: { $gt: 0 }
    }).sort({ expiry: 1 });

    res.json(expiringMedicines);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getSalesReport, getExpiryReport };