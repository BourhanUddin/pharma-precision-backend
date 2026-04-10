const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getUserProfile } = require('../controllers/userController');

// @route   POST /api/auth/register
router.post('/register', registerUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

// @route   GET /api/auth/profile
// Note: Later you can add an 'auth' middleware here to protect this route
router.get('/profile', getUserProfile);

module.exports = router;