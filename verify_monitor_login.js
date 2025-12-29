const verifyLogin = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'yyakd@mailto.plus',
                password: 'password123'
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            console.log('Login Successful!');
            console.log('User Role:', data.user.role);
            console.log('Token received');
        } else {
            console.log('Login Failed:', response.status, data);
        }
    } catch (error) {
        console.error('Request Error:', error.message);
    }
};

verifyLogin();
