const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    submitApplication,
    approveApplication,
    getApplications,
    rejectApplication
} = require('../controllers/expertAppController');

router.post('/', submitApplication);
router.get('/', protect, admin, getApplications);
router.put('/:id/approve', protect, admin, approveApplication);
router.put('/:id/reject', protect, admin, rejectApplication);

module.exports = router;
