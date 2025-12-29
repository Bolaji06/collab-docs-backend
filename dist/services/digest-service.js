import { prisma } from '../config/database.js';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY || 're_17UexMfu_7RPAy3zPsnfoiNdc7XN3W9hp');
export class DigestService {
    async generateUserDigest(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                notifications: {
                    where: {
                        isRead: false,
                        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24h
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        if (!user || user.notifications.length === 0)
            return;
        const nudgeCount = user.notifications.filter(n => n.title === 'Alignment Nudge').length;
        const mentionCount = user.notifications.filter(n => n.type === 'MENTION').length;
        const otherCount = user.notifications.length - nudgeCount - mentionCount;
        const digestHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #6366f1;">Since you were away...</h2>
                <p>Hello <strong>${user.username}</strong>, here is a quick summary of what you missed in CollabDocs in the last 24 hours:</p>
                
                <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    ${nudgeCount > 0 ? `<p>🚀 <strong>${nudgeCount}</strong> Alignment Nudges (Teammates are waiting for you!)</p>` : ''}
                    ${mentionCount > 0 ? `<p>💬 <strong>${mentionCount}</strong> New Mentions</p>` : ''}
                    ${otherCount > 0 ? `<p>🔔 <strong>${otherCount}</strong> Other updates</p>` : ''}
                </div>

                <p>Jump back in to maintain the team's momentum:</p>
                <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard" style="display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    Go to Dashboard
                </a>
                
                <p style="margin-top: 30px; color: #666; font-size: 12px; border-top: 1px solid #eee; pt: 10px;">
                    This is an automated digest to help you stay aligned and catch up quickly.
                </p>
            </div>
        `;
        await resend.emails.send({
            from: "CollabDocs Digest <onboarding@resend.dev>",
            to: user.email,
            subject: `Catch up: You have ${user.notifications.length} new updates in CollabDocs`,
            html: digestHtml
        });
    }
    async processAllDigests() {
        // In a real app, this would be a cron job
        // For now, it finds users active more than 24h ago but with new notifications
        const users = await prisma.user.findMany({
            where: {
                lastActiveAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
            }
        });
        for (const user of users) {
            await this.generateUserDigest(user.id);
        }
    }
}
export const digestService = new DigestService();
//# sourceMappingURL=digest-service.js.map