import { Router } from 'express';
import { getDocuments, createDocument, deleteDocument, getDocumentById, updateDocument, shareDocument, removePermission, getSharedDocuments, getDeletedDocuments, restoreDocument, permanentlyDeleteDocument, updateAccess } from '../controllers/document.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/shared', getSharedDocuments);
router.get('/trash', getDeletedDocuments);

router.get('/', getDocuments);
router.post('/', createDocument);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

// Restore and Permanent Delete
router.put('/:id/restore', restoreDocument);
router.delete('/:id/permanent', permanentlyDeleteDocument);

// Sharing
router.post('/:id/share', shareDocument);
router.delete('/:id/share/:userId', removePermission);
router.put('/:id/access', updateAccess);

export default router;
