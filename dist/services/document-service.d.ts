export declare class DocumentService {
    /**
     * Create a new document for a user
     */
    createDocument(userId: string, data: {
        title?: string;
        content?: any;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
        ownerId: string;
    }>;
    /**
     * Get all documents accessible by a user (owned or shared), excluding deleted ones.
     * This is the default view.
     */
    getDocumentsForUser(userId: string): Promise<({
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
        content: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
        ownerId: string;
    })[]>;
    /**
     * Get only documents shared WITH the user (excluding owned ones and deleted ones)
     */
    getSharedDocumentsForUser(userId: string): Promise<({
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
        content: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
        ownerId: string;
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
        content: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
        ownerId: string;
    })[]>;
    /**
     * Get a specific document if the user has access.
     * Optionally allow fetching even if deleted (e.g. for restore preview), default false.
     */
    getDocumentById(documentId: string, userId: string, includeDeleted?: boolean): Promise<{
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
        content: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
        ownerId: string;
    }>;
    /**
     * Update a document if the user is the owner or has EDITOR role
     */
    updateDocument(documentId: string, userId: string, data: {
        title?: string;
        content?: any;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
        ownerId: string;
    }>;
    /**
     * Soft delete a document (Owner only)
     */
    softDeleteDocument(documentId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
        ownerId: string;
    }>;
    /**
     * Restore a soft-deleted document (Owner only)
     */
    restoreDocument(documentId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
        ownerId: string;
    }>;
    /**
     * Permanently delete a document (Owner only)
     */
    permanentlyDeleteDocument(documentId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
        ownerId: string;
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
        content: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
        publicRole: import("@prisma/client").$Enums.Role | null;
        deletedAt: Date | null;
        ownerId: string;
    }>;
}
export declare const documentService: DocumentService;
//# sourceMappingURL=document-service.d.ts.map