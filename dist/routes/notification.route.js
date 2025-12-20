import express from 'express';
import { getNotifications, markAsRead, markAllAsRead } from '../controllers/notification.controller';
import { authenticate } from '../middleware/auth';
import { Router } from 'express';
const router = Router();
router.use(authenticate);
router.get('/', getNotifications);
router.put('/:id/read', markAsRead);
router.put('/read-all', markAllAsRead);
export default router;
//# sourceMappingURL=notification.route.js.map