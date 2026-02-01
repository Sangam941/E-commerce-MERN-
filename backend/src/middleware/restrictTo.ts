import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { Role } from '../../generated/prisma/client'; // Import the Role enum from your generated prisma client

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string; [key: string]: any };
      file?: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
      };
    }
  }
}

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