const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function checkUser() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: 'uybeyp@mailto.plus' });
        if (user) {
            console.log('User found:', user);
        } else {
            console.log('User NOT found');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

checkUser();
