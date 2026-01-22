const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getProjects,
    createProject,
    getProjectStats,
    submitDeliverable,
    getProjectById,
    updateProject,
    addMilestone,
    updateMilestoneStatus
} = require('../controllers/projectController');

router.route('/').get(protect, getProjects).post(protect, createProject);
router.route('/stats').get(protect, getProjectStats);
router.route('/:id').get(protect, getProjectById).put(protect, updateProject);
router.route('/:id/milestones').post(protect, addMilestone);
router.route('/:id/milestones/:milestoneId').put(protect, updateMilestoneStatus);
router.route('/:projectId/milestones/:milestoneId/submit').post(protect, submitDeliverable);

module.exports = router;
