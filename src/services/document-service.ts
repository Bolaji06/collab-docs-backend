import { prisma } from '../config/database';
import { Prisma } from '../../generated/prisma/client';

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
     * Get all documents accessible by a user (owned or shared)
     */
    async getDocumentsForUser(userId: string) {
        return prisma.document.findMany({
            where: {
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
     * Get a specific document if the user has access
     */
    async getDocumentById(documentId: string, userId: string) {
        const document = await prisma.document.findFirst({
            where: {
                id: documentId,
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
     * Delete a document (Owner only)
     */
    async deleteDocument(documentId: string, userId: string) {
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
}

export const documentService = new DocumentService();
