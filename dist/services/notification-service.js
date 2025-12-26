import { prisma } from '../config/database.js';
import { getIO } from '../sockets/io.js';
export class NotificationService {
    async createNotification(data) {
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
            }
            catch (ioError) {
                console.warn('Socket.io not available for notification:', ioError);
            }
            return notification;
        }
        catch (error) {
            console.error('Failed to create notification:', error);
        }
    }
}
export const notificationService = new NotificationService();
//# sourceMappingURL=notification-service.js.map