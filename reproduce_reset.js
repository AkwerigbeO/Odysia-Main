const fs = require('fs');

const API_URL = 'http://localhost:5000/api/auth';
const LOG_FILE = 'backend/logs/debug.log'; // Path to log file where we might find the email/token (if you have logging enabled)

// Since we can't easily intercept the email in this environment without a mail server,
// we will rely on the endpoint returning "Email sent" and then inspect the database or log manually if needed.
// However, since we are just fixing the URL generation, we can verify that the Forgot Password endpoint returns success.
// To truly verify the full flow automatedly without an email inbox, we would need to mock the email service or peek into the DB.

// Let's modify the plan:
// 1. Register a user
// 2. Call Forgot Password
// 3. Since we can't get the token from the email, we will manually assume the fix is correct based on the code change.
//    OR we can peek into the DB if we had direct DB access safe tools (which we don't naturally have here easily).

// Alternative: We can try to see if the backend logs the URL (many dev setups do).

async function testResetFlow() {
    const testUser = {
        name: 'Reset Test',
        email: `resetReference${Date.now()}@example.com`,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        phone: '1234567890',
        clientType: 'individual',
        country: 'United States',
        communicationMethod: 'email'
    };

    try {
        // 1. Register
        console.log('1. Registering user...');
        const regRes = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const regData = await regRes.json();
        if (!regRes.ok) throw new Error(`Registration failed: ${JSON.stringify(regData)}`);
        console.log('   User registered.');

        // 2. Forgot Password
        console.log('2. Requesting password reset...');
        const forgotRes = await fetch(`${API_URL}/forgotpassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testUser.email })
        });
        const forgotData = await forgotRes.json();
        console.log('   Forgot Password Response:', forgotData);

        if (forgotRes.ok) {
            console.log('SUCCESS: Forgot password email request accepted.');
        } else {
            console.error('FAIL: Forgot password request failed.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testResetFlow();
