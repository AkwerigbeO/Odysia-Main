const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProjects, createProject, getProjectStats } = require('../controllers/projectController');

router.route('/').get(protect, getProjects).post(protect, createProject);
router.route('/stats').get(protect, getProjectStats);

module.exports = router;
