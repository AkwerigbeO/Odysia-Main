const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res, next) => {
    try {
        let query = {};

        // If user is client, show their projects
        // If user is expert, show projects where they are assigned
        if (req.user.role === 'client') {
            query = { client: req.user._id };
        } else if (req.user.role === 'expert') {
            query = { expert: req.user._id };
        } else if (req.user.role === 'admin') {
            // Admin sees all, or can filter
        }

        const projects = await Project.find(query)
            .populate('client', 'name email')
            .populate('expert', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
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
