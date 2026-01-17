import { Router } from 'express';
import { summarize, improveWriting, extractMeetingNotes, suggestTags, analyzeAlignment, editContent } from '../controllers/ai.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.post('/summarize', summarize);
router.post('/improve', improveWriting);
router.post('/meeting-notes', extractMeetingNotes);
router.post('/suggest-tags', suggestTags);
router.post('/analyze-alignment', analyzeAlignment);
router.post('/edit', editContent);

export default router;
