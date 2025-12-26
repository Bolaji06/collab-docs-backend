import { Router } from 'express';
import { activityController } from '../controllers/activity.controller.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
router.get('/', authenticate, activityController.getLatestActivities);
export default router;
//# sourceMappingURL=activity.route.js.map