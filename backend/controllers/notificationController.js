const Notification = require('../models/Notification');
const Activity = require('../models/Activity');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markNotificationRead = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            res.status(404);
            throw new Error('Notification not found');
        }

        if (notification.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized');
        }

        notification.read = true;
        await notification.save();

        res.status(200).json(notification);
    } catch (error) {
        next(error);
    }
};

// @desc    Get recent activity
// @route   GET /api/notifications/activity
// @access  Private
const getActivity = async (req, res, next) => {
    try {
        const activity = await Activity.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(10);
        res.status(200).json(activity);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNotifications,
    markNotificationRead,
    getActivity
};
