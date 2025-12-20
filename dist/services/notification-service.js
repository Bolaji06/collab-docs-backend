import { prisma } from '../config/database.js';
export class NotificationService {
    async createNotification(data) {
        try {
            return await prisma.notification.create({
                data: {
                    userId: data.userId,
                    type: data.type,
                    title: data.title,
                    message: data.message,
                    documentId: data.documentId ?? null,
                    isRead: false,
                },
            });
        }
        catch (error) {
            console.error('Failed to create notification:', error);
            // We generally don't want to fail the main action if notification fails
            // so we catch and log error here.
        }
    }
}
export const notificationService = new NotificationService();
//# sourceMappingURL=notification-service.js.map