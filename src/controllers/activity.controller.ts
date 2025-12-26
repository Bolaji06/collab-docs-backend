import type { Request, Response } from 'express';
import { activityService } from '../services/activity-service.js';

export const activityController = {
    getLatestActivities: async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const activities = await activityService.getLatestActivities(userId);
            res.json({ success: true, data: activities });
        } catch (error) {
            console.error('Get activities error:', error);
            res.status(500).json({ success: false, message: 'Failed to fetch activity feed' });
        }
    }
};
