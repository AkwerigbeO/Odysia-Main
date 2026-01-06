const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const User = require('./models/User');

async function checkUser() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const expertEmail = 'expert@odysia.com';
        let expert = await User.findOne({ email: expertEmail });

        if (!expert) {
            console.log(`Creating demo expert: ${expertEmail}`);
            expert = await User.create({
                name: 'Demo Expert',
                email: expertEmail,
                password: 'password123',
                role: 'expert',
                verified: true,
                skills: ['JavaScript', 'React', 'Node.js'],
                bio: 'This is a demo expert account for testing purposes.',
                phone: '1234567890',
                country: 'USA'
            });
            console.log('Demo expert created successfully.');
        } else {
            console.log(`Demo expert ${expertEmail} already exists. Role: ${expert.role}`);
            if (expert.role !== 'expert') {
                expert.role = 'expert';
                await expert.save();
                console.log('Updated role to expert.');
            }
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkUser();
