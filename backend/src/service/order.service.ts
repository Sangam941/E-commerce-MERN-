import { AppError } from '../utils/appError';
import prisma from '../config/db';
import { OrderStatus } from '../../generated/prisma/enums';

// Create order from cart
export const createOrderService = async (userId: string) => {
  try {
    // Get user's cart with items
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError("Cart is empty. Cannot create order.", 400);
    }

    // Validate stock and calculate total
    let total = 0;
    
    const orderItems: { productId: string; quantity: number; price: number }[] = [];

    for (const item of cart.items) {
      if (!item.product.isActive) {
        throw new AppError(`Product ${item.product.name} is no longer available`, 400);
      }

      if (item.product.stock < item.quantity) {
        throw new AppError(
          `Insufficient stock for ${item.product.name}. Available: ${item.product.stock}, Requested: ${item.quantity}`,
          400
        );
      }

      const itemTotal = item.product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price
      });
    }

    // Create order and order items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: OrderStatus.PLACED,
          items: {
            create: orderItems
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });

      // Update product stock
      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return newOrder;
    });

    return {
      success: true,
      message: "Order created successfully",
      data: order
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to create order",
      error.statusCode || 500
    );
  }
};

// Get all orders for a user
export const getUserOrdersService = async (userId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      data: orders
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to fetch orders",
      error.statusCode || 500
    );
  }
};

// Get single order by ID
// export const getOrderByIdService = async (orderId: string, userId: string) => {
//   try {
//     const order = await prisma.order.findUnique({
//       where: { id: orderId },
//       include: {
//         items: {
//           include: {
//             product: true
//           }
//         }
//       }
//     });

//     if (!order) {
//       throw new AppError("Order not found", 404);
//     }

//     // Check if order belongs to user (unless admin)
//     if (order.userId !== userId) {
//       throw new AppError("Unauthorized: This order does not belong to you", 403);
//     }

//     return {
//       success: true,
//       data: order
//     };
//   } catch (error: any) {
//     throw new AppError(
//       error.message || "Failed to fetch order",
//       error.statusCode || 500
//     );
//   }
// };

// Update order status (admin only)
export const updateOrderStatusService = async (orderId: string, status: OrderStatus) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return {
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to update order status",
      error.statusCode || 500
    );
  }
};

// Get all orders (admin only)
export const getAllOrdersService = async () => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: {
          select: {
            id: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      data: orders
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to fetch orders",
      error.statusCode || 500
    );
  }
};

