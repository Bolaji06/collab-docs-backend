import { Router } from 'express';
import { getWorkspaceHealth } from '../controllers/analytics.controller.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
router.use(authenticate);
router.get('/:workspaceId/health', getWorkspaceHealth);
export default router;
//# sourceMappingURL=analytics.route.js.map