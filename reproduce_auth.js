const API_URL = 'http://localhost:5000/api/auth';

async function testAuth() {
    const testUser = {
        name: 'Test Client',
        email: `testclient${Date.now()}@example.com`,
        password: 'Password123!',
        confirmPassword: 'Password123!',
        phone: '1234567890',
        clientType: 'individual',
        country: 'United States',
        communicationMethod: 'email'
    };

    try {
        console.log('Registering user...');
        const registerRes = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });

        const registerData = await registerRes.json();
        console.log('Registration Response:', registerData);

        if (!registerRes.ok) {
            console.error('Registration Failed:', registerData);
            return;
        }

        console.log('Logging in...');
        const loginRes = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: testUser.email,
                password: testUser.password
            })
        });

        const loginData = await loginRes.json();
        console.log('Login Response:', loginData);

        if (!loginData.role) {
            console.error('FAIL: Role is missing in login response!');
        } else {
            console.log('SUCCESS: Role returned:', loginData.role);
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testAuth();
