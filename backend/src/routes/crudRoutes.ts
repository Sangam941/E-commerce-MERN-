import { Router } from 'express'
import { getAllProducts, getProductsById , updateProduct, deleteProducts} from '../controllers/crudControllers'
import { protect } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/restrictTo'

const router = Router ();

router.route('/').get(getAllProducts).post(protect, restrictTo('ADMIN', createProduct))

router.route('/:id').get(getProductsById).patch(protect, restrictTo('ADMIN', deleteProducts))

// for bulk delete,another endpoint
router.post('/delete-many', protect, restrictTo('ADMIN'), deleteProducts),