const express = require('express');
const router = express.Router();

const {
  getUsers,
  getLocations,
  getSOSAlerts
} = require('../controllers/adminController');

const auth = require('../middleware/authMiddleware');

// 👇 Secure routes (token required)
router.get('/users', auth, getUsers);
router.get('/locations', auth, getLocations);
router.get('/sos-alerts', auth, getSOSAlerts);

module.exports = router;