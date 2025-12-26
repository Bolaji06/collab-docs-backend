import { Router } from 'express';
import { createFolder, getFolders, getFolderById, updateFolder, deleteFolder } from '../controllers/folder.controller.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
router.use(authenticate);
router.get('/', getFolders);
router.get('/:id', getFolderById);
router.post('/', createFolder);
router.put('/:id', updateFolder);
router.delete('/:id', deleteFolder);
export default router;
//# sourceMappingURL=folder.route.js.map