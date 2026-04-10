const express = require('express');
const router = express.Router();
const Medicine = require('../models/medicine');
const Order = require('../models/order');

// @route   GET /api/reports/stats
router.get('/stats', async (req, res) => {
    const totalMedicines = await Medicine.countDocuments();
    const lowStockItems = await Medicine.countDocuments({ 
        $expr: { $lte: ["$stock", "$minStock"] } 
    });
    
    // Get total revenue from all orders
    const orders = await Order.find();
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

    res.json({
        totalMedicines,
        lowStockItems,
        totalRevenue
    });
});

module.exports = router;