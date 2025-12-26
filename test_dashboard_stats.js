const API_URL = 'http://localhost:5000/api';

async function testDashboardStats() {
    // 1. Register a NEW user (Fresh Slate)
    const freshUser = {
        name: 'Fresh User',
        email: `fresh${Date.now()}@example.com`,
        password: 'Password123!',
        phone: '1234567890',
        clientType: 'individual',
        country: 'USA',
        communicationMethod: 'email',
        confirmPassword: 'Password123!'
    };

    try {
        console.log('Registering fresh user...');
        const regRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(freshUser),
            headers: { 'Content-Type': 'application/json' }
        });
        const regData = await regRes.json();

        if (!regRes.ok) throw new Error(`Registration failed: ${JSON.stringify(regData)}`);

        const token = regData.token;
        console.log('Logged in as Fresh User.');

        // 2. Fetch Stats
        console.log('Fetching stats...');
        const statsRes = await fetch(`${API_URL}/projects/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const stats = await statsRes.json();
        console.log('Stats Response:', stats);

        if (!statsRes.ok) throw new Error('Failed to fetch stats');

        if (stats.totalProjects === 0 && stats.totalSpent === 0) {
            console.log('SUCCESS: Empty state handled correctly.');
        } else {
            console.error('FAIL: Expected 0 stats for fresh user.');
        }

    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

testDashboardStats();
