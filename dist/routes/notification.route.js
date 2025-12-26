import { Router } from 'express';
import { getNotifications, markAsRead, markAllAsRead, sendNudge } from '../controllers/notification.controller.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
router.use(authenticate);
router.get('/', getNotifications);
router.post('/send-nudge', sendNudge);
router.put('/:id/read', markAsRead);
router.put('/read-all', markAllAsRead);
export default router;
//# sourceMappingURL=notification.route.js.map