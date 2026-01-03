const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: process.env.JWT_EXPIRE || '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const {
            name, email, password, phone, clientType, companyName, country, communicationMethod,
            // Expert fields
            role, skills, bio, title, hourlyRate, portfolioLink, githubLink, linkedinLink
        } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: role || 'user', // Default to 'user' if not specified
            clientType,
            companyName,
            country,
            communicationMethod,
            // Expert fields
            skills,
            bio,
            title,
            hourlyRate,
            portfolioLink,
            githubLink,
            linkedinLink
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(404);
            throw new Error('There is no user with that email');
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Create reset URL
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Token',
                message,
            });

            res.status(200).json({ success: true, data: 'Email sent' });
        } catch (err) {
            console.log(err);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            res.status(500);
            throw new Error('Email could not be sent');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Reset Password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
const resetPassword = async (req, res, next) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            res.status(400);
            throw new Error('Invalid token');
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            data: 'Password updated successfully',
            token: generateToken(user._id),
        });
    } catch (error) {
        next(error);
    }
};

const ExpertApplication = require('../models/ExpertApplication');

// @desc    Complete expert signup (set password and create user)
// @route   POST /api/auth/expert-setup
// @access  Public
const completeExpertSignup = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            res.status(400);
            throw new Error('Missing token or password');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const applicationId = decoded.applicationId;

        const application = await ExpertApplication.findById(applicationId);

        if (!application) {
            res.status(404);
            throw new Error('Application not found');
        }

        if (application.status !== 'approved') {
            res.status(400);
            throw new Error('Application is not approved');
        }

        // Check if user already exists (extra safety)
        const userExists = await User.findOne({ email: application.email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Create user from application data
        const user = await User.create({
            name: application.fullName,
            email: application.email,
            password: password, // This will be hashed by pre-save hook
            phone: application.phone,
            country: application.country,
            role: 'expert',
            clientType: 'individual',
            communicationMethod: 'email',
            skills: application.skills,
            bio: application.bio,
            portfolioLink: application.portfolioLink,
            githubLink: application.githubLink,
            linkedinLink: application.linkedinLink,
            resume: application.resume,
            verified: true // Since they were approved manually
        });

        // Generate Login Token
        const loginToken = generateToken(user._id);

        res.status(201).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: loginToken
        });

    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
    try {
        const allowedFields = ['name', 'bio', 'phone', 'country', 'skills', 'hourlyRate', 'avatar', 'portfolioLink', 'githubLink', 'linkedinLink'];
        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    forgotPassword,
    resetPassword,
    completeExpertSignup,
    updateProfile
};
