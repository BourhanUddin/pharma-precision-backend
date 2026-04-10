const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');

// @route   POST /api/orders
router.post('/', createOrder);

// @route   GET /api/orders
router.get('/', getOrders);

module.exports = router;