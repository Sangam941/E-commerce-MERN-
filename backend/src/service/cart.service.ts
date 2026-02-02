import { AppError } from '../utils/appError';
import prisma from '../config/db';

// Get or create cart for user
export const getOrCreateCartService = async (userId: string) => {
  try {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });
    }

    return {
      success: true,
      data: cart
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to fetch cart",
      error.statusCode || 500
    );
  }
};

// Add item to cart
export const addItemToCartService = async (userId: string, productId: string, quantity: number) => {
  try {
    // Validate quantity
    if (quantity <= 0) {
      throw new AppError("Quantity must be greater than 0", 400);
    }

    // Check if product exists and is active
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (!product.isActive) {
      throw new AppError("Product is not available", 400);
    }

    if (product.stock < quantity) {
      throw new AppError(`Insufficient stock. Available: ${product.stock}`, 400);
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId }
      });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId
        }
      }
    });

    if (existingItem) {
      // Do not update quantity, just show message that the item already exists in the cart
      throw new AppError(
        "Item already exists in the cart. Please visit the cart to update the quantity.",
        409 // Conflict
      );
    } else {
      // Create new cart item
      const cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity
        },
        include: {
          product: true
        }
      });

      return {
        success: true,
        message: "Item added to cart successfully",
        data: cartItem
      };
    }

  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to add item to cart",
      error.statusCode || 500
    );
  }
};

// Increment cart item quantity
export const incrementAndDecrementCartItemService = async (cartItemId: string, delta: number, userId: string) => {
  try {
    // Get cart item and verify it belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true,
        product: true
      }
    });

    if (!cartItem) {
      throw new AppError("Cart item not found", 404);
    }

    if (cartItem.cart.userId !== userId) {
      throw new AppError("Unauthorized: This cart item does not belong to you", 403);
    }

    // Calculate new quantity
    const newQuantity = cartItem.quantity + delta;

    // Check stock availability
    if (cartItem.product.stock < newQuantity) {
      throw new AppError(`Insufficient stock. Available: ${cartItem.product.stock}, Current in cart: ${cartItem.quantity}`, 400);
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
      include: {
        product: true
      }
    });

    return {
      success: true,
      message: delta === -1
        ? "Cart item quantity decremented successfully"
        : "Cart item quantity incremented successfully",
      data: updatedItem
    };
  } catch (error: any) {
    throw new AppError(
      error.message || `Failed to ${delta === -1 ? "decrement" : "increment"} cart item`,
      error.statusCode || 500
    );
  }
};

// Remove item from cart
export const removeItemFromCartService = async (cartItemId: string, userId: string) => {
  try {
    // Get cart item and verify it belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true
      }
    });

    if (!cartItem) {
      throw new AppError("Cart item not found", 404);
    }

    if (cartItem.cart.userId !== userId) {
      throw new AppError("Unauthorized: This cart item does not belong to you", 403);
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId }
    });

    return {
      success: true,
      message: "Item removed from cart successfully",
      data: null
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to remove item from cart",
      error.statusCode || 500
    );
  }
};

// Clear cart
export const clearCartService = async (userId: string) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    return {
      success: true,
      message: "Cart cleared successfully",
      data: null
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to clear cart",
      error.statusCode || 500
    );
  }
};

