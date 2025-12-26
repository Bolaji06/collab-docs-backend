export declare class NotificationService {
    createNotification(data: {
        userId: string;
        type: 'COMMENT' | 'SHARE' | 'SYSTEM' | 'MENTION';
        title: string;
        message: string;
        documentId?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        title: string;
        documentId: string | null;
        isRead: boolean;
        userId: string;
    } | undefined>;
}
export declare const notificationService: NotificationService;
//# sourceMappingURL=notification-service.d.ts.map