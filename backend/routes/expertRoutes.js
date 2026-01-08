const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getDashboardStats,
    getRecentActivity,
    getEarnings,
    getAllExperts
} = require('../controllers/expertController');

// All routes are protected
router.use(protect);

// Expert stats/earnings for current user
router.get('/stats', getDashboardStats);
router.get('/earnings', getEarnings);
router.get('/activity', getRecentActivity);
router.get('/recent-activity', getRecentActivity); // Alias

// Admin routes for experts
router.get('/admin/all', admin, getAllExperts);

module.exports = router;
