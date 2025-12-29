const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const {
    getConversations,
    getMessages,
    sendMessage
} = require('../controllers/messageController');

router.use(protect);

router.get('/conversations', getConversations);
router.get('/:userId', getMessages);
router.post('/', sendMessage);

module.exports = router;
