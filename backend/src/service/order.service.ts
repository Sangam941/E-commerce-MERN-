import { AppError } from '../utils/appError';
import prisma from '../config/db';

interface OrderItemData {
  productId: string;
  quantity: number;
  price: number;
}

interface CreateOrderData {
  userId: string;
  items: OrderItemData[];
  total: number;
}

// Create order service
export const createOrderService = async ({ userId, items, total }: CreateOrderData) => {
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  if (!items || items.length === 0) {
    throw new AppError("Order must contain at least one item", 400);
  }

  if (total <= 0) {
    throw new AppError("Order total must be greater than 0", 400);
  }

  try {
    // Create order with order items
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return {
      success: true,
      message: "Order created successfully",
      data: order,
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to create order",
      error.statusCode || 500
    );
  }
};

// Get user orders service
export const getUserOrdersService = async (userId: string) => {
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to retrieve orders",
      error.statusCode || 500
    );
  }
};

// Get order by ID service
export const getOrderByIdService = async (orderId: string) => {
  if (!orderId) {
    throw new AppError("Order ID is required", 400);
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return {
      success: true,
      message: "Order retrieved successfully",
      data: order,
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to retrieve order",
      error.statusCode || 500
    );
  }
};
