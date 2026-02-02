import { Router } from 'express';
import upload from '../middleware/multer';
import { protect } from '../middleware/auth.middleware';
import { getAllProducts, getSingleProductById, updateProduct, deleteProducts, createProduct} from '../controllers/product.controller'
import { restrictTo } from '../middleware/restrictTo'

const router = Router();

router.use(protect)

router.post('/add-product', restrictTo('ADMIN'), upload, createProduct);

router.get('/fetch-all-products', getAllProducts);

router.get('/fetch-single-product/:id', getSingleProductById);
router.patch('/update-product/:id', restrictTo('ADMIN'), upload, updateProduct);
router.delete('/delete-product', restrictTo('ADMIN'), deleteProducts);

// for bulk delete, another endpoint
router.post('/delete-many', restrictTo('ADMIN'), deleteProducts);

export default router;
 




