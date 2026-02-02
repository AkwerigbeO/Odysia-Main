const sendEmail = require('./utils/emailService');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const testEmail = async () => {
    try {
        console.log('Attempting to send test email to:', process.env.EMAIL_USER);
        await sendEmail({
            email: process.env.EMAIL_USER, // Send to self for testing
            subject: 'Odysia Test Email',
            message: 'If you receive this, the email service is working.'
        });
        console.log('Test email sent successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Email sending failed:', error);
        process.exit(1);
    }
};

testEmail();
