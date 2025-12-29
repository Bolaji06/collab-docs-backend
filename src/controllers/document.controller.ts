import type { Request, Response, NextFunction } from 'express';
import { documentService } from '../services/document-service.js';

export const getMyDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const { search, folderId, tagId, workspaceId } = req.query;
        const documents = await documentService.getDocumentsForUser(userId, {
            search: search as string,
            folderId: folderId as string,
            tagId: tagId as string,
            workspaceId: workspaceId as string
        });
        res.status(200).json(documents);
    } catch (error) {
        next(error);
    }
};

export const createDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const { title, content, folderId, workspaceId } = req.body;
        const document = await documentService.createDocument(userId, { title, content, folderId, workspaceId });
        res.status(201).json(document);
    } catch (error) {
        next(error);
    }
};

export const getDocumentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Document ID is required' });
        }
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
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const { id } = req.params;
        const { title, content, folderId, intent } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Document ID is required' });
        }

        const document = await documentService.updateDocument(userId, id, { title, content, folderId, intent });
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


export const getSharedDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const documents = await documentService.getSharedDocumentsForUser(userId);
        res.json(documents);
    } catch (error) {
        next(error);
    }
};

export const getDeletedDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const documents = await documentService.getDeletedDocumentsForUser(userId);
        res.json(documents);
    } catch (error) {
        next(error);
    }
};

export const deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Document ID is required' });
        }

        await documentService.softDeleteDocument(id, userId);
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

export const restoreDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Document ID is required' });
        }

        await documentService.restoreDocument(id, userId);
        res.status(200).json({ message: 'Document restored' });
    } catch (error: any) {
        if (error.message === 'Document not found') {
            return res.status(404).json({ message: 'Document not found' });
        }
        if (error.message === 'Not authorized to restore this document') {
            return res.status(403).json({ message: 'Not authorized to restore this document' });
        }
        next(error);
    }
};

export const permanentlyDeleteDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Document ID is required' });
        }

        await documentService.permanentlyDeleteDocument(id, userId);
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

export const shareDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const { id } = req.params;
        const { email, role } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Document ID is required' });
        }

        if (!email || !role) {
            return res.status(400).json({ message: 'Email and role are required' });
        }

        const permission = await documentService.shareDocument(id, userId, email, role);
        res.status(200).json(permission);
    } catch (error: any) {
        if (error.message === 'Document not found') {
            return res.status(404).json({ message: 'Document not found' });
        }
        if (error.message === 'Not authorized to share this document') {
            return res.status(403).json({ message: 'Not authorized to share this document' });
        }
        if (error.message === 'User with this email not found') {
            return res.status(404).json({ message: 'User with this email not found' });
        }
        if (error.message === 'Cannot share document with yourself') {
            return res.status(400).json({ message: 'Cannot share document with yourself' });
        }
        next(error);
    }
};

export const removePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const { id, userId: userIdToRemove } = req.params;

        if (!id || !userIdToRemove) {
            return res.status(400).json({ message: 'Document ID and User ID to remove are required' });
        }

        await documentService.removePermission(id, userId, userIdToRemove);
        res.status(204).send();
    } catch (error: any) {
        if (error.message === 'Document not found') {
            return res.status(404).json({ message: 'Document not found' });
        }
        if (error.message === 'Not authorized to manage permissions for this document') {
            return res.status(403).json({ message: 'Not authorized to manage permissions for this document' });
        }
        next(error);
    }
};

export const updateAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = req.user.id;
        const { id } = req.params;
        const { isPublic, publicRole } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Document ID is required' });
        }

        const document = await documentService.updateAccess(id, userId, { isPublic, publicRole });
        res.json(document);
    } catch (error: any) {
        if (error.message === 'Document not found') {
            return res.status(404).json({ message: 'Document not found' });
        }
        if (error.message === 'Not authorized to change access settings') {
            return res.status(403).json({ message: 'Not authorized to change access settings' });
        }
        next(error);
    }
};
