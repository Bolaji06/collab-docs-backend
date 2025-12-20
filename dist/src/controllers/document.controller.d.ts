import type { Request, Response, NextFunction } from 'express';
export declare const getDocuments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createDocument: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDocumentById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateDocument: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSharedDocuments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDeletedDocuments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteDocument: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const restoreDocument: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const permanentlyDeleteDocument: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const shareDocument: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const removePermission: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateAccess: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=document.controller.d.ts.map