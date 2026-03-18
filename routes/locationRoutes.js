// // const express = require('express');
// // const router = express.Router();
// // const { saveLocation } = require('../controllers/locationController');

// // router.post('/location', saveLocation);

// // module.exports = router;




// const express = require('express');
// const router = express.Router();
// const { saveLocation } = require('../controllers/locationController');
// const auth = require('../middleware/authMiddleware');

// router.post('/location', auth, saveLocation);

// module.exports = router;






const express = require('express');
const router = express.Router();

const {
  saveLocation,
  getLocationHistory
} = require('../controllers/locationController');

const auth = require('../middleware/authMiddleware');

// Save location
router.post('/location', auth, saveLocation);

// ✅ Get location history
router.get('/location/:userId', auth, getLocationHistory);

module.exports = router;