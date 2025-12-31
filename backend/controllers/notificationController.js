const Notification = require('../models/Notification');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user._id })
            .sort({ createdAt: -1 })
            .limit(50); // Limit to last 50

        const unreadCount = await Notification.countDocuments({
            recipient: req.user._id,
            read: false
        });

        res.status(200).json({
            success: true,
            count: notifications.length,
            unreadCount,
            data: notifications
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOne({
            _id: req.params.id,
            recipient: req.user._id
        });

        if (!notification) {
            return res.status(404).json({ success: false, error: 'Notification not found' });
        }

        notification.read = true;
        await notification.save();

        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
exports.markAllAsRead = async (req, res) => {
    try {
        console.log(`Marking all notifications read for user: ${req.user._id}`);
        const result = await Notification.updateMany(
            { recipient: req.user._id, read: false },
            { read: true }
        );
        console.log(`Updated ${result.modifiedCount} notifications`);

        res.status(200).json({ success: true, message: 'All notifications marked as read', count: result.modifiedCount });
    } catch (error) {
        console.error('Error marking all read:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Internal Helper to Create Notification
exports.createNotification = async (recipientId, type, title, message, relatedId = null) => {
    try {
        await Notification.create({
            recipient: recipientId,
            type,
            title,
            message,
            relatedId
        });
    } catch (error) {
        console.error('Failed to create notification:', error);
    }
};
