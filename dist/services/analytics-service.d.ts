export declare class AnalyticsService {
    getWorkspaceHealth(workspaceId: string): Promise<{
        alignmentDebt: number;
        momentumScore: number;
        activeMembers: number;
        documentCount: number;
        trends: {
            day: string;
            score: number;
        }[];
    }>;
}
export declare const analyticsService: AnalyticsService;
//# sourceMappingURL=analytics-service.d.ts.map