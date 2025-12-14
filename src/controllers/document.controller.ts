import type { Request, Response, NextFunction } from 'express';
import { documentService } from '../services/document-service';

export const getDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const documents = await documentService.getDocumentsForUser(userId);
        res.json(documents);
    } catch (error) {
        next(error);
    }
};

export const createDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { title, content } = req.body;
        const document = await documentService.createDocument(userId, { title, content });
        res.status(201).json(document);
    } catch (error) {
        next(error);
    }
};

export const getDocumentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { id } = req.params;
        const document = await documentService.getDocumentById(id, userId);
        res.json(document);
    } catch (error: any) {
        if (error.message === 'Document not found or access denied') {
            return res.status(403).json({ message: 'Not authorized to view this document' });
        }
        next(error);
    }
};

export const updateDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { id } = req.params;
        const { title, content } = req.body;

        const document = await documentService.updateDocument(id, userId, { title, content });
        res.json(document);
    } catch (error: any) {
        if (error.message === 'Document not found') {
            return res.status(404).json({ message: 'Document not found' });
        }
        if (error.message === 'Not authorized to edit this document') {
            return res.status(403).json({ message: 'Not authorized to edit' });
        }
        next(error);
    }
};

export const deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { id } = req.params;

        await documentService.deleteDocument(id, userId);
        res.status(204).send();
    } catch (error: any) {
        if (error.message === 'Document not found') {
            return res.status(404).json({ message: 'Document not found' });
        }
        if (error.message === 'Not authorized to delete this document') {
            return res.status(403).json({ message: 'Not authorized to delete this document' });
        }
        next(error);
    }
};
