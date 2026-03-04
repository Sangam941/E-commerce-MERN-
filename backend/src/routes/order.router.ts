import { Router } from 'express';
import { createOrder, getUserOrders, getOrderById } from '../controllers/order.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Routes with authentication
router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:orderId', protect, getOrderById);

export default router;
