import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { Role } from '../../generated/prisma/client'; // Import the Role enum from your generated prisma client

export const restrictTo = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // 1. Check if user exists on request (set by protect middleware)
        if (!req.user) {
            return next(new AppError('You are not logged in', 401));
        }

        // 2. Check if the user's role (from your Prisma schema) is in the allowed list
        if (!allowedRoles.includes(req.user.role as Role)) {
            return next(
                new AppError('Forbidden: You do not have permission to perform this action', 403)
            );
        }

        next();
    };
};