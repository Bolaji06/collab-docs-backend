import { prisma } from '../config/database.js';
import { activityService } from './activity-service.js';

export class FolderService {
    async getFolderById(userId: string, folderId: string) {
        const folder = await prisma.folder.findUnique({
            where: { id: folderId },
            include: {
                _count: {
                    select: { documents: true }
                }
            }
        });

        if (!folder) {
            throw new Error('Folder not found or unauthorized');
        }

        // Allow access if personal folder or if in a workspace the user is part of
        if (folder.workspaceId) {
            const membership = await prisma.workspaceMember.findUnique({
                where: {
                    workspaceId_userId: {
                        workspaceId: folder.workspaceId,
                        userId
                    }
                }
            });
            if (!membership) throw new Error('Folder not found or unauthorized');
        } else if (folder.userId !== userId) {
            throw new Error('Folder not found or unauthorized');
        }

        return folder;
    }

    async createFolder(userId: string, data: { name: string; color?: string; workspaceId?: string }) {
        const folder = await prisma.folder.create({
            data: {
                name: data.name,
                userId,
                color: data.color ?? null,
                workspaceId: data.workspaceId || null,
            }
        });

        await activityService.logActivity({
            userId,
            type: 'FOLD_CREATE',
            folderId: folder.id,
            workspaceId: data.workspaceId || null,
            details: { folderName: data.name }
        });

        return folder;
    }

    async getFolders(userId: string, workspaceId?: string) {
        const where: any = {};

        if (workspaceId) {
            // Verify membership if workspaceId is provided
            const membership = await prisma.workspaceMember.findUnique({
                where: {
                    workspaceId_userId: {
                        workspaceId,
                        userId
                    }
                }
            });
            if (!membership) return []; // Or throw error
            where.workspaceId = workspaceId;
        } else {
            // Personal folders: where userId matches and workspaceId is null
            where.userId = userId;
            where.workspaceId = null;
        }

        return prisma.folder.findMany({
            where,
            include: {
                _count: {
                    select: { documents: true }
                }
            },
            orderBy: { name: 'asc' }
        });
    }

    async updateFolder(userId: string, folderId: string, name: string, color?: string) {
        // Verify ownership or workspace admin/member rights
        const folder = await prisma.folder.findUnique({
            where: { id: folderId },
            include: {
                workspace: true
            }
        });

        if (!folder) {
            throw new Error('Folder not found or unauthorized');
        }

        let canUpdate = folder.userId === userId;

        if (!canUpdate && folder.workspaceId) {
            const membership = await prisma.workspaceMember.findUnique({
                where: {
                    workspaceId_userId: {
                        workspaceId: folder.workspaceId,
                        userId
                    }
                }
            });
            // Let's allow any member to update folders for now in a workspace?
            // Or only ADMINS/Owners? Let's say any member for high collaboration.
            if (membership) canUpdate = true;
        }

        if (!canUpdate) {
            throw new Error('Folder not found or unauthorized');
        }

        const updated = await prisma.folder.update({
            where: { id: folderId },
            data: {
                name,
                color: color ?? null
            }
        });

        await activityService.logActivity({
            userId,
            type: 'FOLD_RENAME',
            folderId,
            details: { oldName: folder.name, newName: name }
        });

        return updated;
    }

    async deleteFolder(userId: string, folderId: string, deleteDocuments: boolean = false) {
        const folder = await prisma.folder.findUnique({
            where: { id: folderId },
            include: {
                workspace: true
            }
        });

        if (!folder) {
            throw new Error('Folder not found or unauthorized');
        }

        let canDelete = folder.userId === userId;

        if (!canDelete && folder.workspaceId) {
            const membership = await prisma.workspaceMember.findUnique({
                where: {
                    workspaceId_userId: {
                        workspaceId: folder.workspaceId,
                        userId
                    }
                }
            });
            // Only admin or owner can delete folders they didn't create
            if (membership && (membership.role === 'ADMIN' || (folder.workspace && folder.workspace.ownerId === userId))) {
                canDelete = true;
            }
        }

        if (!canDelete) {
            throw new Error('Folder not found or unauthorized');
        }

        if (deleteDocuments) {
            await prisma.document.deleteMany({
                where: { folderId }
            });
        }

        const deleted = await prisma.folder.delete({
            where: { id: folderId }
        });

        await activityService.logActivity({
            userId,
            type: 'FOLD_DELETE',
            details: { folderName: folder.name }
        });

        return deleted;
    }
}

export const folderService = new FolderService();
