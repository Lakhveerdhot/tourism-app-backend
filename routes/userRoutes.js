// const express = require('express');
// const router = express.Router();
// const { signup } = require('../controllers/userController');

// router.post('/signup', signup);

// module.exports = router;








const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;