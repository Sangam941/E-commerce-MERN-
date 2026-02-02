import { AppError } from '../utils/appError';
import prisma from '../config/db';
import { OrderStatus } from '../../generated/prisma/client';

// Create order from cart
export const createOrderFromCartService = async (userId: string) => {
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
      throw new AppError("Cart is empty", 400);
    }

    // Validate stock and calculate total
    let total = 0;
    const orderItems = [];

    for (const item of cart.items) {
      if (!item.product.isActive) {
        throw new AppError(`Product ${item.product.name} is no longer available`, 400);
      }

      if (item.product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for ${item.product.name}. Available: ${item.product.stock}`, 400);
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
          status: 'PLACED',
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

// Get all orders (user's orders or all orders for admin)
export const getAllOrdersService = async (userId: string, userRole: string) => {
  try {
    let orders;

    if (userRole === 'ADMIN') {
      // Admin can see all orders
      orders = await prisma.order.findMany({
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
    } else {
      // User can only see their own orders
      orders = await prisma.order.findMany({
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
    }

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
export const getOrderByIdService = async (orderId: string, userId: string, userRole: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
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
      }
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    // Check if user has permission to view this order
    if (userRole !== 'ADMIN' && order.userId !== userId) {
      throw new AppError("Unauthorized: You can only view your own orders", 403);
    }

    return {
      success: true,
      data: order
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to fetch order",
      error.statusCode || 500
    );
  }
};

// Update order status (Admin only)
export const updateOrderStatusService = async (orderId: string, status: OrderStatus) => {
  try {
    // Validate status
    const validStatuses: OrderStatus[] = ['PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      throw new AppError(`Invalid status. Valid statuses: ${validStatuses.join(', ')}`, 400);
    }

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!existingOrder) {
      throw new AppError("Order not found", 404);
    }

    // If cancelling order, restore stock
    if (status === 'CANCELLED' && existingOrder.status !== 'CANCELLED') {
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId }
      });

      await prisma.$transaction(
        orderItems.map(item =>
          prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity
              }
            }
          })
        )
      );
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
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
      }
    });

    return {
      success: true,
      message: "Order status updated successfully",
      data: order
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to update order status",
      error.statusCode || 500
    );
  }
};

