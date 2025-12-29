
async function testAdminFlow() {
    try {
        console.log('1. Logging in as Admin...');
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@odysia.com',
                password: 'adminpassword123'
            })
        });

        const loginData = await loginRes.json();

        if (!loginRes.ok) throw new Error('Login failed: ' + JSON.stringify(loginData));

        console.log(`   SUCCESS: Logged in as ${loginData.name} (${loginData.role})`);
        const token = loginData.token;

        console.log('2. Fetching Expert Applications...');
        const appsRes = await fetch('http://localhost:5000/api/expert-applications', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const appsData = await appsRes.json();

        if (!appsRes.ok) throw new Error('Fetch Error: ' + JSON.stringify(appsData));

        console.log(`   SUCCESS: Fetched ${appsData.count} applications`);
        if (appsData.count > 0) {
            console.log('   Latest Application:', appsData.data[0].fullName, '-', appsData.data[0].status);
        }

    } catch (error) {
        console.error('FAILED:', error.message);
    }
}

testAdminFlow();
