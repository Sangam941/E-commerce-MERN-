import { Request, Response, NextFunction } from 'express';
import * as orderService from '../service/order.service';
import { AppError } from '../utils/appError';
import { AuthRequest } from '../middleware/auth.middleware';
import { OrderStatus } from '../../generated/prisma/client';

// Create order from cart
export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const result = await orderService.createOrderFromCartService(userId);
    res.status(201).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to create order', error.statusCode || 500));
  }
};

// Get all orders
export const getAllOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;
    
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const result = await orderService.getAllOrdersService(userId, userRole);
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to fetch orders', error.statusCode || 500));
  }
};

// Get single order
export const getOrderById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;
    
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const result = await orderService.getOrderByIdService(
      req.params.id as string,
      userId,
      userRole
    );
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to fetch order', error.statusCode || 500));
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return next(new AppError("Status is required", 400));
    }

    const result = await orderService.updateOrderStatusService(
      req.params.id as string,
      status as OrderStatus
    );
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to update order status', error.statusCode || 500));
  }
};

