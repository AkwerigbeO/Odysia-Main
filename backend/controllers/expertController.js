const Project = require('../models/Project');
const Transaction = require('../models/Transaction');
const Activity = require('../models/Activity');
const User = require('../models/User');

// @desc    Get expert dashboard stats
// @route   GET /api/expert/stats
// @access  Private (Expert)
const getDashboardStats = async (req, res, next) => {
    try {
        const expertId = req.user._id;

        // Parallel execution for performance
        const [
            activeProjectsCount,
            completedProjectsCount,
            earningsResult,
            activityCount
        ] = await Promise.all([
            // Active Projects
            Project.countDocuments({
                expert: expertId,
                status: { $in: ['active', 'in_progress'] }
            }),
            // Completed Projects
            Project.countDocuments({
                expert: expertId,
                status: 'completed'
            }),
            // Total Earnings (Sum of completed transactions)
            Transaction.aggregate([
                {
                    $match: {
                        recipient: expertId,
                        status: 'completed',
                        type: { $in: ['milestone_payment', 'bonus', 'adjustment'] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$amount' }
                    }
                }
            ]),
            // Active Chats (Placeholder using User model field for now, or Activity)
            // Assuming User model has 'activeChats' counter, otherwise we count distinct conversations
            User.findById(expertId).select('activeChats rating')
        ]);

        const totalEarnings = earningsResult.length > 0 ? earningsResult[0].total : 0;
        const activeChats = activityCount ? activityCount.activeChats : 0;
        const rating = activityCount ? activityCount.rating : 0;

        // Pending Actions: e.g., milestones pending, new proposals
        const pendingActions = await Project.countDocuments({
            expert: expertId,
            'milestones.status': 'pending'
        });

        res.status(200).json({
            success: true,
            data: {
                totalProjects: activeProjectsCount + completedProjectsCount,
                inProgress: activeProjectsCount,
                completed: completedProjectsCount,
                totalEarnings,
                activeChats,
                rating,
                pendingActions
            }
        });

    } catch (error) {
        next(error);
    }
};

// @desc    Get expert recent activity
// @route   GET /api/expert/activity
// @route   GET /api/expert/recent-activity
// @access  Private (Expert)
const getRecentActivity = async (req, res, next) => {
    try {
        const expertId = req.user._id;

        const activities = await Activity.find({ user: expertId })
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            count: activities.length,
            data: activities
        });

    } catch (error) {
        next(error);
    }
};

// @desc    Get expert earnings (transactions)
// @route   GET /api/expert/earnings
// @access  Private (Expert)
const getEarnings = async (req, res, next) => {
    try {
        const expertId = req.user._id;

        const transactions = await Transaction.find({ recipient: expertId })
            .populate('project', 'title')
            .populate('payer', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardStats,
    getRecentActivity,
    getEarnings
};
