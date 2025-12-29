import type { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { sendNudgeEmail } from '../utils/emails.js';

export const getNotifications = async (req: Request, res: Response) => {
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
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ message: 'Failed to fetch notifications' });
    }
};

export const markAsRead = async (req: Request, res: Response) => {
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
    } catch (error) {
        console.error('Mark read error:', error);
        res.status(500).json({ message: 'Failed to update notification' });
    }
};

export const markAllAsRead = async (req: Request, res: Response) => {
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
    } catch (error) {
        console.error('Mark all read error:', error);
        res.status(500).json({ message: 'Failed to update notifications' });
    }
};

export const sendNudge = async (req: Request, res: Response) => {
    try {
        const senderId = req.user?.id;
        const { userIds, documentId, documentTitle } = req.body;

        if (!senderId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!userIds || !Array.isArray(userIds)) {
            return res.status(400).json({ message: 'Invalid userIds' });
        }

        const sender = await prisma.user.findUnique({ where: { id: senderId } });

        const notifications = await Promise.all(
            userIds.map(userId =>
                prisma.notification.create({
                    data: {
                        userId,
                        type: 'SYSTEM',
                        title: 'Alignment Nudge',
                        message: `${sender?.username} is waiting for your alignment on "${documentTitle}".`,
                        documentId
                    }
                })
            )
        );

        // Send emails
        try {
            const nudgeTargetUsers = await prisma.user.findMany({
                where: { id: { in: userIds } }
            });

            for (const targetUser of nudgeTargetUsers) {
                if (targetUser.email) {
                    await sendNudgeEmail(targetUser.email, sender?.username || 'A teammate', documentTitle, documentId);
                }
            }
        } catch (emailError) {
            console.error('Failed to send nudge emails:', emailError);
        }

        res.json({ message: `Sent nudges to ${notifications.length} users` });
    } catch (error) {
        console.error('Send nudge error:', error);
        res.status(500).json({ message: 'Failed to send nudges' });
    }
};
