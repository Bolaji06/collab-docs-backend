import type { Request, Response, NextFunction } from 'express';
import { versionService } from '../services/version-service.js';

export const createSnapshot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { documentId } = req.params;
        const userId = (req as any).user.id;
        const version = await versionService.createSnapshot(documentId as string, userId);
        res.json({ success: true, data: version });
    } catch (error) {
        next(error);
    }
};

export const getVersions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { documentId } = req.params;
        const versions = await versionService.getVersions(documentId as string);
        res.json({ success: true, data: versions });
    } catch (error) {
        next(error);
    }
};

export const restoreVersion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { documentId, versionId } = req.params;
        const userId = (req as any).user.id;
        const document = await versionService.restoreVersion(documentId as string, versionId as string, userId);
        res.json({ success: true, data: document });
    } catch (error) {
        next(error);
    }
};
