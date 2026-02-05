import { Router } from 'express';
import upload from '../middleware/multer';
import { protect } from '../middleware/auth.middleware';
import { getAllProducts, getSingleProductById, updateProduct, deleteProducts, createProduct, toggleProductWishlist } from '../controllers/product.controller';
import { restrictTo } from '../middleware/restrictTo';

const router = Router();

router.use(protect);

router.post('/add-product', restrictTo('ADMIN'), upload, createProduct);

router.get('/fetch-all-products', getAllProducts);

router.get('/fetch-single-product/:id', getSingleProductById);
router.patch('/update-product/:id', restrictTo('ADMIN'), upload, updateProduct);
router.delete('/delete-product', restrictTo('ADMIN'), deleteProducts);

// Toggle wishlist flag (star click) - any logged-in user
router.patch('/toggle-wishlist', toggleProductWishlist);

export default router;
 




