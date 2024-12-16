const express = require('express');
const router = express.Router();
const loginRoutes = require('./auth/login');
const registerRoutes = require('./auth/register');

// Routes
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);

module.exports = router;