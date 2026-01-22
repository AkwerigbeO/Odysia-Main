const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'completed', 'pending', 'cancelled'],
        default: 'pending'
    },
    budget: {
        type: Number,
        default: 0
    },
    spent: {
        type: Number,
        default: 0
    },
    milestones: [{
        title: {
            type: String,
            required: true
        },
        description: String,
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'in_progress', 'pending_review', 'approved', 'rejected', 'completed', 'paid'],
            default: 'pending'
        },
        dueDate: Date,
        files: [{
            originalName: String,
            fileId: String,
            mimeType: String,
            uploadDate: { type: Date, default: Date.now }
        }]
    }],
    startDate: Date,
    completionDate: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
