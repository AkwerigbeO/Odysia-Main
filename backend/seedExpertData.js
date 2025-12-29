const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');
const Transaction = require('./models/Transaction');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const seedExpertData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // 1. Find the Expert User
        const expertEmail = 'yyakd@mailto.plus';
        const expert = await User.findOne({ email: expertEmail });

        if (!expert) {
            console.error('Expert user not found! Please create the expert account first.');
            process.exit(1);
        }
        console.log(`Found Expert: ${expert.name} (${expert._id})`);

        // 2. Find or Create a Dummy Client User
        let client = await User.findOne({ email: 'client@dummy.com' });
        if (!client) {
            client = await User.create({
                name: 'TechCorp Manager',
                email: 'client@dummy.com',
                password: 'password123',
                role: 'client',
                country: 'USA',
                phone: '+1234567890'
            });
            console.log('Created Dummy Client');
        } else {
            console.log(`Found Dummy Client: ${client.name}`);
        }

        // 3. Clear existing Projects/Transactions for this expert to avoid duplicates
        await Project.deleteMany({ expert: expert._id });
        await Transaction.deleteMany({ recipient: expert._id });
        console.log('Cleared existing projects and transactions for expert');

        // 4. Create a Project
        const project = await Project.create({
            title: 'Odysia E-commerce Platform',
            description: 'Full-stack platform development for Odysia marketplace',
            client: client._id,
            expert: expert._id,
            status: 'active',
            budget: 500000,
            spent: 200000,
            startDate: new Date(),
            milestones: [
                {
                    title: 'UI/UX Design',
                    description: 'Complete Figma designs including mobile views',
                    amount: 100000,
                    status: 'completed',
                    dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
                },
                {
                    title: 'Frontend Development',
                    description: 'Implement React frontend with Tailwind CSS',
                    amount: 200000,
                    status: 'in_progress',
                    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
                },
                {
                    title: 'Backend API',
                    description: 'Node.js Express API integration',
                    amount: 200000,
                    status: 'pending',
                    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
                }
            ]
        });
        console.log(`Created Project: ${project.title}`);

        // 5. Create Transactions
        // Transaction 1: Payment for Milestone 1
        await Transaction.create({
            amount: 100000,
            currency: 'NGN',
            status: 'completed',
            payer: client._id,
            recipient: expert._id,
            project: project._id,
            type: 'milestone_payment',
            description: 'Payment for UI/UX Design milestone'
        });

        // Transaction 2: Deposit for Milestone 2 (Pending/Escrow)
        await Transaction.create({
            amount: 200000,
            currency: 'NGN',
            status: 'pending',
            payer: client._id,
            recipient: expert._id,
            project: project._id,
            type: 'milestone_payment',
            description: 'Escrow deposit for Frontend Development'
        });

        console.log('Created 2 Transactions (1 Completed, 1 Pending)');

        // 6. Create Messages (Conversation)
        const Message = require('./models/Message');
        await Message.deleteMany({ $or: [{ sender: expert._id }, { recipient: expert._id }] });

        // Msg 1: Client -> Expert
        await Message.create({
            sender: client._id,
            recipient: expert._id,
            content: 'Hi Morgan! I see the UI designs are done. They look great!',
            read: true,
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
        });

        // Msg 2: Expert -> Client
        await Message.create({
            sender: expert._id,
            recipient: client._id,
            content: 'Thanks! glad you like them. I am starting on the React implementation now.',
            read: true,
            createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000) // 23 hours ago
        });

        // Msg 3: Client -> Expert
        await Message.create({
            sender: client._id,
            recipient: expert._id,
            content: 'Perfect. Let me know when you have a demo link ready.',
            read: false, // Unread
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
        });

        console.log('Created 3 Sample Messages');
        console.log('Seed Data Successfully Populated!');
        process.exit();

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedExpertData();
