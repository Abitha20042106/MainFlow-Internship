const express = require('express');
const router = express.Router();
const { getTrains, addTrain } = require('../controllers/trainController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getTrains);
router.post('/', authMiddleware, addTrain);

module.exports = router;
