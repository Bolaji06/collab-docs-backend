export declare class FolderService {
    getFolderById(userId: string, folderId: string): Promise<{
        _count: {
            documents: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        workspaceId: string | null;
        color: string | null;
    }>;
    createFolder(userId: string, data: {
        name: string;
        color?: string;
        workspaceId?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        workspaceId: string | null;
        color: string | null;
    }>;
    getFolders(userId: string, workspaceId?: string): Promise<({
        _count: {
            documents: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        workspaceId: string | null;
        color: string | null;
    })[]>;
    updateFolder(userId: string, folderId: string, name: string, color?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        workspaceId: string | null;
        color: string | null;
    }>;
    deleteFolder(userId: string, folderId: string, deleteDocuments?: boolean): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        workspaceId: string | null;
        color: string | null;
    }>;
}
export declare const folderService: FolderService;
//# sourceMappingURL=folder-service.d.ts.map