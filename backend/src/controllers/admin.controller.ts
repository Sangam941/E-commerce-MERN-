import { Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { AuthRequest } from '../middleware/auth.middleware';
import { getAdminDashboardStatsService } from '../service/admin.service';

// Admin dashboard stats
export const getAdminDashboardStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new AppError('User not authenticated', 401));
    }

    const result = await getAdminDashboardStatsService();
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to fetch admin dashboard stats', error.statusCode || 500));
  }
};


