import { prisma } from '../config/database.js';
export class ActivityService {
    /**
     * Log a new activity
     */
    async logActivity(data) {
        try {
            return await prisma.activity.create({
                data: {
                    userId: data.userId,
                    type: data.type,
                    documentId: data.documentId || null,
                    folderId: data.folderId || null,
                    workspaceId: data.workspaceId || null,
                    details: data.details || {},
                }
            });
        }
        catch (error) {
            console.error('Failed to log activity:', error);
            // We don't want activity logging to break main flows
        }
    }
    /**
     * Get latest activities relevant to a user
     * This includes their own activities and activities on documents they have access to
     */
    async getLatestActivities(userId, limit = 20) {
        return prisma.activity.findMany({
            where: {
                OR: [
                    { userId: userId },
                    {
                        document: {
                            OR: [
                                { ownerId: userId },
                                {
                                    permissions: {
                                        some: {
                                            userId: userId
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        workspace: {
                            members: {
                                some: { userId }
                            }
                        }
                    }
                ]
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    }
                },
                document: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: limit
        });
    }
}
export const activityService = new ActivityService();
//# sourceMappingURL=activity-service.js.map