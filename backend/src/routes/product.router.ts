import { Router } from 'express';
import upload from '../middleware/multer';
import { protect } from '../middleware/auth.middleware';
import { getAllProducts, getProductsById , updateProduct, deleteProducts, createProduct} from '../controllers/product.controller'
import { restrictTo } from '../middleware/restrictTo'

const router = Router();

router.use(protect)

router.post('/add-product', upload, createProduct);

router.route('/').get(getAllProducts)

router.route('/:id').get(getProductsById).patch(protect, restrictTo('ADMIN'), updateProduct).delete(protect, restrictTo('ADMIN'), deleteProducts)

// for bulk delete,another endpoint
router.post('/delete-many', protect, restrictTo('ADMIN'), deleteProducts);

export default router;





