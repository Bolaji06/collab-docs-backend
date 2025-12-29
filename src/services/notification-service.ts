import { prisma } from '../config/database.js';
import { getIO } from '../sockets/io.js';
import { sendMentionEmail, sendShareEmail } from '../utils/emails.js';

export class NotificationService {
    async createNotification(data: {
        userId: string;
        type: 'COMMENT' | 'SHARE' | 'SYSTEM' | 'MENTION';
        title: string;
        message: string;
        documentId?: string;
    }) {
        try {
            const notification = await prisma.notification.create({
                data: {
                    userId: data.userId,
                    type: data.type,
                    title: data.title,
                    message: data.message,
                    documentId: data.documentId ?? null,
                    isRead: false,
                },
            });

            // Emit real-time notification
            try {
                const io = getIO();
                io.to(`user:${data.userId}`).emit('new-notification', notification);
            } catch (ioError) {
                console.warn('Socket.io not available for notification:', ioError);
            }

            // Send email for critical notifications
            try {
                const user = await prisma.user.findUnique({ where: { id: data.userId } });
                if (user?.email) {
                    if (data.type === 'MENTION' && data.documentId) {
                        const document = await prisma.document.findUnique({ where: { id: data.documentId } });
                        await sendMentionEmail(user.email, 'A teammate', document?.title || 'a document', data.documentId || '');
                    }
                    if (data.type === 'SHARE' && data.documentId) {
                        const document = await prisma.document.findUnique({ where: { id: data.documentId } });
                        await sendShareEmail(user.email, 'A teammate', document?.title || 'a document', data.documentId || '', 'collaborator');
                    }
                }
            } catch (emailError) {
                console.error('Failed to send notification email:', emailError);
            }

            return notification;
        } catch (error) {
            console.error('Failed to create notification:', error);
        }
    }
}

export const notificationService = new NotificationService();
