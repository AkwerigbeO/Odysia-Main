const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function listExperts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const experts = await User.find({ role: 'expert' }).select('name email role');
        console.log('Experts found:', experts.length);
        console.log(JSON.stringify(experts, null, 2));
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

listExperts();
