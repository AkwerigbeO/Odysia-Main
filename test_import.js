const path = require('path');
try {
    const pPath = path.join(__dirname, 'backend', 'models', 'Project.js');
    console.log('Attempting to require:', pPath);
    const Project = require(pPath);
    console.log('Success!');
} catch (e) {
    console.error('Failed:', e);
}
