import { prisma } from '../config/database.js';
export const commentController = {
    createComment: async (req, res) => {
        try {
            const { documentId } = req.params;
            const { content, positionStart, positionEnd } = req.body;
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if (!documentId) {
                return res.status(400).json({ message: 'Document ID is required' });
            }
            const comment = await prisma.comment.create({
                data: {
                    content,
                    documentId,
                    userId,
                    positionStart: positionStart || 0,
                    positionEnd: positionEnd || 0,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            avatar: true
                        }
                    }
                }
            });
            // Notify document owner
            const document = await prisma.document.findUnique({ where: { id: documentId } });
            if (document && document.ownerId !== userId) {
                await prisma.notification.create({
                    data: {
                        userId: document.ownerId,
                        type: 'COMMENT',
                        title: 'New Comment',
                        message: `${req.user?.username || 'Someone'} commented on "${document.title}"`,
                        documentId: document.id,
                    }
                });
            }
            res.status(201).json({ success: true, data: comment });
        }
        catch (error) {
            console.error('Create comment error:', error);
            res.status(500).json({ success: false, message: 'Failed to create comment' });
        }
    },
    getComments: async (req, res) => {
        try {
            const { documentId } = req.params;
            if (!documentId) {
                return res.status(400).json({ success: false, message: 'Document ID is required' });
            }
            const comments = await prisma.comment.findMany({
                where: { documentId },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            avatar: true
                        }
                    },
                    replies: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    email: true,
                                    avatar: true
                                }
                            }
                        },
                        orderBy: { createdAt: 'asc' }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
            res.json({ success: true, data: comments });
        }
        catch (error) {
            console.error('Get comments error:', error);
            res.status(500).json({ success: false, message: 'Failed to fetch comments' });
        }
    },
    replyComment: async (req, res) => {
        try {
            const { id } = req.params; // commentId
            const { content } = req.body;
            const userId = req.user?.id;
            if (!id) {
                return res.status(400).json({ message: 'Comment ID is required' });
            }
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // Ensure comment exists
            const comment = await prisma.comment.findUnique({ where: { id } });
            if (!comment) {
                return res.status(404).json({ success: false, message: 'Comment not found' });
            }
            const reply = await prisma.commentReply.create({
                data: {
                    content,
                    commentId: id,
                    userId
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            avatar: true
                        }
                    }
                }
            });
            // Notify original comment author
            if (comment.userId !== userId) {
                // Get document for title context (optional, or just generic)
                const document = await prisma.document.findUnique({ where: { id: comment.documentId } });
                await prisma.notification.create({
                    data: {
                        userId: comment.userId,
                        type: 'COMMENT',
                        title: 'New Reply',
                        message: `${req.user?.username || 'Someone'} replied to your comment on "${document?.title || 'a document'}"`,
                        documentId: comment.documentId,
                    }
                });
            }
            res.status(201).json({ success: true, data: reply });
        }
        catch (error) {
            console.error('Reply comment error:', error);
            res.status(500).json({ success: false, message: 'Failed to reply to comment' });
        }
    },
    resolveComment: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Comment ID is required' });
            }
            const comment = await prisma.comment.update({
                where: { id },
                data: { resolved: true }
            });
            res.json({ success: true, data: comment });
        }
        catch (error) {
            console.error('Resolve comment error:', error);
            res.status(500).json({ success: false, message: 'Failed to resolve comment' });
        }
    },
    deleteComment: async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            if (!id) {
                return res.status(400).json({ message: 'Comment ID is required' });
            }
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const comment = await prisma.comment.findUnique({ where: { id } });
            if (!comment)
                return res.status(404).json({ message: "Not found" });
            if (comment.userId !== userId) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            await prisma.comment.delete({ where: { id } });
            res.json({ success: true, message: 'Comment deleted' });
        }
        catch (error) {
            console.error('Delete comment error:', error);
            res.status(500).json({ success: false, message: 'Failed to delete comment' });
        }
    }
};
//# sourceMappingURL=comment-controller.js.map