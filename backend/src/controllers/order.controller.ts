import { Request, Response, NextFunction } from 'express';
import * as orderService from '../service/order.service';
import { AppError } from '../utils/appError';
import { AuthRequest } from '../middleware/auth.middleware';
import { OrderStatus } from '../../generated/prisma/enums';

// Create order from cart
export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const result = await orderService.createOrderService(userId);
    res.status(201).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to create order', error.statusCode || 500));
  }
};

// Get user's orders
export const getUserOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const result = await orderService.getUserOrdersService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to fetch orders', error.statusCode || 500));
  }
};

// Get single order by ID
// export const getOrderById = async (req: AuthRequest, res: Response, next: NextFunction) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) {
//       return next(new AppError("User not authenticated", 401));
//     }

//     const { orderId } = req.params;
//     const result = await orderService.getOrderByIdService(orderId as string, userId as string);
//     res.status(200).json(result);
//   } catch (error: any) {
//     next(new AppError(error.message || 'Failed to fetch order', error.statusCode || 500));
//   }
// };

// Update order status (admin only)
export const updateOrderStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const { orderId } = req.body;
    const { status } = req.body;

    if (!status || !Object.values(OrderStatus).includes(status)) {
      return next(new AppError("Invalid order status", 400));
    }

    const result = await orderService.updateOrderStatusService(orderId as string, status as OrderStatus);
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to update order status', error.statusCode || 500));
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }   

    const result = await orderService.getAllOrdersService();
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to fetch orders', error.statusCode || 500));
  }
};

