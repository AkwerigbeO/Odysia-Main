
async function testExpertFullFlow() {
    const timestamp = Date.now();
    const appData = {
        fullName: `Flow Expert ${timestamp}`,
        email: `flow_expert_${timestamp}@test.com`,
        phone: "555-000-1111",
        country: "UK",
        skills: ["Security", "Testing"],
        bio: "Testing the full approval flow.",
        portfolioLink: "https://flow.test"
    };

    try {
        console.log('1. Submitting Application...');
        const submitRes = await fetch('http://localhost:5000/api/expert-applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appData)
        });
        const submitData = await submitRes.json();

        if (!submitRes.ok || !submitData.success) {
            throw new Error(`Submission failed: ${submitData.message}`);
        }

        const appId = submitData.data._id;
        console.log(`   SUCCESS: Application ID: ${appId}`);

        console.log('2. Approving Application (Simulating Admin)...');
        const approveRes = await fetch(`http://localhost:5000/api/expert-applications/${appId}/approve`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });
        const approveData = await approveRes.json();

        if (!approveRes.ok || !approveData.success) {
            throw new Error(`Approval failed: ${approveData.message}`);
        }

        console.log(`   SUCCESS: Approved. Setup URL: ${approveData.setupUrl}`);

        // Extract token
        const setupUrl = approveData.setupUrl;
        const token = setupUrl.split('token=')[1];
        console.log(`   Token Extracted: ${token.substring(0, 20)}...`);

        console.log('3. Completing Setup (Setting Password)...');
        const setupRes = await fetch('http://localhost:5000/api/auth/expert-setup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: token,
                password: 'newpassword123'
            })
        });
        const setupData = await setupRes.json();

        if (!setupRes.ok || !setupData.success) {
            throw new Error(`Setup failed: ${setupData.message}`);
        }

        console.log('   SUCCESS: Account Created!');
        console.log(`   Role: ${setupData.role}`);
        console.log(`   Login Token: ${setupData.token ? 'Received' : 'Missing'}`);

    } catch (error) {
        console.error('FAILED:', error.message);
    }
}

testExpertFullFlow();
