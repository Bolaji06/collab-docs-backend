// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//     const user = await prisma.user.findFirst();
//     if (!user) {
//         console.log('No user found to send notification to.');
//         return;
//     }

//     console.log(`Found user: ${user.username} (${user.id})`);

//     const notification = await prisma.notification.create({
//         data: {
//             userId: user.id,
//             type: 'SYSTEM',
//             title: 'Welcome to the new Dashboard',
//             message: 'This is a test notification to verify the new feature. You can mark it as read.',
//             isRead: false,
//         }
//     });

//     console.log(`Notification created: ${notification.id}`);
// }

// main()
//     .catch(e => {
//         console.error('Error:', e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
