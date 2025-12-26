import { versionService } from '../services/version-service.js';
export const createSnapshot = async (req, res, next) => {
    try {
        const { documentId } = req.params;
        const userId = req.user.id;
        const version = await versionService.createSnapshot(documentId, userId);
        res.json({ success: true, data: version });
    }
    catch (error) {
        next(error);
    }
};
export const getVersions = async (req, res, next) => {
    try {
        const { documentId } = req.params;
        const versions = await versionService.getVersions(documentId);
        res.json({ success: true, data: versions });
    }
    catch (error) {
        next(error);
    }
};
export const restoreVersion = async (req, res, next) => {
    try {
        const { documentId, versionId } = req.params;
        const userId = req.user.id;
        const document = await versionService.restoreVersion(documentId, versionId, userId);
        res.json({ success: true, data: document });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=version.controller.js.map