
async function testExpertRegistration() {
    const expertData = {
        name: "Test Expert API Fetch",
        email: `expert_fetch_${Date.now()}@test.com`,
        password: "password123",
        phone: "1234567890",
        country: "Canada",
        clientType: "individual",
        communicationMethod: "email",
        role: "expert",
        skills: ["Node.js", "React"],
        bio: "This is a test bio from the fetch test script. It should be long enough.",
        title: "Senior Developer",
        hourlyRate: 100
    };

    try {
        console.log('Attempting to register expert...');
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expertData)
        });

        const data = await response.json();

        if (response.ok && data.token) {
            console.log('SUCCESS: Expert registered successfully!');
            console.log('Token received:', data.token ? 'Yes' : 'No');
            console.log('Role:', data.role);

            // Verify stats endpoint access
            try {
                const statsResponse = await fetch('http://localhost:5000/api/expert/stats', {
                    headers: { Authorization: `Bearer ${data.token}` }
                });
                const statsData = await statsResponse.json();

                if (statsResponse.ok) {
                    console.log('SUCCESS: Expert stats accessed!');
                    console.log('Stats:', statsData);
                } else {
                    console.error('FAILED to access stats:', statsData);
                }
            } catch (statsErr) {
                console.error('FAILED to access stats:', statsErr.message);
            }

        } else {
            console.error('FAILED: Unexpected response status', response.status);
            console.error('Error:', data);
        }
    } catch (error) {
        console.error('FAILED: Registration error:', error.message);
    }
}

testExpertRegistration();
