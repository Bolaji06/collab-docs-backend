import type { Request, Response, NextFunction } from 'express';
import { aiService } from '../services/ai-service.js';

export const summarize = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        const summary = await aiService.summarizeText(text);
        res.status(200).json({ result: summary });
    } catch (error) {
        next(error);
    }
};

export const improveWriting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        const improved = await aiService.improveWriting(text);
        res.status(200).json({ result: improved });
    } catch (error) {
        next(error);
    }
};

export const extractMeetingNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        const notes = await aiService.extractMeetingNotes(text);
        res.status(200).json({ result: notes });
    } catch (error) {
        next(error);
    }
};

export const suggestTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        const tags = await aiService.suggestTags(text);
        res.status(200).json({ result: tags });
    } catch (error) {
        next(error);
    }
};

export const analyzeAlignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text, intent } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Document content is required' });
        }
        const analysis = await aiService.analyzeAlignment(text, intent || 'brainstorming');
        res.status(200).json({ result: analysis });
    } catch (error) {
        next(error);
    }
};

export const editContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text, instruction } = req.body;
        if (!text || !instruction) {
            return res.status(400).json({ message: 'Text and instruction are required' });
        }
        const edited = await aiService.editWithInstruction(text, instruction);
        res.status(200).json({ result: edited });
    } catch (error) {
        next(error);
    }
};
