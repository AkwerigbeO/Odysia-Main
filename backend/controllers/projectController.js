const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Get user projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({ client: req.user.id });
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
    try {
        const { title, description, budget, status, startDate, completionDate } = req.body;

        const project = await Project.create({
            client: req.user.id,
            title,
            description,
            budget,
            status,
            startDate,
            completionDate
        });

        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

// @desc    Get dashboard stats
// @route   GET /api/projects/stats
// @access  Private
const getProjectStats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const projects = await Project.find({ client: userId });

        const totalProjects = projects.length;
        const inProgress = projects.filter(p => p.status === 'active').length;
        const completed = projects.filter(p => p.status === 'completed').length;

        let totalSpent = 0;
        projects.forEach(p => {
            totalSpent += (p.spent || 0);
        });

        // Also fetch user stats for completeness (rating, etc)
        const user = await User.findById(userId);

        res.status(200).json({
            totalProjects,
            inProgress,
            completed,
            totalSpent,
            rating: user.rating || 0,
            activeChats: user.activeChats || 0,
            pendingActions: user.pendingActions || 0
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProjects,
    createProject,
    getProjectStats
};
