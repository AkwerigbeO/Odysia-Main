const mongoose = require('mongoose');
const User = require('./models/User');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function listExperts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const experts = await User.find({ role: 'expert' }).select('name email');
        fs.writeFileSync('experts_list.json', JSON.stringify(experts, null, 2));
        console.log('Experts list written to experts_list.json');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

listExperts();
