import type { Request, Response, NextFunction } from 'express';
import { workspaceService } from '../services/workspace-service.js';

export const createWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const userId = (req as any).user.id;
        const workspace = await workspaceService.createWorkspace(userId, name);
        res.json({ success: true, data: workspace });
    } catch (error) {
        next(error);
    }
};

export const getWorkspaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const workspaces = await workspaceService.getWorkspaces(userId);
        res.json({ success: true, data: workspaces });
    } catch (error) {
        next(error);
    }
};

export const getWorkspaceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workspaceId = req.params.workspaceId as string;
        const userId = (req as any).user.id;
        const workspace = await workspaceService.getWorkspaceById(workspaceId, userId);
        res.json({ success: true, data: workspace });
    } catch (error) {
        next(error);
    }
};

export const updateWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workspaceId = req.params.workspaceId as string;
        const { name } = req.body;
        const userId = (req as any).user.id;
        const workspace = await workspaceService.updateWorkspace(workspaceId, userId, { name });
        res.json({ success: true, data: workspace });
    } catch (error) {
        next(error);
    }
};

export const deleteWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workspaceId = req.params.workspaceId as string;
        const userId = (req as any).user.id;
        await workspaceService.deleteWorkspace(workspaceId, userId);
        res.json({ success: true, message: 'Workspace deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const addMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { workspaceId } = req.params;
        const { userId, role } = req.body;
        const member = await workspaceService.addMember(workspaceId as string, userId, role);
        res.json({ success: true, data: member });
    } catch (error) {
        next(error);
    }
};

export const updateMemberRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workspaceId = req.params.workspaceId as string;
        const memberId = req.params.memberId as string;
        const { role } = req.body;
        const requesterUserId = (req as any).user.id;
        const member = await workspaceService.updateMemberRole(workspaceId, requesterUserId, memberId, role);
        res.json({ success: true, data: member });
    } catch (error) {
        next(error);
    }
};

export const removeMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workspaceId = req.params.workspaceId as string;
        const memberId = req.params.memberId as string;
        const requesterUserId = (req as any).user.id;
        await workspaceService.removeMember(workspaceId, requesterUserId, memberId);
        res.json({ success: true, data: null });
    } catch (error) {
        next(error);
    }
};
