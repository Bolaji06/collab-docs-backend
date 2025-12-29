import { aiService } from '../services/ai-service.js';
export const summarize = async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        const summary = await aiService.summarizeText(text);
        res.status(200).json({ result: summary });
    }
    catch (error) {
        next(error);
    }
};
export const improveWriting = async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        const improved = await aiService.improveWriting(text);
        res.status(200).json({ result: improved });
    }
    catch (error) {
        next(error);
    }
};
export const extractMeetingNotes = async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        const notes = await aiService.extractMeetingNotes(text);
        res.status(200).json({ result: notes });
    }
    catch (error) {
        next(error);
    }
};
export const suggestTags = async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        const tags = await aiService.suggestTags(text);
        res.status(200).json({ result: tags });
    }
    catch (error) {
        next(error);
    }
};
export const analyzeAlignment = async (req, res, next) => {
    try {
        const { text, intent } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Document content is required' });
        }
        const analysis = await aiService.analyzeAlignment(text, intent || 'brainstorming');
        res.status(200).json({ result: analysis });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=ai.controller.js.map