const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
    startDate: Date,
    completionDate: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
