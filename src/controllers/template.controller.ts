
import type { Request, Response } from 'express';
import { templateService } from '../services/template-service.js';

export const getTemplates = async (req: Request, res: Response) => {
    try {
        const templates = templateService.getTemplates();
        console.log("TemplateController sending templates count:", templates.length);
        res.json({
            success: true,
            data: templates
        });
    } catch (error) {
        console.error('Get templates error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch templates' });
    }
};

export const getTemplateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: 'Template ID is required' });
        }
        const template = templateService.getTemplateById(id);
        if (!template) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }
        res.json({
            success: true,
            data: template
        });
    } catch (error) {
        console.error('Get template by id error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch template' });
    }
};
