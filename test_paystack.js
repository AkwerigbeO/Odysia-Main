const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'backend/.env') });
const Project = require(path.join(__dirname, 'backend', 'models', 'Project.js'));
const User = require(path.join(__dirname, 'backend', 'models', 'User.js'));
const axios = require('axios');

// Mock request to localhost
// We need the server running for this to work fully if we want to hit the API, 
// OR we can import controller. But Controller uses req, res.
// Let's use the actual internal logic to test "Transaction Creation" + "Axis Call"

const { initializePayment } = require(path.join(__dirname, 'backend', 'controllers', 'paymentController.js'));

// Mock Req/Res
const req = {
    user: { _id: '507f1f77bcf86cd799439011' }, // Dummy ID
    body: {
        projectId: 'dummy_project_id',
        milestoneId: 'dummy_milestone_id',
        amount: 5000,
        email: 'test@example.com'
    }
};

const res = {
    status: function (code) {
        this.statusCode = code;
        return this;
    },
    json: function (data) {
        console.log('Response:', this.statusCode, data);
    }
};

// We need to Connect DB first
async function testPaystack() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected DB');

        // We need a real project/milestone ID or findById will fail
        // Create dummy project
        const client = await User.findOne({ role: 'client' });
        req.user._id = client._id;
        req.body.email = client.email;

        const project = await Project.create({
            client: client._id,
            title: "Paystack Test Project",
            status: "active",
            milestones: [{
                title: "M1",
                amount: 5000,
                status: "pending"
            }]
        });

        req.body.projectId = project._id;
        req.body.milestoneId = project.milestones[0]._id;

        // Run Controller
        // Note: Transaction model requires 'recipient'. 
        // In controller we set recipient to expert or user. 
        // If expert is null, it sets to req.user._id (payer). Valid for test.

        await initializePayment(req, res);

        // Cleanup
        await Project.findByIdAndDelete(project._id);
        console.log('Cleanup done');

    } catch (e) {
        console.error(e);
    } finally {
        mongoose.connection.close();
    }
}

testPaystack();
