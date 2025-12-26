import { Router } from 'express';
import { createWorkspace, getWorkspaces, addMember, removeMember, getWorkspaceById, updateWorkspace, deleteWorkspace, updateMemberRole } from '../controllers/workspace.controller.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
router.use(authenticate);
router.post('/', createWorkspace);
router.get('/', getWorkspaces);
router.get('/:workspaceId', getWorkspaceById);
router.patch('/:workspaceId', updateWorkspace);
router.delete('/:workspaceId', deleteWorkspace);
// Member routes
router.post('/:workspaceId/members', addMember);
router.patch('/:workspaceId/members/:memberId', updateMemberRole);
router.delete('/:workspaceId/members/:memberId', removeMember);
export default router;
//# sourceMappingURL=workspace.route.js.map