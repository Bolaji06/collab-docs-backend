import type { Request, Response } from 'express';
import { folderService } from '../services/folder-service.js';

export const createFolder = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.id;
        const { name, color, workspaceId } = req.body;

        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        if (!name) return res.status(400).json({ message: 'Folder name is required' });

        const folder = await folderService.createFolder(userId, { name, color: color || null, workspaceId });
        res.status(201).json(folder);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getFolderById = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        if (!id) return res.status(400).json({ message: 'Folder ID is required' });

        const folder = await folderService.getFolderById(userId, id);
        res.json(folder);
    } catch (error: any) {
        res.status(error.message === 'Folder not found or unauthorized' ? 404 : 500).json({ message: error.message });
    }
};

export const getFolders = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { workspaceId } = req.query;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const folders = await folderService.getFolders(userId, workspaceId as string);
        res.json(folders);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFolder = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const { name, color } = req.body;

        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        if (!id) return res.status(400).json({ message: 'Folder ID is required' });
        if (!name) return res.status(400).json({ message: 'Folder name is required' });

        const folder = await folderService.updateFolder(userId, id, name, color || null);
        res.json(folder);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFolder = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const deleteDocuments = req.query.deleteDocuments === 'true';

        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        if (!id) return res.status(400).json({ message: 'Folder ID is required' });

        await folderService.deleteFolder(userId, id, deleteDocuments);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
