import { Request, Response, NextFunction } from 'express';
import * as cartService from '../service/cart.service';
import { AppError } from '../utils/appError';
import { AuthRequest } from '../middleware/auth.middleware';

// Get cart
export const getCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const result = await cartService.getOrCreateCartService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to fetch cart', error.statusCode || 500));
  }
};

// Add item to cart
export const addItemToCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const { productId, quantity } = req.body;
    const result = await cartService.addItemToCartService(
      userId,
      productId,
      parseInt(quantity) || 1
    );
    res.status(201).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to add item to cart', error.statusCode || 500));
  }
};

// Increment cart item quantity
export const incrementAndDecrementCartItem = (delta: 1 | -1) => async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }
    
    if (delta !== 1 && delta !== -1) {
      return next(new AppError("Delta must be either 1 or -1", 400));
    }

    const result = await cartService.incrementAndDecrementCartItemService(
      req.body.cartItemId as string,
      delta,
      userId
    );
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to increment cart item', error.statusCode || 500));
  }
};


// Remove item from cart
export const removeItemFromCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const result = await cartService.removeItemFromCartService(
      req.body.cartItemId as string,
      userId
    );
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to remove item from cart', error.statusCode || 500));
  }
};

// Clear cart
export const clearCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const result = await cartService.clearCartService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to clear cart', error.statusCode || 500));
  }
};

