import { Router } from 'express';
import { commentController } from '../controllers/comment-controller.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
// Routes attached to /api/comments mostly, or mix
// Note: Document-scoped routes might be mounted differently in app.ts
// BUT usually REST pattern: POST /documents/:id/comments
router.use(authenticate);
router.get('/doc/:documentId', commentController.getComments);
router.post('/doc/:documentId', commentController.createComment);
router.post('/:id/replies', commentController.replyComment);
router.patch('/:id/resolve', commentController.resolveComment);
router.patch('/:id/unresolve', commentController.unresolveComment);
router.post('/:id/reactions', commentController.toggleReaction);
router.delete('/:id', commentController.deleteComment);
export default router;
//# sourceMappingURL=comments.route.js.map