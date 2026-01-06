const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const User = require('./models/User');

async function checkAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@odysia.com';
        let admin = await User.findOne({ email: adminEmail });

        if (!admin) {
            console.log(`Creating demo admin: ${adminEmail}`);
            admin = await User.create({
                name: 'Odysia Admin',
                email: adminEmail,
                password: 'password123',
                role: 'admin',
                verified: true,
                clientType: 'business', // Required fields for schema
                companyName: 'Odysia HQ',
                country: 'USA',
                phone: '0000000000'
            });
            console.log('Demo admin created successfully.');
        } else {
            console.log(`Demo admin ${adminEmail} already exists. Role: ${admin.role}`);
            if (admin.role !== 'admin') {
                admin.role = 'admin';
                await admin.save();
                console.log('Updated role to admin.');
            }
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkAdmin();
