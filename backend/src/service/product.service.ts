import { AppError } from '../utils/appError';
import { uploadImageToCloudinary } from '../utils/cloudinary';
import { FileUpload } from '../utils/UrlGenerator';
import prisma from '../config/db';

interface CreateProductData {
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

// Create product service
export const createProductService = async (productData: CreateProductData) => {
  const { name, price, stock, category, imageUrl } = productData;

  // Validate required fields
  if (!name || !price || !stock || !category || !imageUrl) {
    throw new AppError("All fields (name, price, stock, category, imageUrl) are required", 400);
  }

  // Validate price and stock are positive
  if (price <= 0) {
    throw new AppError("Price must be greater than 0", 400);
  }

  if (stock < 0) {
    throw new AppError("Stock cannot be negative", 400);
  }

  try {
    // Create product in database
    const product = await prisma.product.create({
      data: {
        name,
        price: Math.round(price), // Ensure price is an integer
        stock: Math.round(stock), // Ensure stock is an integer
        category,
        imageUrl,
        isActive: true,
      },
    });

    return {
      success: true,
      message: "Product created successfully",
      data: product,
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to create product",
      error.statusCode || 500
    );
  }
};

// Upload image and create product service
export const uploadImageAndCreateProductService = async (
  file: FileUpload | null,
  productData: Omit<CreateProductData, 'imageUrl'>,
  imageUrl?: string
) => {
  let finalImageUrl: string;

  // If file is provided, upload to Cloudinary
  if (file) {
    if (!file.buffer || !file.originalname) {
      throw new AppError("Invalid file format", 400);
    }

    try {
      // Upload image to Cloudinary
      const result: any = await uploadImageToCloudinary(file);
      
      if (!result || !result.secure_url) {
        throw new AppError("Image upload failed - no URL returned", 500);
      }

      finalImageUrl = result.secure_url;
    } catch (error: any) {
      throw new AppError(
        error.message || "Failed to upload image to Cloudinary",
        error.statusCode || 500
      );
    }
  } else if (imageUrl) {
    // Use provided imageUrl if no file
    finalImageUrl = imageUrl;
  } else {
    throw new AppError("Either image file or imageUrl must be provided", 400);
  }

  // Create product with the image URL
  const product = await createProductService({
    ...productData,
    imageUrl: finalImageUrl,
  });

  return product;
};

// Get all products service
export const getAllProductsService = async () => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true }
    });

    return {
      success: true,
      data: products
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to fetch products",
      error.statusCode || 500
    );
  }
};

// Get product by ID service
export const getProductByIdService = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return {
      success: true,
      data: product
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to fetch product",
      error.statusCode || 500
    );
  }
};

// Update product service
export const updateProductService = async (id: string, updateData: Partial<CreateProductData> | undefined) => {
  try {
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      throw new AppError("Product not found", 404);
    }

    // Validate price and stock if provided
    if (updateData?.price !== undefined && updateData.price <= 0) {
      throw new AppError("Price must be greater than 0", 400);
    }

    if (updateData?.stock !== undefined && updateData.stock < 0) {
      throw new AppError("Stock cannot be negative", 400);
    }

    // Prepare update data
    const dataToUpdate: any = {};
    if (updateData?.name !== undefined) dataToUpdate.name = updateData.name;
    if (updateData?.price !== undefined) dataToUpdate.price = Math.round(updateData.price);
    if (updateData?.stock !== undefined) dataToUpdate.stock = Math.round(updateData.stock);
    if (updateData?.category !== undefined) dataToUpdate.category = updateData.category;
    if (updateData?.imageUrl !== undefined) dataToUpdate.imageUrl = updateData.imageUrl;

    const product = await prisma.product.update({
      where: { id },
      data: dataToUpdate
    });

    return {
      success: true,
      message: "Product updated successfully",
      data: product
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to update product",
      error.statusCode || 500
    );
  }
};

// Delete products service (handles both single and bulk delete)
export const deleteProductsService = async (id: string) => {
  try {
    if (!id) {
      throw new AppError("Product ID is required", 400);
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      throw new AppError("Product not found", 404);
    }

    await prisma.product.delete({
      where: { id }
    });

    return {
      success: true,
      message: "Product deleted successfully",
      data: null
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to delete product",
      error.statusCode || 500
    );
  }
};

