import { prisma } from '../config/database';

export class DocumentService {
    /**
     * Create a new document for a user
     */
    async createDocument(userId: string, data: { title?: string; content?: any }) {
        return prisma.document.create({
            data: {
                title: data.title || 'Untitled Document',
                content: data.content || {},
                ownerId: userId,
            },
        });
    }

    /**
     * Get all documents accessible by a user (owned or shared), excluding deleted ones.
     * This is the default view.
     */
    async getDocumentsForUser(userId: string) {
        return prisma.document.findMany({
            where: {
                deletedAt: null,
                OR: [
                    { ownerId: userId },
                    {
                        permissions: {
                            some: {
                                userId: userId,
                            },
                        },
                    },
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
            },
            orderBy: {
                updatedAt: 'desc',
            },
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
    async updateDocument(documentId: string, userId: string, data: { title?: string; content?: any }) {
        // efficient check for permission without fetching the whole doc again if possible,
        // but we need to check role.
        const document = await prisma.document.findUnique({
            where: { id: documentId },
            include: {
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

        const isOwner = document.ownerId === userId;
        const isEditor = document.permissions.length > 0 && document.permissions[0]?.role === 'EDITOR';

        if (!isOwner && !isEditor) {
            throw new Error('Not authorized to edit this document');
        }

        return prisma.document.update({
            where: { id: documentId },
            data: {
                ...(data.title && { title: data.title }),
                ...(data.content && { content: data.content }),
            },
        });
    }

    /**
     * Soft delete a document (Owner only)
     */
    async softDeleteDocument(documentId: string, userId: string) {
        const document = await prisma.document.findUnique({
            where: { id: documentId },
        });

        if (!document) {
            throw new Error('Document not found');
        }

        if (document.ownerId !== userId) {
            throw new Error('Not authorized to delete this document');
        }

        return prisma.document.update({
            where: { id: documentId },
            data: {
                deletedAt: new Date(),
            },
        });
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

        // Send notification
        try {
            const owner = await prisma.user.findUnique({ where: { id: ownerId } });
            if (permission.userId !== ownerId) { // Should always be true due to earlier check
                await prisma.notification.create({
                    data: {
                        userId: userToShareWith.id,
                        type: 'SHARE',
                        title: 'Document Shared',
                        message: `${owner?.username || 'Someone'} shared "${document.title}" with you`,
                        documentId: document.id,
                    }
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
