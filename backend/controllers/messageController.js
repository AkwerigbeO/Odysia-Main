const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get all conversations for current user
// @route   GET /api/messages/conversations
// @access  Private
exports.getConversations = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find all messages where current user is sender or recipient
        // We need to group them by the OTHER party to form unique conversations
        const messages = await Message.find({
            $or: [{ sender: userId }, { recipient: userId }]
        }).sort({ createdAt: -1 });

        const conversationsMap = new Map();

        for (const msg of messages) {
            const otherPartyId = msg.sender.toString() === userId.toString()
                ? msg.recipient.toString()
                : msg.sender.toString();

            if (!conversationsMap.has(otherPartyId)) {
                // Fetch user details for the other party we haven't seen yet
                // Optimization: In a real app, you'd aggregate or gather IDs first
                // But for now, we'll fetch basic info. 
                // However, Mongoose population is cleaner. Let's populate.
                conversationsMap.set(otherPartyId, {
                    lastMessage: msg
                });
            }
        }

        const conversationList = [];
        for (const [otherPartyId, data] of conversationsMap) {
            const otherUser = await User.findById(otherPartyId).select('name role email avatar'); // Add avatar if exists

            if (otherUser) {
                // Count unread messages from this user
                const unreadCount = await Message.countDocuments({
                    sender: otherPartyId,
                    recipient: userId,
                    read: false
                });

                conversationList.push({
                    otherUser,
                    lastMessage: data.lastMessage.content,
                    lastMessageTime: data.lastMessage.createdAt,
                    unreadCount
                });
            }
        }

        res.status(200).json({
            success: true,
            count: conversationList.length,
            data: conversationList
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get messages with a specific user
// @route   GET /api/messages/:userId
// @access  Private
exports.getMessages = async (req, res) => {
    try {
        const myId = req.user._id;
        const otherId = req.params.userId;

        const messages = await Message.find({
            $or: [
                { sender: myId, recipient: otherId },
                { sender: otherId, recipient: myId }
            ]
        }).sort({ createdAt: 1 }); // Oldest first

        // Mark messages as read
        await Message.updateMany({
            sender: otherId,
            recipient: myId,
            read: false
        }, { read: true });

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res) => {
    try {
        const { recipientId, content } = req.body;

        const newMessage = await Message.create({
            sender: req.user._id,
            recipient: recipientId,
            content
        });

        res.status(201).json({
            success: true,
            data: newMessage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
