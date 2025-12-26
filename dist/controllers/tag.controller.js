import { tagService } from '../services/tag-service.js';
export const tagController = {
    createTag: async (req, res) => {
        try {
            const userId = req.user?.id;
            const { name, color } = req.body;
            if (!userId)
                return res.status(401).json({ message: 'Unauthorized' });
            if (!name)
                return res.status(400).json({ message: 'Tag name is required' });
            const tag = await tagService.createTag(userId, name, color || null);
            res.status(201).json(tag);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getTagById: async (req, res) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params;
            if (!userId)
                return res.status(401).json({ message: 'Unauthorized' });
            if (!id)
                return res.status(400).json({ message: 'Tag ID is required' });
            const tag = await tagService.getTagById(userId, id);
            res.json(tag);
        }
        catch (error) {
            res.status(error.message === 'Tag not found or unauthorized' ? 404 : 500).json({ message: error.message });
        }
    },
    getTags: async (req, res) => {
        try {
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ message: 'Unauthorized' });
            const tags = await tagService.getTags(userId);
            res.json(tags);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteTag: async (req, res) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params;
            if (!userId)
                return res.status(401).json({ message: 'Unauthorized' });
            if (!id)
                return res.status(400).json({ message: 'Tag ID is required' });
            await tagService.deleteTag(userId, id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    addTagToDocument: async (req, res) => {
        try {
            const userId = req.user?.id;
            const { documentId, tagId } = req.params;
            if (!userId)
                return res.status(401).json({ message: 'Unauthorized' });
            if (!documentId || !tagId)
                return res.status(400).json({ message: 'Document ID and Tag ID are required' });
            const result = await tagService.addTagToDocument(userId, documentId, tagId);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    removeTagFromDocument: async (req, res) => {
        try {
            const userId = req.user?.id;
            const { documentId, tagId } = req.params;
            if (!userId)
                return res.status(401).json({ message: 'Unauthorized' });
            if (!documentId || !tagId)
                return res.status(400).json({ message: 'Document ID and Tag ID are required' });
            await tagService.removeTagFromDocument(userId, documentId, tagId);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
//# sourceMappingURL=tag.controller.js.map