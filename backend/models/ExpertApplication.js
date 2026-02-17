const mongoose = require('mongoose');

const expertApplicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    skills: [String],
    bio: {
        type: String,
        required: true
    },
    portfolioLink: String,
    githubLink: String,
    linkedinLink: String,
    resume: String, // Path to file if uploaded
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    setupTokenUsed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ExpertApplication', expertApplicationSchema);
