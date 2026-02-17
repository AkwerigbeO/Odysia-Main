const ExpertApplication = require('../models/ExpertApplication');
const User = require('../models/User');
const { createNotification } = require('./notificationController');
const { uploadToGridFS } = require('../utils/gridfsHelper');

// @desc    Submit a new expert application
// @route   POST /api/expert-applications
// @access  Public
const submitApplication = async (req, res, next) => {
    try {
        const {
            fullName, email, phone, country,
            skills, bio, portfolioLink, githubLink, linkedinLink
        } = req.body;

        let resumeUrl = req.body.resume; // Fallback if sent as string

        // Handle File Upload if present
        if (req.file) {
            console.log('Resume file received:', req.file.originalname);
            const fileData = await uploadToGridFS(
                req.file.buffer,
                req.file.originalname,
                req.file.mimetype,
                { type: 'resume', email }
            );
            resumeUrl = `/api/files/${fileData.id}`;
        }

        // Check if pending application already exists
        const existingApp = await ExpertApplication.findOne({ email });
        if (existingApp) {
            res.status(400);
            throw new Error('An application with this email already exists.');
        }

        const application = await ExpertApplication.create({
            fullName,
            email,
            phone,
            country,
            skills,
            bio,
            portfolioLink,
            githubLink,
            linkedinLink,
            resume: resumeUrl
        });

        // Notify Admin
        try {
            const admin = await User.findOne({ role: 'admin' });
            if (admin) {
                await createNotification(
                    admin._id,
                    'system',
                    'New Expert Application',
                    `New application received from ${fullName}`,
                    application._id
                );
            }
        } catch (error) {
            console.error('Failed to notify admin', error);
        }

        res.status(201).json({
            success: true,
            data: application,
            message: 'Application submitted successfully. We will review it shortly.'
        });

    } catch (error) {
        next(error);
    }
};

const jwt = require('jsonwebtoken'); // Need jwt for token generation
const sendEmail = require('../utils/emailService');

// @desc    Approve an expert application
// @route   PUT /api/expert-applications/:id/approve
// @access  Private (Admin)
const approveApplication = async (req, res, next) => {
    try {
        const application = await ExpertApplication.findById(req.params.id);

        if (!application) {
            res.status(404);
            throw new Error('Application not found');
        }

        application.status = 'approved';
        await application.save();

        // Generate setup token (48h expiry, one-time use enforced in completeExpertSignup)
        const setupToken = jwt.sign(
            { applicationId: application._id },
            process.env.JWT_SECRET,
            { expiresIn: '48h' }
        );

        // Construct setup URL
        const setupUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/expert-setup?token=${setupToken}`;

        const message = `
            <h1>Congratulations!</h1>
            <p>Your application to join Odysia as an expert has been approved.</p>
            <p>Please click the link below to set your password and complete your account setup:</p>
            <a href="${setupUrl}" clicktracking=off>${setupUrl}</a>
        `;

        try {
            await sendEmail({
                email: application.email,
                subject: 'Odysia Expert Application Approved',
                message: `Your application has been approved. Setup your account here: ${setupUrl}`,
                html: message
            });

            res.status(200).json({
                success: true,
                data: application,
                message: 'Application approved and email sent'
            });
        } catch (emailError) {
            console.error('Email send failed', emailError);
            res.status(500);
            throw new Error('Application approved but email failed to send');
        }

    } catch (error) {
        next(error);
    }
};

// @desc    Get all expert applications
// @route   GET /api/expert-applications
// @access  Private (Admin)
const getApplications = async (req, res, next) => {
    try {
        const { status } = req.query;
        let query = {};

        if (status) {
            query.status = status;
        }

        const applications = await ExpertApplication.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Reject an expert application
// @route   PUT /api/expert-applications/:id/reject
// @access  Private (Admin)
const rejectApplication = async (req, res, next) => {
    try {
        const application = await ExpertApplication.findById(req.params.id);

        if (!application) {
            res.status(404);
            throw new Error('Application not found');
        }

        application.status = 'rejected';
        await application.save();

        const message = `
            <h1>Application Status Update</h1>
            <p>Thank you for your interest in joining Odysia.</p>
            <p>After careful review, we regret to inform you that we cannot proceed with your application at this time.</p>
            <p>We encourage you to apply again in the future as you gain more experience and expand your portfolio.</p>
        `;

        try {
            await sendEmail({
                email: application.email,
                subject: 'Odysia Expert Application Update',
                message: 'Your application has been reviewed. elaborate details in html body',
                html: message
            });
        } catch (emailError) {
            console.error('Email send failed', emailError);
            // Don't fail the request if email fails, just log it
        }

        res.status(200).json({
            success: true,
            data: application,
            message: 'Application rejected'
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitApplication,
    approveApplication,
    getApplications,
    rejectApplication
};
