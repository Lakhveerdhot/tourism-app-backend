const express = require('express');
const router = express.Router();

const {
  addPlace,
  getPlaces
} = require('../controllers/placeController');

const auth = require('../middleware/authMiddleware');

// Add place
router.post('/places', auth, addPlace);

// Get all places
router.get('/places', getPlaces);

module.exports = router;