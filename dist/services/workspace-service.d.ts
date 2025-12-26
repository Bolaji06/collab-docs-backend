export declare class WorkspaceService {
    createWorkspace(userId: string, name: string): Promise<{
        members: {
            id: string;
            userId: string;
            workspaceId: string;
            role: string;
            joinedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPremium: boolean;
        name: string;
        ownerId: string;
    }>;
    getWorkspaces(userId: string): Promise<({
        _count: {
            folders: number;
            members: number;
            documents: number;
        };
        members: ({
            user: {
                id: string;
                email: string;
                username: string;
                avatar: string | null;
            };
        } & {
            id: string;
            userId: string;
            workspaceId: string;
            role: string;
            joinedAt: Date;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPremium: boolean;
        name: string;
        ownerId: string;
    })[]>;
    getWorkspaceById(workspaceId: string, userId: string): Promise<{
        _count: {
            owner: number;
            members: number;
            documents: number;
            folders: number;
            activities: number;
        };
        members: ({
            user: {
                id: string;
                email: string;
                username: string;
                avatar: string | null;
            };
        } & {
            id: string;
            userId: string;
            workspaceId: string;
            role: string;
            joinedAt: Date;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPremium: boolean;
        name: string;
        ownerId: string;
    }>;
    updateWorkspace(workspaceId: string, userId: string, data: {
        name: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPremium: boolean;
        name: string;
        ownerId: string;
    }>;
    deleteWorkspace(workspaceId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPremium: boolean;
        name: string;
        ownerId: string;
    }>;
    addMember(workspaceId: string, userId: string, role?: string): Promise<{
        id: string;
        userId: string;
        workspaceId: string;
        role: string;
        joinedAt: Date;
    }>;
    updateMemberRole(workspaceId: string, requesterUserId: string, memberId: string, role: 'ADMIN' | 'MEMBER'): Promise<{
        id: string;
        userId: string;
        workspaceId: string;
        role: string;
        joinedAt: Date;
    }>;
    removeMember(workspaceId: string, requesterUserId: string, memberId: string): Promise<{
        id: string;
        userId: string;
        workspaceId: string;
        role: string;
        joinedAt: Date;
    }>;
    getWorkspaceMembers(workspaceId: string): Promise<({
        user: {
            id: string;
            email: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        userId: string;
        workspaceId: string;
        role: string;
        joinedAt: Date;
    })[]>;
    isMember(workspaceId: string, userId: string): Promise<boolean>;
}
export declare const workspaceService: WorkspaceService;
//# sourceMappingURL=workspace-service.d.ts.map