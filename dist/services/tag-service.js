import { prisma } from '../config/database.js';
import { activityService } from './activity-service.js';
export class TagService {
    async getTagById(userId, tagId) {
        const tag = await prisma.tag.findUnique({
            where: { id: tagId }
        });
        if (!tag || tag.userId !== userId) {
            throw new Error('Tag not found or unauthorized');
        }
        return tag;
    }
    async createTag(userId, name, color) {
        const tag = await prisma.tag.create({
            data: {
                name,
                userId,
                color: color ?? null,
            }
        });
        await activityService.logActivity({
            userId,
            type: 'TAG_CREATE',
            details: { tagName: name }
        });
        return tag;
    }
    async getTags(userId) {
        return prisma.tag.findMany({
            where: { userId },
            orderBy: { name: 'asc' }
        });
    }
    async deleteTag(userId, tagId) {
        const tag = await prisma.tag.findUnique({ where: { id: tagId } });
        if (!tag || tag.userId !== userId) {
            throw new Error('Tag not found or unauthorized');
        }
        return prisma.tag.delete({
            where: { id: tagId }
        });
    }
    async addTagToDocument(userId, documentId, tagId) {
        // Verify document ownership or edit permission
        const document = await prisma.document.findUnique({
            where: { id: documentId },
            include: { permissions: { where: { userId } } }
        });
        if (!document || (document.ownerId !== userId && document.permissions.length === 0)) {
            throw new Error('Document not found or unauthorized');
        }
        // Verify tag ownership
        const tag = await prisma.tag.findUnique({ where: { id: tagId } });
        if (!tag || tag.userId !== userId) {
            throw new Error('Tag not found or unauthorized');
        }
        const linked = await prisma.documentTag.create({
            data: {
                documentId,
                tagId
            }
        });
        await activityService.logActivity({
            userId,
            type: 'TAG_ADD',
            documentId,
            details: { tagName: tag.name }
        });
        return linked;
    }
    async removeTagFromDocument(userId, documentId, tagId) {
        // Verify document ownership or edit permission
        const document = await prisma.document.findUnique({
            where: { id: documentId },
            include: { permissions: { where: { userId } } }
        });
        if (!document || (document.ownerId !== userId && document.permissions.length === 0)) {
            throw new Error('Document not found or unauthorized');
        }
        return prisma.documentTag.delete({
            where: {
                documentId_tagId: {
                    documentId,
                    tagId
                }
            }
        });
    }
}
export const tagService = new TagService();
//# sourceMappingURL=tag-service.js.map