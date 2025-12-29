import { prisma } from '../config/database.js';
export class AnalyticsService {
    async getWorkspaceHealth(workspaceId) {
        const documents = await prisma.document.findMany({
            where: { workspaceId },
            include: {
                _count: {
                    select: {
                        comments: { where: { resolved: false } }
                    }
                }
            }
        });
        // Calculate "Alignment Debt": Unresolved decisions/tasks across all documents
        let alignmentDebt = 0;
        let totalDecisions = 0;
        let resolvedDecisions = 0;
        // Note: In a real app, we'd iterate through ProseMirror JSON or have a Decision model. 
        // For now, we use a heuristic based on unresolved comments and document metadata.
        for (const doc of documents) {
            alignmentDebt += doc._count.comments;
            // Simulated counts for mockup purposes - in reality, we'd parse content or use a dedicated table
            totalDecisions += Math.floor(Math.random() * 10) + 5;
            resolvedDecisions += Math.floor(Math.random() * 5);
        }
        const momentumScore = totalDecisions > 0
            ? Math.round((resolvedDecisions / totalDecisions) * 100)
            : 100;
        return {
            alignmentDebt,
            momentumScore,
            activeMembers: 12, // Placeholder
            documentCount: documents.length,
            trends: [
                { day: 'Mon', score: 65 },
                { day: 'Tue', score: 72 },
                { day: 'Wed', score: 68 },
                { day: 'Thu', score: 85 },
                { day: 'Fri', score: 92 },
            ]
        };
    }
}
export const analyticsService = new AnalyticsService();
//# sourceMappingURL=analytics-service.js.map