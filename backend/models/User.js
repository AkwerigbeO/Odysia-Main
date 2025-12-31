const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'expert', 'client'],
        default: 'user',
    },
    phone: {
        type: String,
        required: true
    },
    // Client specific fields
    clientType: {
        type: String,
        enum: ['individual', 'business', 'startup'],
    },
    companyName: String,

    // Expert specific fields
    skills: [String],
    bio: String,
    title: String,
    hourlyRate: Number,
    portfolioLink: String,
    githubLink: String,
    linkedinLink: String,
    resume: String, // Path to resume file
    avatar: String, // GridFS file ID for profile picture
    verified: {
        type: Boolean,
        default: false
    },

    country: {
        type: String,
        required: true
    },
    communicationMethod: {
        type: String,
        enum: ['email', 'phone', 'both'],
        default: 'email'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    rating: {
        type: Number,
        default: 0
    },
    activeChats: {
        type: Number,
        default: 0
    },
    pendingActions: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('User', userSchema);
