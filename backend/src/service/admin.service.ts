import { AppError } from '../utils/appError';
import prisma from '../config/db';
import { OrderStatus } from '../../generated/prisma/enums';

// Admin dashboard stats
export const getAdminDashboardStatsService = async () => {
  try {
    // Total revenue from all non-cancelled orders
    const revenueAgg = await prisma.order.aggregate({
      where: {
        status: OrderStatus.DELIVERED,
      },
      _sum: {
        total: true,
      },
    });

    const totalRevenue = revenueAgg._sum.total || 0;

    // Total orders (all)
    const totalOrders = await prisma.order.count();

    // Total users
    const totalUsers = await prisma.user.count();

    // Total products
    const totalProducts = await prisma.product.count();

    // Total stock from all active products
    const stockAgg = await prisma.product.aggregate({
      where: {
        isActive: true,
      },
      _sum: {
        stock: true,
      },
    });

    const totalStocks = stockAgg._sum.stock || 0;

    return {
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalUsers,
        totalProducts,
        totalStocks,
      },
    };
  } catch (error: any) {
    throw new AppError(
      error.message || 'Failed to fetch admin dashboard stats',
      error.statusCode || 500,
    );
  }
};


