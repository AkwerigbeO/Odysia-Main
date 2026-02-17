const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const { escapeHtml } = require('../utils/htmlHelper');

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res) => {
    try {
        const { name, email, company, projectType, budget, timeline, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            company,
            projectType,
            budget,
            timeline,
            message,
        });

        // Send Email Notification
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER, // Send to specific recipient or default to sender
                replyTo: email, // Allow replying directly to the customer
                subject: `New Project Inquiry from ${name}`,
                html: `
          <h1>New Project Inquiry</h1>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company) || 'N/A'}</p>
          <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
          <p><strong>Budget:</strong> ${escapeHtml(budget) || 'N/A'}</p>
          <p><strong>Timeline:</strong> ${escapeHtml(timeline) || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message)}</p>
        `,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            } catch (emailError) {
                console.error('Error sending email:', emailError);
            }
        }

        res.status(201).json({
            success: true,
            data: contact,
            message: 'Message sent successfully',
        });
    } catch (error) {
        console.error('Controller Error:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({
                success: false,
                error: messages,
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error',
            });
        }
    }
};
