import { Request, Response, NextFunction } from 'express';
import * as productService from '../service/product.service';
import { AppError } from '../utils/appError';
import { FileUpload } from '../utils/UrlGenerator';
import prisma from "../config/db";

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

// Create product controller
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check for ADMIN role (assuming role is available on req.user)
    const userRole = req.user?.role;
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



export const getAllProducts = async( req: Request, res:Response, next: NextFunction)   => {
    try {
        const products = await prisma.product.findMany({
            where: { isActive: true }
        })
        res.status(200).json({ success : true, data: products})
    } catch (error: any) {
        next(new AppError(error.message, 500))
    }
}

//Get single product 
export const getProductsById = async ( req:Request, res:Response, next: NextFunction) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id : req.params.id as string }
        })
        if(!product) return next(new AppError('product not found' ,402))
        
        res.status(200).json({success: true, data: product})        
    } catch (error: any) {
        next(new AppError(error.message, 500))
    }
}


//Edit Product(Admin)
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.update({
            where: { id: req.params.id as string},
            data: req.body
        })
        res.status(200).json({success: true, data: product})
    } catch (error: any) {
        next(new AppError(error.message, 400))
    }
}

// Delete Products(s) (admin)- handles both single product ID or arrays of id
export const deleteProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ids } = req.body;
        if(ids && Array.isArray(ids)) {
            //bulk delete
            await prisma.product.deleteMany({
                where: {id: { in : ids}}
            })
        }else {
            //single Delete via params
            await prisma.product.delete({
                where: {id : req.params.id as string}
            })            
        }

        res.status(204).json({ success: true, data: null})
    } catch (error: any) {
        next(new AppError(error.message, 400))
    }
}

