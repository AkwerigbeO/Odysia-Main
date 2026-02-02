const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { initializePayment, verifyPayment, getUserTransactions } = require('../controllers/paymentController');

router.get('/', protect, getUserTransactions);
router.post('/initialize', protect, initializePayment);
router.get('/verify', verifyPayment); // Webhook or Frontend Redirect hits this, might not need auth if reference is unique enough, but better to protect or Validate securely. 
// Paystack callback is GET params. The frontend usually calls this endpoint.
// Let's keep it public for now or assume Frontend sends token. Standard is protected if called by Frontend.

module.exports = router;
