const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getNotifications, markNotificationRead, getActivity } = require('../controllers/notificationController');

router.route('/').get(protect, getNotifications);
router.route('/activity').get(protect, getActivity);
router.route('/:id/read').put(protect, markNotificationRead);

module.exports = router;
