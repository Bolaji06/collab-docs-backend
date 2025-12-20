import { prisma } from '../config/database';
async function main() {
    console.log('Testing connection with App Config...');
    try {
        // Try to query the new fields
        // We need to cast to any or verify if types are updated
        const user = await prisma.user.findFirst({
            select: {
                id: true,
                email: true,
                googleId: true, // New field
                isVerified: true // New field
            }
        });
        console.log('Query successful.');
        console.log('User:', user);
    }
    catch (error) {
        console.error('Query Failed:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=connection_check.js.map