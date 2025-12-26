export interface ActivityDetails {
    title?: string;
    folderName?: string;
    tagName?: string;
    email?: string;
    [key: string]: any;
}
export declare class ActivityService {
    /**
     * Log a new activity
     */
    logActivity(data: {
        userId: string;
        type: string;
        documentId?: string | null;
        folderId?: string | null;
        workspaceId?: string | null;
        details?: ActivityDetails;
    }): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        documentId: string | null;
        userId: string;
        details: import("@prisma/client/runtime/client").JsonValue | null;
        folderId: string | null;
        workspaceId: string | null;
    } | undefined>;
    /**
     * Get latest activities relevant to a user
     * This includes their own activities and activities on documents they have access to
     */
    getLatestActivities(userId: string, limit?: number): Promise<({
        user: {
            id: string;
            username: string;
            avatar: string | null;
        };
        document: {
            id: string;
            title: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        type: string;
        documentId: string | null;
        userId: string;
        details: import("@prisma/client/runtime/client").JsonValue | null;
        folderId: string | null;
        workspaceId: string | null;
    })[]>;
}
export declare const activityService: ActivityService;
//# sourceMappingURL=activity-service.d.ts.map