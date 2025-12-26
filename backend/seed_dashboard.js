const mongoose = require('mongoose');
require('dotenv').config(); // Load .env from current dir (backend)
const User = require('./models/User');
const Project = require('./models/Project');
const Activity = require('./models/Activity');
const Notification = require('./models/Notification');

async function seedDashboard() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // 1. Get or Create User
        // Note: You can change this email to the one you are actually using to test, 
        // OR just login with this seed user: seed_client@example.com / Password123!
        let user = await User.findOne({ email: 'seed_client@example.com' });
        if (!user) {
            console.log('Creating seed user...');
            user = await User.create({
                name: 'Seed Client',
                email: 'seed_client@example.com',
                password: 'Password123!',
                phone: '555-0100',
                country: 'USA',
                clientType: 'business',
                communicationMethod: 'email',
                rating: 4.8,
                activeChats: 2,
                pendingActions: 3
            });
        }
        console.log(`User ID: ${user._id}`);

        // 2. Clear existing data for this user
        await Project.deleteMany({ client: user._id });
        await Activity.deleteMany({ user: user._id });
        await Notification.deleteMany({ user: user._id });

        // 3. Create Projects
        console.log('Creating projects...');
        await Project.create([
            {
                client: user._id,
                title: 'E-commerce Redesign',
                description: 'Full redesign of the Shopify store',
                status: 'active',
                budget: 5000,
                spent: 1200,
                startDate: new Date()
            },
            {
                client: user._id,
                title: 'Mobile App MVP',
                description: 'Flutter app for iOS and Android',
                status: 'completed',
                budget: 8000,
                spent: 8000,
                startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
                completionDate: new Date()
            },
            {
                client: user._id,
                title: 'Marketing Campaign',
                status: 'pending',
                budget: 2000,
                spent: 0
            }
        ]);

        // 4. Create Activity
        console.log('Creating activity log...');
        await Activity.create([
            {
                user: user._id,
                type: 'project_completed',
                title: 'Project Completed',
                description: 'Mobile App MVP was marked as completed',
            },
            {
                user: user._id,
                type: 'payment_released',
                title: 'Payment Released',
                description: '$1200 released for E-commerce Redesign milestone 1',
            },
            {
                user: user._id,
                type: 'proposal_received',
                title: 'New Proposal',
                description: 'Alice Dev submitted a proposal for Marketing Campaign',
            }
        ]);

        // 5. Create Notifications
        console.log('Creating notifications...');
        await Notification.create([
            {
                user: user._id,
                type: 'success',
                message: 'Your project "Mobile App MVP" has been successfully completed!',
                read: false
            },
            {
                user: user._id,
                type: 'alert',
                message: 'You have a pending invoice for $1200 due tomorrow.',
                read: false
            }
        ]);

        console.log('Seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
}

seedDashboard();
