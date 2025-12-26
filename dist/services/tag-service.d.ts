export declare class TagService {
    getTagById(userId: string, tagId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
        color: string | null;
    }>;
    createTag(userId: string, name: string, color?: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
        color: string | null;
    }>;
    getTags(userId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
        color: string | null;
    }[]>;
    deleteTag(userId: string, tagId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
        color: string | null;
    }>;
    addTagToDocument(userId: string, documentId: string, tagId: string): Promise<{
        documentId: string;
        tagId: string;
    }>;
    removeTagFromDocument(userId: string, documentId: string, tagId: string): Promise<{
        documentId: string;
        tagId: string;
    }>;
}
export declare const tagService: TagService;
//# sourceMappingURL=tag-service.d.ts.map