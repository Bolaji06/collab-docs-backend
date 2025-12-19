
import { Router } from 'express';
import { commentController } from '../controllers/comment-controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Routes attached to /api/comments mostly, or mix
// Note: Document-scoped routes might be mounted differently in app.ts
// BUT usually REST pattern: POST /documents/:id/comments

router.post('/documents/:documentId/comments', authenticate, commentController.createComment);
router.get('/documents/:documentId/comments', authenticate, commentController.getComments);

router.post('/comments/:id/reply', authenticate, commentController.replyComment);
router.patch('/comments/:id/resolve', authenticate, commentController.resolveComment);
router.delete('/comments/:id', authenticate, commentController.deleteComment);

export default router;
