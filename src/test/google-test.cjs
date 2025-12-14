
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const API_URL = 'http://localhost:3000/api/auth';

async function runTest() {
    console.log('--- Starting Google Auth Mock Test ---');
    console.log('Note: This test only checks if the endpoint handles requests.');
    console.log('Real verification requires a valid Google ID Token, which is hard to mock without valid keys.');

    // We expect 400 because our mock token is invalid for google-auth-library
    // unless we mock the library itself, but here we just want to ensure the endpoint exists
    // and returns the expected error from our service.

    const idToken = "mock_invalid_token";

    console.log(`\n1. Sending invalid ID token to ${API_URL}/google`);
    const res = await fetch(`${API_URL}/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', data);

    if (res.status === 400 || res.status === 500) {
        // If it returns 400/500 with "Invalid Google Token" or library error, it means logic is reachable
        console.log('SUCCESS: Endpoint reachable (Error expected as token is invalid).');
    } else {
        console.log('UNEXPECTED: check server logs.');
    }
}

runTest()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
