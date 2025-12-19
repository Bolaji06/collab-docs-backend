import { prisma } from "../config/database";
const API_URL = 'http://localhost:3000/api/auth';
async function runTest() {
    const email = `test-${Date.now()}@example.com`;
    const password = 'Password123';
    const username = `testuser${Date.now()}`;
    console.log('--- Starting OTP Verification Test ---');
    // 1. Register
    console.log(`\n1. Registering user: ${email}`);
    const regRes = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
    });
    const regData = await regRes.json();
    console.log('Registration Status:', regRes.status);
    console.log('Registration Response:', regData);
    if (regRes.status !== 201)
        return;
    // 2. Check DB for OTP
    console.log('\n2. Checking Database for OTP...');
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        console.error('User not found in DB!');
        return;
    }
    console.log('User created. isVerified:', user.isVerified);
    console.log('OTP:', user.otp);
    if (user.isVerified) {
        console.error('FAIL: User should not be verified yet.');
        return;
    }
    // 3. Try Login (Should Fail)
    console.log('\n3. Attempting Login before verification...');
    const loginFailRes = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const loginFailData = await loginFailRes.json();
    console.log('Login Status:', loginFailRes.status);
    console.log('Login Response:', loginFailData);
    if (loginFailRes.status !== 401) {
        console.error('FAIL: Login should have failed with 401');
    }
    else {
        console.log('SUCCESS: Login failed as expected.');
    }
    // 4. Verify Email
    console.log(`\n4. Verifying Email with OTP: ${user.otp}`);
    const verifyRes = await fetch(`${API_URL}/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: user.otp }),
    });
    const verifyData = await verifyRes.json();
    console.log('Verification Status:', verifyRes.status);
    console.log('Verification Response:', verifyData);
    if (verifyRes.status === 200 && verifyData.success) {
        console.log('SUCCESS: Email verified.');
    }
    else {
        console.error('FAIL: Verification failed.');
        return;
    }
    // 5. Login (Should Success)
    console.log('\n5. Attempting Login after verification...');
    const loginSuccessRes = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const loginSuccessData = await loginSuccessRes.json();
    console.log('Login Status:', loginSuccessRes.status);
    if (loginSuccessRes.status === 200) {
        console.log('SUCCESS: Login successful.');
    }
    else {
        console.error('FAIL: Login failed after verification.');
    }
}
runTest()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=otp-test.js.map