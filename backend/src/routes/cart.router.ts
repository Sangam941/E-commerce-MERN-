import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
  incrementAndDecrementCartItem
} from '../controllers/cart.controller';

const router = Router();  

router.use(protect);

router.get('/fetch-cart', getCart);
router.post('/add-item', addItemToCart);
router.patch('/item/increment-item', incrementAndDecrementCartItem(1));
router.patch('/item/decrement-item', incrementAndDecrementCartItem(-1));
router.delete('/remove-item', removeItemFromCart);
router.delete('/clear-cart', clearCart);

export default router;

