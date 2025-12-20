import { prisma } from '../config/database';
export const getNotifications = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        res.json(notifications);
    }
    catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ message: 'Failed to fetch notifications' });
    }
};
export const markAsRead = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!id) {
            return res.status(400).json({ message: 'Notification ID is required' });
        }
        // Verify ownership
        const notification = await prisma.notification.findUnique({
            where: { id },
        });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        if (notification.userId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        const updated = await prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
        res.json(updated);
    }
    catch (error) {
        console.error('Mark read error:', error);
        res.status(500).json({ message: 'Failed to update notification' });
    }
};
export const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
        res.status(200).json({ message: 'All notifications marked as read' });
    }
    catch (error) {
        console.error('Mark all read error:', error);
        res.status(500).json({ message: 'Failed to update notifications' });
    }
};
//# sourceMappingURL=notification.controller.js.map