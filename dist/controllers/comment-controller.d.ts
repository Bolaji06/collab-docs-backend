import type { Request, Response } from 'express';
export declare const commentController: {
    createComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getComments: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    replyComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    resolveComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    unresolveComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    toggleReaction: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=comment-controller.d.ts.map