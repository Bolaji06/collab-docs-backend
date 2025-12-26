import type { Request, Response } from 'express';
export declare const createFolder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getFolderById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getFolders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateFolder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteFolder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=folder.controller.d.ts.map