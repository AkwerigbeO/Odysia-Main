const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function testAuthPersistence() {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const email = 'uybeyp@mailto.plus';
        const user = await User.findOne({ email });

        if (!user) {
            console.error('User not found!');
            process.exit(1);
        }

        console.log(`User found: ${user._id}`);

        // Generate Token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: '30d',
        });
        console.log('Generated Token:', token);

        // Simulate Verify Token (what authMiddleware does)
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Token:', decoded);

        const foundUser = await User.findById(decoded.id).select('-password');

        if (foundUser) {
            console.log('SUCCESS: User retrieved from token.');
            console.log('User Role:', foundUser.role);
            console.log('User Name:', foundUser.name);
        } else {
            console.error('FAILURE: User NOT found from token ID.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

testAuthPersistence();
