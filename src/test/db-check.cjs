
const { PrismaClient } = require('../generated/prisma'); // Adjust path to pointing to generated client if needed, or '@prisma/client' if it exports from there
// Schema says: output = "../generated/prisma"
// So relative to src/test/db-check.cjs (src/test), it is ../../generated/prisma
// Let's try standard import first if it was configured to override @prisma/client, otherwise direct path.
// The schema output is `../generated/prisma`.
// package.json dependencies has `@prisma/client`.
// Usually one imports `@prisma/client`. If output is custom, one imports from there.
// Let's check where `node_modules/@prisma/client` points or if we need to import from generated.

// Trying standard import, usually `npm install` runs generate and puts it in node_modules unless configured otherwise.
// Schema: output = "../generated/prisma" (relative to prisma folder? or root?)
// `prisma/schema.prisma` is in `backend/prisma`.
// So `../generated/prisma` is `backend/generated/prisma`.

const { PrismaClient: PCs } = require('@prisma/client');
// If that doesn't work (because of custom output), accessing the custom path:
const path = require('path');
const customPath = path.resolve(__dirname, '../../generated/prisma');

async function main() {
    console.log('Checking DB connection...');
    let prisma;
    try {
        prisma = new PCs();
    } catch (e) {
        console.log('Standard import failed or empty, trying custom path');
        const CustomPrisma = require(customPath).PrismaClient;
        prisma = new CustomPrisma();
    }

    try {
        const user = await prisma.user.findFirst({});
        console.log('Successfully queried user table.');
        if (user) {
            console.log('Found user:', user.email);
            console.log('Has googleId:', user.googleId !== undefined);
            console.log('Has isVerified:', user.isVerified !== undefined);
        } else {
            console.log('No users found, but query worked.');
            // Create one to check columns
            const newUser = await prisma.user.create({
                data: {
                    email: `check-${Date.now()}@example.com`,
                    username: `check${Date.now()}`,
                    isVerified: true,
                    googleId: `gid-${Date.now()}`,
                    password: null // should be allowed
                }
            });
            console.log('Created user with googleId:', newUser.googleId);
        }
    } catch (err) {
        console.error('Error querying DB:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
