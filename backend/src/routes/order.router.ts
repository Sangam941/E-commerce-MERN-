import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/restrictTo';
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
} from '../controllers/order.controller';

const router = Router();

router.use(protect);

// Customer routes
router.post('/create', createOrder);
router.get('/my-orders', getUserOrders);
// router.get('/:orderId', getOrderById);

// Admin routes
router.get('/admin/all-orders', restrictTo("ADMIN"), getAllOrders);
router.patch('/admin/order/status', restrictTo("ADMIN"), updateOrderStatus);

export default router;

