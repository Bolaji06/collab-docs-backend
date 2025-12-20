import type { Request, Response, NextFunction } from 'express';
export declare const errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const notFound: (req: Request, res: Response) => void;
//# sourceMappingURL=error-handler.d.ts.map