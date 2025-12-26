import { workspaceService } from '../services/workspace-service.js';
export const createWorkspace = async (req, res, next) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;
        const workspace = await workspaceService.createWorkspace(userId, name);
        res.json({ success: true, data: workspace });
    }
    catch (error) {
        next(error);
    }
};
export const getWorkspaces = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const workspaces = await workspaceService.getWorkspaces(userId);
        res.json({ success: true, data: workspaces });
    }
    catch (error) {
        next(error);
    }
};
export const getWorkspaceById = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const userId = req.user.id;
        const workspace = await workspaceService.getWorkspaceById(workspaceId, userId);
        res.json({ success: true, data: workspace });
    }
    catch (error) {
        next(error);
    }
};
export const updateWorkspace = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const { name } = req.body;
        const userId = req.user.id;
        const workspace = await workspaceService.updateWorkspace(workspaceId, userId, { name });
        res.json({ success: true, data: workspace });
    }
    catch (error) {
        next(error);
    }
};
export const deleteWorkspace = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const userId = req.user.id;
        await workspaceService.deleteWorkspace(workspaceId, userId);
        res.json({ success: true, message: 'Workspace deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
export const addMember = async (req, res, next) => {
    try {
        const { workspaceId } = req.params;
        const { userId, role } = req.body;
        const member = await workspaceService.addMember(workspaceId, userId, role);
        res.json({ success: true, data: member });
    }
    catch (error) {
        next(error);
    }
};
export const updateMemberRole = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const memberId = req.params.memberId;
        const { role } = req.body;
        const requesterUserId = req.user.id;
        const member = await workspaceService.updateMemberRole(workspaceId, requesterUserId, memberId, role);
        res.json({ success: true, data: member });
    }
    catch (error) {
        next(error);
    }
};
export const removeMember = async (req, res, next) => {
    try {
        const workspaceId = req.params.workspaceId;
        const memberId = req.params.memberId;
        const requesterUserId = req.user.id;
        await workspaceService.removeMember(workspaceId, requesterUserId, memberId);
        res.json({ success: true, data: null });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=workspace.controller.js.map