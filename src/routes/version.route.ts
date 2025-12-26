import { Router } from 'express';
import { createSnapshot, getVersions, restoreVersion } from '../controllers/version.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.post('/:documentId/snapshot', createSnapshot);
router.get('/:documentId', getVersions);
router.post('/:documentId/restore/:versionId', restoreVersion);

export default router;
