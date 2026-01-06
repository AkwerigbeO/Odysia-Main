const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const User = require('./models/User');

async function testAdminLogin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const email = 'admin@odysia.com';
        const password = 'password123';

        const user = await User.findOne({ email });

        if (!user) {
            console.log('Admin user not found!');
        } else {
            console.log(`User found: ${user.email}, Role: ${user.role}`);
            const isMatch = await user.matchPassword(password);
            console.log(`Password match result: ${isMatch}`);

            if (!isMatch) {
                console.log('Password mismatch. Resetting password...');
                user.password = password; // Pre-save hook will hash this
                await user.save();
                console.log('Password reset successfully.');

                // Verify again
                const isMatchNow = await user.matchPassword(password);
                console.log(`Password match result after reset: ${isMatchNow}`);
            }
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

testAdminLogin();
