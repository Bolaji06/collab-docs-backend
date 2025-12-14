
import { Router } from 'express';
import { getDocuments, createDocument, deleteDocument, getDocumentById, updateDocument } from '../controllers/document.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getDocuments);
router.post('/', createDocument);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

export default router;
