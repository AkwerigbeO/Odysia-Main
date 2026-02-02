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
            confirmPassword: 'password123',
            clientType: 'business',
            companyName: 'Test Corp',
            country: 'Nigeria',
            phone: '+2348000000000',
            communicationMethod: 'email'
        };

        console.log('Attemping signup with:', payload.email);

        const response = await axios.post('http://localhost:5000/api/auth/register', payload);

        console.log('SUCCESS: Signup Response Status:', response.status);
    } catch (error) {
        if (error.response) {
            console.error('FAILED: Status:', error.response.status);
            console.error('Error Message:', error.response.data.message || error.response.data);
        } else {
            console.error('FAILED: Network/Other Error:', error.message);
        }
    }
}

reproduceSignup();
