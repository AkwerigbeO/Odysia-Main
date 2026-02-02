const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Transaction = require('../models/Transaction');
const Project = require('../models/Project');
const User = require('../models/User');
const { createNotification } = require('./notificationController');

// Initialize Paystack Payment
// POST /api/payment/initialize
exports.initializePayment = async (req, res, next) => {
    try {
        const { projectId, milestoneId, amount, email } = req.body;

        // Verify Project and Milestone exist
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ success: false, error: 'Project not found' });

        const milestone = project.milestones.id(milestoneId);
        if (!milestone) return res.status(404).json({ success: false, error: 'Milestone not found' });

        // Generate unique reference
        const reference = uuidv4();

        // Initialize transaction with Paystack
        const response = await axios.post('https://api.paystack.co/transaction/initialize', {
            email: email, // Client's email
            amount: amount * 100, // Amount in kobo
            reference: reference,
            callback_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/callback`, // Frontend callback
            metadata: {
                projectId,
                milestoneId,
                clientId: req.user._id.toString()
            }
        }, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Create Pending Transaction Record
        await Transaction.create({
            amount: amount,
            status: 'pending',
            payer: req.user._id,
            recipient: project.expert ? project.expert : req.user._id, // Ideally Platform escrow first, but linking to user for now? Or Admin?
            // "Recipient" logic is tricky for Escrow. Let's set Recipient to 'Admin' or leave it to Platform.
            // For now, let's just make sure Schema validates. 
            // Reuse payer as recipient for "self-funding" logic effectively, or find an Admin user.
            // Better: 'recipient' should be the Expert (intent), but funds held by platform.
            project: projectId,
            milestone: milestoneId,
            type: 'milestone_payment',
            reference: reference,
            description: `Funding for milestone: ${milestone.title}`
        });

        res.status(200).json({
            success: true,
            data: response.data.data // contains authorization_url
        });

    } catch (error) {
        console.error('Paystack Init Error:', error.response?.data || error.message);
        res.status(500).json({ success: false, error: 'Payment initialization failed' });
    }
};

// Verify Paystack Payment
// GET /api/payment/verify
exports.verifyPayment = async (req, res, next) => {
    try {
        const { reference } = req.query;

        if (!reference) {
            return res.status(400).json({ success: false, error: 'No reference provided' });
        }

        const transaction = await Transaction.findOne({ reference });
        if (!transaction) {
            return res.status(404).json({ success: false, error: 'Transaction not found' });
        }

        if (transaction.status === 'completed') {
            return res.status(200).json({ success: true, message: 'Transaction already verified' });
        }

        // Verify with Paystack
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        });

        const data = response.data.data;

        if (data.status === 'success') {
            // Update Transaction
            transaction.status = 'completed';
            await transaction.save();

            // Update Milestone Status
            const project = await Project.findById(transaction.project);
            const milestone = project.milestones.id(transaction.milestone);

            milestone.status = 'in_progress'; // Funded -> Ready to start
            // Or 'active'? Enum has 'active' for project, but 'in_progress' for milestone.

            // Update Project "Spent" (Technically it's deposited/escrowed, not paid out yet)
            // But from Client perspective, it's spent.
            // Let's just update milestone status for now.

            await project.save();

            // Notify Expert
            if (project.expert) {
                await createNotification(
                    project.expert,
                    'payment',
                    'Milestone Funded',
                    `Client has funded the milestone: ${milestone.title}. You can begin work!`,
                    project._id
                );
            }

            // Notify Client
            await createNotification(
                transaction.payer,
                'payment',
                'Payment Successful',
                `Payment for milestone "${milestone.title}" was successful.`,
                project._id
            );

            return res.status(200).json({ success: true, data: transaction });
        } else {
            transaction.status = 'failed';
            await transaction.save();
            return res.status(400).json({ success: false, error: 'Transaction failed at gateway' });
        }

    } catch (error) {
        console.error('Paystack Verify Error:', error.response?.data || error.message);
        res.status(500).json({ success: false, error: 'Payment verification failed' });
    }
};

// Get User Transactions
// GET /api/payment
exports.getUserTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({
            $or: [{ payer: req.user._id }, { recipient: req.user._id }]
        })
            .sort({ createdAt: -1 })
            .populate('project', 'title') // Populate project title
            .populate('milestone', 'title'); // Populate milestone title

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        console.error('Get Transactions Error:', error.message);
        res.status(500).json({ success: false, error: 'Failed to retrieve transactions' });
    }
};
