export declare class VersionService {
    createSnapshot(documentId: string, userId: string): Promise<{
        user: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        documentId: string;
        content: import("@prisma/client/runtime/client").JsonValue;
        versionNumber: number;
        createdBy: string;
    }>;
    getVersions(documentId: string): Promise<({
        user: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        documentId: string;
        content: import("@prisma/client/runtime/client").JsonValue;
        versionNumber: number;
        createdBy: string;
    })[]>;
    restoreVersion(documentId: string, versionId: string, userId: string): Promise<{
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
export declare const versionService: VersionService;
//# sourceMappingURL=version-service.d.ts.map