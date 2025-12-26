import { prisma } from '../config/database.js';
import { notificationService } from './notification-service.js';
import { activityService } from './activity-service.js';

export class DocumentService {
    /**
     * Create a new document for a user
     */
    async createDocument(userId: string, data: { title?: string; content?: any; folderId?: string; workspaceId?: string }) {
        const document = await prisma.document.create({
            data: {
                title: data.title || 'Untitled Document',
                content: data.content || {},
                ownerId: userId,
                folderId: data.folderId || null,
                workspaceId: data.workspaceId || null,
            },
        });

        await activityService.logActivity({
            userId,
            type: 'DOC_CREATE',
            documentId: document.id,
            details: { title: document.title }
        });

        return document;
    }

    /**
     * Get all documents accessible by a user (owned or shared), excluding deleted ones.
     * This is the default view.
     */
    async getDocumentsForUser(userId: string, options: { search?: string; folderId?: string; tagId?: string; workspaceId?: string } = {}) {
        const where: any = {
            deletedAt: null,
        };

        if (options.workspaceId) {
            // Verify membership if workspaceId is provided
            const membership = await prisma.workspaceMember.findUnique({
                where: {
                    workspaceId_userId: {
                        workspaceId: options.workspaceId,
                        userId
                    }
                }
            });
            if (!membership) return [];
            where.workspaceId = options.workspaceId;
        } else {
            // Personal/Independent space
            where.workspaceId = null;
            where.OR = [
                { ownerId: userId },
                {
                    permissions: {
                        some: {
                            userId: userId,
                        }
                    }
                }
            ];
        }

        if (options.folderId) where.folderId = options.folderId;
        if (options.tagId) {
            where.tags = {
                some: {
                    tagId: options.tagId
                }
            };
        }
        if (options.search) {
            where.title = { contains: options.search, mode: 'insensitive' };
        }

        return prisma.document.findMany({
            where,
            include: {
                owner: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        avatar: true,
                    }
                },
                permissions: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                                avatar: true,
                            }
                        }
                    }
                },
                folder: true,
                tags: {
                    include: {
                        tag: true
                    }
                }
            },
            orderBy: {
                updatedAt: 'desc',
            }
        });
    }

    /**
     * Get only documents shared WITH the user (excluding owned ones and deleted ones)
     */
    async getSharedDocumentsForUser(userId: string) {
        return prisma.document.findMany({
            where: {
                deletedAt: null,
                permissions: {
                    some: {
                        userId: userId,
                    },
                },
                NOT: {
                    ownerId: userId,
                },
            },
            include: {
                owner: {
                    select: {
                        username: true,
                        email: true,
                        avatar: true,
                    },
                },
                folder: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
    }

    /**
     * Get soft-deleted documents owned by the user
     */
    async getDeletedDocumentsForUser(userId: string) {
        return prisma.document.findMany({
            where: {
                ownerId: userId,
                NOT: {
                    deletedAt: null,
                },
            },
            include: {
                owner: {
                    select: {
                        username: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
            orderBy: {
                deletedAt: 'desc',
            },
        });
    }

    /**
     * Get a specific document if the user has access.
     * Optionally allow fetching even if deleted (e.g. for restore preview), default false.
     */
    async getDocumentById(documentId: string, userId: string, includeDeleted = false) {
        const document = await prisma.document.findFirst({
            where: {
                id: documentId,
                ...(includeDeleted ? {} : { deletedAt: null }),
                OR: [
                    { ownerId: userId },
                    { isPublic: true },
                    {
                        permissions: {
                            some: {
                                userId: userId,
                            },
                        },
                    },
                    {
                        workspace: {
                            members: {
                                some: { userId }
                            }
                        }
                    }
                ],
            },
            include: {
                owner: {
                    select: {
                        username: true,
                        email: true,
                        avatar: true,
                    },
                },
                permissions: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                email: true,
                                avatar: true,
                            },
                        },
                    },
                },
                folder: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        if (!document) {
            throw new Error('Document not found or access denied');
        }

        return document;
    }

    /**
     * Update a document if the user is the owner or has EDITOR role
     */
    async updateDocument(userId: string, documentId: string, data: { title?: string; content?: string; folderId?: string | null }) {
        const document = await prisma.document.findUnique({
            where: { id: documentId },
            include: {
                workspace: {
                    include: {
                        members: {
                            where: { userId }
                        }
                    }
                },
                permissions: {
                    where: {
                        userId: userId,
                    }
                }
            }
        });

        if (!document) {
            throw new Error('Document not found');
        }

        const isWorkspaceMember = (document.workspace?.members?.length || 0) > 0;
        const canEdit = document.ownerId === userId || document.permissions.length > 0 || isWorkspaceMember;

        if (!canEdit) {
            throw new Error('Not authorized to edit this document');
        }

        let workspaceId = document.workspaceId;
        if (data.folderId !== undefined) {
            if (data.folderId) {
                const targetFolder = await prisma.folder.findUnique({ where: { id: data.folderId } });
                if (targetFolder) {
                    workspaceId = targetFolder.workspaceId;
                }
            }
        }

        const updatedDocument = await prisma.document.update({
            where: { id: documentId },
            data: {
                ...(data.title && { title: data.title }),
                ...(data.content && { content: data.content }),
                ...(data.folderId !== undefined && { folderId: data.folderId }),
                workspaceId
            },
            include: {
                folder: true,
                tags: { include: { tag: true } }
            }
        });

        // Log activity
        if (data.title && data.title !== document.title) {
            await activityService.logActivity({
                userId,
                type: 'DOC_RENAME',
                documentId,
                details: { oldTitle: document.title, newTitle: data.title }
            });
        } else {
            await activityService.logActivity({
                userId,
                type: 'DOC_UPDATE',
                documentId
            });
        }

        // Trigger mentions if content changed
        if (data.content) {
            try {
                const oldMentions = document.content ? this.extractMentions(document.content) : [];
                const newMentions = this.extractMentions(data.content);
                const freshlyAddedMentions = newMentions.filter(m => !oldMentions.includes(m));

                if (freshlyAddedMentions.length > 0) {
                    const sender = await prisma.user.findUnique({
                        where: { id: userId },
                        select: { username: true }
                    });

                    for (const mentionUserId of freshlyAddedMentions) {
                        if (mentionUserId === userId) continue; // Don't notify self

                        await notificationService.createNotification({
                            userId: mentionUserId,
                            type: 'MENTION',
                            title: 'You were mentioned',
                            message: `${sender?.username || 'Someone'} mentioned you in "${document.title}"`,
                            documentId: documentId,
                        });
                    }
                }
            } catch (error) {
                console.error('Failed to trigger mention notifications:', error);
            }
        }

        return updatedDocument;
    }

    /**
     * Extracts user IDs from Tiptap JSON content
     */
    private extractMentions(content: any): string[] {
        const mentions: Set<string> = new Set();

        const traverse = (node: any) => {
            if (!node) return;

            if (node.type === 'mention' && node.attrs && node.attrs.id) {
                mentions.add(node.attrs.id);
            }

            if (node.content && Array.isArray(node.content)) {
                node.content.forEach(traverse);
            }
        };

        traverse(content);
        return Array.from(mentions);
    }

    /**
     * Soft delete a document (Owner only)
     */
    async softDeleteDocument(documentId: string, userId: string) {
        const document = await prisma.document.findUnique({
            where: { id: documentId },
            include: {
                workspace: true
            }
        });

        if (!document) {
            throw new Error('Document not found');
        }

        if (!document) {
            throw new Error('Document not found');
        }

        let canDelete = document.ownerId === userId;

        if (!canDelete && document.workspaceId) {
            const membership = await prisma.workspaceMember.findUnique({
                where: {
                    workspaceId_userId: {
                        workspaceId: document.workspaceId,
                        userId
                    }
                }
            });
            // Only admin or workspace owner can delete
            if (membership && (membership.role === 'ADMIN' || document.workspace?.ownerId === userId)) {
                canDelete = true;
            }
        }

        if (!canDelete) {
            throw new Error('Not authorized to delete this document');
        }

        const updated = await prisma.document.update({
            where: { id: documentId },
            data: {
                deletedAt: new Date(),
            },
        });

        await activityService.logActivity({
            userId,
            type: 'DOC_DELETE',
            documentId,
            details: { title: document.title }
        });

        return updated;
    }

    /**
     * Restore a soft-deleted document (Owner only)
     */
    async restoreDocument(documentId: string, userId: string) {
        const document = await prisma.document.findUnique({
            where: { id: documentId },
        });

        if (!document) {
            throw new Error('Document not found');
        }

        if (document.ownerId !== userId) {
            throw new Error('Not authorized to restore this document');
        }

        return prisma.document.update({
            where: { id: documentId },
            data: {
                deletedAt: null,
            },
        });
    }

    /**
     * Permanently delete a document (Owner only)
     */
    async permanentlyDeleteDocument(documentId: string, userId: string) {
        const document = await prisma.document.findUnique({
            where: { id: documentId },
        });

        if (!document) {
            throw new Error('Document not found');
        }

        if (document.ownerId !== userId) {
            throw new Error('Not authorized to delete this document');
        }

        return prisma.document.delete({
            where: { id: documentId },
        });
    }

    /**
     * Share a document with another user by email
     */
    async shareDocument(documentId: string, ownerId: string, email: string, role: 'EDITOR' | 'VIEWER') {
        const document = await prisma.document.findUnique({
            where: { id: documentId },
        });

        if (!document) {
            throw new Error('Document not found');
        }

        if (document.ownerId !== ownerId) {
            throw new Error('Not authorized to share this document');
        }

        const userToShareWith = await prisma.user.findUnique({
            where: { email },
        });

        if (!userToShareWith) {
            throw new Error('User with this email not found');
        }

        if (userToShareWith.id === ownerId) {
            throw new Error('Cannot share document with yourself');
        }

        const permission = await prisma.documentPermission.upsert({
            where: {
                documentId_userId: {
                    documentId,
                    userId: userToShareWith.id,
                },
            },
            update: {
                role,
            },
            create: {
                documentId,
                userId: userToShareWith.id,
                role,
            },
            include: {
                user: {
                    select: {
                        username: true,
                        email: true,
                        avatar: true,
                        id: true // Need ID if we want to confirm, though we have userToShareWith.id
                    },
                },
            },
        });

        // Log activity
        await activityService.logActivity({
            userId: ownerId,
            type: 'DOC_SHARE',
            documentId,
            details: { email, role, title: document.title }
        });

        // Send notification
        try {
            const owner = await prisma.user.findUnique({ where: { id: ownerId } });
            if (permission.userId !== ownerId) {
                await notificationService.createNotification({
                    userId: userToShareWith.id,
                    type: 'SHARE',
                    title: 'Document Shared',
                    message: `${owner?.username || 'Someone'} shared "${document.title}" with you`,
                    documentId: document.id,
                });
            }
        } catch (e) {
            console.error(e);
        }

        return permission;
    }

    /**
     * Remove a user's permission from a document
     */
    async removePermission(documentId: string, ownerId: string, userIdToRemove: string) {
        const document = await prisma.document.findUnique({
            where: { id: documentId },
        });

        if (!document) {
            throw new Error('Document not found');
        }

        if (document.ownerId !== ownerId) {
            throw new Error('Not authorized to manage permissions for this document');
        }

        try {
            await prisma.documentPermission.delete({
                where: {
                    documentId_userId: {
                        documentId,
                        userId: userIdToRemove,
                    },
                },
            });
        } catch (error) {
            // Ignore if permission doesn't exist
        }
    }

    async updateAccess(documentId: string, userId: string, data: { isPublic: boolean; publicRole?: 'VIEWER' | 'EDITOR' | null }) {
        const document = await prisma.document.findUnique({
            where: { id: documentId },
        });

        if (!document) {
            throw new Error('Document not found');
        }

        if (document.ownerId !== userId) {
            throw new Error('Not authorized to change access settings');
        }

        return prisma.document.update({
            where: { id: documentId },
            data: {
                isPublic: data.isPublic,
                ...(data.publicRole !== undefined && { publicRole: data.publicRole }),
            },
        });
    }
}


export const documentService = new DocumentService();
