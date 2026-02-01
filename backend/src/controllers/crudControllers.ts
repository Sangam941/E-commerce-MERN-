import { Request, Response, NextFunction } from "express";  
import { AppError  } from "../utils/appError";  
import prisma from "../config/db";

export const getAllProducts = async( req: Request, res:Response, next)   => {
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
export const getProductsById = async ( req:Request, res:Response, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id : req.params.id }
        })
        if(!product) return next(new AppError('product not found' ,402))
        
        res.status(200).json({success: true, data: product})        
    } catch (error: any) {
        next(new AppError(error.message, 500))
    }
}


//Edit Product(Admin)
export const updateProduct = async (req: Request, res: Response, next) => {
    try {
        const product = await prisma.product.update({
            where: { id: req.params.id},
            data: req.body
        })
        res.status(200).json({success: true, data: product})
    } catch (error: any) {
        next(new AppError(error.message, 400))
    }
}

// Delete Products(s) (admin)- handles both single product ID or arrays of id
export const deleteProducts = async (req: Request, res: Response, next) => {
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
                where: {id : req.params.id}
            })            
        }

        res.status(204).json({ success: true, data: null})
    } catch (error: any) {
        next(new AppError(error.message, 400))
    }
}