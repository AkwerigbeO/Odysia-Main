const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getDashboardStats,
    getRecentActivity,
    getEarnings
} = require('../controllers/expertController');

// All routes are protected and for experts
router.use(protect);
// Add role check middleware here if strict 'expert' role check needed, 
// strictly speaking 'protect' just checks valid token. 
// Can add a middleware like `restrictTo('expert')`

router.get('/stats', getDashboardStats);
router.get('/earnings', getEarnings);
router.get('/activity', getRecentActivity);
router.get('/recent-activity', getRecentActivity); // Alias

module.exports = router;
