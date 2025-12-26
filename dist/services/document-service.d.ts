export declare class DocumentService {
    /**
     * Create a new document for a user
     */
    createDocument(userId: string, data: {
        title?: string;
        content?: any;
        folderId?: string;
        workspaceId?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        folderId: string | null;
        workspaceId: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        ownerId: string;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
    }>;
    /**
     * Get all documents accessible by a user (owned or shared), excluding deleted ones.
     * This is the default view.
     */
    getDocumentsForUser(userId: string, options?: {
        search?: string;
        folderId?: string;
        tagId?: string;
        workspaceId?: string;
    }): Promise<({
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                name: string;
                userId: string;
                color: string | null;
            };
        } & {
            documentId: string;
            tagId: string;
        })[];
        folder: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: string;
            workspaceId: string | null;
            color: string | null;
        } | null;
        owner: {
            id: string;
            email: string;
            username: string;
            avatar: string | null;
        };
        permissions: ({
            user: {
                id: string;
                email: string;
                username: string;
                avatar: string | null;
            };
        } & {
            id: string;
            documentId: string;
            userId: string;
            role: import("@prisma/client").$Enums.Role;
            grantedAt: Date;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        folderId: string | null;
        workspaceId: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        ownerId: string;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
    })[]>;
    /**
     * Get only documents shared WITH the user (excluding owned ones and deleted ones)
     */
    getSharedDocumentsForUser(userId: string): Promise<({
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                name: string;
                userId: string;
                color: string | null;
            };
        } & {
            documentId: string;
            tagId: string;
        })[];
        folder: {
            id: string;
            name: string;
        } | null;
        owner: {
            email: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        folderId: string | null;
        workspaceId: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        ownerId: string;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
    })[]>;
    /**
     * Get soft-deleted documents owned by the user
     */
    getDeletedDocumentsForUser(userId: string): Promise<({
        owner: {
            email: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        folderId: string | null;
        workspaceId: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        ownerId: string;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
    })[]>;
    /**
     * Get a specific document if the user has access.
     * Optionally allow fetching even if deleted (e.g. for restore preview), default false.
     */
    getDocumentById(documentId: string, userId: string, includeDeleted?: boolean): Promise<{
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                name: string;
                userId: string;
                color: string | null;
            };
        } & {
            documentId: string;
            tagId: string;
        })[];
        folder: {
            id: string;
            name: string;
        } | null;
        owner: {
            email: string;
            username: string;
            avatar: string | null;
        };
        permissions: ({
            user: {
                email: string;
                username: string;
                avatar: string | null;
            };
        } & {
            id: string;
            documentId: string;
            userId: string;
            role: import("@prisma/client").$Enums.Role;
            grantedAt: Date;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        folderId: string | null;
        workspaceId: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        ownerId: string;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
    }>;
    /**
     * Update a document if the user is the owner or has EDITOR role
     */
    updateDocument(userId: string, documentId: string, data: {
        title?: string;
        content?: string;
        folderId?: string | null;
    }): Promise<{
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                name: string;
                userId: string;
                color: string | null;
            };
        } & {
            documentId: string;
            tagId: string;
        })[];
        folder: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: string;
            workspaceId: string | null;
            color: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        folderId: string | null;
        workspaceId: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        ownerId: string;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
    }>;
    /**
     * Extracts user IDs from Tiptap JSON content
     */
    private extractMentions;
    /**
     * Soft delete a document (Owner only)
     */
    softDeleteDocument(documentId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        folderId: string | null;
        workspaceId: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        ownerId: string;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
    }>;
    /**
     * Restore a soft-deleted document (Owner only)
     */
    restoreDocument(documentId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        folderId: string | null;
        workspaceId: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        ownerId: string;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
    }>;
    /**
     * Permanently delete a document (Owner only)
     */
    permanentlyDeleteDocument(documentId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        folderId: string | null;
        workspaceId: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        ownerId: string;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
    }>;
    /**
     * Share a document with another user by email
     */
    shareDocument(documentId: string, ownerId: string, email: string, role: 'EDITOR' | 'VIEWER'): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        documentId: string;
        userId: string;
        role: import("@prisma/client").$Enums.Role;
        grantedAt: Date;
    }>;
    /**
     * Remove a user's permission from a document
     */
    removePermission(documentId: string, ownerId: string, userIdToRemove: string): Promise<void>;
    updateAccess(documentId: string, userId: string, data: {
        isPublic: boolean;
        publicRole?: 'VIEWER' | 'EDITOR' | null;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        folderId: string | null;
        workspaceId: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        ownerId: string;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
    }>;
}
export declare const documentService: DocumentService;
//# sourceMappingURL=document-service.d.ts.map