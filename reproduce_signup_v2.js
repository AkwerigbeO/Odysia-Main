const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'backend/.env') });

async function reproduceSignup() {
    try {
        const uniqueSuffix = Date.now();
        const payload = {
            name: `Test Client ${uniqueSuffix}`,
            email: `testclient${uniqueSuffix}@example.com`,
            password: 'password123',
            clientType: 'company',
            companyName: 'Test Corp',
            country: 'Nigeria',
            phone: '+2348000000000'
        };

        console.log('Attemping signup with:', payload.email);

        const response = await axios.post('http://localhost:5000/api/auth/register', payload);

        console.log('Signup Response Status:', response.status);
        console.log('Signup Response Data:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Signup Failed:', error.response.status);
            console.error('Error Data:', error.response.data);
        } else {
            console.error('Signup Error:', error.message);
        }
    }
}

reproduceSignup();
