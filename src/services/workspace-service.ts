import { prisma } from '../config/database.js';

export class WorkspaceService {
    async createWorkspace(userId: string, name: string) {
        return prisma.workspace.create({
            data: {
                name,
                ownerId: userId,
                members: {
                    create: {
                        userId,
                        role: 'ADMIN'
                    }
                }
            },
            include: {
                members: true
            }
        });
    }

    async getWorkspaces(userId: string) {
        return prisma.workspace.findMany({
            where: {
                OR: [
                    { ownerId: userId },
                    {
                        members: {
                            some: { userId }
                        }
                    }
                ]
            },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatar: true,
                                email: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        documents: true,
                        folders: true,
                        members: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getWorkspaceById(workspaceId: string, userId: string) {
        const workspace = await prisma.workspace.findUnique({
            where: { id: workspaceId },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatar: true,
                                email: true
                            }
                        }
                    }
                },
                _count: true
            }
        });

        if (!workspace) throw new Error('Workspace not found');

        const membership = workspace.members.find(m => m.userId === userId);
        if (!membership) throw new Error('Not authorized to access this workspace');

        return workspace;
    }

    async updateWorkspace(workspaceId: string, userId: string, data: { name: string }) {
        const workspace = await prisma.workspace.findUnique({
            where: { id: workspaceId }
        });

        if (!workspace) throw new Error('Workspace not found');
        if (workspace.ownerId !== userId) throw new Error('Only the owner can update the workspace');

        return prisma.workspace.update({
            where: { id: workspaceId },
            data: { name: data.name }
        });
    }

    async deleteWorkspace(workspaceId: string, userId: string) {
        const workspace = await prisma.workspace.findUnique({
            where: { id: workspaceId }
        });

        if (!workspace) throw new Error('Workspace not found');
        if (workspace.ownerId !== userId) throw new Error('Only the owner can delete the workspace');

        // Note: Prisma schema handles cascading for documents/folders via onDelete: SetNull or Cascade if defined.
        // If we want hard delete, we might need manual cleanup if not cascading.
        return prisma.workspace.delete({
            where: { id: workspaceId }
        });
    }

    async addMember(workspaceId: string, userId: string, role: string = 'MEMBER') {
        return prisma.workspaceMember.create({
            data: {
                workspaceId,
                userId,
                role
            }
        });
    }

    async updateMemberRole(workspaceId: string, requesterUserId: string, memberId: string, role: 'ADMIN' | 'MEMBER') {
        const workspace = await prisma.workspace.findUnique({
            where: { id: workspaceId },
            include: { members: true }
        });

        if (!workspace) throw new Error('Workspace not found');

        const requester = workspace.members.find(m => m.userId === requesterUserId);
        if (!requester || requester.role !== 'ADMIN') {
            throw new Error('Only admins can update member roles');
        }

        return prisma.workspaceMember.update({
            where: { id: memberId },
            data: { role }
        });
    }

    async removeMember(workspaceId: string, requesterUserId: string, memberId: string) {
        const workspace = await prisma.workspace.findUnique({
            where: { id: workspaceId },
            include: { members: true }
        });

        if (!workspace) throw new Error('Workspace not found');

        const requester = workspace.members.find(m => m.userId === requesterUserId);
        const targetMember = workspace.members.find(m => m.id === memberId);

        if (!targetMember) throw new Error('Member not found');
        if (targetMember.userId === workspace.ownerId) throw new Error('Cannot remove the workspace owner');

        if (requesterUserId !== targetMember.userId && (!requester || requester.role !== 'ADMIN')) {
            throw new Error('Not authorized to remove this member');
        }

        return prisma.workspaceMember.delete({
            where: { id: memberId }
        });
    }

    async getWorkspaceMembers(workspaceId: string) {
        return prisma.workspaceMember.findMany({
            where: { workspaceId },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        email: true
                    }
                }
            }
        });
    }

    async isMember(workspaceId: string, userId: string): Promise<boolean> {
        const membership = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId
                }
            }
        });
        return !!membership;
    }
}

export const workspaceService = new WorkspaceService();
