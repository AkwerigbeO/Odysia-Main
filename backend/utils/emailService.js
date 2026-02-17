const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email credentials (EMAIL_USER, EMAIL_PASS) are not configured');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or use host/port from env if not using Gmail service shortcut
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const message = {
        from: `${process.env.FROM_NAME || 'Odysia Support'} <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html, // Optional: if you want to send HTML emails
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
