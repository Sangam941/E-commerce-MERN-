import { Request, Response, NextFunction } from 'express';
import * as orderService from '../service/order.service';
import { AppError } from '../utils/appError';

// Create order controller
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      return next(new AppError('User ID not found in request', 401));
    }

    const { items, total } = req.body;

    const result = await orderService.createOrderService({
      userId,
      items,
      total,
    });

    res.status(201).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Order creation failed', error.statusCode || 500));
  }
};

// Get user orders controller
export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      return next(new AppError('User ID not found in request', 401));
    }

    const result = await orderService.getUserOrdersService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to fetch orders', error.statusCode || 500));
  }
};

// Get order by ID controller
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;

    const result = await orderService.getOrderByIdService(orderId);
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to fetch order', error.statusCode || 500));
  }
};
