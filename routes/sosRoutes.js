const express = require('express');
const router = express.Router();
const { sendSOS } = require('../controllers/sosController');

router.post('/sos', sendSOS);

module.exports = router;