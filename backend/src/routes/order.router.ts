import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/restrictTo';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/order.controller';

const router = Router();

router.use(protect);

router.post('/create-order', createOrder);
router.get('/fetch-all-orders', getAllOrders);
router.get('/fetch-single-order/:id', getOrderById);
router.patch('/update-order-status/:id', restrictTo('ADMIN'), updateOrderStatus);

export default router;

