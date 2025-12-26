import { prisma } from '../config/database.js';

export class VersionService {
    async createSnapshot(documentId: string, userId: string) {
        // Get current document content
        const document = await prisma.document.findUnique({
            where: { id: documentId },
            select: { content: true }
        });

        if (!document) {
            throw new Error('Document not found');
        }

        // Get latest version number
        const lastVersion = await prisma.documentVersion.findFirst({
            where: { documentId },
            orderBy: { versionNumber: 'desc' },
            select: { versionNumber: true }
        });

        const nextVersionNumber = (lastVersion?.versionNumber || 0) + 1;

        // Create version
        return prisma.documentVersion.create({
            data: {
                documentId,
                createdBy: userId,
                content: document.content || {},
                versionNumber: nextVersionNumber
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                }
            }
        });
    }

    async getVersions(documentId: string) {
        return prisma.documentVersion.findMany({
            where: { documentId },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                }
            }
        });
    }

    async restoreVersion(documentId: string, versionId: string, userId: string) {
        const version = await prisma.documentVersion.findUnique({
            where: { id: versionId }
        });

        if (!version) {
            throw new Error('Version not found');
        }

        // Update document content
        return prisma.document.update({
            where: { id: documentId },
            data: {
                content: version.content || {}
            }
        });
    }
}

export const versionService = new VersionService();
