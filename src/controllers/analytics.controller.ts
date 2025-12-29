
import type { Request, Response } from 'express';
import { analyticsService } from '../services/analytics-service.js';

export const getWorkspaceHealth = async (req: Request, res: Response) => {
    try {
        const { workspaceId } = req.params;
        if (!workspaceId) {
            return res.status(400).json({ message: 'Workspace ID is required' });
        }

        const health = await analyticsService.getWorkspaceHealth(workspaceId);
        res.json({
            success: true,
            data: health
        });
    } catch (error) {
        console.error('Get workspace health error:', error);
        res.status(500).json({ message: 'Failed to fetch workspace health' });
    }
};
