import { Request, Response, NextFunction } from 'express';
import * as productService from '../service/product.service';
import { AppError } from '../utils/appError';
import { FileUpload } from '../utils/UrlGenerator';

// Create product controller
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check for ADMIN role (assuming role is available on req.user)
    const userRole = (req as any).user?.role;
    console.log(userRole)
    if (userRole !== 'ADMIN') {
      return next(new AppError('Only admins can create products', 403));
    }   

    const { name, price, stock, category, imageUrl } = req.body;

    const file: FileUpload | null = req.file ? {
      originalname: req.file.originalname,
      buffer: req.file.buffer,
    } : null;

    const result = await productService.uploadImageAndCreateProductService(
      file,
      { name, price: parseFloat(price), stock: parseInt(stock), category },
      imageUrl
    );

    res.status(201).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Product creation failed', error.statusCode || 500));
  }
};

