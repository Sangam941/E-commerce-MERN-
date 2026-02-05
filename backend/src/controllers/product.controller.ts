import { Request, Response, NextFunction } from 'express';
import * as productService from '../service/product.service';
import { AppError } from '../utils/appError';
import { FileUpload } from '../utils/UrlGenerator';


// Create product controller
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check for ADMIN role (assuming role is available on req.user)
    const userRole = (req as any).user?.role;  

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



export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productService.getAllProductsService();
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to fetch products', error.statusCode || 500));
  }
};

// Get single product
export const getSingleProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productService.getProductByIdService(req.params.id as string);
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to fetch product', error.statusCode || 500));
  }
};


// Edit Product (Admin)
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //check for the admin only
    const result = await productService.updateProductService(
      req.params.id as string,
      req.body
    );
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to update product', error.statusCode || 500));
  }
};

// Delete Products (admin) - handles both single product ID or arrays of id
export const deleteProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const result = await productService.deleteProductsService(
      id as string,
    );
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to delete product(s)', error.statusCode || 500));
  }
};

// Toggle wishlist flag on a product
export const toggleProductWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const result = await productService.toggleProductWishlistService(id as string);
    res.status(200).json(result);
  } catch (error: any) {
    next(new AppError(error.message || 'Failed to toggle wishlist status', error.statusCode || 500));
  }
};

