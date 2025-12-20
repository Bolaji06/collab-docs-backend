import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors';
import { asyncHandler } from '../utils/helper';
import { prisma } from '../config/database';
export const authenticate = asyncHandler(async (req, res, next) => {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('No token provided');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new UnauthorizedError('No token provided');
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                username: true,
            },
        });
        if (!user) {
            throw new UnauthorizedError('User not found');
        }
        // Attach user to request
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new UnauthorizedError('Token expired');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new UnauthorizedError('Invalid token');
        }
        throw error;
    }
});
export const optionalAuthenticate = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next();
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                username: true,
            },
        });
        if (user) {
            req.user = user;
        }
    }
    catch (error) {
        // Silently fail for optional authentication
    }
    next();
});
//# sourceMappingURL=auth.js.map