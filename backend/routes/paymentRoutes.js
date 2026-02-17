const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { initializePayment, verifyPayment, getUserTransactions } = require('../controllers/paymentController');

router.get('/', protect, getUserTransactions);
router.post('/initialize', protect, initializePayment);
router.get('/verify', protect, verifyPayment); // Protected: only the payer can verify their own transaction

module.exports = router;
