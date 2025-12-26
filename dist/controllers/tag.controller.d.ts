import type { Request, Response } from 'express';
export declare const tagController: {
    createTag: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getTagById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getTags: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteTag: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    addTagToDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    removeTagFromDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=tag.controller.d.ts.map