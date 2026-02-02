const mongoose = require('mongoose');
const Project = require('./models/Project'); // Adjust path to model
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function listProjects() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const projects = await Project.find({});
        console.log('Total Projects:', projects.length);
        console.log(JSON.stringify(projects, null, 2));
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

listProjects();
