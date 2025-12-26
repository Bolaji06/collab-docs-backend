import { folderService } from '../services/folder-service.js';
export const createFolder = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { name, color, workspaceId } = req.body;
        if (!userId)
            return res.status(401).json({ message: 'Unauthorized' });
        if (!name)
            return res.status(400).json({ message: 'Folder name is required' });
        const folder = await folderService.createFolder(userId, { name, color: color || null, workspaceId });
        res.status(201).json(folder);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getFolderById = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        if (!userId)
            return res.status(401).json({ message: 'Unauthorized' });
        if (!id)
            return res.status(400).json({ message: 'Folder ID is required' });
        const folder = await folderService.getFolderById(userId, id);
        res.json(folder);
    }
    catch (error) {
        res.status(error.message === 'Folder not found or unauthorized' ? 404 : 500).json({ message: error.message });
    }
};
export const getFolders = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { workspaceId } = req.query;
        if (!userId)
            return res.status(401).json({ message: 'Unauthorized' });
        const folders = await folderService.getFolders(userId, workspaceId);
        res.json(folders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateFolder = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const { name, color } = req.body;
        if (!userId)
            return res.status(401).json({ message: 'Unauthorized' });
        if (!id)
            return res.status(400).json({ message: 'Folder ID is required' });
        if (!name)
            return res.status(400).json({ message: 'Folder name is required' });
        const folder = await folderService.updateFolder(userId, id, name, color || null);
        res.json(folder);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteFolder = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const deleteDocuments = req.query.deleteDocuments === 'true';
        if (!userId)
            return res.status(401).json({ message: 'Unauthorized' });
        if (!id)
            return res.status(400).json({ message: 'Folder ID is required' });
        await folderService.deleteFolder(userId, id, deleteDocuments);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//# sourceMappingURL=folder.controller.js.map