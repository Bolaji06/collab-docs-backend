import type { Request, Response, NextFunction } from 'express';
export declare const createWorkspace: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getWorkspaces: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getWorkspaceById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateWorkspace: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteWorkspace: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addMember: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateMemberRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const removeMember: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=workspace.controller.d.ts.map