import { Router } from 'express';
import { getTemplates, getTemplateById } from '../controllers/template.controller.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
router.use(authenticate);
router.get('/', getTemplates);
router.get('/:id', getTemplateById);
export default router;
//# sourceMappingURL=template.route.js.map