import { Router } from 'express';
import { tagController } from '../controllers/tag.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', tagController.getTags);
router.get('/:id', tagController.getTagById);
router.post('/', tagController.createTag);
router.delete('/:id', tagController.deleteTag);
router.post('/:tagId/documents/:documentId', tagController.addTagToDocument);
router.delete('/:tagId/documents/:documentId', tagController.removeTagFromDocument);

export default router;
