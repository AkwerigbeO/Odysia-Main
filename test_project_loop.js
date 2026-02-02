const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'backend/.env') });

const Project = require(path.join(__dirname, 'backend', 'models', 'Project.js'));
const User = require(path.join(__dirname, 'backend', 'models', 'User.js'));

async function testProjectFlow() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // 1. Find a client
        console.log('Searching for a client...');
        const client = await User.findOne({ role: 'client' });
        if (!client) {
            console.error('No client found! Seed the database first.');
            throw new Error('No client found');
        }
        console.log('Client found:', client.email);

        // 2. Create a test project for this client (simulating POST /api/projects)
        const project = await Project.create({
            client: client._id,
            title: "Backend Core Loop Test Project",
            description: "Testing CRUD and Milestone flow",
            budget: 5000,
            status: 'active'
        });
        console.log('Project created:', project._id);

        // 3. Add a milestone (simulating POST /:id/milestones)
        // We'll use the model directly to verify logic, but in real app we'd hit the endpoint
        project.milestones.push({
            title: "Phase 1: Setup",
            description: "Initial setup",
            amount: 1000,
            dueDate: new Date(),
            status: 'pending'
        });
        await project.save();
        console.log('Milestone added.');

        const milestoneId = project.milestones[0]._id;

        // 4. Update Milestone Status to 'approved' (simulating PUT /:id/milestones/:mid)
        // We simulate the controller logic here
        const milestone = project.milestones.id(milestoneId);
        milestone.status = 'approved';
        await project.save();
        console.log('Milestone approved.');

        // 5. Verify
        const updatedProject = await Project.findById(project._id);
        console.log('Verified Project Status:', updatedProject.milestones[0].status); // Should be 'approved'

        // Clean up
        await Project.findByIdAndDelete(project._id);
        console.log('Test Project deleted');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        mongoose.connection.close();
    }
}

testProjectFlow();
