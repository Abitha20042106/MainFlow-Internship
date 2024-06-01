const express = require('express');
const router = express.Router();
const { bookTicket } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookTicket);

module.exports = router;
