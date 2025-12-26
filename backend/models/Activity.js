const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['project_created', 'proposal_received', 'payment_released', 'project_completed', 'message_received', 'info'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    relatedId: {
        type: mongoose.Schema.Types.ObjectId // Can be project ID, payment ID, etc.
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);
