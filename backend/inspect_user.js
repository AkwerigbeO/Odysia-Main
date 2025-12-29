const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config({ path: './.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const inspectUser = async () => {
    await connectDB();

    const email = 'yyakd@mailto.plus';
    const password = '7ws7D_AYpZHhzLK';

    try {
        console.log(`Inspecting user: ${email}`);
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User NOT FOUND in database.');
        } else {
            console.log('User Found:');
            console.log(`ID: ${user._id}`);
            console.log(`Name: ${user.name}`);
            console.log(`Role: ${user.role}`);
            console.log(`Verified: ${user.verified}`);
            console.log(`Full Object:`, user.toObject());

            // Test Password Matching
            const isMatch = await user.matchPassword(password);
            console.log(`Password Match Test: ${isMatch ? 'PASSED' : 'FAILED'}`);
        }

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

inspectUser();
